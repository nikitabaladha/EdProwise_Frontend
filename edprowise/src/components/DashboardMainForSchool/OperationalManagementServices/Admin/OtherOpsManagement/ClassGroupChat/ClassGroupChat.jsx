// import React, { useRef, useState, useEffect } from "react";
// import { BiTimeFive } from "react-icons/bi";
// import {
//   FaUsers,
//   FaPaperclip,
//   FaPaperPlane,
//   FaSmile,
//   FaCheckDouble,
// } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { io } from "socket.io-client";
// import { toast } from "react-toastify";
// import { FaCircleInfo } from "react-icons/fa6";
// import { TiTimes } from "react-icons/ti";
// import { FaArrowLeft } from "react-icons/fa";
// import { HiOutlineDocumentDownload } from "react-icons/hi";
// import EmojiPicker from "emoji-picker-react";
// import DeleteMessage from "./DeleteMessage";
// import { CiCirclePlus } from "react-icons/ci";
// import { FiUserPlus } from "react-icons/fi";
// import CreateGroupModal from "./CreateGroupModal";
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";
// // import { io } from "socket.io-client";

// const ClassGroupChat = () => {
//   // Mock user data
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("userDetails"))
//   );
//   const [message, setMessage] = useState("");
//   const [userObjId, setUserObjId] = useState("");
//   const [file, setFile] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [currentView, setCurrentView] = useState("default");
//   const [activeTab, setActiveTab] = useState("users");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTrainee, setSelectedTrainee] = useState(null);
//   const messageRef = useRef(null);
//   const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
//   const [previewMessageImage, setPreviewMessageImage] = useState(null);
//   const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
//   const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
//   const [mockUsers, setMockUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [schoolId, setSchoolId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeConversationId, setActiveConversationId] = useState(null);
//   //  const [users, setUsers] = useState([]);
//   const [academicYear, setAcademicYear] = useState(
//     localStorage.getItem("selectedAcademicYear") || ""
//   );
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     const objId = userDetails?.id;
//     console.log("SchoolObj id ", objId);

//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     setUserObjId(objId);
//   }, []);

//   useEffect(() => {
//     if (schoolId && academicYear) {
//       fetchAllUsers();
//       fetchConversations();
//     }
//   }, [schoolId, academicYear]);

//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAPI(
//         `/get-schools-all-user-details/${schoolId}`,
//         true
//       );
//       console.log("res ", res);

//       if (res.data.success) {
//         console.log("res.data.users", res.data.users);

//         setMockUsers(res.data.users || []);
//       } else {
//         toast.error(res.data.message || "Failed to fetch roll number records");
//       }
//     } catch (error) {
//       console.error("Error fetching roll number records:", error);
//       toast.error(
//         error.response.data.message || "Error fetching roll number records"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchConversations = async () => {
//     try {
//       const response = await getAPI(`/conversations/${userObjId}`);
//       console.log("get converstion responce", response);

//       setConversations(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data.", error);
//     }
//   };

//   // Fix socket connection - only one useEffect for socket
//   useEffect(() => {
//     const socketConnection = io(process.env.REACT_APP_API_URL_FOR_IMAGE, {
//       withCredentials: true,
//       transports: ["websocket"],
//     });

//     setSocket(socketConnection);

//     // Join the user
//     socketConnection.emit("join", { userId: userObjId });

//     // Listen for online users
//     socketConnection.on("online-users", (activeUsers) => {
//       console.log("Active Users:", activeUsers);
//     });

//     // Generic message handler for all conversations
//     socketConnection.on("new-message", (data) => {
//       console.log("Received new message:", data);

//       // If this message belongs to the active conversation, update UI
//       if (data.conversationId === activeConversationId) {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//       }

//       // Refresh conversations to update last message
//       fetchConversations();
//     });

//     // Handle conversation-specific messages
//     socketConnection.on("conversation-message", (data) => {
//       if (
//         data.conversationId === activeConversationId &&
//         data.type === "new-message"
//       ) {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//       }
//     });

//     return () => {
//       socketConnection.off("online-users");
//       socketConnection.off("new-message");
//       socketConnection.off("conversation-message");
//       socketConnection.disconnect();
//     };
//   }, [userObjId]); // Remove activeConversationId from dependencies to avoid reconnects

//   useEffect(() => {
//     if (!socket || !activeConversationId) return;

//     const handleNewMessage = (data) => {
//       if (data.type === "new-message") {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//       }
//     };

//     socket.on(`conversation-${activeConversationId}`, handleNewMessage);

//     return () => {
//       socket.off(`conversation-${activeConversationId}`, handleNewMessage);
//     };
//   }, [socket, activeConversationId]);

//   const [messages, setMessages] = useState({
//     messages: [],
//     receiver: null,
//     conversationId: null,
//   });

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // timeAgo function
//   const formatTimeAgo = (createdAt) => {
//     const date = new Date(createdAt);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInSecs = Math.floor(diffInMs / 1000);
//     const diffInMins = Math.floor(diffInSecs / 60);
//     const diffInHours = Math.floor(diffInMins / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSecs < 60) {
//       return `${diffInSecs} sec ago`;
//     } else if (diffInMins < 60) {
//       return `${diffInMins} min ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hrs ago`;
//     } else {
//       return `${diffInDays} days ago`;
//     }
//   };

//   const handleEdit = (messages) => {
//     setSelectedTrainee(messages);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     messageRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.messages]);

//   const fetchUsers = async () => {
//     console.log("mockUsers", mockUsers);

//     setUsers(mockUsers);
//     setCurrentView("allUsers");
//   };

//   const fetchMessages = async (conversationId, receiver) => {
//     try {
//       setSelectedUser(receiver);
//       setActiveConversationId(conversationId);
//       const res = await getAPI(`/get-messages/${conversationId}`);
//       console.log("get messages ", res);

//       if (res.data.success) {
//         setMessages({
//           messages: res.data.messages || [],
//           receiver,
//           conversationId,
//         });
//       } else {
//         toast.error(res.data.message || "Failed to load messages");
//       }
//     } catch (err) {
//       toast.error("Error fetching messages");
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() && !file) return;

//     try {
//       const formData = new FormData();
//       formData.append("conversationId", activeConversationId || "new");
//       formData.append("senderId", userObjId);
//       console.log("selectend user", selectedUser);

//       if (selectedUser?._id) formData.append("receiverId", selectedUser._id);
//       if (message) formData.append("message", message);
//       if (file) formData.append("messageFile", file);

//       const response = await postAPI(
//         "/send-message",
//         formData,
//         { "Content-Type": "multipart/form-data" },
//         true
//       );
//       console.log("post-response-send", response);

//       if (response.data.success) {
//         if (socket && activeConversationId) {
//           socket.emit("send-message", {
//             conversationId: activeConversationId,
//             senderId: userObjId,
//             receiverId: selectedUser?._id,
//             message: message,
//             messageFile: file ? response.data.data.messageFile : null,
//           });
//         }

//         // Update local state immediately for sender
//         const newMessage = {
//           _id: Date.now().toString(), // temporary ID
//           message,
//           createdAt: new Date().toISOString(),
//           senderId: userObjId,
//           messageFile: file ? URL.createObjectURL(file) : null,
//           user: { id: userObjId }, // Add user object for display
//         };

//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, newMessage],
//         }));

//         setMessage("");
//         setFile(null);
//         setShowEmojiPicker(false);

//         // messageRef.current?.scrollIntoView({ behavior: "smooth" });
//         messageRef.current?.scrollIntoView({ behavior: "smooth" });
//       } else {
//         toast.error(response.data.message || "Failed to send message");
//       }
//     } catch (error) {
//       toast.error("Something went wrong while sending message");
//     }
//   };

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleEmojiClick = (emojiObject) =>
//     setMessage((prev) => prev + emojiObject.emoji);

//   useEffect(() => {
//     messageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();

//     if (!message.trim() && !file) return;

//     const newMessage = {
//       message,
//       createdAt: new Date().toISOString(),
//       user: { id: user.id },
//       messageFile: file ? URL.createObjectURL(file) : null,
//     };

//     setMessages((prev) => ({
//       ...prev,
//       messages: [...prev.messages, newMessage],
//     }));

//     setMessage("");
//     setFile(null);
//     setPreviewMessageImage(null);
//     setPreviewMessagePDF(null);
//   };

//   const [activeStep, setActiveStep] = useState(1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 980);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleClick = (step) => {
//     setActiveStep((prev) => (prev === step ? step + 1 : step));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="cards m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1"></div>
//               </div>
//               <div
//                 className="messenger rounded min-h-750 overflow-hidden"
//                 style={{
//                   height: "100%",
//                   overflow: "hidden",
//                   background: "White",
//                 }}
//               >
//                 <div
//                   className="messenger-listView"
//                   style={{
//                     // height: "75vh",
//                     overflowY: "auto",
//                     display: isMobile && activeStep !== 1 ? "none" : "block",
//                   }}
//                 >
//                   <div className="m-header">
//                     <nav>
//                       <nav className="m-header-right">
//                         <a href="#" className="listView-x">
//                           <TiTimes />
//                         </a>
//                       </nav>
//                     </nav>
//                     <div className="d-flex align-item-center">
//                       <input
//                         type="text"
//                         className="messenger-search"
//                         placeholder="Search"
//                       />
//                       <div
//                         className="align-content-center"
//                         style={{
//                           marginRight: "10px",
//                           boxShadow:
//                             "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => setIsCreateGroupModalOpen(true)}
//                       >
//                         <CiCirclePlus className="fs-20" />
//                       </div>
//                     </div>
//                     <div className="messenger-listView-tabs">
//                       <a
//                         href="#"
//                         className={activeTab === "users" ? "active-tab" : ""}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setActiveTab("users");
//                           setCurrentView("default");
//                         }}
//                       >
//                         <BiTimeFive />
//                       </a>

