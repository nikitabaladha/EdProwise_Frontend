import React, { useRef, useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import {
  FaUsers,
  FaPaperclip,
  FaPaperPlane,
  FaSmile,
  FaCheckDouble,
  // FaCircleInfo,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import DeleteMessage from "./DeleteMessage";

const ClassGroupChat = () => {
  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    profileImage: "/default-avatar.png",
  });

  // Mock conversations and messages
  const [conversations, setConversations] = useState([
    {
      conversationId: 1,
      user: {
        receiverId: 2,
        name: "HR Department",
        profileImage: "/hr-avatar.png",
      },
      lastMessage: "Hello, how can we help you?",
    },
    {
      conversationId: 2,
      user: {
        receiverId: 3,
        name: "IT Support",
        profileImage: "/it-avatar.png",
      },
      lastMessage: "Your ticket has been resolved",
    },
    {
      conversationId: 3,
      user: {
        receiverId: 4,
        name: "Training Group",
        profileImage: "/group-avatar.png",
      },
      lastMessage: "New material uploaded",
    },
  ]);

  const [messages, setMessages] = useState({
    messages: [],
    receiver: null,
    conversationId: null,
  });

  const [message, setMessage] = useState("");
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

  // Mock users for group tab
  const mockUsers = [
    {
      user: {
        receiverId: 2,
        name: "HR Department",
        profileImage: "/hr-avatar.png",
      },
    },
    {
      user: {
        receiverId: 5,
        name: "Finance Team",
        profileImage: "/finance-avatar.png",
      },
    },
    {
      user: {
        receiverId: 6,
        name: "Marketing",
        profileImage: "/marketing-avatar.png",
      },
    },
  ];

  // Sample messages for demonstration
  const sampleMessages = [
    // {
    //   message: "Hello there!",
    //   createdAt: new Date(Date.now() - 300000).toISOString(),
    //   user: { id: 2 },
    //   messageFile: null,
    // },
    // {
    //   message: "How can I help you with your training?",
    //   createdAt: new Date(Date.now() - 240000).toISOString(),
    //   user: { id: 2 },
    //   messageFile: null,
    // },
    // {
    //   message: "I have a question about the new module.",
    //   createdAt: new Date(Date.now() - 120000).toISOString(),
    //   user: { id: 1 },
    //   messageFile: null,
    // },
    // {
    //   message: "Please check this document for reference.",
    //   createdAt: new Date(Date.now() - 60000).toISOString(),
    //   user: { id: 2 },
    //   messageFile: "/sample-document.pdf",
    // },
  ];
 
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
    setSelectedTrainee(messages);
    setIsModalOpen(true);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);

  const fetchUsers = async () => {
    setUsers(mockUsers);
    setCurrentView("groups");
  };

  const fetchMessages = (conversationId, receiver) => {
    setMessages({
      messages: sampleMessages,
      receiver,
      conversationId,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() && !file) return;

    const newMessage = {
      message,
      createdAt: new Date().toISOString(),
      user: { id: user.id },
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="cards m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  {/* <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Class Group Chat
                  </h4> */}
                </div>
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
                    // height: "75vh",
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
                    <input
                      type="text"
                      className="messenger-search"
                      placeholder="Search"
                    />

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
                        className={activeTab === "groups" ? "active-tab" : ""}
                        data-view="groups"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("groups");
                          setCurrentView("groups");
                        }}
                      >
                        <FaUsers />
                      </a>
                    </div>
                  </div>
                  <div className="m-body" style={{ flexGrow: 1 }}>
                    <div className="">
                      <p className="messenger-title text-dark">Favorites</p>
                      <div
                        className="listOfContacts"
                        style={{
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <table className="messenger-list-item">
                          <tbody>
                            <tr data-action={0}>
                              <td style={{ position: "relative" }}>
                                <div
                                  data-action={0}
                                  className="avatar av-m"
                                  style={{ borderRadius: "50%" }}
                                >
                                  <img
                                    alt="Teacher"
                                  />
                                </div>
                              </td>
                              <td style={{ position: "relative" }}>
                                <div
                                  data-action={0}
                                  className="avatar av-m"
                                  style={{ borderRadius: "50%" }}
                                >
                                  <img
                                    alt="Teacher"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <p className="messenger-title text-dark">Regular</p>
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
                          {conversations.map(
                            ({
                              conversationId,
                              user: conversationUser,
                              lastMessage,
                            }) => (
                              <table
                                key={conversationId}
                                className="messenger-list-item"
                                data-contact={conversationUser.receiverId}
                                onClick={() =>
                                  fetchMessages(
                                    conversationId,
                                    conversationUser
                                  )
                                }
                              >
                                <tbody onClick={() => handleClick(2)}>
                                  <tr data-action={0}>
                                    <td style={{ position: "relative" }}>
                                      <div
                                        data-id={conversationUser.receiverId}
                                        data-action={0}
                                        className="avatar av-m"
                                        style={{ borderRadius: "50%" }}
                                      >
                                        <img
                                          alt="Teacher"
                                        />
                                      </div>
                                    </td>
                                    <td width="100%">
                                      <p
                                        data-id={conversationUser.receiverId}
                                        data-type="user"
                                        style={{ textAlign: "start" }}
                                      >
                                        {conversationUser.name}
                                        <span></span>
                                      </p>
                                      <span
                                        style={{
                                          justifyContent: "left",
                                          display: "flex",
                                        }}
                                      >
                                        <span className="lastMessageIndicator">
                                          {lastMessage}
                                        </span>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {currentView === "groups" && (
                      <div
                        className="all_members messenger-tab app-scroll"
                        data-view="groups"
                        style={{ display: "block" }}
                      >
                        {users.map((item) => (
                          <table
                            key={item.user.receiverId}
                            className="messenger-list-item"
                            onClick={() => fetchMessages("new", item.user)}
                          >
                            <tbody>
                              <tr>
                                <td style={{ position: "relative" }}>
                                  <div
                                    className="avatar av-m"
                                    style={{ borderRadius: "50%" }}
                                  >
                                    <img
                                      alt="Teacher"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <p>{item.user.name}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
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
                  {messages?.receiver?.name && (
                    <div className="m-header m-header-messaging">
                      <nav className="d-flex align-items-center justify-content-between">
                        <div style={{ display: "flex" }}>
                          <a href="#" className="show-listView">
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
                            />
                          </div>
                          <div className="d-grid ">
                            <a href="#" className="user-name">
                              {messages?.receiver?.name}
                            </a>
                            <span className="fs-6">SchholABC, Teacher</span>
                          </div>
                        </div>
                        <nav className="m-header-right">
                          <a
                            href="#"
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                            // onClick={() => handleEdit(messages)}
                          >
                            <FaRegStar />
                          </a>
                          <a
                            href="#"
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                            onClick={() => handleEdit(messages)}
                          >
                            <FaCircleInfo
                            //  onClick={() => handleClick(3)}
                            />
                          </a>
                        </nav>
                      </nav>
                    </div>
                  )}

                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div
                      className="messages"
                      style={{ height: "60vh", overflowY: "auto" }}
                    >
                      <div>
                        {messages?.messages?.length > 0 ? (
                          messages.messages.map(
                            (
                              {
                                message,
                                createdAt,
                                messageFile,
                                user: { id } = {},
                              },
                              index
                            ) => {
                              if (id === user?.id) {
                                return (
                                  <div
                                    key={index}
                                    className="message-card mc-sender"
                                    title={createdAt}
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
                                                  />
                                                </div>
                                              </div>
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
                                                  src={messageFile}
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
                                          title={createdAt}
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
                                  <div key={index} className="message-card">
                                    <p>
                                      {messageFile && (
                                        <>
                                          {messageFile.endsWith(".pdf") ? (
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
                                                />
                                              </div>
                                            </div>
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
                                                src={messageFile}
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
                                      <sub title={createdAt}>
                                        {`${formatTimeAgo(createdAt)}`}
                                      </sub>
                                    </p>
                                  </div>
                                );
                              }
                            }
                          )
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
                    {messages?.receiver?.name && (
                      <div
                        className="messenger-sendCard"
                        style={{
                          display: "block",
                          position: "sticky",
                          bottom: "0",
                          backgroundColor: "white",
                          zIndex: 10,
                          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                        }}
                      >
                        <form onSubmit={sendMessage} className="paper-plane">
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

                          {/* Send Button */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassGroupChat;