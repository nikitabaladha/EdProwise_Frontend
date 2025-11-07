import React, { useEffect, useState } from "react";
import getAPI from "../../api/getAPI";
import postAPI from "../../api/postAPI";
import { toast } from "react-toastify";

const EaseBuzzModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [easeBuzzData, setEaseBuzzData] = useState({
        EASEBUZZ_KEY: "",
        EASEBUZZ_SALT: "",
    });

    const schoolId = JSON.parse(localStorage.getItem("userDetails"))?.schoolId;

    const fetchEaseBuzzData = async () => {
        try {
            setLoading(true);
            const res = await getAPI(`/get-easebuzz-data/${schoolId}`);
            if (res.data && !res.data.hasError && res.data.data) {
                setEaseBuzzData({
                    EASEBUZZ_KEY: res.data.data.EASEBUZZ_KEY || "",
                    EASEBUZZ_SALT: res.data.data.EASEBUZZ_SALT || "",
                });
            }
        } catch (err) {
            console.error("Error fetching EaseBuzz data:", err.response?.data || err);
            toast.error("Failed to load EaseBuzz data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!easeBuzzData.EASEBUZZ_KEY || !easeBuzzData.EASEBUZZ_SALT) {
            return toast.error("Please fill in both fields");
        }

        try {
            setLoading(true);
            const res = await postAPI(`/create-update-easebuzz-data`, {
                schoolId,
                ...easeBuzzData,
            });

            if (!res.data.hasError) {
                toast.success("EaseBuzz data saved successfully!");
                onClose();
            } else {
                toast.error(res.data.message || "Failed to save EaseBuzz data");
            }
        } catch (err) {
            console.error("Error saving EaseBuzz data:", err);
            toast.error("Failed to save EaseBuzz data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) fetchEaseBuzzData();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2 style={{ marginBottom: "20px" }}>Payment Gateway Settings </h2>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Gateway Key</label>
                    <input
                        type="text"
                        placeholder="Enter your EaseBuzz Key"
                        value={easeBuzzData.EASEBUZZ_KEY}
                        onChange={(e) =>
                            setEaseBuzzData({ ...easeBuzzData, EASEBUZZ_KEY: e.target.value })
                        }
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Gateway Salt</label>
                    <input
                        type="text"
                        placeholder="Enter your EaseBuzz Salt"
                        value={easeBuzzData.EASEBUZZ_SALT}
                        onChange={(e) =>
                            setEaseBuzzData({ ...easeBuzzData, EASEBUZZ_SALT: e.target.value })
                        }
                        style={inputStyle}
                    />
                </div>

                <p style={noteStyle}>
                    <strong>Note:</strong> Please ensure your EaseBuzz Key and Salt match
                    your official payment gateway configuration.
                </p>

                <div style={buttonContainer}>
                    <button onClick={onClose} style={buttonStyle(false)}>
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={buttonStyle(true)}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};



const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "500px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    maxHeight: "90vh",
    overflowY: "auto",
};

const inputGroupStyle = {
    marginBottom: "18px",
      fontWeight: "bold",
};

const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#333",
};

const inputStyle = {
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
};

const noteStyle = {
    fontSize: "16px",
    color: "#9b3a3aff",
    marginBottom: "15px",
    marginTop: "5px",
};

const buttonContainer = {
    textAlign: "right",
    marginTop: "10px",
};

const buttonStyle = (primary) => ({
    padding: "8px 14px",
    marginLeft: "10px",
    backgroundColor: primary ? "#1a1729" : "#ccc",
    color: primary ? "white" : "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
});

export default EaseBuzzModal;