//                       <a
//                         href="#"
//                         className={activeTab === "allUsers" ? "active-tab" : ""}
//                         data-view="allUsers"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           fetchUsers();
//                           setActiveTab("allUsers");
//                           setCurrentView("allUsers");
//                         }}
//                       >
//                         <FaUsers />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="m-body" style={{ flexGrow: 1 }}>
//                     {currentView === "default" && (
//                       <div
//                         className="show scroll messenger-tab app-scroll"
//                         data-view="users"
//                         style={{ display: "block" }}
//                       >
//                         <div className="">
//                           <p className="messenger-title text-dark">Favorites</p>
//                           <div
//                             className="listOfContacts"
//                             style={{
//                               width: "100%",
//                               position: "relative",
//                             }}
//                           >
//                             <table className="messenger-list-item">
//                               <tbody>
//                                 <tr data-action={0}>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                         <p className="messenger-title text-dark">Recent</p>
//                         <div
//                           className="listOfContacts"
//                           style={{
//                             width: "100%",
//                             position: "relative",
//                           }}
//                         >
//                           {/* {conversations.map(
//                             ({
//                               conversationId,
//                               user: conversationUser,
//                               lastMessage,
//                             }) => (
//                               <table
//                                 key={conversationId}
//                                 className="messenger-list-item"
//                                 data-contact={conversationUser.receiverId}
//                                 onClick={() =>
//                                   fetchMessages(
//                                     conversationId,
//                                     conversationUser
//                                   )
//                                 }
//                               >
//                                 <tbody onClick={() => handleClick(2)}>
//                                   <tr data-action={0}>
//                                     <td style={{ position: "relative" }}>
//                                       <div
//                                         data-id={conversationUser.receiverId}
//                                         data-action={0}
//                                         className="avatar av-m"
//                                         style={{ borderRadius: "50%" }}
//                                       >
//                                         <img
//                                           alt="Teacher"
//                                           src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${conversationUser?.groupImage}`}
//                                         />
//                                       </div>
//                                     </td>
//                                     <td width="100%">
//                                       <p
//                                         data-id={conversationUser.receiverId}
//                                         data-type="user"
//                                         style={{ textAlign: "start" }}
//                                       >
//                                         {conversationUser?.groupName}
//                                                                                 {conversationUser?._id}
//                                         <span>Hello</span>
//                                       </p>
//                                       <span
//                                         style={{
//                                           justifyContent: "left",
//                                           display: "flex",
//                                         }}
//                                       >
//                                         <span className="lastMessageIndicator">
//                                          </span>
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             )
//                           )} */}

//                           {conversations.map((conversation) => {
//                             const {
//                               _id: conversationId,
//                               members,
//                               isGroup,
//                               groupName,
//                               groupImage,
//                               lastMessage,
//                             } = conversation;

//                             // For group chats, use group info
//                             // For individual chats, find the other user in members
//                             let displayUser = null;

//                             if (isGroup) {
//                               displayUser = {
//                                 _id: conversationId,
//                                 name: groupName,
//                                 groupImage: groupImage,
//                                 isGroup: true,
//                               };
//                             } else {
//                               // Find the other user (not the current user)
//                               const otherMember = members.find(
//                                 (member) =>
//                                   member.userId.toString() !== userObjId
//                               );
//                               if (otherMember) {
//                                 displayUser = {
//                                   _id: otherMember.userId,
//                                   name:
//                                     otherMember.name ||
//                                     `${otherMember.firstName || ""} ${
//                                       otherMember.lastName || ""
//                                     }`.trim(),
//                                   profileImage: otherMember.profileImage,
//                                   isGroup: false,
//                                 };
//                               }
//                             }

//                             if (!displayUser) return null;

//                             return (
//                               <table
//                                 key={conversationId}
//                                 className="messenger-list-item"
//                                 onClick={() =>
//                                   fetchMessages(conversationId, displayUser)
//                                 }
//                               >
//                                 <tbody onClick={() => handleClick(2)}>
//                                   <tr data-action={0}>
//                                     <td style={{ position: "relative" }}>
//                                       <div
//                                         data-action={0}
//                                         className="avatar av-m"
//                                         style={{ borderRadius: "50%" }}
//                                       >
//                                         <img
//                                           alt="Chat"
//                                           src={
//                                             displayUser.isGroup
//                                               ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.groupImage}`
//                                               : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.groupImage}`
//                                           }
//                                         />
//                                       </div>
//                                     </td>
//                                     <td width="100%">
//                                       <p
//                                         data-type={
//                                           displayUser?.isGroup
//                                             ? "group"
//                                             : "user"
//                                         }
//                                         style={{ textAlign: "start" }}
//                                       >
//                                         {displayUser?.name}
//                                       </p>
//                                       <span
//                                         style={{
//                                           justifyContent: "left",
//                                           display: "flex",
//                                         }}
//                                       >
//                                         <span className="lastMessageIndicator">
//                                           {lastMessage?.message ||
//                                             "No messages yet"}
//                                         </span>
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
//                     {currentView === "allUsers" && (
//                       <div
//                         className="all_members messenger-tab app-scroll"
//                         data-view="allUsers"
//                         style={{ display: "block" }}
//                       >
//                         {mockUsers.map((item) => (
//                           <table
//                             key={item._id}
//                             className="messenger-list-item"
//                             onClick={() => fetchMessages("new", item)}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td style={{ position: "relative" }}>
//                                   <div
//                                     className="avatar av-m"
//                                     style={{ borderRadius: "50%" }}
//                                   >
//                                     <img
//                                       src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.profileImage}`}
//                                       alt="Teacher"
//                                     />
//                                   </div>
//                                 </td>
//                                 <td>
//                                   {/* <p>{`${item.firstName} ${item.lastName}`}</p> */}
//                                   <p className="fw-bold">{item.name}</p>
//                                   <small className="text-muted">
//                                     {item.role === "Student"
//                                       ? `${item.className || ""} ${
//                                           item.sectionName || ""
//                                         }`
//                                       : item.designation || "Employee"}
//                                   </small>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="messenger-messagingView"
//                   style={{
//                     flexGrow: 1,
//                     display: isMobile && activeStep !== 2 ? "none" : "block",
//                     boxShadow:
//                       "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
//                   }}
//                 >
//                   {messages?.receiver?.name && (
//                     <div className="m-header m-header-messaging">
//                       <nav className="d-flex align-items-center justify-content-between">
//                         <div style={{ display: "flex" }}>
//                           <a className="show-listView">
//                             <FaArrowLeft onClick={() => handleClick(1)} />
//                           </a>
//                           <div
//                             className="avatar av-s header-avatar"
//                             style={{
//                               margin: "8px 10px",
//                               backgroundImage: ``,
//                             }}
//                           >
//                             <img
//                               alt="Teacher"
//                               src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//                             />
//                           </div>
//                           <div className="d-grid ">
//                             <a href="#" className="user-name">
//                               {messages?.receiver?.name}
//                             </a>
//                             <span className="fs-6">SchholABC, Teacher</span>
//                           </div>
//                         </div>
//                         <nav className="m-header-right">
//                           <a
//                             href="#"
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                             // onClick={() => handleEdit(messages)}
//                           >
//                             <FaRegStar />
//                           </a>
//                           <a
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                             onClick={() => handleEdit(messages)}
//                           >
//                             <FaCircleInfo onClick={() => handleClick(3)} />
//                           </a>
//                         </nav>
//                       </nav>
//                     </div>
//                   )}

//                   <div className="m-body app-scroll" style={{ opacity: 1 }}>
//                     <div
//                       className="messages app-scroll"
//                       style={{
//                         height: "62vh",
//                         display: "flex",
//                         flexDirection: "column-reverse",
//                         overflow: "auto",
//                       }}
//                     >
//                       {/* <div>
//                         {messages?.messages?.length > 0 ? (
//                           messages.messages.map(
//                             (
//                               {
//                                 message,
//                                 createdAt,
//                                 messageFile,
//                                 user: { id } = {},
//                               },
//                               index
//                             ) => {
//                               if (id === user?.id) {
//                                 return (
//                                   <div
//                                     key={index}
//                                     className="message-card mc-sender"
//                                     title={createdAt}
//                                   >
//                                     <div
//                                       className="chatify-d-flex chatify-align-items-center"
//                                       style={{
//                                         flexDirection: "row-reverse",
//                                         justifyContent: "flex-end",
//                                       }}
//                                     >
//                                       <p style={{ marginLeft: "5px" }}>
//                                         {messageFile && (
//                                           <>
//                                             {messageFile.endsWith(".pdf") ? (
//                                               <div
//                                                 style={{
//                                                   border: "1px solid #ccc",
//                                                   borderRadius: "10px",
//                                                   padding: "10px",
//                                                   backgroundColor: "#f9f9f9",
//                                                   textAlign: "center",
//                                                   boxShadow:
//                                                     "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                                 }}
//                                               >
//                                                 <div
//                                                   style={{
//                                                     marginBottom: "10px",
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                   }}
//                                                 >
//                                                   <strong
//                                                     style={{
//                                                       color: "#333333",
//                                                       marginRight: "10px",
//                                                       whiteSpace: "nowrap",
//                                                       overflow: "hidden",
//                                                       textOverflow: "ellipsis",
//                                                     }}
//                                                   >
//                                                     {messageFile
//                                                       .split("/")
//                                                       .pop()}
//                                                   </strong>
//                                                   <HiOutlineDocumentDownload
//                                                     size={30}
//                                                     style={{
//                                                       cursor: "pointer",
//                                                       color: "blue",
//                                                     }}
//                                                   />
//                                                 </div>
//                                               </div>
//                                             ) : (
//                                               <div
//                                                 style={{
//                                                   border: "1px solid #ccc",
//                                                   borderRadius: "10px",
//                                                   overflow: "hidden",
//                                                   marginTop: "10px",
//                                                   backgroundColor: "#f9f9f9",
//                                                   boxShadow:
//                                                     "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                                 }}
//                                               >
//                                                 <img
//                                                   src={messageFile}
//                                                   alt="Attached file"
//                                                   style={{
//                                                     width: "100%",
//                                                     height: "auto",
//                                                     borderBottom:
//                                                       "1px solid #ccc",
//                                                   }}
//                                                 />
//                                                 <div
//                                                   style={{
//                                                     padding: "10px",
//                                                     textAlign: "center",
//                                                   }}
//                                                 >
//                                                   <div
//                                                     style={{
//                                                       display: "flex",
//                                                       alignItems: "center",
//                                                       justifyContent: "center",
//                                                     }}
//                                                   ></div>
//                                                 </div>
//                                               </div>
//                                             )}
//                                           </>
//                                         )}
//                                         {message}

