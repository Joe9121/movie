import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, isHTML: true },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to connect to the chatbot." },
      ]);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          color: "#333",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0",
              backgroundColor: msg.sender === "user" ? "#e1f5fe" : "#fff",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "75%",
              marginLeft: msg.sender === "user" ? "auto" : "0",
              border: "1px solid #ddd",
            }}
          >
            {msg.sender === "bot" && msg.isHTML ? (
              <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
            ) : (
              <span>
                <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px",
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
