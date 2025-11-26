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
import { CiCirclePlus } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
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

    {
      conversationId: 4,
      user: {
        receiverId: 5,
        name: "Training Group",
        profileImage: "/group-avatar.png",
      },
      lastMessage: "New material uploaded",
    },

    {
      conversationId: 5,
      user: {
        receiverId: 6,
        name: "Training Group",
        profileImage: "/group-avatar.png",
      },
      lastMessage: "New material uploaded",
    },

    {
      conversationId: 6,
      user: {
        receiverId: 7,
        name: "Training Group",
        profileImage: "/group-avatar.png",
      },
      lastMessage: "New material uploaded",
    },

    {
      conversationId: 7,
      user: {
        receiverId: 8,
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
    setMessages({
      messages: sampleMessages,
      receiver:2,
      conversationId :1,
    });
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
                    <div className="d-flex align-item-center">
                      <input
                        type="text"
                        className="messenger-search"
                        placeholder="Search"
                      />
                      <div className="align-content-center">
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
                                        src=" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEg4SEQ8PEBUQEBAQDRAQEA8QDRAPGBIWFhUSFRUYHSkhGCYlGxMVITEhJiktLi4uFx8zODMtNygtLjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAYBAwUHAv/EAD4QAAIBAgIGBgcFBwUAAAAAAAABAgMRBBIFBiExUXFBYYGRobEiMkJScsHREzNic7I0U5Ki4fDxFBUjY8L/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfNWooq8mopdLOVidORWynHN+KWyPdvfgB1wVirpWrL28vVFJf1NSx9X97PvAtgKxDS1Ve3fnGJKpaeftU0/hbXncDug5P++w9yf8v1J+ExcaqvF7t6eyS5gbwAAAAAAAAAAAAAAAAAAAAAAAAAAIukMYqUbtXb2RXFkor+sFW84x92Pi/wCiQEDE4mVR3m78F7K6kjUAAAAAAACRgMS6c4y6N0uuPSRwBcqdRSV4yUlxi014H0V/QWLUG4S2KbWV9GbdbtLAAAAAAAAAAAAAAAAAAAAAAAAAAKljquepUlxk7clsXgi2v/BSgMgsGgdFU69KbmndVGlKLaaWVdnSMRqxKLvTnGaTvlneLfVdb/ACvgsmJ1YulKlLK2runU22fDMjkYnRNan61KVuMfTj4AQgCXgtHSrKTpuLlHfBu0nHir7GBEBZcBo+lWWStSdKrFbbXg5r30tz6zVpLVxU4TnCpJ5FmyyS2rp2r6AcPDevT+OPmi4FOw/rw+OPmi4gAAAAAAAAAAAAAAAAAAAAAAAACpaQp5alRfibXJ7fmW0rusFO1RS96Kfatn0AsmrdHJh4cZ5pvtezwSOmasJTyQpx92EI90UjaAAAGqvhoT9enCfxRTIsND0oyU4RlTktzhKS8HddhPAGLbr7befE1Y2nmp1Y+9Ca74s3GQPOcIrzprjOPmi4Fb0fh7YjL+7nP+W687FkAAAAAAAAAAAAAAAAAAAAAAAAA+6MLyS4nO1pwdqaktqjLwexrvsdPDetH++gl4vDqpCcH7cXHk7bGBsi7pPikzJrwqeSnffkjfnlVzYAAAAAADJgAVrQOFz1cRUe7PKKfOTb+R1K8MsmkSNG4X7KnCHTa83xm9svE04r1n2eQGkAAAAAAAAAAAAAAAAAAAAAAAGYys010HThK6T4nLJuCfovmBIAAAAAAAAAAGJSsm+BzJyu2+JNxj9Hm0QQAAAAAAAAAAAAAAAAAAAAAAAABIwtVRun07iOAOqD5pTuk+rbzPoAAAAAAAHzUlZN8AIuLqp2S6HtIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAScFU3x47VzJhy07beB0qVTMk+/mB9AAAAABFxtTdHtZIqTsm30HNlK7bfSBgAAAAAAAAAAAAAAAAAAAAAAAAAAAABmKu0uJuozyNrovZ/U5ui8b9viHGD/AOOjFynL357opdW99eU6M1tfNgT0wQ6VRx5cCRGsn1cwNgZrlWS6+Roq1HLqXADFWedpLd0dbIxJor0lzOTWxv2eInRqPZJqdCb4S9h9t0uQE0AAAAAAAAAAAAAAAAAAAAAAAAHzUqKKvJqK4tpLxObidPUYbm6j4QWzvewDqHA1i0pa9GD2v72S6F7q+ZExesdSWyCjT6/Wl47PA40ne7bu3tbe9sC7akYfLRnPpqTsvhirLxcjsOJp1epZcNh1xpqX8XpfMmVIgaMoym2wsBqyjKbbCwHxTjtXMruveH2UKnXKnL9UfKRaKaOTrfSzYab9yUJL+K3/AKA5egNKfar7Ob9OK2N+3HjzR2Dz6nUcWpRbi07premdnCayTVlUhGfWvRl9ALQDm4bTlGft5Hwmsvju8ToxkmrpprindAZAAAAAAAAAAAAACFidLUad1Korreo3k78Nm4iax4504KEXaVS92t6h09+7vKmBZa+s0V6lOT65tRXcrnOxGnq090lBfgSv3u7OWAPupUlJ3lKUnxk234nwAwAYDA9UwsMsKcfdhCPdFI2SRqwVXPTpSXtU4S74pmjSVSo4TVBpTSum4qSvw27AJVhY4eh9ZI1fQrWpVE7XeyEnw2+q+pnYeLprfVpLnUh9QNlhY0PSNFb8RQXOrT+pxdLay2f2WFSqTk8qmlmgn+H3ue7mBZEiDp6GbD4hf9Un3K/yNuBqTywVVpzt6TSyxb6kaNYKuXDYh8abj2y9FeYHmwAAGyjWlB3hKUfhbXkawB1sPrBWjvcanxKz71Y6NDWWD9enKPXFqS+RWABecLpKlVaUKibe6LvGXc95LPPF/guWgsc61P0n6UHln18Jf3wYHRAAAAAAABTtYq2avPhBRgu678WzmEjSEr1az41J/qZHAAAAYfQZMdPJef8AgDIMmALzqni3UoKmt9JuLfCD2xfi12HfhGysjz3VrSP2FZOTtCp6FTguEux+DZ6GBStdsHGFSnUirfaqWfg5Rtt7n4Fbsei6yYONWhUzOzpxlVi7XacU3btWw86AFy1L0clB15L0pNxpt9EFsbXN3XYVbR2HVWrSpt5VOcYtrers9OpU1CMYxVlFKMUtyS3IBOF/k+BWddMY1Tp0emcs0uuEd3e34FnnJJNtpJJtt7klvZ5rpnH/AOorTqdHq01wgt317QIIBkD5j09TMmFvfY/P6GQAAAHa1WrWqyj78H3p38mzik/QUrV6PW2u+LQF1AAAAAAgAKDi/vKnxz/UzSAAAAAiYv1ly+YAG2gbgADPU8D93S/Lh+lAAR9Ofs+I/Kn5HmgAEvRP3+H/ADaf6kenAAc/WH9mxH5bPNgABHrgAfOC9rs+ZKAAAAATdDff0fjQAF3AAAAAf//Z"
                                        alt="Teacher"
                                      />
                                    </div>
                                    <span
                                      className="d-inline-block text-dark text-truncate"
                                      style={{ maxWidth: "60px" }}
                                    >
                                      jack roy
                                    </span>
                                  </td>
                                  <td style={{ position: "relative" }}>
                                    <div
                                      data-action={0}
                                      className="avatar av-m"
                                      style={{ borderRadius: "50%" }}
                                    >
                                      <img
                                        src=" data:image/jpeg;base64,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"
                                        alt="Teacher"
                                      />
                                    </div>
                                    <span
                                      className="d-inline-block text-dark text-truncate"
                                      style={{ maxWidth: "60px" }}
                                    >
                                      jack roy
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
                                          src=" data:image/jpeg;base64,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"
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
                                      src="data:image/png;base64,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"
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
                              src="data:image/png;base64,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"
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
                                          // style={{ float: "inline-end", bottom:"-21px" }}
                                        >
                                          {`${formatTimeAgo(createdAt)}`}
                                          <FaCheckDouble className="ms-1" />{" "}
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
                          // position: "sticky",
                          bottom: "0",
                          backgroundColor: "white",
                          zIndex: 10,
                          // border: "1px solid",
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
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