//                                         <sub
//                                           title={createdAt}
//                                           className="message-time"
//                                           // style={{ float: "inline-end", bottom:"-21px" }}
//                                         >
//                                           {`${formatTimeAgo(createdAt)}`}
//                                           <FaCheckDouble className="ms-1" />{" "}
//                                         </sub>
//                                       </p>
//                                     </div>
//                                   </div>
//                                 );
//                               } else {
//                                 return (
//                                   <div key={index} className="message-card">
//                                     <p>
//                                       {messageFile && (
//                                         <>
//                                           {messageFile.endsWith(".pdf") ? (
//                                             <div
//                                               style={{
//                                                 border: "1px solid #ccc",
//                                                 borderRadius: "10px",
//                                                 padding: "10px",
//                                                 backgroundColor: "#f9f9f9",
//                                                 textAlign: "center",
//                                                 boxShadow:
//                                                   "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                               }}
//                                             >
//                                               <div
//                                                 style={{
//                                                   marginBottom: "10px",
//                                                   display: "flex",
//                                                   alignItems: "center",
//                                                   justifyContent: "center",
//                                                 }}
//                                               >
//                                                 <strong
//                                                   style={{
//                                                     color: "#333333",
//                                                     marginRight: "10px",
//                                                     whiteSpace: "nowrap",
//                                                     overflow: "hidden",
//                                                     textOverflow: "ellipsis",
//                                                   }}
//                                                 >
//                                                   {messageFile.split("/").pop()}
//                                                 </strong>
//                                                 <HiOutlineDocumentDownload
//                                                   size={30}
//                                                   style={{
//                                                     cursor: "pointer",
//                                                     color: "blue",
//                                                   }}
//                                                 />
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             <div
//                                               style={{
//                                                 border: "1px solid #ccc",
//                                                 borderRadius: "10px",
//                                                 overflow: "hidden",
//                                                 marginTop: "10px",
//                                                 backgroundColor: "#f9f9f9",
//                                                 boxShadow:
//                                                   "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                               }}
//                                             >
//                                               <img
//                                                 src={messageFile}
//                                                 alt="Attached file"
//                                                 style={{
//                                                   width: "100%",
//                                                   height: "auto",
//                                                   borderBottom:
//                                                     "1px solid #ccc",
//                                                 }}
//                                               />
//                                               <div
//                                                 style={{
//                                                   padding: "10px",
//                                                   textAlign: "center",
//                                                 }}
//                                               >
//                                                 <div
//                                                   style={{
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                   }}
//                                                 ></div>
//                                               </div>
//                                             </div>
//                                           )}
//                                         </>
//                                       )}
//                                       {message}
//                                       <sub title={createdAt}>
//                                         {`${formatTimeAgo(createdAt)}`}
//                                       </sub>
//                                     </p>
//                                   </div>
//                                 );
//                               }
//                             }
//                           )
//                         ) : (
//                           <p className="text-center mt-4">
//                             No messages yet. Start a conversation!
//                           </p>
//                         )}
//                         <div ref={messageRef} />
//                       </div> */}
//                       <div>
//                         {messages?.messages?.length > 0 ? (
//                           messages.messages.map((msg, index) => {
//                             // Check if message is from current user
//                             const isSender =
//                               msg.senderId === userObjId ||
//                               msg.user?.id === user?.id;

//                             return (
//                               <div
//                                 key={msg._id || index}
//                                 className={`message-card ${
//                                   isSender ? "mc-sender" : ""
//                                 }`}
//                                 title={msg.createdAt}
//                               >
//                                 <div
//                                   className="chatify-d-flex chatify-align-items-center"
//                                   style={{
//                                     flexDirection: isSender
//                                       ? "row-reverse"
//                                       : "row",
//                                     justifyContent: isSender
//                                       ? "flex-end"
//                                       : "flex-start",
//                                   }}
//                                 >
//                                   {!isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginRight: "8px" }}
//                                     >
//                                       <img
//                                         alt="User"
//                                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//                                         // onError={(e) => {
//                                         //   e.target.src = "/default-avatar.png";
//                                         // }}
//                                       />
//                                     </div>
//                                   )}

//                                   <div
//                                     style={{
//                                       maxWidth: "70%",
//                                       marginLeft: isSender ? "5px" : "0",
//                                       marginRight: isSender ? "0" : "5px",
//                                     }}
//                                   >
//                                     {msg.messageFile && (
//                                       <>
//                                         {msg.messageFile.endsWith?.(".pdf") ||
//                                         msg.messageFile?.includes?.(
//                                           "application/pdf"
//                                         ) ? (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               padding: "10px",
//                                               backgroundColor: "#f9f9f9",
//                                               textAlign: "center",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                               marginBottom: "8px",
//                                             }}
//                                           >
//                                             <div
//                                               style={{
//                                                 marginBottom: "10px",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                               }}
//                                             >
//                                               <strong
//                                                 style={{
//                                                   color: "#333333",
//                                                   marginRight: "10px",
//                                                   whiteSpace: "nowrap",
//                                                   overflow: "hidden",
//                                                   textOverflow: "ellipsis",
//                                                   maxWidth: "200px",
//                                                 }}
//                                               >
//                                                 {typeof msg.messageFile ===
//                                                 "string"
//                                                   ? msg.messageFile
//                                                       .split("/")
//                                                       .pop()
//                                                   : file?.name || "Document"}
//                                               </strong>
//                                               <HiOutlineDocumentDownload
//                                                 size={30}
//                                                 style={{
//                                                   cursor: "pointer",
//                                                   color: "blue",
//                                                 }}
//                                                 onClick={() => {
//                                                   // Handle file download
//                                                   const link =
//                                                     document.createElement("a");
//                                                   link.href = msg.messageFile;
//                                                   link.download =
//                                                     typeof msg.messageFile ===
//                                                     "string"
//                                                       ? msg.messageFile
//                                                           .split("/")
//                                                           .pop()
//                                                       : "document.pdf";
//                                                   link.click();
//                                                 }}
//                                               />
//                                             </div>
//                                           </div>
//                                         ) : (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               overflow: "hidden",
//                                               marginBottom: "8px",
//                                               backgroundColor: "#f9f9f9",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                             }}
//                                           >
//                                             <img
//                                               src={msg.messageFile}
//                                               alt="Attached file"
//                                               style={{
//                                                 width: "100%",
//                                                 height: "auto",
//                                                 maxHeight: "300px",
//                                                 objectFit: "contain",
//                                               }}
//                                             />
//                                           </div>
//                                         )}
//                                       </>
//                                     )}

//                                     {msg.message && (
//                                       <p
//                                         style={{
//                                           margin: "8px 0",
//                                           padding: "8px 12px",
//                                           borderRadius: "12px",
//                                           backgroundColor: isSender
//                                             ? "#007bff"
//                                             : "#f1f1f1",
//                                           color: isSender ? "white" : "black",
//                                           display: "inline-block",
//                                           maxWidth: "100%",
//                                           wordWrap: "break-word",
//                                         }}
//                                       >
//                                         {msg.message}
//                                       </p>
//                                     )}

//                                     <sub
//                                       style={{
//                                         display: "block",
//                                         marginTop: "4px",
//                                         color: "#666",
//                                         fontSize: "0.75rem",
//                                       }}
//                                     >
//                                       {formatTimeAgo(msg.createdAt)}
//                                       {isSender && (
//                                         <FaCheckDouble className="ms-1" />
//                                       )}
//                                     </sub>
//                                   </div>

