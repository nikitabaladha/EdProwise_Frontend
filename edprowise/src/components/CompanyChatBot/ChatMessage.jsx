import React from 'react';
// import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({ chat, handleInputChange }) => {
    const services = ["Web Development", "Web Design", "Marketing"];

    return (
        !chat.hideInChat && (<>
            <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
                {chat.role === "model" && 
                 <span className='message-bot-img'><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"} alt={""} /></span>
                // <ChatbotIcon />
                }
                <p className='message-text'>{chat.text}</p>

            </div>
            {chat.text === "What service are you interested in?" && (
                <div className="service-options mt-0">
                    {services.map((service, index) => (
                        <button
                            key={index}
                            className="service-btn"
                            onClick={() => handleInputChange(service)}
                        >
                            {service}
                        </button>
                    ))}
                </div>
            )}
        </>)
    );
};

export default ChatMessage;
