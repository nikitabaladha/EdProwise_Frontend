import React, { useRef } from 'react';
import { IoIosArrowRoundUp } from "react-icons/io";

const ChatForm = ({ chatHistory,setChatHistory,generateBotResponse }) => { // Destructure setChatHistory from props
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Update the chat history with users message
    setChatHistory(history => [...history, { role: "user", text: userMessage }]);
    inputRef.current.value = ''; // Clear the input field after submission

    setTimeout(()=> {
      // Add a "Thinking..." placeholder for bot responce
      setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);

      // call the function to generate the bot responce
      generateBotResponse([...chatHistory, {role:"user", text:`using the details provided above, please address this query: ${userMessage}`}]);
   }, 600);

    
  };

  return (
    <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Message...'
        className='message-input'
        required
      />
      <button type="submit" className='material-symbols-rounded'>
        <IoIosArrowRoundUp />
      </button>
    </form>
  );
};

export default ChatForm;