//                                   {isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginLeft: "8px" }}
//                                     >
//                                       <img
//                                         alt="You"
//                                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${user?.profileImage}`}
//                                         // onError={(e) => {
//                                         //   e.target.src = "/default-avatar.png";
//                                         // }}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })
//                         ) : (
//                           <p className="text-center mt-4">
//                             No messages yet. Start a conversation!
//                           </p>
//                         )}
//                         <div ref={messageRef} />
//                       </div>
//                     </div>
//                     <div className="typing-indicator">
//                       <div className="message-card typing">
//                         <p>
//                           <span className="typing-dots">
//                             <span className="dot dot-1" />
//                             <span className="dot dot-2" />
//                             <span className="dot dot-3" />
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     {messages?.receiver?.name && (
//                       <div
//                         className="messenger-sendCard"
//                         style={{
//                           display: "block",
//                           // position: "sticky",
//                           bottom: "0",
//                           backgroundColor: "white",
//                           zIndex: 10,
//                           // border: "1px solid",
//                           boxShadow:
//                             "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
//                         }}
//                       >
//                         <form
//                           onSubmit={handleSendMessage}
//                           className="paper-plane"
//                         >
//                           <label className="paper-clip">
//                             <FaPaperclip />
//                             <input
//                               type="file"
//                               id="panFile"
//                               name="messageFile"
//                               className="form-control"
//                               accept="image/*,application/pdf"
//                               onChange={handleChange}
//                             />
//                           </label>
//                           <div className="emoji-container">
//                             <FaSmile
//                               onClick={() =>
//                                 setShowEmojiPicker((prev) => !prev)
//                               }
//                               style={{ cursor: "pointer", margin: "10px 8px" }}
//                             />
//                             {showEmojiPicker && (
//                               <div
//                                 style={{
//                                   position: "absolute",
//                                   zIndex: 10,
//                                   bottom: "50px",
//                                 }}
//                               >
//                                 <EmojiPicker
//                                   onEmojiClick={handleEmojiClick}
//                                   height={300}
//                                   width={440}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <textarea
//                             name="message"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="m-send app-scroll textbars"
//                             placeholder="Type a message.."
//                             style={{
//                               overflow: "hidden",
//                               overflowWrap: "break-word",
//                               height: "44px",
//                             }}
//                           />

//                           {/* Send Button */}
//                           <button type="submit">
//                             <FaPaperPlane />
//                           </button>
//                         </form>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {isModalOpen && selectedTrainee && (
//                   <DeleteMessage
//                     messages={selectedTrainee}
//                     conversationId={selectedTrainee.conversationId}
//                     setMessages={setMessages}
//                     onClose={() => setIsModalOpen(false)}
//                     activeStep={activeStep}
//                     handleClick={() => handleClick(2)}
//                   />
//                 )}

//                 {isCreateGroupModalOpen && (
//                   <CreateGroupModal
//                     show={isCreateGroupModalOpen}
//                     onClose={() => setIsCreateGroupModalOpen(false)}
//                     users={mockUsers}
//                     objId={userObjId}
//                     onCreateGroup={(groupData) =>
//                       console.log("Group Created:", groupData)
//                     }
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassGroupChat;

// import React, { useRef, useState, useEffect } from "react";
// import { BiTimeFive } from "react-icons/bi";
// import {
//   FaUsers,
//   FaPaperclip,
//   FaPaperPlane,
//   FaSmile,
//   FaCheckDouble,
// } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { io } from "socket.io-client";
// import { toast } from "react-toastify";
// import { FaCircleInfo } from "react-icons/fa6";
// import { TiTimes } from "react-icons/ti";
// import { FaArrowLeft } from "react-icons/fa";
// import { HiOutlineDocumentDownload } from "react-icons/hi";
// import EmojiPicker from "emoji-picker-react";
// import DeleteMessage from "./DeleteMessage";
// import { CiCirclePlus } from "react-icons/ci";
// import { FiUserPlus } from "react-icons/fi";
// import CreateGroupModal from "./CreateGroupModal";
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";

// const ClassGroupChat = () => {
//   // Mock user data
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("userDetails"))
//   );
//   const [message, setMessage] = useState("");
//   const [userObjId, setUserObjId] = useState("");
//   const [file, setFile] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [currentView, setCurrentView] = useState("default");
//   const [activeTab, setActiveTab] = useState("users");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTrainee, setSelectedTrainee] = useState(null);
//   const messageRef = useRef(null);
//   const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
//   const [previewMessageImage, setPreviewMessageImage] = useState(null);
//   const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
//   const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
//   const [mockUsers, setMockUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [schoolId, setSchoolId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeConversationId, setActiveConversationId] = useState(null);
//   const [academicYear, setAcademicYear] = useState(
//     localStorage.getItem("selectedAcademicYear") || ""
//   );
//   const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState({
//     messages: [],
//     receiver: null,
//     conversationId: null,
//   });

//   const [activeStep, setActiveStep] = useState(1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

//   // Initialize user data
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     const objId = userDetails?.id;
//     console.log("SchoolObj id ", objId);

//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     setUserObjId(objId);
//   }, []);

//   // Fetch data when schoolId and academicYear are available
//   useEffect(() => {
//     if (schoolId && academicYear) {
//       fetchAllUsers();
//       fetchConversations();
//     }
//   }, [schoolId, academicYear]);

//   // Socket.io connection
//   useEffect(() => {
//     const socketConnection = io(process.env.REACT_APP_API_URL_FOR_IMAGE, {
//       withCredentials: true,
//       transports: ["websocket"],
//     });

//     setSocket(socketConnection);

//     // Join the user
//     if (userObjId) {
//       socketConnection.emit("join", { userId: userObjId });
//     }

//     // Listen for online users
//     socketConnection.on("online-users", (activeUsers) => {
//       console.log("Active Users:", activeUsers);
//     });

//     // Listen for new messages
//     socketConnection.on("new-message", (data) => {
//       console.log("Received new message:", data);

//       // If this message belongs to the active conversation, update UI
//       if (data.conversationId === activeConversationId) {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//       }

//       // Refresh conversations to update last message
//       fetchConversations();
//     });

//     // Handle conversation-specific messages
//     socketConnection.on("conversation-message", (data) => {
//       if (
//         data.conversationId === activeConversationId &&
//         data.type === "new-message"
//       ) {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//       }
//     });

//     return () => {
//       socketConnection.off("online-users");
//       socketConnection.off("new-message");
//       socketConnection.off("conversation-message");
//       socketConnection.disconnect();
//     };
//   }, [userObjId]);

//   // Fetch all users
//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAPI(
//         `/get-schools-all-user-details/${schoolId}`,
//         true
//       );
//       console.log("res ", res);

//       if (res.data.success) {
//         console.log("res.data.users", res.data.users);
//         setMockUsers(res.data.users || []);
//       } else {
//         toast.error(res.data.message || "Failed to fetch roll number records");
//       }
//     } catch (error) {
//       console.error("Error fetching roll number records:", error);
//       toast.error(
//         error.response.data.message || "Error fetching roll number records"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch conversations
//   const fetchConversations = async () => {
//     try {
//       const response = await getAPI(`/conversations/${userObjId}`);
//       console.log("get conversation response", response);
//       setConversations(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data.", error);
//     }
//   };

//   // Fetch messages for a conversation
//   const fetchMessages = async (conversationId, receiver) => {
//     try {
//       setSelectedUser(receiver);
//       setActiveConversationId(conversationId);
//       const res = await getAPI(`/get-messages/${conversationId}`);
//       console.log("get messages ", res);

//       if (res.data.success) {
//         setMessages({
//           messages: res.data.messages || [],
//           receiver,
//           conversationId,
//         });
//       } else {
//         toast.error(res.data.message || "Failed to load messages");
//       }
//     } catch (err) {
//       toast.error("Error fetching messages");
//     }
//   };

//   // Handle file change
//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Time ago function
//   const formatTimeAgo = (createdAt) => {
//     const date = new Date(createdAt);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInSecs = Math.floor(diffInMs / 1000);
//     const diffInMins = Math.floor(diffInSecs / 60);
//     const diffInHours = Math.floor(diffInMins / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSecs < 60) {
//       return `${diffInSecs} sec ago`;
//     } else if (diffInMins < 60) {
//       return `${diffInMins} min ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hrs ago`;
//     } else {
//       return `${diffInDays} days ago`;
//     }
//   };

//   // Handle edit
//   const handleEdit = (messages) => {
//     setSelectedTrainee(messages);
//     setIsModalOpen(true);
//   };

//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     messageRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.messages]);

//   // Fetch users for all users view
//   const fetchUsers = async () => {
//     console.log("mockUsers", mockUsers);
//     setUsers(mockUsers);
//     setCurrentView("allUsers");
//   };

//   // Handle send message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() && !file) return;

//     try {
//       const formData = new FormData();
//       formData.append("conversationId", activeConversationId || "new");
//       formData.append("senderId", userObjId);
//       console.log("selected user", selectedUser);

//       if (selectedUser?._id) formData.append("receiverId", selectedUser._id);
//       if (message) formData.append("message", message);
//       if (file) formData.append("messageFile", file);

//       console.log("Sending message to:", activeConversationId);

//       const response = await postAPI(
//         "/send-message",
//         formData,
//         { "Content-Type": "multipart/form-data" },
//         true
//       );

//       console.log("post-response-send", response);

//       if (response.data.success) {
//         const newMessageData = response.data.data;

//         // Update local state with the actual message from backend
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, newMessageData],
//         }));

//         // Clear form
//         setMessage("");
//         setFile(null);
//         setShowEmojiPicker(false);

//         // Refresh conversations to update last message
//         fetchConversations();

//         // Scroll to bottom
//         setTimeout(() => {
//           messageRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//       } else {
//         toast.error(response.data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Something went wrong while sending message");
//     }
//   };

//   // Handle file change
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   // Handle emoji click
//   const handleEmojiClick = (emojiObject) =>
//     setMessage((prev) => prev + emojiObject.emoji);

//   // Handle window resize for mobile
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 980);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Handle step navigation
//   const handleClick = (step) => {
//     setActiveStep((prev) => (prev === step ? step + 1 : step));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="cards m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1"></div>
//               </div>
//               <div
//                 className="messenger rounded min-h-750 overflow-hidden"
//                 style={{
//                   height: "100%",
//                   overflow: "hidden",
//                   background: "White",
//                 }}
//               >
//                 <div
//                   className="messenger-listView"
//                   style={{
//                     overflowY: "auto",
//                     display: isMobile && activeStep !== 1 ? "none" : "block",
//                   }}
//                 >
//                   <div className="m-header">
//                     <nav>
//                       <nav className="m-header-right">
//                         <a href="#" className="listView-x">
//                           <TiTimes />
//                         </a>
//                       </nav>
//                     </nav>
//                     <div className="d-flex align-item-center">
//                       <input
//                         type="text"
//                         className="messenger-search"
//                         placeholder="Search"
//                       />
//                       <div
//                         className="align-content-center"
//                         style={{
//                           marginRight: "10px",
//                           boxShadow:
//                             "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => setIsCreateGroupModalOpen(true)}
//                       >
//                         <CiCirclePlus className="fs-20" />
//                       </div>
//                     </div>
//                     <div className="messenger-listView-tabs">
//                       <a
//                         href="#"
//                         className={activeTab === "users" ? "active-tab" : ""}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setActiveTab("users");
//                           setCurrentView("default");
//                         }}
//                       >
//                         <BiTimeFive />
//                       </a>

