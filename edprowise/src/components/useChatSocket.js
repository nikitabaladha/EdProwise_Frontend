// hooks/useChatSocket.js
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function useChatSocket(conversationId, loggedInUser) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!loggedInUser) return;

    socketRef.current = io(process.env.REACT_APP_BACKEND_URL, {
      transports: ["websocket"],
    });

    socketRef.current.emit("join", {
      userId: loggedInUser._id,
      name: loggedInUser.name,
    });

    socketRef.current.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on(`conversation-${conversationId}`, (data) => {
      if (data.type === "new-message") {
        setMessages((prev) => [...prev, data.message]);
      } else if (data.type === "typing") {
        setTypingUser(data.senderId);
      } else if (data.type === "stop-typing") {
        setTypingUser(null);
      } else if (data.type === "messages-read") {
        // Optional: update UI to mark messages as read
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [conversationId, loggedInUser]);

  const sendMessage = (text) => {
    socketRef.current.emit("send-message", {
      conversationId,
      senderId: loggedInUser._id,
      message: text,
    });
  };

  const sendTyping = () => {
    socketRef.current.emit("typing", { conversationId, senderId: loggedInUser._id });
  };

  const stopTyping = () => {
    socketRef.current.emit("stop-typing", { conversationId, senderId: loggedInUser._id });
  };

  const markAsRead = () => {
    socketRef.current.emit("mark-read", { conversationId, userId: loggedInUser._id });
  };

  return { messages, sendMessage, sendTyping, stopTyping, markAsRead, typingUser, onlineUsers };
}
