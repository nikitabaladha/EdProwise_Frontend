// import React from "react";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// const ClassGroupChat = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Class Chat
//                   </h4>
//                 </div>
//               </div>
//               <div className="messenger  overflow-hidden">
//                 <div className="col-md-3 col-12 border border-dark">
//                   <div className="m-header">
//                     <div className="position-relative px-2 py-1">
//                       <input
//                         type="text"
//                         id="admissionNumber"
//                         name="admissionNumber"
//                         className="form-control pe-5"
//                         placeholder="Search.."
//                       />
//                       <RxCross2
//                         size={20}
//                         className="position-absolute me-1 custom-arraow-icon"
//                         style={{
//                           top: "50%",
//                           right: "10px",
//                           transform: "translateY(-50%)",
//                           color: "#000000",
//                           cursor: "pointer",
//                         }}
//                         title="Fetch Vendor Info"
//                       />
//                     </div>
//                     <div className="messenger-listView-tabs p-2 border border-dark">
//                       <button className="col-6">
//                         <RxCross2  />
//                       </button>
//                       <button className="col-6">
//                         <RxCross2 />
//                       </button>
//                     </div>
//                     <div className="">

//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-12">
//                 123  
//                 </div>
//                 <div className="col-md-3 col-12">1223</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// {
//   /* <div className="m-header">
//   <nav>
//     <nav className="m-header-right">
//       <a className="listView-x" />
//     </nav>
//   </nav>
//   <input type="text" className="messenger-search" placeholder="search" />
//   <div className="messenger-listView-tabs">
//     <a href="">12</a>
//     <a href="">123</a>
//   </div>
// </div>; */
// }

// export default ClassGroupChat;


import React, { useRef } from "react";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
// import DeleteMessage from "./DeleteMessage";
import DeleteMessage from "./DeleteMessage";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { HiOutlineDocumentDownload } from "react-icons/hi";
// import { useMediaQuery } from "react-responsive";