//                       <a
//                         href="#"
//                         className={activeTab === "allUsers" ? "active-tab" : ""}
//                         data-view="allUsers"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           fetchUsers();
//                           setActiveTab("allUsers");
//                           setCurrentView("allUsers");
//                         }}
//                       >
//                         <FaUsers />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="m-body" style={{ flexGrow: 1 }}>
//                     {currentView === "default" && (
//                       <div
//                         className="show scroll messenger-tab app-scroll"
//                         data-view="users"
//                         style={{ display: "block" }}
//                       >
//                         <div className="">
//                           <p className="messenger-title text-dark">Favorites</p>
//                           <div
//                             className="listOfContacts"
//                             style={{
//                               width: "100%",
//                               position: "relative",
//                             }}
//                           >
//                             <table className="messenger-list-item">
//                               <tbody>
//                                 <tr data-action={0}>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                         <p className="messenger-title text-dark">Recent</p>
//                         <div
//                           className="listOfContacts"
//                           style={{
//                             width: "100%",
//                             position: "relative",
//                           }}
//                         >
//                           {conversations.map((conversation) => {
//                             const {
//                               _id: conversationId,
//                               members,
//                               isGroup,
//                               groupName,
//                               groupImage,
//                               lastMessage,
//                             } = conversation;

//                             let displayUser = null;

//                             if (isGroup) {
//                               displayUser = {
//                                 _id: conversationId,
//                                 name: groupName,
//                                 groupImage: groupImage,
//                                 isGroup: true,
//                               };
//                             } else {
//                               const otherMember = members.find(
//                                 (member) =>
//                                   member.userId.toString() !== userObjId
//                               );
//                               if (otherMember) {
//                                 displayUser = {
//                                   _id: otherMember.userId,
//                                   name:
//                                     otherMember.name ||
//                                     `${otherMember.firstName || ""} ${
//                                       otherMember.lastName || ""
//                                     }`.trim(),
//                                   profileImage: otherMember.profileImage,
//                                   isGroup: false,
//                                 };
//                               }
//                             }

//                             if (!displayUser) return null;

//                             return (
//                               <table
//                                 key={conversationId}
//                                 className="messenger-list-item"
//                                 onClick={() =>
//                                   fetchMessages(conversationId, displayUser)
//                                 }
//                               >
//                                 <tbody onClick={() => handleClick(2)}>
//                                   <tr data-action={0}>
//                                     <td style={{ position: "relative" }}>
//                                       <div
//                                         data-action={0}
//                                         className="avatar av-m"
//                                         style={{ borderRadius: "50%" }}
//                                       >
//                                         <img
//                                           alt="Chat"
//                                           src={
//                                             displayUser.isGroup
//                                               ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.groupImage}`
//                                               : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.profileImage}`
//                                           }
//                                         />
//                                       </div>
//                                     </td>
//                                     <td width="100%">
//                                       <p
//                                         data-type={
//                                           displayUser?.isGroup
//                                             ? "group"
//                                             : "user"
//                                         }
//                                         style={{ textAlign: "start" }}
//                                       >
//                                         {displayUser?.name}
//                                       </p>
//                                       <span
//                                         style={{
//                                           justifyContent: "left",
//                                           display: "flex",
//                                         }}
//                                       >
//                                         <span className="lastMessageIndicator">
//                                           {lastMessage?.message ||
//                                             "No messages yet"}
//                                         </span>
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
//                     {currentView === "allUsers" && (
//                       <div
//                         className="all_members messenger-tab app-scroll"
//                         data-view="allUsers"
//                         style={{ display: "block" }}
//                       >
//                         {mockUsers.map((item) => (
//                           <table
//                             key={item._id}
//                             className="messenger-list-item"
//                             onClick={() => fetchMessages("new", item)}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td style={{ position: "relative" }}>
//                                   <div
//                                     className="avatar av-m"
//                                     style={{ borderRadius: "50%" }}
//                                   >
//                                     <img
//                                       src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.profileImage}`}
//                                       alt="Teacher"
//                                     />
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <p className="fw-bold">{item.name}</p>
//                                   <small className="text-muted">
//                                     {item.role === "Student"
//                                       ? `${item.className || ""} ${
//                                           item.sectionName || ""
//                                         }`
//                                       : item.designation || "Employee"}
//                                   </small>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="messenger-messagingView"
//                   style={{
//                     flexGrow: 1,
//                     display: isMobile && activeStep !== 2 ? "none" : "block",
//                     boxShadow:
//                       "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
//                   }}
//                 >
//                   {/* ?.receiver?.name */}
//                   {messages && (
//                     <div className="m-header m-header-messaging">
//                       <nav className="d-flex align-items-center justify-content-between">
//                         <div style={{ display: "flex" }}>
//                           <a className="show-listView">
//                             <FaArrowLeft onClick={() => handleClick(1)} />
//                           </a>
//                           <div
//                             className="avatar av-s header-avatar"
//                             style={{
//                               margin: "8px 10px",
//                               backgroundImage: ``,
//                             }}
//                           >
//                             <img
//                               alt="Teacher"
//                               src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//                             />
//                           </div>
//                           <div className="d-grid ">
//                             <a href="#" className="user-name">
//                               {messages?.receiver?.name}
//                             </a>
//                             <span className="fs-6">SchoolABC, Teacher</span>
//                           </div>
//                         </div>
//                         <nav className="m-header-right">
//                           <a
//                             href="#"
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                           >
//                             <FaRegStar />
//                           </a>
//                           <a
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                             onClick={() => handleEdit(messages)}
//                           >
//                             <FaCircleInfo onClick={() => handleClick(3)} />
//                           </a>
//                         </nav>
//                       </nav>
//                     </div>
//                   )}

//                   <div className="m-body app-scroll" style={{ opacity: 1 }}>
//                     <div
//                       className="messages app-scroll"
//                       style={{
//                         height: "62vh",
//                         display: "flex",
//                         flexDirection: "column-reverse",
//                         overflow: "auto",
//                       }}
//                     >
//                       <div>
//                         {messages?.messages?.length > 0 ? (
//                           messages.messages.map((msg, index) => {
//                             const isSender =
//                               msg.senderId === userObjId ||
//                               msg.user?.id === user?.id;

//                             return (
//                               <div
//                                 key={msg._id || index}
//                                 className={`message-card ${
//                                   isSender ? "mc-sender" : ""
//                                 }`}
//                                 title={msg.createdAt}
//                               >
//                                 <div
//                                   className="chatify-d-flex chatify-align-items-center"
//                                   style={{
//                                     flexDirection: isSender
//                                       ? "row-reverse"
//                                       : "row",
//                                     justifyContent: isSender
//                                       ? "flex-end"
//                                       : "flex-start",
//                                   }}
//                                 >
//                                   {!isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginRight: "8px" }}
//                                     >
//                                       <img
//                                         alt="User"
//                                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//                                       />
//                                     </div>
//                                   )}

//                                   <div
//                                     style={{
//                                       maxWidth: "70%",
//                                       marginLeft: isSender ? "5px" : "0",
//                                       marginRight: isSender ? "0" : "5px",
//                                     }}
//                                   >
//                                     {msg.messageFile && (
//                                       <>
//                                         {msg.messageFile.endsWith?.(".pdf") ||
//                                         msg.messageFile?.includes?.(
//                                           "application/pdf"
//                                         ) ? (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               padding: "10px",
//                                               backgroundColor: "#f9f9f9",
//                                               textAlign: "center",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                               marginBottom: "8px",
//                                             }}
//                                           >
//                                             <div
//                                               style={{
//                                                 marginBottom: "10px",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                               }}
//                                             >
//                                               <strong
//                                                 style={{
//                                                   color: "#333333",
//                                                   marginRight: "10px",
//                                                   whiteSpace: "nowrap",
//                                                   overflow: "hidden",
//                                                   textOverflow: "ellipsis",
//                                                   maxWidth: "200px",
//                                                 }}
//                                               >
//                                                 {typeof msg.messageFile ===
//                                                 "string"
//                                                   ? msg.messageFile
//                                                       .split("/")
//                                                       .pop()
//                                                   : file?.name || "Document"}
//                                               </strong>
//                                               <HiOutlineDocumentDownload
//                                                 size={30}
//                                                 style={{
//                                                   cursor: "pointer",
//                                                   color: "blue",
//                                                 }}
//                                                 onClick={() => {
//                                                   const link =
//                                                     document.createElement("a");
//                                                   link.href = msg.messageFile;
//                                                   link.download =
//                                                     typeof msg.messageFile ===
//                                                     "string"
//                                                       ? msg.messageFile
//                                                           .split("/")
//                                                           .pop()
//                                                       : "document.pdf";
//                                                   link.click();
//                                                 }}
//                                               />
//                                             </div>
//                                           </div>
//                                         ) : (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               overflow: "hidden",
//                                               marginBottom: "8px",
//                                               backgroundColor: "#f9f9f9",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                             }}
//                                           >
//                                             <img
//                                               src={msg.messageFile}
//                                               alt="Attached file"
//                                               style={{
//                                                 width: "100%",
//                                                 height: "auto",
//                                                 maxHeight: "300px",
//                                                 objectFit: "contain",
//                                               }}
//                                             />
//                                           </div>
//                                         )}
//                                       </>
//                                     )}

//                                     {msg.message && (
//                                       <p
//                                         style={{
//                                           margin: "8px 0",
//                                           padding: "8px 12px",
//                                           borderRadius: "12px",
//                                           backgroundColor: isSender
//                                             ? "#007bff"
//                                             : "#f1f1f1",
//                                           color: isSender ? "white" : "black",
//                                           display: "inline-block",
//                                           maxWidth: "100%",
//                                           wordWrap: "break-word",
//                                         }}
//                                       >
//                                         {msg.message}
//                                       </p>
//                                     )}

//                                     <sub
//                                       style={{
//                                         display: "block",
//                                         marginTop: "4px",
//                                         color: "#666",
//                                         fontSize: "0.75rem",
//                                       }}
//                                     >
//                                       {formatTimeAgo(msg.createdAt)}
//                                       {isSender && (
//                                         <FaCheckDouble className="ms-1" />
//                                       )}
//                                     </sub>
//                                   </div>

