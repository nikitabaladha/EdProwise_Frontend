import React, { useState, useRef } from "react";
// import { createGroupAPI } from "../../../../../../api/chatAPI";
import { toast } from "react-toastify";
import postAPI from "../../../api/postAPI";
const CreateGroupModal = ({ show, onClose, users, objId, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userObjId] = useState(objId);
  const modalRef = useRef();
  console.log("userObj in the id", userObjId);

  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setGroupImage(file);
  };

  const handleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u._id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) return toast.error("Please enter a group name");
    if (selectedUsers.length === 0)
      return toast.error("Please select at least one member");

    try {
      setLoading(true);

      const membersPayload = users
        .filter((u) => selectedUsers.includes(u._id))
        .map((u) => ({
          userId: u._id,
          userType: u.role,
        }));

      const formData = new FormData();
      formData.append("groupName", groupName);
      if (groupImage) formData.append("groupImage", groupImage);
      formData.append("members", JSON.stringify(membersPayload));
      formData.append("createdBy", userObjId);

      const response = await postAPI(
        "/create-groups",
        formData,
        { "Content-Type": "multipart/form-data" },
        true
      );
      console.log("post api create group api", response);

      if (response?.data?.hasError) {
        toast.error(response.data.message || "Failed to create group");
      } else {
        toast.success("Group created successfully");
        onGroupCreated?.(response.data);
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setGroupName("");
      setGroupImage(null);
      setSelectedUsers([]);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Group</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Group Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mb-2 d-flex justify-content-between align-items-center">
                <label className="form-label mb-0">Select Members</label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleSelectAll}
                >
                  {selectedUsers.length === users.length
                    ? "Unselect All"
                    : "Select All"}
                </button>
              </div>

              <div
                className="border rounded p-2"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {users.map((usr) => (
                  <div key={usr._id} className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedUsers.includes(usr._id)}
                      onChange={() => handleUserSelect(usr._id)}
                    />
                    <label className="form-check-label d-flex align-items-center">
                      <img
                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${usr.profileImage}`}
                        alt={usr.name}
                        className="rounded-circle me-2"
                        width={30}
                        height={30}
                      />
                      {usr.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
