import React, { useRef, useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import {
  FaUsers,
  FaPaperclip,
  FaPaperPlane,
  FaSmile,
  FaCheckDouble,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
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
  // ... existing states ...
  const [favoriteChats, setFavoriteChats] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch favorite chats
  const fetchFavoriteChats = async () => {
    try {
      const response = await getAPI(
        `/favorite-chats/user-favorites/${userObjId}`
      );
      if (response.data.success) {
        setFavoriteChats(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching favorite chats:", error);
    }
  };

  // Check if current conversation is favorited
  const checkIfFavorited = async (conversationId) => {
    if (!conversationId || conversationId === "new") {
      setIsFavorited(false);
      return;
    }

    try {
      const response = await getAPI(
        `/favorite-chats/check-favorite?userId=${userObjId}&conversationId=${conversationId}`
      );
      if (response.data.success) {
        setIsFavorited(response.data.isFavorited);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      setIsFavorited(false);
    }
  };

  // Add to favorites
  const addToFavorites = async (conversationId) => {
    if (!conversationId || conversationId === "new") {
      toast.warning("Cannot favorite a new conversation");
      return;
    }

    try {
      const response = await postAPI("/favorite-chats/add-favorite", {
        userId: userObjId,
        conversationId: conversationId,
      });

      if (response.data.success) {
        setIsFavorited(true);
        fetchFavoriteChats(); // Refresh favorites list
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error(
        error.response?.data?.message || "Failed to add to favorites"
      );
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (conversationId) => {
    try {
      const response = await deleteAPI("/favorite-chats/remove-favorite", {
        userId: userObjId,
        conversationId: conversationId,
      });

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

  // Toggle favorite status
  const toggleFavorite = () => {
    if (!activeConversationId || activeConversationId === "new") {
      toast.warning("Please select a conversation first");
      return;
    }

    if (isFavorited) {
      removeFromFavorites(activeConversationId);
    } else {
      addToFavorites(activeConversationId);
    }
  };

  // Update useEffect to check favorite status when conversation changes
  useEffect(() => {
    if (activeConversationId) {
      checkIfFavorited(activeConversationId);
    }
  }, [activeConversationId]);

  // Fetch favorites on component mount
  useEffect(() => {
    if (userObjId) {
      fetchFavoriteChats();
    }
  }, [userObjId]);

  // Update the favorites section in the render
  const renderFavoritesSection = () => {
    if (favoriteChats.length === 0) {
      return (
        <div className="text-center text-muted py-3">No favorite chats yet</div>
      );
    }

    return favoriteChats.map((favorite) => {
      const conversation = favorite.conversationId;
      if (!conversation) return null;

      let displayUser = null;

      if (conversation.isGroup) {
        displayUser = {
          _id: conversation._id,
          name: conversation.groupName,
          groupImage: conversation.groupImage,
          isGroup: true,
        };
      } else {
        if (conversation.otherUser) {
          displayUser = {
            _id: conversation.otherUser._id,
            name: conversation.otherUser.name,
            profileImage: conversation.otherUser.profileImage,
            isGroup: false,
          };
        }
      }

      if (!displayUser) return null;

      return (
        <table
          key={favorite._id}
          className="messenger-list-item"
          onClick={() => fetchMessages(conversation._id, displayUser)}
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
                  data-type={displayUser?.isGroup ? "group" : "user"}
                  style={{ textAlign: "start" }}
                >
                  {displayUser?.name}
                  <FaStar
                    size={12}
                    color="#ffc107"
                    style={{ marginLeft: "5px" }}
                  />
                </p>
                <span
                  style={{
                    justifyContent: "left",
                    display: "flex",
                  }}
                >
                  <span className="lastMessageIndicator">
                    {conversation.lastMessage?.message || "No messages yet"}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  };
import FavoriteChat from "../../../models/OperationalModule/FavoriteChat.js";
import Conversation from "../../../models/OperationalModule/Conversation.js";
import Message from "../../../models/OperationalModule/Message.js";
import AdmissionForm from "../../../models/FeesModule/AdmissionForm.js";
import EmployeeRegistration from "../../../models/PayrollModule/Employer/EmployeeRegistration.js";
import School from "../../../models/School.js";
import User from "../../../models/User.js";

const getFavoriteChats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get favorite chats with populated conversation
    const favorites = await FavoriteChat.find({ userId })
      .populate("conversationId")
      .sort({ createdAt: -1 })
      .lean();

    // Extract all conversation IDs from favorites
    const conversationIds = favorites.map(fav => fav.conversationId._id);

    // Get detailed conversations data
    let conversations = await Conversation.find({
      _id: { $in: conversationIds }
    })
      .populate("members.userId", "firstName lastName name profileImage")
      .lean();

    // Get all other user IDs from one-to-one conversations
    const otherUserIds = [];
    conversations.forEach((conv) => {
      if (!conv.isGroup) {
        const otherMember = conv.members.find(
          (member) => member.userId._id.toString() !== userId
        );
        if (otherMember) {
          otherUserIds.push(otherMember.userId._id);
        }
      }
    });

    // Fetch all user details in bulk
    const [students, employees, users] = await Promise.all([
      AdmissionForm.find({ _id: { $in: otherUserIds } })
        .select(
          "_id firstName middleName lastName studentPhoto className sectionName"
        )
        .lean(),
      EmployeeRegistration.find({ _id: { $in: otherUserIds } })
        .select("_id firstName middleName lastName profileImage designation")
        .lean(),
      User.find({ _id: { $in: otherUserIds } })
        .select("_id userId role schoolId")
        .lean(),
    ]);

    // Map for fast lookup
    const userMap = new Map();

    // Students
    students.forEach((student) => {
      userMap.set(student._id.toString(), {
        _id: student._id,
        name: `${student.firstName || ""} ${student.middleName || ""} ${
          student.lastName || ""
        }`.trim(),
        profileImage: student.studentPhoto,
        role: "Student",
        className: student.className,
        sectionName: student.sectionName,
      });
    });

    // Employees
    employees.forEach((employee) => {
      userMap.set(employee._id.toString(), {
        _id: employee._id,
        name: `${employee.firstName || ""} ${employee.middleName || ""} ${
          employee.lastName || ""
        }`.trim(),
        profileImage: employee.profileImage,
        role: employee.designation || "Employee",
        designation: employee.designation,
      });
    });

    // Users (School/Principal/Auditor/User)
    for (let user of users) {
      const school = await School.findOne({ schoolId: user.schoolId }).select(
        "schoolName profileImage"
      );

      userMap.set(user._id.toString(), {
        _id: user._id,
        userId: user.userId,
        name: school ? school.schoolName : "Unknown School User",
        profileImage: school ? school.profileImage : "",
        role: user.role,
        schoolId: user.schoolId,
      });
    }

    // Get last messages for all conversations and enrich with user data
    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const lastMsg = await Message.findOne({ conversationId: conv._id })
          .sort({ createdAt: -1 })
          .lean();

        let displayUser = null;

        if (conv.isGroup) {
          // For group chats
          displayUser = {
            _id: conv._id,
            name: conv.groupName,
            profileImage: conv.groupImage,
            isGroup: true,
            groupName: conv.groupName,
            groupImage: conv.groupImage,
          };
        } else {
          // For one-to-one chats
          const otherMember = conv.members.find(
            (member) => member.userId._id.toString() !== userId
          );

          if (otherMember) {
            const otherUserId = otherMember.userId._id.toString();
            const userDetails = userMap.get(otherUserId);
            
            if (userDetails) {
              displayUser = {
                _id: userDetails._id,
                name: userDetails.name,
                profileImage: userDetails.profileImage,
                isGroup: false,
                role: userDetails.role,
                className: userDetails.className,
                sectionName: userDetails.sectionName,
                designation: userDetails.designation,
                schoolId: userDetails.schoolId,
              };
            } else {
              displayUser = {
                _id: otherMember.userId._id,
                name: "Unknown User",
                profileImage: "",
                isGroup: false,
                role: "Unknown",
              };
            }
          }
        }

        // Find the favorite record for this conversation
        const favoriteRecord = favorites.find(
          fav => fav.conversationId._id.toString() === conv._id.toString()
        );

        return {
          _id: conv._id,
          conversationId: conv._id,
          favoriteId: favoriteRecord?._id,
          isGroup: conv.isGroup,
          groupName: conv.groupName,
          groupImage: conv.groupImage,
          members: conv.members,
          lastMessage: lastMsg || null,
          otherUser: displayUser,
          createdAt: favoriteRecord?.createdAt || conv.createdAt,
          updatedAt: favoriteRecord?.updatedAt || conv.updatedAt,
        };
      })
    );

    // Sort by favorite creation date (most recent first)
    enrichedConversations.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({
      success: true,
      data: enrichedConversations,
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getFavoriteChats;
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
                        {/* Favorites Section */}
                        <div className="">
                          <p className="messenger-title text-dark">Favorites</p>
                          <div
                            className="listOfContacts"
                            style={{
                              width: "100%",
                              position: "relative",
                            }}
                          >
                            {renderFavoritesSection()}
                          </div>
                        </div>

                        {/* Recent Chats Section */}
                        <p className="messenger-title text-dark">Recent</p>
                        <div
                          className="listOfContacts"
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          {conversations
                            .filter(
                              (conv) =>
                                !favoriteChats.some(
                                  (fav) => fav.conversationId._id === conv._id
                                )
                            )
                            .map((conversation) => {
                              // ... existing conversation rendering code ...
                            })}
                        </div>
                      </div>
                    )}

                    {/* ... rest of the component remains the same ... */}
                  </div>
                </div>

                {/* Messaging View */}
                <div
                  className="messenger-messagingView"
                  style={{
                    flexGrow: 1,
                    display: isMobile && activeStep !== 2 ? "none" : "block",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                >
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
                          {/* Favorite Star Button */}
                          <a
                            href="#"
                            className={`show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2 ${
                              isFavorited ? "text-warning" : ""
                            }`}
                            onClick={toggleFavorite}
                            title={
                              isFavorited
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
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

                  {/* ... rest of the messaging view remains the same ... */}
                </div>

                {/* ... modals and other components ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassGroupChat;
