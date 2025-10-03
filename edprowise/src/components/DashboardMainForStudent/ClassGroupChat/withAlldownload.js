import React, { useRef, useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import {
  FaUsers,
  FaPaperclip,
  FaPaperPlane,
  FaSmile,
  FaCheckDouble,
  
  FaStar,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import DeleteMessage from "./DeleteMessage";
import { CiCirclePlus } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import CreateGroupModal from "./CreateGroupModal";
import getAPI from "../../../api/getAPI";
import postAPI from "../../../api/postAPI";
import deleteAPI from "../../../api/deleteAPI";
const StudentClassGroupChat = () => {
  // Mock user data
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [message, setMessage] = useState("");
  const [userObjId, setUserObjId] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const [activeTab, setActiveTab] = useState("users");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const messageRef = useRef(null);
  const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
  const [previewMessageImage, setPreviewMessageImage] = useState(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [mockUsers, setMockUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({
    messages: [],
    receiver: null,
    conversationId: null,
  });

  const [activeStep, setActiveStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);
  const [favoriteChats, setFavoriteChats] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Initialize user data
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const userRole = userDetails?.role;
    const userId = userDetails?.admissionNumber;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);

    const fetchUserDetails = async () => {
      try {
        const res = await getAPI(
          `/get-user-details?schoolId=${id}&role=${userRole}&userId=${userId}`
        );
        console.log("get-user-details one", res);

        if (res?.data?.success) {
          setUserObjId(res.data.user._id);
          setUserDetails(res.data.user);
          console.log("obj id of user", res.data.user._id);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch data when schoolId and academicYear are available
  useEffect(() => {
    if (schoolId && academicYear && userDetails && userObjId) {
      fetchAllUsers();
      fetchConversations();
      fetchFavoriteChats();
    }
  }, [schoolId, academicYear, userDetails, userObjId]);

  // Socket.io connection - ENHANCED VERSION
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_API_URL_FOR_IMAGE, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketConnection);

    console.log("🔌 Socket connecting...");

    // Join the user
    if (userObjId) {
      socketConnection.emit("join", { userId: userObjId });
      console.log("👤 User joined:", userObjId);
    }

    // Listen for connection events
    socketConnection.on("connect", () => {
      console.log("✅ Socket connected successfully");
    });

    socketConnection.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socketConnection.on("connect_error", (error) => {
      console.error("🚨 Socket connection error:", error);
    });

    // Listen for online users
    socketConnection.on("online-users", (activeUsers) => {
      console.log("👥 Active Users:", activeUsers);
    });

    // Listen for new messages - ENHANCED
    socketConnection.on("new-message", (data) => {
      console.log("📨 Received new-message event:", data);

      // Update messages if it belongs to active conversation
      if (data.conversationId === activeConversationId) {
        console.log("🔄 Updating active conversation messages");
        setMessages((prev) => ({
          ...prev,
          messages: [...prev.messages, data.message],
        }));

        // Auto-scroll to bottom
        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        console.log("💡 Message for different conversation, refreshing list");
      }

      // Always refresh conversations to update last message and reorder
      fetchConversations();
    });

    // Additional fallback event listener
    socketConnection.on("message-sent", (data) => {
      console.log("📬 Received message-sent event:", data);
      if (
        data.type === "new-message" &&
        data.conversationId === activeConversationId
      ) {
        setMessages((prev) => ({
          ...prev,
          messages: [...prev.messages, data.message],
        }));
        fetchConversations();
      }
    });

    return () => {
      console.log("🧹 Cleaning up socket connection");
      socketConnection.off("connect");
      socketConnection.off("disconnect");
      socketConnection.off("connect_error");
      socketConnection.off("online-users");
      socketConnection.off("new-message");
      socketConnection.off("message-sent");
      socketConnection.disconnect();
    };
  }, [userObjId, activeConversationId]);
  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-schools-all-user-details/${schoolId}`,
        true
      );
      console.log("res ", res);

      if (res.data.success) {
        console.log("res.data.users", res.data.users);
        setMockUsers(res.data.users || []);
      } else {
        toast.error(res.data.message || "Failed to fetch roll number records");
      }
    } catch (error) {
      console.error("Error fetching roll number records:", error);
      toast.error(
        error.response.data.message || "Error fetching roll number records"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await getAPI(`/conversations/${userObjId}`);
      console.log("get conversation response", response);
      setConversations(response.data);
    } catch (error) {
      console.error("Failed to fetch data.", error);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId, receiver) => {
    try {
      // Clear previous messages immediately when switching conversations
      setMessages({
        messages: [],
        receiver: null,
        conversationId: null,
      });

      setSelectedUser(receiver);

      if (conversationId === "new") {
        setActiveConversationId("new");
        setMessages({
          messages: [],
          receiver,
          conversationId: "new",
        });
        return;
      }

      setActiveConversationId(conversationId);

      const res = await getAPI(`/get-messages/${conversationId}`);
      console.log("get messages ", res);

      if (res.data.success) {
        setMessages({
          messages: res.data.messages || [],
          receiver,
          conversationId,
        });
      } else {
        toast.error(res.data.message || "Failed to load messages");
      }
    } catch (err) {
      toast.error("Error fetching messages");
    }
  };

  // Handle file change
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Time ago function
  const formatTimeAgo = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) {
      return `${diffInSecs} sec ago`;
    } else if (diffInMins < 60) {
      return `${diffInMins} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  // Handle edit
  const handleEdit = (messages) => {
    setSelectedTrainee(messages);
    setIsModalOpen(true);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);

  // Fetch users for all users view
  const fetchUsers = async () => {
    console.log("mockUsers", mockUsers);
    setUsers(mockUsers);
    setCurrentView("allUsers");
  };

  const handleSendMessage = async (e) => {
    console.log("message", messages);

    e.preventDefault();
    if (!message.trim() && !file) return;

    try {
      const formData = new FormData();

      // Use "new" only if there's no active conversation AND we have a selected user
      const conversationIdToSend =
        activeConversationId === "new" ? "new" : activeConversationId || "new";
      formData.append("conversationId", conversationIdToSend);
      formData.append("senderId", userObjId);

      // Always include receiverId when starting new conversation
      if (selectedUser?._id) {
        formData.append("receiverId", selectedUser._id);
      }

      if (message) formData.append("message", message);
      if (file) formData.append("messageFile", file);

      console.log("Sending message with:", {
        conversationId: conversationIdToSend,
        senderId: userObjId,
        receiverId: selectedUser?._id,
      });

      const response = await postAPI(
        "/send-message",
        formData,
        { "Content-Type": "multipart/form-data" },
        true
      );

      console.log("post-response-send", response);

      if (response.data.success) {
        const newMessageData = response.data.data;

        // If this was a new conversation, update the active conversation ID
        if (conversationIdToSend === "new" && response.data.conversationId) {
          setActiveConversationId(response.data.conversationId);
          setMessages((prev) => ({
            ...prev,
            conversationId: response.data.conversationId,
          }));
          fetchMessages(response.data.conversationId, selectedUser);
        }

        // Clear form
        setMessage("");
        setFile(null);
        setShowEmojiPicker(false);

        // Refresh conversations
        fetchConversations();

        // Scroll to bottom
        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong while sending message");
    }
  };

  // Handle file change
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle emoji click
  const handleEmojiClick = (emojiObject) =>
    setMessage((prev) => prev + emojiObject.emoji);

  // Handle window resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 980);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle step navigation
  const handleClick = (step) => {
    setActiveStep((prev) => (prev === step ? step + 1 : step));
  };

  const fetchFavoriteChats = async () => {
    try {
      const response = await getAPI(`/get-favorite-chats/${userObjId}`);
      console.log("get favorite chats", response);

      if (response.data.success) {
        setFavoriteChats(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching favorite chats:", error);
    }
  };
  useEffect(() => {
    if (activeConversationId) {
      checkIfFavorited(activeConversationId);
    }
  }, [activeConversationId]);

  const checkIfFavorited = async (conversationId) => {
    if (!conversationId || conversationId === "new") {
      setIsFavorited(false);
      return;
    }

    try {
      const response = await getAPI(
        `/check-favorite-chats?userId=${userObjId}&conversationId=${conversationId}`
      );
      if (response.data.success) {
        setIsFavorited(response.data.isFavorited);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      setIsFavorited(false);
    }
  };

  const toggleFavorite = () => {
    if (!activeConversationId || activeConversationId === "new") {
      toast.warning("Please select a conversation first");
      return;
    }

    // Find the favorite chat by conversationId to get its _id
    const favoriteChat = favoriteChats.find(
      (fav) => fav.conversationId === activeConversationId
    );

    if (isFavorited && favoriteChat) {
      removeFromFavorites(favoriteChat._id);
    } else {
      addToFavorites(activeConversationId);
    }
  };

  const addToFavorites = async (conversationId) => {
    console.log("addinto faviourate", conversationId);
    console.log("addinto faviourate using active conId", activeConversationId);

    if (!conversationId || conversationId === "new") {
      toast.warning("Cannot favorite a new conversation");
      return;
    }

    try {
      const response = await postAPI(
        "/add-favorite-chats",
        {
          userId: userObjId,
          conversationId: conversationId,
        },
        true
      );

      if (response.data.success) {
        setIsFavorited(true);
        fetchFavoriteChats();
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error(
        error.response?.data?.message || "Failed to add to favorites"
      );
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      const response = await deleteAPI(
        `/remove-chat-from-favorite/${favoriteId}`
      );

      if (response.data.success) {
        setIsFavorited(false);
        fetchFavoriteChats(); // Refresh favorites list
        toast.success("Removed from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  // Add this function to your component
  const downloadFile = async (fileUrl) => {
    try {
      // Ensure the URL is complete
      const fullUrl = fileUrl.startsWith("http")
        ? fileUrl
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${fileUrl}`;

      // Fetch the file
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error("File download failed");
      }

      // Convert to blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Extract filename from URL or use generic name
      const filename =
        fileUrl.split("/").pop() ||
        (fileUrl.includes(".pdf") ? "document.pdf" : "image.jpg");

      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="cards m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1"></div>
              </div>
              <div
                className="messenger rounded min-h-750 overflow-hidden"
                style={{
                  height: "100%",
                  overflow: "hidden",
                  background: "White",
                }}
              >
                <div
                  className="messenger-listView"
                  style={{
                    overflowY: "auto",
                    display: isMobile && activeStep !== 1 ? "none" : "block",
                  }}
                >
                  <div className="m-header">
                    <nav>
                      <nav className="m-header-right">
                        <a href="#" className="listView-x">
                          <TiTimes />
                        </a>
                      </nav>
                    </nav>
                    <div className="d-flex align-item-center">
                      <input
                        type="text"
                        className="messenger-search"
                        placeholder="Search"
                      />
                      <div
                        className="align-content-center"
                        style={{
                          marginRight: "10px",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsCreateGroupModalOpen(true)}
                      >
                        <CiCirclePlus className="fs-20" />
                      </div>
                    </div>
                    <div className="messenger-listView-tabs">
                      <a
                        href="#"
                        className={activeTab === "users" ? "active-tab" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("users");
                          setCurrentView("default");
                        }}
                      >
                        <BiTimeFive />
                      </a>

                      <a
                        href="#"
                        className={activeTab === "allUsers" ? "active-tab" : ""}
                        data-view="allUsers"
                        onClick={(e) => {
                          e.preventDefault();
                          fetchUsers();
                          setActiveTab("allUsers");
                          setCurrentView("allUsers");
                        }}
                      >
                        <FaUsers />
                      </a>
                    </div>
                  </div>
                  <div className="m-body" style={{ flexGrow: 1 }}>
                    {currentView === "default" && (
                      <div
                        className="show scroll messenger-tab app-scroll"
                        data-view="users"
                        style={{ display: "block" }}
                      >
                        <div className="">
                          <p className="messenger-title text-dark">Favorites</p>
                          <div
                            className="listOfContacts"
                            style={{
                              width: "100%",
                              position: "relative",
                            }}
                          >
                            {favoriteChats.length === 0 ? (
                              <div className="text-center text-muted py-3">
                                No favorite chats yet
                              </div>
                            ) : (
                              <div
                                className="favorite-chats-container"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  overflowX: "auto",
                                  gap: "5px",
                                  padding: "10px 10px",
                                  scrollbarWidth: "thin",
                                  scrollbarColor: "#ccc transparent",
                                }}
                              >
                                {favoriteChats.map((favorite) => {
                                  const {
                                    _id: favoriteId, // Get the favorite record _id
                                    conversationId,
                                    isGroup,
                                    groupName,
                                    groupImage,
                                    otherUser,
                                    lastMessage,
                                  } = favorite;

                                  const displayInfo = isGroup
                                    ? {
                                        id: conversationId,
                                        name: groupName,
                                        image: groupImage,
                                        isGroup: true,
                                      }
                                    : {
                                        id: otherUser?._id,
                                        name: otherUser?.name,
                                        image: otherUser?.profileImage,
                                        isGroup: false,
                                      };

                                  return (
                                    <div
                                      key={favoriteId}
                                      className="favorite-chat-item"
                                      style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        minWidth: "70px",
                                        maxWidth: "70px",
                                        textAlign: "center",
                                        flexShrink: 0,
                                        position: "relative",
                                      }}
                                    >
                                      <div
                                        onClick={() => {
                                          fetchMessages(conversationId, {
                                            _id: displayInfo.id,
                                            name: displayInfo.name,
                                            profileImage: displayInfo.image,
                                            isGroup: displayInfo.isGroup,
                                            groupImage: displayInfo.isGroup
                                              ? groupImage
                                              : null,
                                            groupName: displayInfo.isGroup
                                              ? groupName
                                              : null,
                                          });
                                          handleClick(2);
                                        }}
                                        style={{ width: "100%" }}
                                      >
                                        <div
                                          className="avatar av-m"
                                          style={{
                                            borderRadius: "50%",
                                            width: "50px",
                                            height: "50px",
                                            marginBottom: "5px",
                                            justifySelf: "center",
                                          }}
                                        >
                                          <img
                                            alt={displayInfo.name}
                                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayInfo.image}`}
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderRadius: "50%",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                        <span
                                          className="d-inline-block text-dark text-truncate"
                                          style={{
                                            maxWidth: "60px",
                                            fontSize: "0.8rem",
                                            // lineHeight: "1.2",
                                          }}
                                          title={displayInfo.name}
                                        >
                                          {displayInfo.name}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="messenger-title text-dark">Recent</p>
                        <div
                          className="listOfContacts"
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          {conversations.map((conversation) => {
                            const {
                              _id: conversationId,
                              members,
                              isGroup,
                              groupName,
                              groupImage,
                              lastMessage,
                              otherUser,
                            } = conversation;

                            let displayUser = null;

                            if (isGroup) {
                              displayUser = {
                                _id: conversationId,
                                name: groupName,
                                groupImage: groupImage,
                                isGroup: true,
                              };
                            } else {
                              if (otherUser) {
                                displayUser = {
                                  _id: otherUser._id,
                                  name: otherUser.name,
                                  profileImage: otherUser.profileImage,
                                  isGroup: false,
                                };
                              }
                            }
                            if (!displayUser) return null;

                            return (
                              <table
                                key={conversationId}
                                className="messenger-list-item"
                                onClick={() =>
                                  fetchMessages(conversationId, displayUser)
                                }
                              >
                                <tbody onClick={() => handleClick(2)}>
                                  <tr data-action={0}>
                                    <td style={{ position: "relative" }}>
                                      <div
                                        data-action={0}
                                        className="avatar av-m"
                                        style={{ borderRadius: "50%" }}
                                      >
                                        <img
                                          alt="Chat"
                                          src={
                                            displayUser.isGroup
                                              ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.groupImage}`
                                              : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.profileImage}`
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td width="100%">
                                      <p
                                        data-type={
                                          displayUser?.isGroup
                                            ? "group"
                                            : "user"
                                        }
                                        style={{ textAlign: "start" }}
                                      >
                                        {displayUser?.name}
                                      </p>
                                      <span
                                        style={{
                                          justifyContent: "left",
                                          display: "flex",
                                        }}
                                      >
                                        <span
                                          className="lastMessageIndicator d-inline-block text-dark text-truncate"
                                          style={{ width: "200px" }}
                                        >
                                          {lastMessage?.message ||
                                            "No messages yet"}
                                        </span>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {currentView === "allUsers" && (
                      <div
                        className="all_members messenger-tab app-scroll"
                        data-view="allUsers"
                        style={{ display: "block" }}
                      >
                        {mockUsers.map((item) => {
                          // Check if conversation already exists with this user
                          const existingConversation = conversations.find(
                            (conv) => {
                              if (conv.isGroup) return false; // Skip groups
                              const otherMember = conv.members.find(
                                (member) =>
                                  member.userId.toString() !== userObjId
                              );
                              return (
                                otherMember &&
                                otherMember.userId.toString() === item._id
                              );
                            }
                          );

                          return (
                            <table
                              key={item._id}
                              className="messenger-list-item"
                              onClick={async () => {
                                if (existingConversation) {
                                  // If conversation exists, load existing messages
                                  console.log(
                                    "Loading existing conversation:",
                                    existingConversation._id
                                  );
                                  await fetchMessages(
                                    existingConversation._id,
                                    item
                                  );
                                } else {
                                  // If no conversation exists, create new one
                                  console.log(
                                    "Starting new conversation with:",
                                    item._id
                                  );
                                  setActiveConversationId("new");
                                  setSelectedUser(item);
                                  setMessages({
                                    messages: [],
                                    receiver: item,
                                    conversationId: "new",
                                  });
                                }
                                handleClick(2);
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ position: "relative" }}>
                                    <div
                                      className="avatar av-m"
                                      style={{ borderRadius: "50%" }}
                                    >
                                      <img
                                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.profileImage}`}
                                        alt="Teacher"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <p className="fw-bold">{item.name}</p>
                                    <small className="text-muted">
                                      {item.role === "Student"
                                        ? `${item.className || ""} ${
                                            item.sectionName || ""
                                          }`
                                        : item.designation || "Employee"}
                                    </small>
                                    {existingConversation && (
                                      <div className="text-success small">
                                        ✓ Existing conversation
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="messenger-messagingView"
                  style={{
                    flexGrow: 1,
                    display: isMobile && activeStep !== 2 ? "none" : "block",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                >
                  {/* ?.receiver?.name */}
                  {messages && (
                    <div className="m-header m-header-messaging">
                      <nav className="d-flex align-items-center justify-content-between">
                        <div style={{ display: "flex" }}>
                          <a className="show-listView">
                            <FaArrowLeft onClick={() => handleClick(1)} />
                          </a>
                          <div
                            className="avatar av-s header-avatar"
                            style={{
                              margin: "8px 10px",
                              backgroundImage: ``,
                            }}
                          >
                            <img
                              alt="Teacher"
                              src={
                                messages?.receiver?.isGroup
                                  ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.groupImage}`
                                  : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`
                              }
                            />
                          </div>
                          <div className="d-grid ">
                            <a href="#" className="user-name">
                              {messages?.receiver?.name}
                            </a>
                            <span className="fs-6">SchoolABC, Teacher</span>
                          </div>
                        </div>
                        <nav className="m-header-right">
                          <a
                            // href="#"
                            className={`show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2 ${
                              isFavorited ? "text-warning" : ""
                            }`}
                            onClick={toggleFavorite}
                            title={
                              isFavorited
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                            // className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                          >
                            {isFavorited ? <FaStar /> : <FaRegStar />}
                          </a>
                          <a
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                            onClick={() => handleEdit(messages)}
                          >
                            <FaCircleInfo onClick={() => handleClick(3)} />
                          </a>
                        </nav>
                      </nav>
                    </div>
                  )}

                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div
                      className="messages app-scroll"
                      style={{
                        height: "62vh",
                        display: "flex",
                        flexDirection: "column-reverse",
                        overflow: "auto",
                      }}
                    >
                      <div>
                        {messages?.messages?.length > 0 ? (
                          messages.messages.map((msg, index) => {
                            const isSender =
                              msg.senderId === userObjId ||
                              msg.user?.id === user?.id;

                            return (
                              <div
                                key={msg._id || index}
                                className={`message-card ${
                                  isSender ? "mc-sender" : ""
                                }`}
                                title={msg.createdAt}
                              >
                                <div
                                  className="chatify-d-flex chatify-align-items-center"
                                  style={{
                                    flexDirection: isSender
                                      ? "row-reverse"
                                      : "row",
                                    justifyContent: isSender
                                      ? "flex-end"
                                      : "flex-start",
                                  }}
                                >
                                  {!isSender && (
                                    <div
                                      className="avatar av-s"
                                      style={{ marginRight: "8px" }}
                                    >
                                      <img
                                        alt="User"
                                        src={
                                          msg.senderDetails?.profileImage
                                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.senderDetails.profileImage}`
                                            : ""
                                        }
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}

                                  <div
                                    style={{
                                      maxWidth: "70%",
                                      marginLeft: isSender ? "5px" : "0",
                                      marginRight: isSender ? "0" : "5px",
                                    }}
                                  >
                                    {msg.messageFile && (
                                      <>
                                        {msg.messageFile.endsWith?.(".pdf") ||
                                        msg.messageFile?.includes?.(
                                          "application/pdf"
                                        ) ? (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              padding: "10px",
                                              backgroundColor: "#f9f9f9",
                                              textAlign: "center",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              marginBottom: "8px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              downloadFile(msg.messageFile)
                                            }
                                          >
                                            <div
                                              style={{
                                                marginBottom: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <strong
                                                style={{
                                                  color: "#333333",
                                                  marginRight: "10px",
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  maxWidth: "200px",
                                                }}
                                              >
                                                {typeof msg.messageFile ===
                                                "string"
                                                  ? msg.messageFile
                                                      .split("/")
                                                      .pop()
                                                  : file?.name || "Document"}
                                              </strong>
                                              <HiOutlineDocumentDownload
                                                size={30}
                                                style={{
                                                  cursor: "pointer",
                                                  color: "blue",
                                                }}
                                                // onClick={() => {
                                                //   const link =
                                                //     document.createElement("a");
                                                //   link.href = msg.messageFile;
                                                //   link.download =
                                                //     typeof msg.messageFile ===
                                                //     "string"
                                                //       ? msg.messageFile
                                                //           .split("/")
                                                //           .pop()
                                                //       : "document.pdf";
                                                //   link.click();
                                                // }}
                                              />
                                              {/* <small
                                                style={{
                                                  color: "#666",
                                                  fontSize: "0.75rem",
                                                }}
                                              >
                                                Click to download PDF
                                              </small> */}
                                            </div>
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              overflow: "hidden",
                                              marginBottom: "8px",
                                              backgroundColor: "#f9f9f9",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                            onClick={() =>
                                              downloadFile(msg.messageFile)
                                            }
                                          >
                                            <img
                                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.messageFile}`}
                                              alt="Attached file"
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                                maxHeight: "300px",
                                                objectFit: "contain",
                                              }}
                                            />
                                            {/* <div
                                              style={{
                                                position: "absolute",
                                                top: "5px",
                                                right: "5px",
                                                background: "rgba(0,0,0,0.7)",
                                                borderRadius: "50%",
                                                padding: "5px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                              title="Download image"
                                            >
                                              <HiOutlineDocumentDownload
                                                size={20}
                                                style={{
                                                  color: "white",
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </div> */}
                                            {/* <div
                                              style={{
                                                position: "absolute",
                                                bottom: "0",
                                                left: "0",
                                                right: "0",
                                                background: "rgba(0,0,0,0.7)",
                                                color: "white",
                                                padding: "2px 5px",
                                                fontSize: "0.7rem",
                                                textAlign: "center",
                                              }}
                                            >
                                              Click to download
                                            </div> */}
                                          </div>
                                        )}
                                      </>
                                    )}

                                    {msg.message && (
                                      <p
                                        style={{
                                          margin: "8px 0",
                                          padding: "8px 12px",
                                          borderRadius: "12px",
                                          backgroundColor: isSender
                                            ? "#007bff"
                                            : "#f1f1f1",
                                          color: isSender ? "white" : "black",
                                          display: "inline-block",
                                          maxWidth: "100%",
                                          wordWrap: "break-word",
                                        }}
                                      >
                                        {msg.message}
                                      </p>
                                    )}

                                    <sub
                                      style={{
                                        display: "block",
                                        marginTop: "4px",
                                        color: "#666",
                                        fontSize: "0.75rem",
                                      }}
                                    >
                                      {isSender && (
                                        <FaCheckDouble className="ms-1" />
                                      )}
                                      {formatTimeAgo(msg.createdAt)}
                                    </sub>
                                  </div>

                                  {isSender && (
                                    <div
                                      className="avatar av-s"
                                      style={{ marginLeft: "8px" }}
                                    >
                                      <img
                                        alt="You"
                                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${userDetails?.profileImage}`}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-center mt-4">
                            No messages yet. Start a conversation!
                          </p>
                        )}
                        <div ref={messageRef} />
                      </div>
                    </div>
                    <div className="typing-indicator">
                      <div className="message-card typing">
                        <p>
                          <span className="typing-dots">
                            <span className="dot dot-1" />
                            <span className="dot dot-2" />
                            <span className="dot dot-3" />
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* ?.receiver?.name */}
                    {messages && (
                      <div
                        className="messenger-sendCard"
                        style={{
                          display: "contents",
                          bottom: "0",
                          backgroundColor: "white",
                          zIndex: 10,
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                        }}
                      >
                        <form
                          onSubmit={handleSendMessage}
                          className="paper-plane"
                        >
                          <label className="paper-clip">
                            <FaPaperclip />
                            <input
                              type="file"
                              id="panFile"
                              name="messageFile"
                              className="form-control"
                              accept="image/*,application/pdf"
                              onChange={handleChange}
                            />
                          </label>
                          <div className="emoji-container">
                            <FaSmile
                              onClick={() =>
                                setShowEmojiPicker((prev) => !prev)
                              }
                              style={{ cursor: "pointer", margin: "10px 8px" }}
                            />
                            {showEmojiPicker && (
                              <div
                                style={{
                                  position: "absolute",
                                  zIndex: 10,
                                  bottom: "50px",
                                }}
                              >
                                <EmojiPicker
                                  onEmojiClick={handleEmojiClick}
                                  height={300}
                                  width={440}
                                />
                              </div>
                            )}
                          </div>
                          <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="m-send app-scroll textbars"
                            placeholder="Type a message.."
                            style={{
                              overflow: "hidden",
                              overflowWrap: "break-word",
                              height: "44px",
                            }}
                          />

                          <button type="submit">
                            <FaPaperPlane />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                {isModalOpen && selectedTrainee && (
                  <DeleteMessage
                    messages={selectedTrainee}
                    conversationId={selectedTrainee.conversationId}
                    setMessages={setMessages}
                    onClose={() => setIsModalOpen(false)}
                    activeStep={activeStep}
                    handleClick={() => handleClick(2)}
                  />
                )}

                {isCreateGroupModalOpen && (
                  <CreateGroupModal
                    show={isCreateGroupModalOpen}
                    onClose={() => setIsCreateGroupModalOpen(false)}
                    users={mockUsers}
                    objId={userObjId}
                    onCreateGroup={(groupData) =>
                      console.log("Group Created:", groupData)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassGroupChat;

import React, { useRef, useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import {
  FaUsers,
  FaPaperclip,
  FaPaperPlane,
  FaSmile,
  FaCheckDouble,
  FaStar,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import DeleteMessage from "./DeleteMessage";
import { CiCirclePlus } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import CreateGroupModal from "./CreateGroupModal";
import getAPI from "../../../api/getAPI";
import postAPI from "../../../api/postAPI";
import deleteAPI from "../../../api/deleteAPI";

const StudentClassGroupChat = () => {
  // Mock user data
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [message, setMessage] = useState("");
  const [userObjId, setUserObjId] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const [activeTab, setActiveTab] = useState("users");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const messageRef = useRef(null);
  const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
  const [previewMessageImage, setPreviewMessageImage] = useState(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [mockUsers, setMockUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [conversations, setConversations] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editMessageText, setEditMessageText] = useState("");
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [isDeleteMessageDialogOpen, setIsDeleteMessageDialogOpen] =
    useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Right click context menu state
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    message: null,
  });

  const [messages, setMessages] = useState({
    messages: [],
    receiver: null,
    conversationId: null,
  });

  const [activeStep, setActiveStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);
  const [favoriteChats, setFavoriteChats] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Initialize user data
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const userRole = userDetails?.role;
    const userId = userDetails?.admissionNumber;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);

    const fetchUserDetails = async () => {
      try {
        const res = await getAPI(
          `/get-user-details?schoolId=${id}&role=${userRole}&userId=${userId}`
        );
        console.log("get-user-details one", res);

        if (res?.data?.success) {
          setUserObjId(res.data.user._id);
          setUserDetails(res.data.user);
          console.log("obj id of user", res.data.user._id);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch data when schoolId and academicYear are available
  useEffect(() => {
    if (schoolId && academicYear && userDetails && userObjId) {
      fetchAllUsers();
      fetchConversations();
      fetchFavoriteChats();
    }
  }, [schoolId, academicYear, userDetails, userObjId]);

  // Socket.io connection - ENHANCED VERSION
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_API_URL_FOR_IMAGE, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketConnection);

    console.log("🔌 Socket connecting...");

    // Join the user
    if (userObjId) {
      socketConnection.emit("join", { userId: userObjId });
      console.log("👤 User joined:", userObjId);
    }

    // Listen for connection events
    socketConnection.on("connect", () => {
      console.log("✅ Socket connected successfully");
    });

    socketConnection.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socketConnection.on("connect_error", (error) => {
      console.error("🚨 Socket connection error:", error);
    });

    // Listen for online users
    socketConnection.on("online-users", (activeUsers) => {
      console.log("👥 Active Users:", activeUsers);
    });

    // Listen for new messages - ENHANCED
    socketConnection.on("new-message", (data) => {
      console.log("📨 Received new-message event:", data);

      // Update messages if it belongs to active conversation
      if (data.conversationId === activeConversationId) {
        console.log("🔄 Updating active conversation messages");
        setMessages((prev) => ({
          ...prev,
          messages: [...prev.messages, data.message],
        }));

        // Auto-scroll to bottom
        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        console.log("💡 Message for different conversation, refreshing list");
      }

      // Always refresh conversations to update last message and reorder
      fetchConversations();
    });

    // Additional fallback event listener
    socketConnection.on("message-sent", (data) => {
      console.log("📬 Received message-sent event:", data);
      if (
        data.type === "new-message" &&
        data.conversationId === activeConversationId
      ) {
        setMessages((prev) => ({
          ...prev,
          messages: [...prev.messages, data.message],
        }));
        fetchConversations();
      }
    });

    return () => {
      console.log("🧹 Cleaning up socket connection");
      socketConnection.off("connect");
      socketConnection.off("disconnect");
      socketConnection.off("connect_error");
      socketConnection.off("online-users");
      socketConnection.off("new-message");
      socketConnection.off("message-sent");
      socketConnection.disconnect();
    };
  }, [userObjId, activeConversationId]);

  useEffect(() => {
    // Close DeleteMessage when switching conversations
    if (isModalOpen && selectedTrainee?.conversationId !== activeConversationId) {
      console.log("Conversation changed, closing DeleteMessage");
      setIsModalOpen(false);
      setSelectedTrainee(null);
    }
  }, [activeConversationId, isModalOpen, selectedTrainee]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ visible: false, x: 0, y: 0, message: null });
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-schools-all-user-details/${schoolId}`,
        true
      );
      console.log("res ", res);

      if (res.data.success) {
        console.log("res.data.users", res.data.users);
        setMockUsers(res.data.users || []);
      } else {
        toast.error(res.data.message || "Failed to fetch roll number records");
      }
    } catch (error) {
      console.error("Error fetching roll number records:", error);
      toast.error(
        error.response.data.message || "Error fetching roll number records"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await getAPI(`/conversations/${userObjId}`);
      console.log("get conversation response", response);
      setConversations(response.data);
    } catch (error) {
      console.error("Failed to fetch data.", error);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId, receiver) => {
    try {
      // Clear previous messages immediately when switching conversations
      setMessages({
        messages: [],
        receiver: null,
        conversationId: null,
      });

      setSelectedUser(receiver);

      if (conversationId === "new") {
        setActiveConversationId("new");
        setMessages({
          messages: [],
          receiver,
          conversationId: "new",
        });
        return;
      }

      setActiveConversationId(conversationId);

      const res = await getAPI(`/get-messages/${conversationId}`);
      console.log("get messages ", res);

      if (res.data.success) {
        setMessages({
          messages: res.data.messages || [],
          receiver,
          conversationId,
        });
      } else {
        toast.error(res.data.message || "Failed to load messages");
      }
    } catch (err) {
      toast.error("Error fetching messages");
    }
  };

  // Handle file change
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Time ago function
  const formatTimeAgo = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) {
      return `${diffInSecs} sec ago`;
    } else if (diffInMins < 60) {
      return `${diffInMins} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  // Handle edit
  const handleEdit = (messages) => {
    console.log("Opening DeleteMessage for:", {
      conversationId: messages.conversationId,
      receiver: messages.receiver?.name,
    });
    setSelectedTrainee(messages);
    setIsModalOpen(true);
  };

  const handleEditMessage = (msg) => {
    setEditingMessage(msg._id);
    setEditMessageText(msg.message);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditMessageText("");
  };

  const handleUpdateMessage = async (msgId) => {
    if (!editMessageText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      const response = await postAPI(
        "/update-message",
        {
          messageId: msgId,
          message: editMessageText,
        },
        true
      );

      if (response.data.success) {
        // Update the message in local state
        setMessages((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg._id === msgId ? { ...msg, message: editMessageText } : msg
          ),
        }));
        setEditingMessage(null);
        setEditMessageText("");
        toast.success("Message updated successfully");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  // Right click handler for messages
  const handleMessageRightClick = (e, msg) => {
    e.preventDefault();
    
    const isSender = msg.senderId === userObjId || msg.user?.id === user?.id;
    
    // Only show context menu for sender's messages
    if (isSender) {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        message: msg,
      });
    }
  };

  const handleDeleteMessage = (msg) => {
    setMessageToDelete(msg);
    setIsDeleteMessageDialogOpen(true);
    setContextMenu({ visible: false, x: 0, y: 0, message: null });
  };

  const confirmDeleteMessage = async () => {
    if (!messageToDelete) return;

    try {
      const response = await deleteAPI(`/delete-message/${messageToDelete._id}`);

      if (response.data.success) {
        setMessages((prev) => ({
          ...prev,
          messages: prev.messages.filter(
            (msg) => msg._id !== messageToDelete._id
          ),
        }));
        toast.success("Message deleted successfully");
        
        // Refresh conversations to update last message
        fetchConversations();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setIsDeleteMessageDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const cancelDeleteMessage = () => {
    setIsDeleteMessageDialogOpen(false);
    setMessageToDelete(null);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);

  // Fetch users for all users view
  const fetchUsers = async () => {
    console.log("mockUsers", mockUsers);
    setUsers(mockUsers);
    setCurrentView("allUsers");
  };

  const handleSendMessage = async (e) => {
    console.log("message", messages);

    e.preventDefault();
    if (!message.trim() && !file) return;

    try {
      const formData = new FormData();

      // Use "new" only if there's no active conversation AND we have a selected user
      const conversationIdToSend =
        activeConversationId === "new" ? "new" : activeConversationId || "new";
      formData.append("conversationId", conversationIdToSend);
      formData.append("senderId", userObjId);

      // Always include receiverId when starting new conversation
      if (selectedUser?._id) {
        formData.append("receiverId", selectedUser._id);
      }

      if (message) formData.append("message", message);
      if (file) formData.append("messageFile", file);

      console.log("Sending message with:", {
        conversationId: conversationIdToSend,
        senderId: userObjId,
        receiverId: selectedUser?._id,
      });

      const response = await postAPI(
        "/send-message",
        formData,
        { "Content-Type": "multipart/form-data" },
        true
      );

      console.log("post-response-send", response);

      if (response.data.success) {
        const newMessageData = response.data.data;

        // If this was a new conversation, update the active conversation ID
        if (conversationIdToSend === "new" && response.data.conversationId) {
          setActiveConversationId(response.data.conversationId);
          setMessages((prev) => ({
            ...prev,
            conversationId: response.data.conversationId,
          }));
          fetchMessages(response.data.conversationId, selectedUser);
        }

        // Clear form
        setMessage("");
        setFile(null);
        setShowEmojiPicker(false);

        // Refresh conversations
        fetchConversations();

        // Scroll to bottom
        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong while sending message");
    }
  };

  // Handle file change
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle emoji click
  const handleEmojiClick = (emojiObject) =>
    setMessage((prev) => prev + emojiObject.emoji);

  // Handle window resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 980);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle step navigation
  const handleClick = (step) => {
    setActiveStep((prev) => (prev === step ? step + 1 : step));
  };

  const fetchFavoriteChats = async () => {
    try {
      const response = await getAPI(`/get-favorite-chats/${userObjId}`);
      console.log("get favorite chats", response);

      if (response.data.success) {
        setFavoriteChats(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching favorite chats:", error);
    }
  };
  
  useEffect(() => {
    if (activeConversationId) {
      checkIfFavorited(activeConversationId);
    }
  }, [activeConversationId]);

  const checkIfFavorited = async (conversationId) => {
    if (!conversationId || conversationId === "new") {
      setIsFavorited(false);
      return;
    }

    try {
      const response = await getAPI(
        `/check-favorite-chats?userId=${userObjId}&conversationId=${conversationId}`
      );
      if (response.data.success) {
        setIsFavorited(response.data.isFavorited);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      setIsFavorited(false);
    }
  };

  const toggleFavorite = () => {
    if (!activeConversationId || activeConversationId === "new") {
      toast.warning("Please select a conversation first");
      return;
    }

    // Find the favorite chat by conversationId to get its _id
    const favoriteChat = favoriteChats.find(
      (fav) => fav.conversationId === activeConversationId
    );

    if (isFavorited && favoriteChat) {
      removeFromFavorites(favoriteChat._id);
    } else {
      addToFavorites(activeConversationId);
    }
  };

  const addToFavorites = async (conversationId) => {
    console.log("addinto faviourate", conversationId);
    console.log("addinto faviourate using active conId", activeConversationId);

    if (!conversationId || conversationId === "new") {
      toast.warning("Cannot favorite a new conversation");
      return;
    }

    try {
      const response = await postAPI(
        "/add-favorite-chats",
        {
          userId: userObjId,
          conversationId: conversationId,
        },
        true
      );

      if (response.data.success) {
        setIsFavorited(true);
        fetchFavoriteChats();
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error(
        error.response?.data?.message || "Failed to add to favorites"
      );
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      const response = await deleteAPI(
        `/remove-chat-from-favorite/${favoriteId}`
      );

      if (response.data.success) {
        setIsFavorited(false);
        fetchFavoriteChats(); // Refresh favorites list
        toast.success("Removed from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  // Add this function to your component
  const downloadFile = async (fileUrl) => {
    try {
      // Ensure the URL is complete
      const fullUrl = fileUrl.startsWith("http")
        ? fileUrl
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${fileUrl}`;

      // Fetch the file
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error("File download failed");
      }

      // Convert to blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Extract filename from URL or use generic name
      const filename =
        fileUrl.split("/").pop() ||
        (fileUrl.includes(".pdf") ? "document.pdf" : "image.jpg");

      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="cards m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1"></div>
              </div>
              <div
                className="messenger rounded min-h-750 overflow-hidden"
                style={{
                  height: "100%",
                  overflow: "hidden",
                  background: "White",
                }}
              >
                <div
                  className="messenger-listView"
                  style={{
                    overflowY: "auto",
                    display: isMobile && activeStep !== 1 ? "none" : "block",
                  }}
                >
                  {/* ... (rest of the list view code remains the same) ... */}
                </div>
                <div
                  className="messenger-messagingView"
                  style={{
                    flexGrow: 1,
                    display: isMobile && activeStep !== 2 ? "none" : "block",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                >
                  {/* ... (header code remains the same) ... */}
                  
                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div
                      className="messages app-scroll"
                      style={{
                        height: "62vh",
                        display: "flex",
                        flexDirection: "column-reverse",
                        overflow: "auto",
                      }}
                    >
                      <div>
                        {messages?.messages?.length > 0 ? (
                          messages.messages.map((msg, index) => {
                            const isSender =
                              msg.senderId === userObjId ||
                              msg.user?.id === user?.id;

                            return (
                              <div
                                key={msg._id || index}
                                className={`message-card ${
                                  isSender ? "mc-sender" : ""
                                }`}
                                title={msg.createdAt}
                                onContextMenu={(e) => handleMessageRightClick(e, msg)}
                                style={{
                                  cursor: isSender ? 'context-menu' : 'default'
                                }}
                              >
                                <div
                                  className="chatify-d-flex chatify-align-items-center"
                                  style={{
                                    flexDirection: isSender
                                      ? "row-reverse"
                                      : "row",
                                    justifyContent: isSender
                                      ? "flex-end"
                                      : "flex-start",
                                  }}
                                >
                                  {!isSender && (
                                    <div
                                      className="avatar av-s"
                                      style={{ marginRight: "8px" }}
                                    >
                                      <img
                                        alt="User"
                                        src={
                                          msg.senderDetails?.profileImage
                                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.senderDetails.profileImage}`
                                            : ""
                                        }
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}

                                  <div
                                    style={{
                                      maxWidth: "70%",
                                      marginLeft: isSender ? "5px" : "0",
                                      marginRight: isSender ? "0" : "5px",
                                    }}
                                  >
                                    {msg.messageFile && (
                                      <>
                                        {msg.messageFile.endsWith?.(".pdf") ||
                                        msg.messageFile?.includes?.(
                                          "application/pdf"
                                        ) ? (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              padding: "10px",
                                              backgroundColor: "#f9f9f9",
                                              textAlign: "center",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              marginBottom: "8px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              downloadFile(msg.messageFile)
                                            }
                                          >
                                            <div
                                              style={{
                                                marginBottom: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <strong
                                                style={{
                                                  color: "#333333",
                                                  marginRight: "10px",
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  maxWidth: "200px",
                                                }}
                                              >
                                                {typeof msg.messageFile ===
                                                "string"
                                                  ? msg.messageFile
                                                      .split("/")
                                                      .pop()
                                                  : file?.name || "Document"}
                                              </strong>
                                              <HiOutlineDocumentDownload
                                                size={30}
                                                style={{
                                                  cursor: "pointer",
                                                  color: "blue",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              overflow: "hidden",
                                              marginBottom: "8px",
                                              backgroundColor: "#f9f9f9",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                            onClick={() =>
                                              downloadFile(msg.messageFile)
                                            }
                                          >
                                            <img
                                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.messageFile}`}
                                              alt="Attached file"
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                                maxHeight: "300px",
                                                objectFit: "contain",
                                              }}
                                            />
                                          </div>
                                        )}
                                      </>
                                    )}

                                    {msg.message && (
                                      <p
                                        style={{
                                          margin: "8px 0",
                                          padding: "8px 12px",
                                          borderRadius: "12px",
                                          backgroundColor: isSender
                                            ? "#007bff"
                                            : "#f1f1f1",
                                          color: isSender ? "white" : "black",
                                          display: "inline-block",
                                          maxWidth: "100%",
                                          wordWrap: "break-word",
                                        }}
                                      >
                                        {msg.message}
                                      </p>
                                    )}

                                    <sub
                                      style={{
                                        display: "block",
                                        marginTop: "4px",
                                        color: "#666",
                                        fontSize: "0.75rem",
                                      }}
                                    >
                                      {isSender && (
                                        <FaCheckDouble className="ms-1" />
                                      )}
                                      {formatTimeAgo(msg.createdAt)}
                                    </sub>
                                  </div>

                                  {isSender && (
                                    <div
                                      className="avatar av-s"
                                      style={{ marginLeft: "8px" }}
                                    >
                                      <img
                                        alt="You"
                                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${userDetails?.profileImage}`}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-center mt-4">
                            No messages yet. Start a conversation!
                          </p>
                        )}
                        <div ref={messageRef} />
                      </div>
                    </div>
                    
                    {/* Context Menu */}
                    {contextMenu.visible && (
                      <div
                        style={{
                          position: 'fixed',
                          top: contextMenu.y,
                          left: contextMenu.x,
                          backgroundColor: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                          zIndex: 1000,
                          minWidth: '120px',
                        }}
                      >
                        <button
                          onClick={() => handleDeleteMessage(contextMenu.message)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            textAlign: 'left',
                            color: '#e74c3c',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          Delete Message
                        </button>
                      </div>
                    )}

                    <div className="typing-indicator">
                      <div className="message-card typing">
                        <p>
                          <span className="typing-dots">
                            <span className="dot dot-1" />
                            <span className="dot dot-2" />
                            <span className="dot dot-3" />
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    {/* ... (send message form remains the same) ... */}
                  </div>
                </div>

                {isModalOpen && selectedTrainee && (
                  <DeleteMessage
                    messages={selectedTrainee}
                    conversationId={selectedTrainee.conversationId}
                    setMessages={setMessages}
                    onClose={() => {
                      console.log("Closing DeleteMessage");
                      setIsModalOpen(false);
                      setSelectedTrainee(null);
                    }}
                    activeStep={activeStep}
                    handleClick={handleClick}
                  />
                )}

                {isCreateGroupModalOpen && (
                  <CreateGroupModal
                    show={isCreateGroupModalOpen}
                    onClose={() => setIsCreateGroupModalOpen(false)}
                    users={mockUsers}
                    objId={userObjId}
                    onCreateGroup={(groupData) =>
                      console.log("Group Created:", groupData)
                    }
                  />
                )}

                {/* Delete Message Confirmation Dialog */}
                {isDeleteMessageDialogOpen && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1001,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        minWidth: '300px',
                      }}
                    >
                      <h5>Delete Message</h5>
                      <p>Are you sure you want to delete this message? This action cannot be undone.</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button
                          onClick={cancelDeleteMessage}
                          style={{
                            padding: '8px 16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmDeleteMessage}
                          style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassGroupChat;