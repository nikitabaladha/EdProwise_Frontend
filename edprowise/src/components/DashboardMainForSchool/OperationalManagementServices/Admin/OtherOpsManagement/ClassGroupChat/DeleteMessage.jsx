// import React from "react";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { TiTimes } from "react-icons/ti";
// import { useState } from "react";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// // import getAPI from "../../../api/getAPI";
// import { Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { HiOutlineDocumentDownload } from "react-icons/hi";

// const DeleteMessage = ({
//   messages = [],
//   setMessages,
//   conversationId,
//   onClose,
//   isMobile,
//   activeStep,
//   handleClick,
// }) => {
//   console.log(conversationId, "conversationId");
//   console.log(messages, "messages");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedTrainee, setSelectedTrainee] = useState(null);

//   const openDeleteDialog = (conversationId) => {
//     console.log("conversationId to delete:", conversationId);
//     setSelectedTrainee(conversationId);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedTrainee(null);
//   };

//   const handleDeleteConfirmed = (_id) => {
//     setMessages((prevMessages) => {
//       if (Array.isArray(prevMessages)) {
//         return prevMessages.filter((msg) => msg.conversationId !== _id);
//       }
//       console.log("prevMessages is not an array", prevMessages);
//       return prevMessages || [];
//     });
//     setIsDeleteDialogOpen(false);
//     setSelectedTrainee(null);
//   };

//   // Check if there are any photos or PDFs in the messages
//   const hasPhotos = messages?.messages?.some(
//     (msg) => msg.messageFile && !msg.messageFile.endsWith(".pdf")
//   );
//   const hasPDFs = messages?.messages?.some(
//     (msg) => msg.messageFile && msg.messageFile.endsWith(".pdf")
//   );

//   return (
//     <div
//       className="messenger-infoView app-scroll text-center"
//       style={{
//         maxHeight: "calc(100vh - 150px)",
//         overflowY: "auto",
//         display: isMobile && activeStep !== 3 ? "none" : "block",
//       }}
//     >
//       <nav className="text-center">
//         <Link onClick={onClose}>
//           <TiTimes onClick={() => handleClick(2)} />
//         </Link>
//       </nav>
//       <div
//         className="avatar av-l"
//         style={{ borderRadius: "50%", width: "100px", height: "100px" }}
//       >
//         <img
//           src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`}
//           alt="Teacher"
//         />
//       </div>
//       <p className="info-name">{messages?.receiver?.name}</p>
//       <p className="info-name">{messages?.receiver?.role}</p>
//       <div className="messenger-infoView-btns">
//         <Link
//           // href="#"
//           className="danger delete-conversation"
//           style={{ display: "flex", justifyContent: "center" }}
//           // onClick={(e) => {
//           //   e.preventDefault();
//           //   openDeleteDialog(conversationId);
//           // }}
//         >
//           <div className="d-flex align-items-center mr-4">
//             <FaRegTrashAlt className="" />
//             {/* <i className="ti ti-trash" style={{ fontSize: "30px" }}></i> */}
//             <span className="ms-1">Delete Conversation</span>
//           </div>
//         </Link>
//       </div>

//       <div className="messenger-infoView-shared" style={{ display: "block" }}>
//         <p className="messenger-title">Shared Files</p>

//         {/* Shared Photos Section */}
//         <div className="shared-photos-section">
//           <p className="section-title">Shared Photos</p>
//           {hasPhotos ? (
//             <div
//               className="photos-container"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: "10px",
//                 overflowY: "auto",
//                 maxHeight: "300px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               {messages.messages.map(({ messageFile }) =>
//                 messageFile && !messageFile.endsWith(".pdf") ? (
//                   <div
//                     className="message-image"
//                     style={{ height: "150px", width: "100%" }}
//                     key={messageFile}
//                   >
//                     <img
//                       src={`${messageFile}`}
//                       alt="Shared file"
//                       style={{
//                         height: "100%",
//                         width: "100%",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                       }}
//                     />
//                   </div>
//                 ) : null
//               )}
//             </div>
//           ) : (
//             <p>Nothing shared yet</p>
//           )}
//         </div>

//         {/* Shared PDFs Section */}
//         <div className="shared-pdfs-section" style={{ marginTop: "20px" }}>
//           <p className="section-title">Shared PDFs</p>
//           {hasPDFs ? (
//             <div
//               className="pdf-container"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//                 overflowY: "auto",
//                 maxHeight: "300px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               {messages.messages.map(({ messageFile }) =>
//                 messageFile && messageFile.endsWith(".pdf") ? (
//                   <Worker
//                     workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
//                     key={messageFile}
//                   >
//                     <div
//                       className="pdf-item"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         borderRadius: "8px",
//                         backgroundColor: "#f9f9f9",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                       }}
//                     >
//                       <strong
//                         style={{
//                           flex: 1,
//                           color: "#333",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {messageFile.split("/").pop()}
//                       </strong>
//                       <HiOutlineDocumentDownload
//                         size={30}
//                         style={{ cursor: "pointer", color: "blue" }}
//                         onClick={() => {
//                           fetch(
//                             `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`
//                           )
//                             .then((response) => response.blob())
//                             .then((blob) => {
//                               const url = window.URL.createObjectURL(blob);
//                               const a = document.createElement("a");
//                               a.style.display = "none";
//                               a.href = url;
//                               a.download = messageFile.split("/").pop();
//                               document.body.appendChild(a);
//                               a.click();
//                               window.URL.revokeObjectURL(url);
//                             })
//                             .catch((error) => {
//                               console.error("Error fetching the file:", error);
//                             });
//                         }}
//                       />
//                     </div>
//                   </Worker>
//                 ) : null
//               )}
//             </div>
//           ) : (
//             <p>No PDFs shared yet</p>
//           )}
//         </div>
//       </div>

//       {isDeleteDialogOpen && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType="conversation"
//           id={selectedTrainee}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default DeleteMessage;

// import React, {useState,} from "react";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { TiTimes } from "react-icons/ti";
// import { useState } from "react";
// import ConfirmationDialog from "../../ConfirmationDialog";
// import { Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { HiOutlineDocumentDownload } from "react-icons/hi";

// const DeleteMessage = ({
//   messages = [],
//   setMessages,
//   conversationId,
//   onClose,
//   isMobile,
//   activeStep,
//   handleClick,
// }) => {
//   console.log(conversationId, "conversationId");
//   console.log(messages, "messages");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedTrainee, setSelectedTrainee] = useState(null);
// const [currentMessages, setCurrentMessages] = useState(messages);

// useEffect(() => {
//   console.log("Messages prop changed, updating local state");
//   setCurrentMessages(messages);
// }, [messages, conversationId]);


//   const openDeleteDialog = (conversationId) => {
//     console.log("conversationId to delete:", conversationId);
//     setSelectedTrainee(conversationId);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedTrainee(null);
//   };

//   const handleDeleteConfirmed = (_id) => {
//     setMessages((prevMessages) => {
//       if (Array.isArray(prevMessages)) {
//         return prevMessages.filter((msg) => msg.conversationId !== _id);
//       }
//       console.log("prevMessages is not an array", prevMessages);
//       return prevMessages || [];
//     });
//     setIsDeleteDialogOpen(false);
//     setSelectedTrainee(null);
//   };

//   // Check if there are any photos or PDFs in the messages
//   const hasPhotos = messages?.messages?.some(
//     (msg) => msg.messageFile && !msg.messageFile.endsWith(".pdf")
//   );
//   const hasPDFs = messages?.messages?.some(
//     (msg) => msg.messageFile && msg.messageFile.endsWith(".pdf")
//   );

//   return (
//     <div
//       className="messenger-infoView app-scroll text-center"
//       style={{
//         maxHeight: "calc(100vh - 150px)",
//         overflowY: "auto",
//         display: isMobile && activeStep !== 3 ? "none" : "block",
//       }}
//     >
//       <nav className="text-center">
//         <Link onClick={onClose}>
//           <TiTimes onClick={() => handleClick(2)} />
//         </Link>
//       </nav>
//       <div
//         className="avatar av-l"
//         style={{ borderRadius: "50%", width: "100px", height: "100px" }}
//       >
       
//         <img
//           alt="Teacher"
//           src={
//             messages?.receiver?.isGroup
//               ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.groupImage}`
//               : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage}`
//           }
//         />
//       </div>
//       <p className="info-name">{messages?.receiver?.name}</p>
//       <p className="info-name">{messages?.receiver?.role}</p>
//       <div className="messenger-infoView-btns">
//         <Link
//           // href="#"
//           className="danger delete-conversation"
//           style={{ display: "flex", justifyContent: "center" }}
//           onClick={(e) => {
//             e.preventDefault();
//             openDeleteDialog(conversationId);
//           }}
//         >
//           <div className="d-flex align-items-center mr-4">
//             <FaRegTrashAlt className="" />
//             {/* <i className="ti ti-trash" style={{ fontSize: "30px" }}></i> */}
//             <span className="ms-1">Delete Conversation</span>
//           </div>
//         </Link>
//       </div>

//       <div className="messenger-infoView-shared" style={{ display: "block" }}>
//         <p className="messenger-title">Shared Files</p>

//         {/* Shared Photos Section */}
//         <div className="shared-photos-section">
//           <p className="section-title">Shared Photos</p>
//           {hasPhotos ? (
//             <div
//               className="photos-container"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: "10px",
//                 overflowY: "auto",
//                 maxHeight: "300px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               {messages.messages.map(({ messageFile }) =>
//                 messageFile && !messageFile.endsWith(".pdf") ? (
//                   <div
//                     className="message-image"
//                     style={{ height: "150px", width: "100%" }}
//                     key={messageFile}
//                   >
                   
//                     <img
//                       src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`}
//                       alt="Shared file"
//                       style={{
//                         height: "100%",
//                         width: "100%",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                       }}
//                     />
//                   </div>
//                 ) : null
//               )}
//             </div>
//           ) : (
//             <p>Nothing shared yet</p>
//           )}
//         </div>

//         {/* Shared PDFs Section */}
//         <div className="shared-pdfs-section" style={{ marginTop: "20px" }}>
//           <p className="section-title">Shared PDFs</p>
//           {hasPDFs ? (
//             <div
//               className="pdf-container"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//                 overflowY: "auto",
//                 maxHeight: "300px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               {messages.messages.map(({ messageFile }) =>
//                 messageFile && messageFile.endsWith(".pdf") ? (
//                   <Worker
//                     workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
//                     key={messageFile}
//                   >
//                     <div
//                       className="pdf-item"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         borderRadius: "8px",
//                         backgroundColor: "#f9f9f9",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                       }}
//                     >
//                       <strong
//                         style={{
//                           flex: 1,
//                           color: "#333",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {messageFile.split("/").pop()}
//                       </strong>
//                       <HiOutlineDocumentDownload
//                         size={30}
//                         style={{ cursor: "pointer", color: "blue" }}
//                         onClick={() => {
//                           fetch(
//                             `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`
//                           )
//                             .then((response) => response.blob())
//                             .then((blob) => {
//                               const url = window.URL.createObjectURL(blob);
//                               const a = document.createElement("a");
//                               a.style.display = "none";
//                               a.href = url;
//                               a.download = messageFile.split("/").pop();
//                               document.body.appendChild(a);
//                               a.click();
//                               window.URL.revokeObjectURL(url);
//                             })
//                             .catch((error) => {
//                               console.error("Error fetching the file:", error);
//                             });
//                         }}
//                       />
//                     </div>
//                   </Worker>
//                 ) : null
//               )}
//             </div>
//           ) : (
//             <p>No PDFs shared yet</p>
//           )}
//         </div>
//       </div>

//       {isDeleteDialogOpen && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType="conversation"
//           id={selectedTrainee}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default DeleteMessage;

import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { toast } from "react-toastify";

