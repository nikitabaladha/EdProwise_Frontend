import React, { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";

const FilePreviewModal = ({ isOpen, onClose, file }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {preview && (
        <div>
          {file.type.startsWith("image/") ? (
            <img src={preview} alt="File preview" style={{width: "100vh", height: "100vh"}} />
          ) : (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={preview} />
            </Worker>
          )}
        </div>
      )}
    </Modal>
  );
};

export default FilePreviewModal;