//                                   {isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginLeft: "8px" }}
//                                     >
//                                       <img
//                                         alt="You"
//                                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${user?.profileImage}`}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })
//                         ) : (
//                           <p className="text-center mt-4">
//                             No messages yet. Start a conversation!
//                           </p>
//                         )}
//                         <div ref={messageRef} />
//                       </div>
//                     </div>
//                     <div className="typing-indicator">
//                       <div className="message-card typing">
//                         <p>
//                           <span className="typing-dots">
//                             <span className="dot dot-1" />
//                             <span className="dot dot-2" />
//                             <span className="dot dot-3" />
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     {/* ?.receiver?.name */}
//                     {messages && (
//                       <div
//                         className="messenger-sendCard"
//                         style={{
//                           display: "block",
//                           bottom: "0",
//                           backgroundColor: "white",
//                           zIndex: 10,
//                           boxShadow:
//                             "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
//                         }}
//                       >
//                         <form
//                           onSubmit={handleSendMessage}
//                           className="paper-plane"
//                         >
//                           <label className="paper-clip">
//                             <FaPaperclip />
//                             <input
//                               type="file"
//                               id="panFile"
//                               name="messageFile"
//                               className="form-control"
//                               accept="image/*,application/pdf"
//                               onChange={handleChange}
//                             />
//                           </label>
//                           <div className="emoji-container">
//                             <FaSmile
//                               onClick={() =>
//                                 setShowEmojiPicker((prev) => !prev)
//                               }
//                               style={{ cursor: "pointer", margin: "10px 8px" }}
//                             />
//                             {showEmojiPicker && (
//                               <div
//                                 style={{
//                                   position: "absolute",
//                                   zIndex: 10,
//                                   bottom: "50px",
//                                 }}
//                               >
//                                 <EmojiPicker
//                                   onEmojiClick={handleEmojiClick}
//                                   height={300}
//                                   width={440}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <textarea
//                             name="message"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="m-send app-scroll textbars"
//                             placeholder="Type a message.."
//                             style={{
//                               overflow: "hidden",
//                               overflowWrap: "break-word",
//                               height: "44px",
//                             }}
//                           />

//                           <button type="submit">
//                             <FaPaperPlane />
//                           </button>
//                         </form>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {isModalOpen && selectedTrainee && (
//                   <DeleteMessage
//                     messages={selectedTrainee}
//                     conversationId={selectedTrainee.conversationId}
//                     setMessages={setMessages}
//                     onClose={() => setIsModalOpen(false)}
//                     activeStep={activeStep}
//                     handleClick={() => handleClick(2)}
//                   />
//                 )}

//                 {isCreateGroupModalOpen && (
//                   <CreateGroupModal
//                     show={isCreateGroupModalOpen}
//                     onClose={() => setIsCreateGroupModalOpen(false)}
//                     users={mockUsers}
//                     objId={userObjId}
//                     onCreateGroup={(groupData) =>
//                       console.log("Group Created:", groupData)
//                     }
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassGroupChat;


// import React, { useRef, useState, useEffect } from "react";
// import { BiTimeFive } from "react-icons/bi";
// import {
//   FaUsers,
//   FaPaperclip,
//   FaPaperPlane,
//   FaSmile,
//   FaCheckDouble,
// } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { io } from "socket.io-client";
// import { toast } from "react-toastify";
// import { FaCircleInfo } from "react-icons/fa6";
// import { TiTimes } from "react-icons/ti";
// import { FaArrowLeft } from "react-icons/fa";
// import { HiOutlineDocumentDownload } from "react-icons/hi";
// import EmojiPicker from "emoji-picker-react";
// import DeleteMessage from "./DeleteMessage";
// import { CiCirclePlus } from "react-icons/ci";
// import { FiUserPlus } from "react-icons/fi";
// import CreateGroupModal from "./CreateGroupModal";
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";

// const ClassGroupChat = () => {
//   // Mock user data
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("userDetails"))
//   );
//   const [message, setMessage] = useState("");
//   const [userObjId, setUserObjId] = useState("");
//   const [file, setFile] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [currentView, setCurrentView] = useState("default");
//   const [activeTab, setActiveTab] = useState("users");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTrainee, setSelectedTrainee] = useState(null);
//   const messageRef = useRef(null);
//   const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
//   const [previewMessageImage, setPreviewMessageImage] = useState(null);
//   const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
//   const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
//   const [mockUsers, setMockUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [schoolId, setSchoolId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeConversationId, setActiveConversationId] = useState(null);
//   const [userDetails,setUserDetails]= useState([]);
//   const [academicYear, setAcademicYear] = useState(
//     localStorage.getItem("selectedAcademicYear") || ""
//   );
//   const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState({
//     messages: [],
//     receiver: null,
//     conversationId: null,
//   });

//   const [activeStep, setActiveStep] = useState(1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

//   // Initialize user data
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     const objId = userDetails?.id;
//     const userRole= userDetails?.role;
//     const userId = userDetails?.schoolId;
//     console.log("SchoolObj id ", objId);

//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     setUserObjId(objId);

//     const fetchUserDetails = async () => {
//       try {
//         const res = await getAPI(
//           `/get-user-details?schoolId=${id}&role=${userRole}&userId=${userId}`
//         );
//         console.log("get-user-details one",res);
        
//         if (res?.data?.success) {
//           setUserDetails(res.data.user);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         toast.error("Failed to fetch user details.");
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   // Fetch data when schoolId and academicYear are available
//   useEffect(() => {
//     if (schoolId && academicYear) {
      
//       fetchAllUsers();
//       fetchConversations();
//     }
//   }, [schoolId, academicYear]);

//   // Socket.io connection - ENHANCED VERSION
//   useEffect(() => {
//     const socketConnection = io(process.env.REACT_APP_API_URL_FOR_IMAGE, {
//       withCredentials: true,
//       transports: ["websocket", "polling"], // Added polling as fallback
//     });

//     setSocket(socketConnection);

//     console.log("🔌 Socket connecting...");

//     // Join the user
//     if (userObjId) {
//       socketConnection.emit("join", { userId: userObjId });
//       console.log("👤 User joined:", userObjId);
//     }

//     // Listen for connection events
//     socketConnection.on("connect", () => {
//       console.log("✅ Socket connected successfully");
//     });

//     socketConnection.on("disconnect", (reason) => {
//       console.log("❌ Socket disconnected:", reason);
//     });

//     socketConnection.on("connect_error", (error) => {
//       console.error("🚨 Socket connection error:", error);
//     });

//     // Listen for online users
//     socketConnection.on("online-users", (activeUsers) => {
//       console.log("👥 Active Users:", activeUsers);
//     });

//     // Listen for new messages - ENHANCED
//     socketConnection.on("new-message", (data) => {
//       console.log("📨 Received new-message event:", data);

//       // Update messages if it belongs to active conversation
//       if (data.conversationId === activeConversationId) {
//         console.log("🔄 Updating active conversation messages");
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));

//         // Auto-scroll to bottom
//         setTimeout(() => {
//           messageRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//       } else {
//         console.log("💡 Message for different conversation, refreshing list");
//       }

//       // Always refresh conversations to update last message and reorder
//       fetchConversations();
//     });

//     // Additional fallback event listener
//     socketConnection.on("message-sent", (data) => {
//       console.log("📬 Received message-sent event:", data);
//       if (
//         data.type === "new-message" &&
//         data.conversationId === activeConversationId
//       ) {
//         setMessages((prev) => ({
//           ...prev,
//           messages: [...prev.messages, data.message],
//         }));
//         fetchConversations();
//       }
//     });

//     return () => {
//       console.log("🧹 Cleaning up socket connection");
//       socketConnection.off("connect");
//       socketConnection.off("disconnect");
//       socketConnection.off("connect_error");
//       socketConnection.off("online-users");
//       socketConnection.off("new-message");
//       socketConnection.off("message-sent");
//       socketConnection.disconnect();
//     };
//   }, [userObjId, activeConversationId]);
//   // Fetch all users
//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAPI(
//         `/get-schools-all-user-details/${schoolId}`,
//         true
//       );
//       console.log("res ", res);

//       if (res.data.success) {
//         console.log("res.data.users", res.data.users);
//         setMockUsers(res.data.users || []);
//       } else {
//         toast.error(res.data.message || "Failed to fetch roll number records");
//       }
//     } catch (error) {
//       console.error("Error fetching roll number records:", error);
//       toast.error(
//         error.response.data.message || "Error fetching roll number records"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch conversations
//   const fetchConversations = async () => {
//     try {
//       const response = await getAPI(`/conversations/${userObjId}`);
//       console.log("get conversation response", response);
//       setConversations(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data.", error);
//     }
//   };

//   // Fetch messages for a conversation - FIXED: Clear previous messages when switching conversations
//   const fetchMessages = async (conversationId, receiver) => {
//     console.log("userDetails", userDetails);
//     try {
//       // Clear previous messages immediately when switching conversations
//       setMessages({
//         messages: [],
//         receiver: null,
//         conversationId: null,
//       });

//       setSelectedUser(receiver);
      
//       if (conversationId === "new") {
//       setActiveConversationId("new");
//       setMessages({
//         messages: [],
//         receiver,
//         conversationId: "new",
//       });
//       return;
//     }

//       setActiveConversationId(conversationId);

//       const res = await getAPI(`/get-messages/${conversationId}`);
//       console.log("get messages ", res);

//       if (res.data.success) {
//         setMessages({
//           messages: res.data.messages || [],
//           receiver,
//           conversationId,
//         });
//       } else {
//         toast.error(res.data.message || "Failed to load messages");
//       }
//     } catch (err) {
//       toast.error("Error fetching messages");
//     }
//   };

//   // Handle file change
//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Time ago function
//   const formatTimeAgo = (createdAt) => {
//     const date = new Date(createdAt);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInSecs = Math.floor(diffInMs / 1000);
//     const diffInMins = Math.floor(diffInSecs / 60);
//     const diffInHours = Math.floor(diffInMins / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSecs < 60) {
//       return `${diffInSecs} sec ago`;
//     } else if (diffInMins < 60) {
//       return `${diffInMins} min ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hrs ago`;
//     } else {
//       return `${diffInDays} days ago`;
//     }
//   };

