import React from "react";

const Chat = () => {
  return (
    <div className="flex row h-[90.5vh] bg-[#343541] text-white">
      {/* <section className="flex flex-col w-60 bg-[#202124] justify-between">
        <button className="btn btn-sm p-2 m-2">
          + New Chat
        </button>
        <ul className="chat-history h-full p-2 m-2">
            <li className="list-none">his1</li>
            <li>his2</li>
            <li>his3</li>  
        </ul>
        <nav>
          <p>Made by Ham</p>
        </nav>
      </section> */}

      <section className="w-screen flex flex-col justify-between">
        <h1 className="flex justify-center header">Chat Section</h1>
        <div className="flex flex-col items-center">
          <input
            className="max-w-lg	w-11/12 p-2 m-2 text-black"
            placeholder="Send a message..."
          ></input>
          <p className="max-w-lg m-2">
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT May 24 Version
          </p>
        </div>
      </section>
    </div>
  );
};

export default Chat;
