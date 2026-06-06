import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Chatting() {
  const userData = JSON.parse(localStorage.getItem("data123"));
  const userId = userData?.id;
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [messageText, setMessageText] = useState("");
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BASE_URLSOCKET);
    socketRef.current.on("receiveMessage", (data) => {
      if (data.conversation_id === selectedChat?.conversation_id) {
        setMessages(prev => [...prev, data]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [selectedChat]);
  const initiateChat = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getInbox`,
        { receiver_id: userId, receiver_type: "supplier" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setUsers(response.data.inbox);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const staffList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}staff-list`
      );
      if (response.data.success) {
        setStaff(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initiateChat();
    staffList();
  }, []);
  const getMessages1 = async (chat) => {
    if (!chat) return;
    setSelectedChat(chat);
    setMessages([]);
    socketRef.current.emit("joinRoom", chat.conversation_id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
        {
          conversation_id: chat.conversation_id,
          receiver_id: userId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const startStaffChat = async (staffData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
        {
          sender_id: userId,
          receiver_id: staffData.id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (res.data.success) {
        const conversation = {
          conversation_id: res.data.conversation_id,
          sender_id: staffData.id,
          sender_name: staffData.full_name
        };
        setSelectedChat(conversation);
        getMessages1(conversation);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage1 = async () => {
    if (!messageText.trim() || !selectedChat) return;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
        {
          conversation_id: selectedChat.conversation_id,
          sender_id: userId,
          receiver_id: selectedChat.sender_id,
          message: messageText,
          message_type: "text"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (res.data.success) {
        const newMessage = {
          ...res.data.data,
          sender_id: userId,
          sender_name: userData?.name || "Admin",
          message: messageText
        };
        staffList()
        setMessages(prev => [...prev, newMessage]);
        socketRef.current.emit("sendMessage", newMessage);
        setMessageText("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid p-4">
      <div className="row g-0 border rounded shadow-sm overflow-hidden" style={{ height: "calc(100vh - 130px)", backgroundColor: "#fff" }}>
        {/* Left Sidebar */}
        <div className="col-lg-3 col-md-4 border-end d-flex flex-column h-100" style={{ backgroundColor: "#fff" }}>
          <div className="leftChatSide d-flex flex-column h-100 overflow-hidden">
            <ul className="nav nav-tabs chatLeftTab">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                  onClick={() => setActiveTab("users")}
                >
                  Users
                </button>
              </li>
            </ul>
            {activeTab === "users" && (
              <>
                <h5 className="p-3 mb-0 border-bottom" style={{ backgroundColor: "#f8f9fa", fontWeight: "600" }}>Users</h5>
                <div className="leftChatBorder flex-grow-1 custom-scrollbar" style={{ overflowY: "auto" }}>
                  {users.map((chat) => (
                    <div
                      key={chat.conversation_id}
                      className="p-3 border-bottom chat-user-item transition"
                      style={{ 
                        cursor: "pointer", 
                        backgroundColor: selectedChat?.conversation_id === chat.conversation_id ? "#e9ecef" : "transparent"
                      }}
                      onClick={() => getMessages1(chat)}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                          style={{ width: "38px", height: "38px", backgroundColor: "#1b2245", fontSize: "1rem", fontWeight: "bold", flexShrink: 0 }}
                        >
                          {chat?.sender_name ? chat.sender_name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="overflow-hidden">
                          <strong className="d-block text-truncate" style={{ color: "#1b2245" }}>{chat?.sender_name}</strong>
                          <p className="mb-0 text-muted text-truncate" style={{ fontSize: "0.85rem" }}>{chat?.last_message || "Start conversation"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Right Chat Area */}
        <div className="col-lg-9 col-md-8 d-flex flex-column h-100" style={{ backgroundColor: "#f0f2f5" }}>
          {/* Header */}
          <div className="d-flex align-items-center p-3 bg-white border-bottom shadow-sm" style={{ zIndex: 1 }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
              style={{ width: "42px", height: "42px", backgroundColor: "#1b2245", fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {selectedChat && selectedChat.sender_name ? selectedChat.sender_name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-dark">{selectedChat ? selectedChat.sender_name : "Select a conversation"}</h5>
              {selectedChat && <small className="text-success fw-medium">Active now</small>}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow-1 p-4 chatArea" style={{ overflowY: "auto" }}>
            {!selectedChat && (
              <div className="d-flex h-100 align-items-center justify-content-center flex-column text-muted">
                <i className="bi bi-chat-dots fs-1 mb-2"></i>
                <p className="fs-5">Select a user to start chatting</p>
              </div>
            )}
            {selectedChat && messages.length === 0 && (
              <div className="text-center text-muted mt-4">
                <span className="bg-white px-3 py-1 rounded-pill shadow-sm" style={{ fontSize: "0.9rem" }}>
                  Say hello to {selectedChat.sender_name}!
                </span>
              </div>
            )}
            {messages.map((msg) => {
              const isAdmin = msg.sender_id === userId;
              return (
                <div
                  key={msg.message_id || Math.random()}
                  className={`d-flex mb-3 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    className="shadow-sm"
                    style={{
                      maxWidth: "75%",
                      padding: "12px 16px",
                      borderRadius: isAdmin ? "15px 15px 0 15px" : "15px 15px 15px 0",
                      background: isAdmin ? "#1b2245" : "#ffffff",
                      color: isAdmin ? "#fff" : "#212529",
                      position: "relative"
                    }}
                  >
                    {!isAdmin && (
                      <div style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px", color: "#1b2245" }}>
                        {msg.sender_name}
                      </div>
                    )}
                    <div style={{ fontSize: "0.95rem", lineHeight: "1.4", wordBreak: "break-word" }}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-top shadow-sm">
            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                className="form-control rounded-pill px-4 py-2 shadow-none"
                style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage1();
                }}
                placeholder="Type your message..."
                disabled={!selectedChat}
              />
              <button
                className="btn text-white rounded-pill px-4 py-2 shadow-sm d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: "#1b2245", 
                  border: "none",
                  opacity: !selectedChat || !messageText.trim() ? 0.6 : 1,
                  transition: "opacity 0.2s"
                }}
                onClick={sendMessage1}
                disabled={!selectedChat || !messageText.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
