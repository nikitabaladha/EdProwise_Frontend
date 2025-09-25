import React from 'react';
import MessengerHeader from './MessengerHeader';
import Messagess from './MessagessConversation';
// import './Messenger.css';

const Messenger = () => {
  return (
    <div className='fixed-size-div'>
      <MessengerHeader className="messenger-header" />
      <Messagess className="messagess" />
    </div>
  );
};

export default Messenger;