//   // Handle edit
//   const handleEdit = (messages) => {
//     setSelectedTrainee(messages);
//     setIsModalOpen(true);
//   };

//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     messageRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.messages]);

//   // Fetch users for all users view
//   const fetchUsers = async () => {
//     console.log("mockUsers", mockUsers);
//     setUsers(mockUsers);
//     setCurrentView("allUsers");
//   };
  
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() && !file) return;

//     try {
//       const formData = new FormData();

//       // Use "new" only if there's no active conversation AND we have a selected user
//       const conversationIdToSend =
//         activeConversationId === "new" ? "new" : activeConversationId || "new";
//       formData.append("conversationId", conversationIdToSend);
//       formData.append("senderId", userObjId);

//       // Always include receiverId when starting new conversation
//       if (selectedUser?._id) {
//         formData.append("receiverId", selectedUser._id);
//       }

//       if (message) formData.append("message", message);
//       if (file) formData.append("messageFile", file);

//       console.log("Sending message with:", {
//         conversationId: conversationIdToSend,
//         senderId: userObjId,
//         receiverId: selectedUser?._id,
//       });

//       const response = await postAPI(
//         "/send-message",
//         formData,
//         { "Content-Type": "multipart/form-data" },
//         true
//       );

//       console.log("post-response-send", response);

//       if (response.data.success) {
//         const newMessageData = response.data.data;

//         // If this was a new conversation, update the active conversation ID
//         if (conversationIdToSend === "new" && response.data.conversationId) {
//           setActiveConversationId(response.data.conversationId);
//           setMessages((prev) => ({
//             ...prev,
//             conversationId: response.data.conversationId,
//           }));
//           fetchMessages(response.data.conversationId, selectedUser);
//         }

//         // Update local state
//         // setMessages((prev) => ({
//         //   ...prev,
//         //   messages: [...prev.messages, newMessageData],
//         // }));

//         // Clear form
//         setMessage("");
//         setFile(null);
//         setShowEmojiPicker(false);

//         // Refresh conversations
//         fetchConversations();

//         // Scroll to bottom
//         setTimeout(() => {
//           messageRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//       } else {
//         toast.error(response.data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Something went wrong while sending message");
//     }
//   };

  
//   // Handle file change
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   // Handle emoji click
//   const handleEmojiClick = (emojiObject) =>
//     setMessage((prev) => prev + emojiObject.emoji);

//   // Handle window resize for mobile
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 980);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Handle step navigation
//   const handleClick = (step) => {
//     setActiveStep((prev) => (prev === step ? step + 1 : step));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="cards m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1"></div>
//               </div>
//               <div
//                 className="messenger rounded min-h-750 overflow-hidden"
//                 style={{
//                   height: "100%",
//                   overflow: "hidden",
//                   background: "White",
//                 }}
//               >
//                 <div
//                   className="messenger-listView"
//                   style={{
//                     overflowY: "auto",
//                     display: isMobile && activeStep !== 1 ? "none" : "block",
//                   }}
//                 >
//                   <div className="m-header">
//                     <nav>
//                       <nav className="m-header-right">
//                         <a href="#" className="listView-x">
//                           <TiTimes />
//                         </a>
//                       </nav>
//                     </nav>
//                     <div className="d-flex align-item-center">
//                       <input
//                         type="text"
//                         className="messenger-search"
//                         placeholder="Search"
//                       />
//                       <div
//                         className="align-content-center"
//                         style={{
//                           marginRight: "10px",
//                           boxShadow:
//                             "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => setIsCreateGroupModalOpen(true)}
//                       >
//                         <CiCirclePlus className="fs-20" />
//                       </div>
//                     </div>
//                     <div className="messenger-listView-tabs">
//                       <a
//                         href="#"
//                         className={activeTab === "users" ? "active-tab" : ""}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setActiveTab("users");
//                           setCurrentView("default");
//                         }}
//                       >
//                         <BiTimeFive />
//                       </a>

//                       <a
//                         href="#"
//                         className={activeTab === "allUsers" ? "active-tab" : ""}
//                         data-view="allUsers"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           fetchUsers();
//                           setActiveTab("allUsers");
//                           setCurrentView("allUsers");
//                         }}
//                       >
//                         <FaUsers />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="m-body" style={{ flexGrow: 1 }}>
//                     {currentView === "default" && (
//                       <div
//                         className="show scroll messenger-tab app-scroll"
//                         data-view="users"
//                         style={{ display: "block" }}
//                       >
//                         <div className="">
//                           <p className="messenger-title text-dark">Favorites</p>
//                           <div
//                             className="listOfContacts"
//                             style={{
//                               width: "100%",
//                               position: "relative",
//                             }}
//                           >
//                             <table className="messenger-list-item">
//                               <tbody>
//                                 <tr data-action={0}>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                   <td style={{ position: "relative" }}>
//                                     <div
//                                       data-action={0}
//                                       className="avatar av-m"
//                                       style={{ borderRadius: "50%" }}
//                                     >
//                                       <img alt="Teacher" />
//                                     </div>
//                                     <span
//                                       className="d-inline-block text-dark text-truncate"
//                                       style={{ maxWidth: "60px" }}
//                                     >
//                                       jack roy
//                                     </span>
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                         <p className="messenger-title text-dark">Recent</p>
//                         <div
//                           className="listOfContacts"
//                           style={{
//                             width: "100%",
//                             position: "relative",
//                           }}
//                         >
//                           {conversations.map((conversation) => {
//                             const {
//                               _id: conversationId,
//                               members,
//                               isGroup,
//                               groupName,
//                               groupImage,
//                               lastMessage,
//                               otherUser,

//                             } = conversation;

//                             let displayUser = null;

//                             if (isGroup) {
//                               displayUser = {
//                                 _id: conversationId,
//                                 name: groupName,
//                                 groupImage: groupImage,
//                                 isGroup: true,
//                               };
//                             } else {
//     // ✅ Use API provided `otherUser`
//     if (otherUser) {
//       displayUser = {
//         _id: otherUser._id,
//         name: otherUser.name,
//         profileImage: otherUser.profileImage,
//         isGroup: false,
//       };
//     }
//   }

//                             if (!displayUser) return null;

//                             return (
//                               <table
//                                 key={conversationId}
//                                 className="messenger-list-item"
//                                 onClick={() =>
//                                   fetchMessages(conversationId, displayUser)
//                                 }
//                               >
//                                 <tbody onClick={() => handleClick(2)}>
//                                   <tr data-action={0}>
//                                     <td style={{ position: "relative" }}>
//                                       <div
//                                         data-action={0}
//                                         className="avatar av-m"
//                                         style={{ borderRadius: "50%" }}
//                                       >
//                                         <img
//                                           alt="Chat"
//                                           src={
//                                             displayUser.isGroup
//                                               ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.groupImage}`
//                                               : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${displayUser?.profileImage}`
//                                           }
//                                         />
//                                       </div>
//                                     </td>
//                                     <td width="100%">
//                                       <p
//                                         data-type={
//                                           displayUser?.isGroup
//                                             ? "group"
//                                             : "user"
//                                         }
//                                         style={{ textAlign: "start" }}
//                                       >
//                                         {displayUser?.name}
//                                       </p>
//                                       <span
//                                         style={{
//                                           justifyContent: "left",
//                                           display: "flex",
//                                         }}
//                                       >
//                                         <span className="lastMessageIndicator">
//                                           {lastMessage?.message ||
//                                             "No messages yet"}
//                                         </span>
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
                    
// {currentView === "allUsers" && (
//   <div
//     className="all_members messenger-tab app-scroll"
//     data-view="allUsers"
//     style={{ display: "block" }}
//   >
//     {mockUsers.map((item) => {
//       // Check if conversation already exists with this user
//       const existingConversation = conversations.find(conv => {
//         if (conv.isGroup) return false; // Skip groups
//         const otherMember = conv.members.find(
//           member => member.userId.toString() !== userObjId
//         );
//         return otherMember && otherMember.userId.toString() === item._id;
//       });

//       return (
//         <table
//           key={item._id}
//           className="messenger-list-item"
//           onClick={async () => {
//             if (existingConversation) {
//               // If conversation exists, load existing messages
//               console.log("Loading existing conversation:", existingConversation._id);
//               await fetchMessages(existingConversation._id, item);
//             } else {
//               // If no conversation exists, create new one
//               console.log("Starting new conversation with:", item._id);
//               setActiveConversationId("new");
//               setSelectedUser(item);
//               setMessages({
//                 messages: [],
//                 receiver: item,
//                 conversationId: "new",
//               });
//             }
//             handleClick(2);
//           }}
//         >
//           <tbody>
//             <tr>
//               <td style={{ position: "relative" }}>
//                 <div
//                   className="avatar av-m"
//                   style={{ borderRadius: "50%" }}
//                 >
//                   <img
//                     src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.profileImage}`}
//                     alt="Teacher"
//                   />
//                 </div>
//               </td>
//               <td>
//                 <p className="fw-bold">{item.name}</p>
//                 <small className="text-muted">
//                   {item.role === "Student"
//                     ? `${item.className || ""} ${item.sectionName || ""}`
//                     : item.designation || "Employee"}
//                 </small>
//                 {existingConversation && (
//                   <div className="text-success small">
//                     ✓ Existing conversation
//                   </div>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       );
//     })}
//   </div>
// )}
//                   </div>
//                 </div>
//                 <div
//                   className="messenger-messagingView"
//                   style={{
//                     flexGrow: 1,
//                     display: isMobile && activeStep !== 2 ? "none" : "block",
//                     boxShadow:
//                       "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
//                   }}
//                 >
//                   {/* ?.receiver?.name */}
//                   {messages && (
//                     <div className="m-header m-header-messaging">
//                       <nav className="d-flex align-items-center justify-content-between">
//                         <div style={{ display: "flex" }}>
//                           <a className="show-listView">
//                             <FaArrowLeft onClick={() => handleClick(1)} />
//                           </a>
//                           <div
//                             className="avatar av-s header-avatar"
//                             style={{
//                               margin: "8px 10px",
//                               backgroundImage: ``,
//                             }}
//                           >
//                             <img
//                               alt="Teacher"
//                               // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//                               src={
//                                             messages?.receiver?.isGroup
//                                               ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.groupImage}`
//                                               : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`
//                                           }
//                             />
                            
