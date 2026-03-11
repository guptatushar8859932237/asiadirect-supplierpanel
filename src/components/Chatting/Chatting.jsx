// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// export default function Chatting() {
//   const userData = JSON.parse(localStorage.getItem("data123"));
//   const userId = userData?.id;
//   const token = localStorage.getItem("token");
//   const [users, setUsers] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const socketRef = useRef();
//   const initiateChat = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/getAdminInbox`,
//         { admin_id: userId },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       if (response.data.success) {
//         setUsers(response.data.inbox);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getMessages1 = async (chat) => {
//     if (!chat) return;
//     setSelectedChat(chat);
//     setMessages([]);
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
//         {
//           conversation_id: chat.conversation_id,
//           receiver_id: chat.sender_id
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       if (res.data.success) {
//         setMessages(res.data.messages);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const location = useLocation()
//   const conversationId = location.state?.freight_id;
//   console.log("Conversation ID:", conversationId);
//   const sendMessage1 = async () => {
//     console.log(conversationId)
//     if (!messageText.trim() || !selectedChat) return;
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
//         {
//         //   conversation_id: selectedChat.conversation_id,
//           sender_id: userId,
//           receiver_id: conversationId,
//           message: messageText,
//           message_type: "text"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       if (res.data.success) {
//         const newMessage = {
//           ...res.data.data,
//           sender_id: userId,
//           sender_name: userData?.name || "Admin",
//           message: messageText
//         };
//         setMessages(prev => [...prev, newMessage]);
//         socketRef.current.emit("sendMessage", newMessage);
//         setMessageText("");
//       }
//     } catch (error) {
//       console.log("Send message error:", error);
//     }
//   };
//   useEffect(() => {
//     initiateChat();
//     socketRef.current = io(process.env.REACT_APP_BASE_URL);
//     socketRef.current.on("receiveMessage", (data) => {
//       if (data.conversation_id === selectedChat?.conversation_id) {
//         setMessages(prev => [...prev, data]);
//       }
//     });
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [selectedChat]);
//   return (
//     <div className="container-fluid border">
//       <div className="row">
//       <div className="col-3 border-end" style={{ height: "90vh", overflowY: "auto" }}>
//         <h5 className="p-2">Users</h5>
//         {users.map((chat) => (
//           <div
//             key={chat.conversation_id}
//             className="p-2 border-bottom"
//             style={{ cursor: "pointer" }}
//             onClick={() => getMessages1(chat)}
//           >
//             <strong>{chat?.sender_name}</strong>
//             <p>{chat?.last_message}</p>
//           </div>
//         ))}
//       </div>
//         <div className="col-9 d-flex flex-column" style={{ height: "90vh" }}>
//           <div className="border-bottom p-2">
//             {selectedChat ? selectedChat?.sender_name : "Select User"}
//           </div>
//           <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
//             {messages.map((msg) => {
//               const isAdmin = msg.sender_id === userId;
//               return (
//                 <div
//                   key={msg.message_id || Math.random()}
//                   className={`d-flex mb-2 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
//                 >
//                   <div
//                     style={{
//                       maxWidth: "60%",
//                       padding: "8px 12px",
//                       borderRadius: "10px",
//                       background: isAdmin ? "#0d6efd" : "#e9ecef",
//                       color: isAdmin ? "#fff" : "#000"
//                     }}
//                   >
//                     <small><b>{msg.sender_name}</b></small>
//                     <div>{msg.message}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="border-top p-2 d-flex gap-2">
//             <input
//               type="text"
//               className="form-control"
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") sendMessage1();
//               }}
//               placeholder="Type message..."
//             />
//             <button
//               className="btn btn-primary"
//               onClick={sendMessage1}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function Chatting() {
  const userData = JSON.parse(localStorage.getItem("data123"));
  const userId = userData?.id;
  const token = localStorage.getItem("token");

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const socketRef = useRef();

  const location = useLocation();
  const conversationId = location.state?.freight_id;

  // GET MESSAGES
  const getMessages = async () => {
    if (!conversationId) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
        {
          conversation_id: conversationId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SEND MESSAGE
  const createconvertion = async () => {
    if (!messageText.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
        {
          //   conversation_id: conversationId,
          sender_id: userId,
          receiver_id: conversationId,
          message: messageText,
          message_type: "text",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        const newMessage = {
          ...res.data.data,
          sender_id: userId,
          sender_name: userData?.name || "Admin",
          message: messageText,
        };

        setMessages((prev) => [...prev, newMessage]);

        // SOCKET EMIT
        socketRef.current.emit("sendMessage", newMessage);

        setMessageText("");
      }
    } catch (error) {
      console.log("Send message error:", error);
    }
  };
  const sendMessage1 = async () => {
    if (!messageText.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
        {
          //   conversation_id: conversationId,
          sender_id: userId,
          receiver_id: conversationId,
          message: messageText,
          message_type: "text",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        const newMessage = {
          ...res.data.data,
          sender_id: userId,
          sender_name: userData?.name || "Admin",
          message: messageText,
        };

        setMessages((prev) => [...prev, newMessage]);

        // SOCKET EMIT
        socketRef.current.emit("sendMessage", newMessage);

        setMessageText("");
      }
    } catch (error) {
      console.log("Send message error:", error);
    }
  };

  // SOCKET CONNECT (ONLY ONCE)
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BASE_URL);

    socketRef.current.on("receiveMessage", (data) => {
      if (data.conversation_id === conversationId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // LOAD MESSAGES
  useEffect(() => {
    getMessages();
  }, [conversationId]);

  return (
    <div className="container-fluid border">
      <div className="row">
        <div className="col-12 d-flex flex-column" style={{ height: "90vh" }}>
          <div className="border-bottom p-2">Chat</div>

          {/* MESSAGES */}

          <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
            {messages.map((msg) => {
              const isAdmin = msg.sender_id === userId;

              return (
                <div
                  key={msg.message_id || Math.random()}
                  className={`d-flex mb-2 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    style={{
                      maxWidth: "60%",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: isAdmin ? "#0d6efd" : "#e9ecef",
                      color: isAdmin ? "#fff" : "#000",
                    }}
                  >
                    <small>
                      <b>{msg.sender_name}</b>
                    </small>

                    <div>{msg.message}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT */}

          <div className="border-top p-2 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage1();
              }}
              placeholder="Type message..."
            />

            <button className="btn btn-primary" onClick={createconvertion}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>    
  );
}
