import React from "react";

const Chat = () => {
  return (
    <div className="flex row h-screen bg-[#343541] text-white">
      <section className="flex flex-col w-60 bg-[#202124]">
        <button className="btn btn-sm p-2 m-2">
          + New Chat
        </button>
        <ul className="chat-history"></ul>
        <nav>
          <p>Chat Bot</p>
          <p>Chat Bot 2</p>
        </nav>
      </section>

      <section className="w-100">Chat Section</section>
    </div>
  );
};

export default Chat;