//                           </div>
//                           <div className="d-grid ">
//                             <a href="#" className="user-name">
//                               {messages?.receiver?.name}
//                             </a>
//                             <span className="fs-6">SchoolABC, Teacher</span>
//                           </div>
//                         </div>
//                         <nav className="m-header-right">
//                           <a
//                             href="#"
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                           >
//                             <FaRegStar />
//                           </a>
//                           <a
//                             className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
//                             onClick={() => handleEdit(messages)}
//                           >
//                             <FaCircleInfo onClick={() => handleClick(3)} />
//                           </a>
//                         </nav>
//                       </nav>
//                     </div>
//                   )}

//                   <div className="m-body app-scroll" style={{ opacity: 1 }}>
//                     <div
//                       className="messages app-scroll"
//                       style={{
//                         height: "62vh",
//                         display: "flex",
//                         flexDirection: "column-reverse",
//                         overflow: "auto",
//                       }}
//                     >
//                       <div>
//                         {messages?.messages?.length > 0 ? (
//                           messages.messages.map((msg, index) => {
//                             const isSender =
//                               msg.senderId === userObjId ||
//                               msg.user?.id === user?.id;

//                             return (
//                               <div
//                                 key={msg._id || index}
//                                 className={`message-card ${
//                                   isSender ? "mc-sender" : ""
//                                 }`}
//                                 title={msg.createdAt}
//                               >
//                                 <div
//                                   className="chatify-d-flex chatify-align-items-center"
//                                   style={{
//                                     flexDirection: isSender
//                                       ? "row-reverse"
//                                       : "row",
//                                     justifyContent: isSender
//                                       ? "flex-end"
//                                       : "flex-start",
//                                   }}
//                                 >
//                                   {!isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginRight: "8px" }}
//                                     >
//                                       <img
//                                         alt="User"
//                                         src={
//                   msg.senderDetails?.profileImage
//                     ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.senderDetails.profileImage}`
//                     : "/default-avatar.png"
//                 }
//                                       />
//                                     </div>
//                                   )}

//                                   <div
//                                     style={{
//                                       maxWidth: "70%",
//                                       marginLeft: isSender ? "5px" : "0",
//                                       marginRight: isSender ? "0" : "5px",
//                                     }}
//                                   >
//                                     {msg.messageFile && (
//                                       <>
//                                         {msg.messageFile.endsWith?.(".pdf") ||
//                                         msg.messageFile?.includes?.(
//                                           "application/pdf"
//                                         ) ? (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               padding: "10px",
//                                               backgroundColor: "#f9f9f9",
//                                               textAlign: "center",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                               marginBottom: "8px",
//                                             }}
//                                           >
//                                             <div
//                                               style={{
//                                                 marginBottom: "10px",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                               }}
//                                             >
//                                               <strong
//                                                 style={{
//                                                   color: "#333333",
//                                                   marginRight: "10px",
//                                                   whiteSpace: "nowrap",
//                                                   overflow: "hidden",
//                                                   textOverflow: "ellipsis",
//                                                   maxWidth: "200px",
//                                                 }}
//                                               >
//                                                 {typeof msg.messageFile ===
//                                                 "string"
//                                                   ? msg.messageFile
//                                                       .split("/")
//                                                       .pop()
//                                                   : file?.name || "Document"}
//                                               </strong>
//                                               <HiOutlineDocumentDownload
//                                                 size={30}
//                                                 style={{
//                                                   cursor: "pointer",
//                                                   color: "blue",
//                                                 }}
//                                                 onClick={() => {
//                                                   const link =
//                                                     document.createElement("a");
//                                                   link.href = msg.messageFile;
//                                                   link.download =
//                                                     typeof msg.messageFile ===
//                                                     "string"
//                                                       ? msg.messageFile
//                                                           .split("/")
//                                                           .pop()
//                                                       : "document.pdf";
//                                                   link.click();
//                                                 }}
//                                               />
//                                             </div>
//                                           </div>
//                                         ) : (
//                                           <div
//                                             style={{
//                                               border: "1px solid #ccc",
//                                               borderRadius: "10px",
//                                               overflow: "hidden",
//                                               marginBottom: "8px",
//                                               backgroundColor: "#f9f9f9",
//                                               boxShadow:
//                                                 "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                             }}
//                                           >
//                                             <img
//                                               src={msg.messageFile}
//                                               alt="Attached file"
//                                               style={{
//                                                 width: "100%",
//                                                 height: "auto",
//                                                 maxHeight: "300px",
//                                                 objectFit: "contain",
//                                               }}
//                                             />
//                                           </div>
//                                         )}
//                                       </>
//                                     )}

//                                     {msg.message && (
//                                       <p
//                                         style={{
//                                           margin: "8px 0",
//                                           padding: "8px 12px",
//                                           borderRadius: "12px",
//                                           backgroundColor: isSender
//                                             ? "#007bff"
//                                             : "#f1f1f1",
//                                           color: isSender ? "white" : "black",
//                                           display: "inline-block",
//                                           maxWidth: "100%",
//                                           wordWrap: "break-word",
//                                         }}
//                                       >
//                                         {msg.message}
//                                       </p>
//                                     )}

//                                     <sub
//                                       style={{
//                                         display: "block",
//                                         marginTop: "4px",
//                                         color: "#666",
//                                         fontSize: "0.75rem",
//                                       }}
//                                     >
//                                       {formatTimeAgo(msg.createdAt)}
//                                       {isSender && (
//                                         <FaCheckDouble className="ms-1" />
//                                       )}
//                                     </sub>
//                                   </div>

//                                   {isSender && (
//                                     <div
//                                       className="avatar av-s"
//                                       style={{ marginLeft: "8px" }}
//                                     >
//                                       <img
//                                         alt="You"
//                                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${userDetails?.profileImage}`}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })
//                         ) : (
//                           <p className="text-center mt-4">
//                             No messages yet. Start a conversation!
//                           </p>
//                         )}
//                         <div ref={messageRef} />
//                       </div>
//                     </div>
//                     <div className="typing-indicator">
//                       <div className="message-card typing">
//                         <p>
//                           <span className="typing-dots">
//                             <span className="dot dot-1" />
//                             <span className="dot dot-2" />
//                             <span className="dot dot-3" />
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     {/* ?.receiver?.name */}
//                     {messages && (
//                       <div
//                         className="messenger-sendCard"
//                         style={{
//                           display: "contents",
//                           bottom: "0",
//                           backgroundColor: "white",
//                           zIndex: 10,
//                           boxShadow:
//                             "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
//                         }}
//                       >
//                         <form
//                           onSubmit={handleSendMessage}
//                           className="paper-plane"
//                         >
//                           <label className="paper-clip">
//                             <FaPaperclip />
//                             <input
//                               type="file"
//                               id="panFile"
//                               name="messageFile"
//                               className="form-control"
//                               accept="image/*,application/pdf"
//                               onChange={handleChange}
//                             />
//                           </label>
//                           <div className="emoji-container">
//                             <FaSmile
//                               onClick={() =>
//                                 setShowEmojiPicker((prev) => !prev)
//                               }
//                               style={{ cursor: "pointer", margin: "10px 8px" }}
//                             />
//                             {showEmojiPicker && (
//                               <div
//                                 style={{
//                                   position: "absolute",
//                                   zIndex: 10,
//                                   bottom: "50px",
//                                 }}
//                               >
//                                 <EmojiPicker
//                                   onEmojiClick={handleEmojiClick}
//                                   height={300}
//                                   width={440}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <textarea
//                             name="message"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="m-send app-scroll textbars"
//                             placeholder="Type a message.."
//                             style={{
//                               overflow: "hidden",
//                               overflowWrap: "break-word",
//                               height: "44px",
//                             }}
//                           />

//                           <button type="submit">
//                             <FaPaperPlane />
//                           </button>
//                         </form>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {isModalOpen && selectedTrainee && (
//                   <DeleteMessage
//                     messages={selectedTrainee}
//                     conversationId={selectedTrainee.conversationId}
//                     setMessages={setMessages}
//                     onClose={() => setIsModalOpen(false)}
//                     activeStep={activeStep}
//                     handleClick={() => handleClick(2)}
//                   />
//                 )}

//                 {isCreateGroupModalOpen && (
//                   <CreateGroupModal
//                     show={isCreateGroupModalOpen}
//                     onClose={() => setIsCreateGroupModalOpen(false)}
//                     users={mockUsers}
//                     objId={userObjId}
//                     onCreateGroup={(groupData) =>
//                       console.log("Group Created:", groupData)
//                     }
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassGroupChat;

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
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import deleteAPI from "../../../../../../api/deleteAPI";
const ClassGroupChat = () => {
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

  //  Initialize user data
    useEffect(() => {
     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
     const id = userDetails?.schoolId;
     const objId = userDetails?.id;
     const userRole= userDetails?.role;
     const userId = userDetails?.schoolId;
     console.log("SchoolObj id ", objId);

     if (!id) {
       toast.error("School ID not found. Please log in again.");
       return;
     }
     setSchoolId(id);
     setUserObjId(objId);

     const fetchUserDetails = async () => {
       try {
         const res = await getAPI(
           `/get-user-details?schoolId=${id}&role=${userRole}&userId=${userId}`
         );
         console.log("get-user-details one",res);
        
         if (res?.data?.success) {
           setUserDetails(res.data.user);
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

                {/* {isModalOpen && selectedTrainee && (
                  <DeleteMessage
                    messages={selectedTrainee}
                    conversationId={selectedTrainee.conversationId}
                    setMessages={setMessages}
                    onClose={() => setIsModalOpen(false)}
                    activeStep={activeStep}
                    handleClick={() => handleClick(2)}
                  />
                )} */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassGroupChat;
