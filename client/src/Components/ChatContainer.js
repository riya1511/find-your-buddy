import React,{ useState } from 'react';
import ChatHeader from '../Components/ChatHeader';
import MatchesDisplay from '../Components/MatchesDisplay';
import ChatDisplay from '../Components/ChatDisplay';

const ChatContainer = ({ user }) => {

  const [clickedUser, setClickedUser] = useState(null)

  return (
    <div className='chat_container'>
      <ChatHeader user={user} />

      <div>
        <button className='option' onClick={() => setClickedUser(null)}>Matches</button>
        <button className='option' disabled={!clickedUser}>Chat</button>
      </div>

      <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />
      <ChatDisplay user={user} clickedUser={clickedUser} />
    </div>
  )
}

export default ChatContainer