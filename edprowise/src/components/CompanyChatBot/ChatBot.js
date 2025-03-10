import React, {useRef, useEffect, useState } from 'react'
import { IoIosArrowRoundDown } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import ChatbotIcon from './ChatbotIcon';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { companyInfo } from './CompanyInfo';

const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([{
        hideInChat:true,
        role:"model",
        text:companyInfo
    }]);
    const [showChatbot, setShowChatbot] = useState(false);
    const chatBodyRef= useRef();
    const [showPopup, setShowPopup] = useState(false);
    
    const generateBotResponse = async (history)=>{

        // Helper function to update chat history
        const updateHistory = (text,isError = false) =>{
            setChatHistory(prev =>[...prev.filter(msg => msg.text !== "Thinking..."), {role:"model", text,isError}]);
        }

        history = history.map(({role,text}) => ({role,parts:[{text}]}));
        const apiUrl = process.env.REACT_APP_API_URL_CHAT || "";
        console.log(apiUrl);
        
        const requestOptions ={
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({contents: history})
        }  
        // console.log(apiUrl);
        

        try{
            // Make the API call to get the bot response
          const response = await fetch(apiUrl,requestOptions);
        //   console.log(response);
          
          const data =await response.json();
        //   console.log(data);
          
          if (!response.ok) throw new Error(data.error.message || "Something Went Wrong"); 

        //   clean and update chat history with bots responce
          const apiResponseText= data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
          updateHistory(apiResponseText);
          
        }catch (error){
          console.log(error.message, true);
          
        }
    }; 

    useEffect(() => {
        // Show the pop-up every 15 seconds if the chatbot is closed
        const interval = setInterval(() => {
            if (!showChatbot) {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 5000); // Hide after 5 seconds
            }
        }, 15000); 

        return () => clearInterval(interval);
    }, [showChatbot]);


    useEffect(()=>{
        // Auto-scroll Whenever chat hostory updates
       chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior:"smooth"})
    },[chatHistory])

    return (
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
            <button onClick={()=> setShowChatbot(prev => !prev)} id='chatbot-toggler' data-bs-toggle="tooltip" data-bs-placement="left" title="Tooltip on top" >
                <span className='material-symbols-rounded'><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"} alt={""}/></span>
                <span className='material-symbols-rounded'><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"} alt={""}/></span>
                
                {showPopup && (
                    <div className="chatbot-popup-message">
                        <p className='mb-0'>👋 Hello! I am SIA, here to help you.</p>
                    </div>
                )}
            </button>
            <div className='chatbot-popup'>
                <div className='chat-header'>
                    <div className='header-info'>
                        <ChatbotIcon/>
                         <h2 className='logo-text'> chatbot</h2>
                    </div>
                    <button onClick={()=> setShowChatbot(prev => !prev)} className='material-symbols-rounded'><IoIosArrowRoundDown/></button>
                </div>

                <div ref={chatBodyRef} className='chat-body' >
                    <div className='message bot-message'>
                        <ChatbotIcon/>
                        <p className='message-text'>Hey hi..</p>
                    </div>
                    {chatHistory.map((chat,index) =>(
                        <ChatMessage key={index} chat={chat}/>
                    ))}
                    
                </div>

                <div className='chat-footer'>
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
    );
};
export default ChatBot;
