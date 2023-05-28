import React from "react";

const Chat = () => {
  return (
    <div className="flex row h-screen bg-[#343541] text-white">
      <section className="w-60 bg-[#202124]">
        <button className="">+ New Chat</button>
        <ul className="chat-history"></ul>
        <nav>
          <p>Chat Bot</p>
        </nav>
      </section>
      <section className="w-100">Chat Section</section>
    </div>
  );
};

export default Chat;