const ClassGroupChat = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const [activeTab, setActiveTab] = useState("users");
  const [socket, setSocket] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const messageRef = useRef(null);
  const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
  const [previewMessageImage, setPreviewMessageImage] = useState(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
//   const isPhone = useMediaQuery({ maxWidth: 768 });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // timeAgo function
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

  const handleEdit = (messages) => {
    // console.log("messages", messages)
    setSelectedTrainee(messages);
    setIsModalOpen(true);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    setSocket(io("http://localhost:3030"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      // setUsers(users)
      console.log("activeUsers:", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket, user?.id]); 

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const fetchConversations = async () => {
      try {
        const response = await getAPI(`/conversation/${userDetails?.id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch data.", error);
      }
    };

    fetchConversations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAPI(`/users/${user?.id}`);
      setUsers(response.data);
      setCurrentView("groups");
    } catch (error) {
      console.error("Failed to fetch users.", error);
    }
  };

  //   const fetchMessages = async (conversationId, receiver) => {
  //   try {
  //     const response = await getAPI(
  //       `/get-message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`
  //     );
  //     setMessages({ messages: response.data, receiver, conversationId });

  //     // Mark messages as read when opening conversation
  //     if (conversationId && receiver?.receiverId === user?.id) {
  //       await postAPI("/messages/mark-as-read", {
  //         conversationId,
  //         userId: user?.id
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch data.", error);
  //   }
  // };

  // In the fetchMessages function, add this after setting the messages:
  const fetchMessages = async (conversationId, receiver) => {
    try {
      const response = await getAPI(
        `/get-message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`
      );
      setMessages({ messages: response.data, receiver, conversationId });

      // Mark messages as read when opening conversation
      if (conversationId && receiver?.receiverId !== user?.id) {
        await postAPI("/messages/mark-as-read", {
          conversationId,
          userId: user?.id,
        });

        // Emit event to update unread count
        socket.emit("messagesRead", {
          conversationId,
          userId: user?.id,
        });
      }
    } catch (error) {
      console.error("Failed to fetch data.", error);
    }
  };

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages.messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      message,
      createdAt: new Date().toISOString(),
      user: { id: user?.id },
      messageFile: file ? URL.createObjectURL(file) : null,
    };

    setMessages((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setMessage("");
    setFile(null);
    setPreviewMessageImage(null);
    setPreviewMessagePDF(null);

    try {
      const payload = new FormData();
      payload.append("conversationId", messages?.conversationId || "new");
      payload.append("senderId", user?.id);
      payload.append("message", message);
      payload.append("receiverId", messages?.receiver?.receiverId);
      if (file) {
        payload.append("messageFile", file);
      }

      const response = await postAPI(
        "/message",
        payload,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (response.hasError) {
        toast(`Failed to send message: ${response.message}`);

        setMessages((prev) => ({
          ...prev,
          messages: prev.messages.filter((msg) => msg !== newMessage),
        }));
        return;
      }

      toast("Message sent successfully!");
      fetchMessages(messages.conversationId, messages.receiver);
    } catch (error) {
      console.error("Error sending message:", error);
      toast(`An error occurred: ${error.message}`);
      setMessages((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg !== newMessage),
      }));
    }
  };

  const [activeStep, setActiveStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 980);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (step) => {
    setActiveStep((prev) => (prev === step ? step + 1 : step));
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="cards rounded-12 p-0">
            <div className="card-body">
              <div
                className="messenger rounded min-h-750 overflow-hidden"
                style={{ height: "100%", overflow: "hidden", background: "White"}}
              >
                <div
                  className="messenger-listView"
                  style={{
                    height: "75vh",
                    overflowY: "auto",
                    display: isMobile && activeStep !== 1 ? "none" : "block",
                  }}
                >
                  <div className="m-header">
                    <nav>
                      <nav className="m-header-right">
                        <Link href="#" className="listView-x">
                          <TiTimes />
                        </Link>
                      </nav>
                    </nav>
                    <input
                      type="text"
                      className="messenger-search"
                      placeholder="Search"
                    />

                    <div className="messenger-listView-tabs">
                      <Link
                        to="#"
                        className={activeTab === "users" ? "active-tab" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("users");
                          setCurrentView("default");
                        }}
                      >
                        <BiTimeFive />
                      </Link>

                      <Link
                        href="#"
                        className={activeTab === "groups" ? "active-tab" : ""}
                        data-view="groups"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("groups");
                          setCurrentView("groups");
                        }}
                      >
                        <FaUsers />
                      </Link>
                    </div>
                  </div>
                  <div className="m-body" style={{ flexGrow: 1 }}>
                    {currentView === "default" && (
                      <div
                        className="show scroll messenger-tab app-scroll"
                        data-view="users"
                        style={{ display: "block" }}
                      >
                        <div
                          className="listOfContacts"
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          {/* {conversations && Array.isArray(conversations) ? (
                            conversations.map(({ conversationId, user }) => ( */}
                              <table
                                className="messenger-list-item"
                                data-contact={2}
                                // onClick={() =>
                                //   fetchMessages(conversationId, user)
                                // }
                              >
                                <tbody onClick={() => handleClick(2)}>
                                  <tr data-action={0}>
                                    <td style={{ position: "relative" }}>
                                      <div
                                        data-id={2}
                                        data-action={0}
                                        className="avatar av-m"
                                        style={{
                                          backgroundImage: `url(
                                            ${process.env.REACT_APP_API_URL_FOR_IMAGE}${user?.profileImage}
                                        )`,
                                        }}
                                      />
                                    </td>
                                    <td width="100%">
                                      <p
                                        data-id={2}
                                        data-type="user"
                                        style={{ textAlign: "start" }}
                                      >
                                        {/* {user.name} */}
                                        Umesh
                                        <span></span>
                                      </p>
                                      <span
                                        style={{
                                          justifyContent: "left",
                                          display: "flex",
                                        }}
                                      >
                                        {/* <span className="lastMessageIndicator">
                                          You :
                                        </span>
                                        hi */}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            {/* ))
                          ) : (
                            <p>No conversations found.</p>
                          )} */}
                        </div>
                      </div>
                     )}
                    {currentView === "groups" && (
                      <div
                        className="all_members messenger-tab app-scroll"
                        data-view="groups"
                        style={{ display: "block" }}
                      >
                        {/* {users.map((item) => ( */}
                          <table
                            className="messenger-list-item"
                            // onClick={() => fetchMessages("new", item.user)}
                          >
                            <tbody>
                              <tr 
                              // key={item.user.receiverId}
                              >
                                <td style={{ position: "relative" }}>
                                  <div
                                    className="avatar av-m"
                                    // style={{
                                    //   backgroundImage: `url(
                                    //     ${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.user.profileImage}
                                    // )`,
                                    // }}
                                  />
                                </td>
                                <td>
                                  <p>
                                    {/* {item.user.name}  */} Hr
                                    </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        {/* ))} */}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="messenger-messagingView"
                  style={{
                    flexGrow: 1,
                    display: isMobile && activeStep !== 2 ? "none" : "block",
                  }}
                >
                  {/* {messages?.receiver?.name && ( */}
                    <div className="m-header m-header-messaging">
                      <nav className="d-flex align-items-center justify-content-between">
                        <div style={{ display: "flex" }}>
                          <Link href="#" className="show-listView">
                            <FaArrowLeft onClick={() => handleClick(1)} />
                          </Link>
                          <div
                            className="avatar av-s header-avatar"
                            style={{
                              margin: "-5px 10px",
                            //   backgroundImage: `url(
                            //     ${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}
                            // )`,
                            }}
                          ></div>
                          <Link href="#" className="user-name">
                            {/* {messages?.receiver?.name} */} hr
                          </Link>
                        </div>
                        <nav className="m-header-right">
                          <Link
                            href="#"
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                            onClick={() => handleEdit(messages)}
                          >
                            <FaCircleInfo onClick={() => handleClick(3)} />
                          </Link>
                        </nav>
                      </nav>
                    </div>
                  {/* )} */}

                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div
                      className="messages"
                      style={{ height: "60vh", overflowY: "auto" }}
                    >
                      {messages?.messages?.length > 0 ? (
                        messages.messages.map(
                          ({
                            message,
                            createdAt,
                            messageFile,
                            user: { id } = {},
                          }) => {
                            if (id === user?.id) {
                              return (
                                <div
                                  className="message-card mc-sender"
                                  title="2020-10-08 09:35:19"
                                >
                                  <div
                                    className="chatify-d-flex chatify-align-items-center"
                                    style={{
                                      flexDirection: "row-reverse",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <p style={{ marginLeft: "5px" }}>
                                      {messageFile && (
                                        <>
                                          {messageFile.endsWith(".pdf") ? (
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                              <div
                                                style={{
                                                  border: "1px solid #ccc",
                                                  borderRadius: "10px",
                                                  padding: "10px",
                                                  backgroundColor: "#f9f9f9",
                                                  textAlign: "center",
                                                  boxShadow:
                                                    "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                }}
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
                                                    }}
                                                  >
                                                    {messageFile
                                                      .split("/")
                                                      .pop()}
                                                  </strong>
                                                  <HiOutlineDocumentDownload
                                                    size={30}
                                                    style={{
                                                      cursor: "pointer",
                                                      color: "blue",
                                                    }}
                                                    onClick={() => {
                                                      fetch(
                                                        `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`
                                                      )
                                                        .then((response) =>
                                                          response.blob()
                                                        )
                                                        .then((blob) => {
                                                          const url =
                                                            window.URL.createObjectURL(
                                                              blob
                                                            );
                                                          const a =
                                                            document.createElement(
                                                              "a"
                                                            );
                                                          a.style.display =
                                                            "none";
                                                          a.href = url;
                                                          a.download =
                                                            messageFile
                                                              .split("/")
                                                              .pop();
                                                          document.body.appendChild(
                                                            a
                                                          );
                                                          a.click();
                                                          window.URL.revokeObjectURL(
                                                            url
                                                          );
                                                        })
                                                        .catch((error) => {
                                                          console.error(
                                                            "Error fetching the file:",
                                                            error
                                                          );
                                                        });
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </Worker>
                                          ) : (
                                            <div
                                              style={{
                                                border: "1px solid #ccc",
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                                marginTop: "10px",
                                                backgroundColor: "#f9f9f9",
                                                boxShadow:
                                                  "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              }}
                                            >
                                              <img
                                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`}
                                                alt="Attached file"
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                  borderBottom:
                                                    "1px solid #ccc",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  padding: "10px",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                  }}
                                                ></div>
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      )}
                                      {message}

                                      <sub
                                        title="2020-10-08 09:35:19"
                                        className="message-time"
                                      >
                                        <FaCheckDouble />{" "}
                                        {`${formatTimeAgo(createdAt)}`}
                                      </sub>
                                    </p>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="message-card">
                                  <p>
                                    {messageFile && (
                                      <>
                                        {messageFile.endsWith(".pdf") ? (
                                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                            <div
                                              style={{
                                                border: "1px solid #ccc",
                                                borderRadius: "10px",
                                                padding: "10px",
                                                backgroundColor: "#f9f9f9",
                                                textAlign: "center",
                                                boxShadow:
                                                  "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              }}
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
                                                  }}
                                                >
                                                  {messageFile.split("/").pop()}
                                                </strong>
                                                <HiOutlineDocumentDownload
                                                  size={30}
                                                  style={{
                                                    cursor: "pointer",
                                                    color: "blue",
                                                  }}
                                                  onClick={() => {
                                                    fetch(
                                                      `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`
                                                    )
                                                      .then((response) =>
                                                        response.blob()
                                                      )
                                                      .then((blob) => {
                                                        const url =
                                                          window.URL.createObjectURL(
                                                            blob
                                                          );
                                                        const a =
                                                          document.createElement(
                                                            "a"
                                                          );
                                                        a.style.display =
                                                          "none";
                                                        a.href = url;
                                                        a.download = messageFile
                                                          .split("/")
                                                          .pop();
                                                        document.body.appendChild(
                                                          a
                                                        );
                                                        a.click();
                                                        window.URL.revokeObjectURL(
                                                          url
                                                        );
                                                      })
                                                      .catch((error) => {
                                                        console.error(
                                                          "Error fetching the file:",
                                                          error
                                                        );
                                                      });
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </Worker>
                                        ) : (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              overflow: "hidden",
                                              marginTop: "10px",
                                              backgroundColor: "#f9f9f9",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                          >
                                            <img
                                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`}
                                              alt="Attached file"
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                                borderBottom: "1px solid #ccc",
                                              }}
                                            />
                                            <div
                                              style={{
                                                padding: "10px",
                                                textAlign: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {message}
                                    <sub title="2022-08-09 16:38:31">
                                      {`${formatTimeAgo(createdAt)}`}
                                    </sub>
                                  </p>
                                </div>
                              );
                            }
                          }
                        )
                      ) : (
                        <p></p>
                      )}
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
                    {/* {messages?.receiver?.name && ( */}
                      <div
                        className="messenger-sendCard"
                        style={{
                          display: "block",
                          position: "sticky",
                          bottom: "0",
                          backgroundColor: "white",
                          zIndex: 10,
                        }}
                      >
                        <form
                          // onSubmit={(e) => {
                          //   e.preventDefault();
                          //   sendMessage(e);
                          // }}
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
                                  width={ 440}
                                  // display="none"
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

                          {/* Send Button */}
                          <button type="submit">
                            <FaPaperPlane />
                          </button>
                        </form>
                      </div>
                    {/* )} */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassGroupChat;