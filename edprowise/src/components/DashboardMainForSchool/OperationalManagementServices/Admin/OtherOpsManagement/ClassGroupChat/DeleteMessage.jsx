import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import getAPI from "../../../api/getAPI";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const DeleteMessage = ({
  messages = [],
  setMessages,
  conversationId,
  onClose,
  isMobile,
  activeStep,
  handleClick,
}) => {
  console.log(conversationId, "conversationId");
  console.log(messages, "messages");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);

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
  };

  // Check if there are any photos or PDFs in the messages
  const hasPhotos = messages?.messages?.some(
    (msg) => msg.messageFile && !msg.messageFile.endsWith(".pdf")
  );
  const hasPDFs = messages?.messages?.some(
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
      <div className="avatar av-l" style={{borderRadius:"50%", width:"100px", height:"100px"}}>
        <img
          src=" data:image/jpeg;base64,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"
          alt="Teacher"
        />  
      </div>
      <p className="info-name">{messages?.receiver?.name}</p>
      <p className="info-name">{messages?.receiver?.role}</p>
      <div className="messenger-infoView-btns">
        <Link
          // href="#"
          className="danger delete-conversation"
          style={{ display: "flex", justifyContent: "center" }}
          // onClick={(e) => {
          //   e.preventDefault();
          //   openDeleteDialog(conversationId);
          // }}
        >
          <div className="d-flex align-items-center mr-4">
            <FaRegTrashAlt className="" />
            {/* <i className="ti ti-trash" style={{ fontSize: "30px" }}></i> */}
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
              {messages.messages.map(({ messageFile }) =>
                messageFile && !messageFile.endsWith(".pdf") ? (
                  <div
                    className="message-image"
                    style={{ height: "150px", width: "100%" }}
                    key={messageFile}
                  >
                    <img
                      src={`${messageFile}`}
                      alt="Shared file"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p>Nothing shared yet</p>
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
              {messages.messages.map(({ messageFile }) =>
                messageFile && messageFile.endsWith(".pdf") ? (
                  <Worker
                    workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                    key={messageFile}
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
                      }}
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
                        {messageFile.split("/").pop()}
                      </strong>
                      <HiOutlineDocumentDownload
                        size={30}
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => {
                          fetch(
                            `${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`
                          )
                            .then((response) => response.blob())
                            .then((blob) => {
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.style.display = "none";
                              a.href = url;
                              a.download = messageFile.split("/").pop();
                              document.body.appendChild(a);
                              a.click();
                              window.URL.revokeObjectURL(url);
                            })
                            .catch((error) => {
                              console.error("Error fetching the file:", error);
                            });
                        }}
                      />
                    </div>
                  </Worker>
                ) : null
              )}
            </div>
          ) : (
            <p>No PDFs shared yet</p>
          )}
        </div>
      </div>

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