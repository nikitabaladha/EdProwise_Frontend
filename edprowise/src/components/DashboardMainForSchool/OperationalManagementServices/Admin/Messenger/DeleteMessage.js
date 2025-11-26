import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
// import ConfirmationDialog from "../ConfirmationDialog";
import ConfirmationDialog from "../../../../ConfirmationDialog";
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
        <Link href="#" onClick={onClose}>
          <TiTimes onClick={() => handleClick(2)} />
        </Link>
      </nav>
      <div
        className="avatar av-l"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL_FOR_IMAGE}${messages?.receiver?.profileImage})`,
        }}
      ></div>
      <p className="info-name">{messages?.receiver?.name}</p>
      <p className="info-name">{messages?.receiver?.role}</p>
      <div className="messenger-infoView-btns">
        <Link
          href="#"
          className="danger delete-conversation"
          style={{ display: "flex", justifyContent: "center" }}
          onClick={(e) => {
            e.preventDefault();
            openDeleteDialog(conversationId);
          }}
        >
          <div className="d-flex align-items-center mr-4">
            {/* <FaRegTrashAlt size={25} className="ms-4" /> */}
            <i className="ti ti-trash" style={{ fontSize: "30px" }}></i>
            <span className="ms-4">Delete Conversation</span>
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
                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${messageFile}`}
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