const DeleteMessage = ({
  messages = [],
  setMessages,
  conversationId,
  onClose,
  isMobile,
  activeStep,
  handleClick,
}) => {
  console.log("DeleteMessage rendered with:", { 
    conversationId, 
    messagesCount: messages?.messages?.length,
    receiver: messages?.receiver?.name 
  });
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(messages);

  // Reset local state when messages prop changes
  useEffect(() => {
    console.log("Messages prop changed, updating local state");
    setCurrentMessages(messages);
  }, [messages, conversationId]);

  const openDeleteDialog = (conversationId) => {
    console.log("conversationId to delete:", conversationId);
    setSelectedTrainee(conversationId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTrainee(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setMessages((prevMessages) => {
      if (Array.isArray(prevMessages)) {
        return prevMessages.filter((msg) => msg.conversationId !== _id);
      }
      console.log("prevMessages is not an array", prevMessages);
      return prevMessages || [];
    });
    setIsDeleteDialogOpen(false);
    setSelectedTrainee(null);
    onClose(); // Close the DeleteMessage modal after deletion
  };

  // Download function for both images and PDFs
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

  // Check if there are any photos or PDFs in the messages
  const hasPhotos = currentMessages?.messages?.some(
    (msg) => msg.messageFile && !msg.messageFile.endsWith(".pdf")
  );
  const hasPDFs = currentMessages?.messages?.some(
    (msg) => msg.messageFile && msg.messageFile.endsWith(".pdf")
  );

  return (
    <div
      className="messenger-infoView app-scroll text-center"
      style={{
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
        display: isMobile && activeStep !== 3 ? "none" : "block",
      }}
    >
      <nav className="text-center">
        <Link onClick={onClose}>
          <TiTimes onClick={() => handleClick(2)} />
        </Link>
      </nav>
      
      {/* Show loading state if messages are not available */}
      {!currentMessages?.receiver ? (
        <div className="text-center py-4">
          <p>Loading conversation details...</p>
        </div>
      ) : (
        <>
          <div
            className="avatar av-l"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          >
            <img
              alt="Chat"
              src={
                currentMessages?.receiver?.isGroup
                  ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${currentMessages?.receiver?.groupImage}`
                  : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${currentMessages?.receiver?.profileImage}`
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <p className="info-name">{currentMessages?.receiver?.name}</p>
          {/* <p className="info-name">{currentMessages?.receiver?.role || "User"}</p> */}
          
          <div className="messenger-infoView-btns">
            <Link
              className="danger delete-conversation"
              style={{ display: "flex", justifyContent: "center" }}
              onClick={(e) => {
                e.preventDefault();
                openDeleteDialog(conversationId);
              }}
            >
              <div className="d-flex align-items-center mr-4">
                <FaRegTrashAlt className="" />
                <span className="ms-1">Delete Conversation</span>
              </div>
            </Link>
          </div>

          <div className="messenger-infoView-shared" style={{ display: "block" }}>
            <p className="messenger-title">Shared Files</p>

            {/* Shared Photos Section */}
            <div className="shared-photos-section">
              <p className="section-title">Shared Photos</p>
              {hasPhotos ? (
                <div
                  className="photos-container"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    overflowY: "auto",
                    maxHeight: "300px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  {currentMessages.messages
                    .filter(msg => msg.messageFile && !msg.messageFile.endsWith(".pdf"))
                    .map((msg, index) => (
                    <div
                      className="message-image"
                      style={{ 
                        height: "150px", 
                        width: "100%",
                        position: "relative",
                        cursor: "pointer"
                      }}
                      key={msg._id || index}
                      onClick={() => downloadFile(msg.messageFile)}
                      title="Click to download"
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${msg.messageFile}`}
                        alt="Shared file"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      {/* Download overlay for images */}
                      <div
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
                      >
                        <HiOutlineDocumentDownload
                          size={16}
                          style={{
                            color: "white",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No photos shared yet</p>
              )}
            </div>

            {/* Shared PDFs Section */}
            <div className="shared-pdfs-section" style={{ marginTop: "20px" }}>
              <p className="section-title">Shared PDFs</p>
              {hasPDFs ? (
                <div
                  className="pdf-container"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    overflowY: "auto",
                    maxHeight: "300px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  {currentMessages.messages
                    .filter(msg => msg.messageFile && msg.messageFile.endsWith(".pdf"))
                    .map((msg, index) => (
                    <Worker
                      workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                      key={msg._id || index}
                    >
                      <div
                        className="pdf-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#f9f9f9",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                        }}
                        onClick={() => downloadFile(msg.messageFile)}
                        title="Click to download"
                      >
                        <strong
                          style={{
                            flex: 1,
                            color: "#333",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {msg.messageFile.split("/").pop()}
                        </strong>
                        <HiOutlineDocumentDownload
                          size={30}
                          style={{ cursor: "pointer", color: "blue" }}
                        />
                      </div>
                    </Worker>
                  ))}
                </div>
              ) : (
                <p>No PDFs shared yet</p>
              )}
            </div>
          </div>
        </>
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="conversation"
          id={selectedTrainee}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default DeleteMessage;