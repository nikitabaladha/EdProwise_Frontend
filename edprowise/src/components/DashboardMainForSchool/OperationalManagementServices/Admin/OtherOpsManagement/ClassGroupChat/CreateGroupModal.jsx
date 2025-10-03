// import React, { useState } from "react";
// import { TiTimes } from "react-icons/ti";

// const CreateGroupModal = ({ isOpen, onClose, users, onCreateGroup }) => {
//   const [groupName, setGroupName] = useState("");
//   const [groupImage, setGroupImage] = useState(null);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   if (!isOpen) return null;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setGroupImage(URL.createObjectURL(file));
//     }
//   };

//   const handleUserSelect = (id) => {
//     setSelectedUsers((prev) =>
//       prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//       setSelectedUsers([]); // Deselect all
//     } else {
//       setSelectedUsers(users.map((u) => u.user.receiverId)); // Select all
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!groupName.trim()) return alert("Please enter a group name");
//     if (selectedUsers.length === 0)
//       return alert("Please select at least one member");

//     onCreateGroup({
//       groupName,
//       groupImage,
//       members: selectedUsers,
//     });

//     // Reset form & close
//     setGroupName("");
//     setGroupImage(null);
//     setSelectedUsers([]);
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
//       style={{ backdropFilter: "blur(3px)" }}
//     >
//       <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
//           onClick={onClose}
//         >
//           <TiTimes size={24} />
//         </button>

//         {/* Modal Title */}
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Create New Group
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Group Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Group Name</label>
//             <input
//               type="text"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               className="border rounded-lg p-2 w-full"
//               placeholder="Enter group name"
//               required
//             />
//           </div>

//           {/* Group Image */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Group Profile Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full"
//             />
//             {groupImage && (
//               <div className="mt-2 flex justify-center">
//                 <img
//                   src={groupImage}
//                   alt="Group Preview"
//                   className="w-16 h-16 rounded-full object-cover border"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Members List */}
//           <div className="mb-2 flex justify-between items-center">
//             <span className="font-medium">Select Members</span>
//             <button
//               type="button"
//               onClick={handleSelectAll}
//               className="text-blue-500 text-sm hover:underline"
//             >
//               {selectedUsers.length === users.length
//                 ? "Unselect All"
//                 : "Select All"}
//             </button>
//           </div>
//           <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
//             {users.map(({ user }) => (
//               <label
//                 key={user.receiverId}
//                 className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedUsers.includes(user.receiverId)}
//                   onChange={() => handleUserSelect(user.receiverId)}
//                 />
//                 <img
//                   src={user.profileImage}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full object-cover border"
//                 />
//                 <span>{user.name}</span>
//               </label>
//             ))}
//           </div>

//           {/* Actions */}
//           <div className="mt-4 flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Create Group
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateGroupModal;

// import React, { useState, useRef } from "react";

// const CreateGroupModal = ({ show, onClose, users, onCreateGroup }) => {
//   const [groupName, setGroupName] = useState("");
//   const [groupImage, setGroupImage] = useState(null);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//  console.log("Create group chat users",users);
 
//   const modalRef = useRef();

//   if (!show) return null;

//   const handleBackdropClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setGroupImage(URL.createObjectURL(file));
//   };

//   const handleUserSelect = (id) => {
//     setSelectedUsers((prev) =>
//       prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//       setSelectedUsers([]);
//     } else {
//     //   setSelectedUsers(users.map((u) => u.user._id));
//     setSelectedUsers(users.map((u) => u._id));

//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!groupName.trim()) return alert("Please enter a group name");
//     if (selectedUsers.length === 0)
//       return alert("Please select at least one member");

//     onCreateGroup({
//       groupName,
//       groupImage,
//       members: selectedUsers,
//     });

//     // Reset & close
//     setGroupName("");
//     setGroupImage(null);
//     setSelectedUsers([]);
//     onClose();
//   };

//   return (
//     <div
//       className="modal show d-block"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//       onClick={handleBackdropClick}
//     >
//       <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Create New Group</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//             ></button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               {/* Group Name */}
//               <div className="mb-3">
//                 <label className="form-label">Group Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={groupName}
//                   onChange={(e) => setGroupName(e.target.value)}
//                   placeholder="Enter group name"
//                   required
//                 />
//               </div>

//               {/* Group Image */}
//               <div className="mb-3">
//                 <label className="form-label">Group Profile Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 {groupImage && (
//                   <div className="mt-2 text-center">
//                     <img
//                       src={groupImage}
//                       alt="Preview"
//                       className="rounded-circle"
//                       width={60}
//                       height={60}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Select Members */}
//               <div className="mb-2 d-flex justify-content-between align-items-center">
//                 <label className="form-label mb-0">Select Members</label>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={handleSelectAll}
//                 >
//                   {selectedUsers.length === users.length
//                     ? "Unselect All"
//                     : "Select All"}
//                 </button>
//               </div>

//               <div
//                 className="border rounded p-2"
//                 style={{ maxHeight: "200px", overflowY: "auto" }}
//               >
                
//                 {users.map((usr) => (
//                   <div key={usr._id} className="form-check mb-2">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={selectedUsers.includes(usr._id)}
//                       onChange={() => handleUserSelect(usr._id)}
//                     />
//                     <label className="form-check-label d-flex align-items-center">
//                       <img
//                         src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${usr.profileImage}`}
//                         alt={usr.name}
//                         className="rounded-circle me-2"
//                         width={30}
//                         height={30}
//                       />
//                       {usr.name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div> 

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Create Group
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateGroupModal;

import React, { useState, useRef } from "react";
// import { createGroupAPI } from "../../../../../../api/chatAPI";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI";
const CreateGroupModal = ({ show, onClose, users, objId, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userObjId] = useState(objId);
  const modalRef = useRef();
console.log("userObj in the id",userObjId);

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

      const response = await postAPI("/create-groups", formData,{ "Content-Type": "multipart/form-data" }, true);
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
