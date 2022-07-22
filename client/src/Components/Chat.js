import React from "react";

const Chat = ({ descendingOrderMessages }) => {
  return (
    <>
      <div className="chat_display">
        {descendingOrderMessages.map((message, _index) => (
          <div key={_index}>
            <div className="chat_message_header">
              <div className="image_container">
                <img src={message.image} alt={`${message.name} profile`} />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
