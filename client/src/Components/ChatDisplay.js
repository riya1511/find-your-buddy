import React, { useState, useEffect } from 'react';
import Chat from '../Components/Chat';
import ChatInput from '../Components/ChatInput';
import axios from 'axios';

const ChatDisplay = ({ user, clickedUser }) => {

  const [usersMessages, setUsersMessages] = useState(null)
  const [clickedUsersMessages,   setClickedUsersMessages]  = useState(null)

  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id

  const getUsersMessages = async () => {
    try {
           const response = await axios.get('http://localhost:8000/messages', {
               params: { userId: userId, correspondingUserId: clickedUserId }
           })
        setUsersMessages(response.data)
       } catch (error) {
        console.log(error)
    }
   }

   const getClickedUsersMessages = async () => {
       try {
           const response = await axios.get('http://localhost:8000/messages', {
               params: { userId: clickedUserId , correspondingUserId: userId }
           })
           setClickedUsersMessages(response.data)
       } catch (error) {
           console.log(error)
       }
   }

   useEffect(() => {
       getUsersMessages()
       getClickedUsersMessages()
   }, [])


  // console.log(usersMessages);

  const messages = []

  usersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.firstName
    formattedMessage['image'] = user?.image
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  });

  clickedUsersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedUser?.firstName
    formattedMessage['image'] = clickedUser?.image
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
})


  console.log('users messages:',  usersMessages);
  console.log('formatted messages:',  messages);

  const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput 
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  )
}

export default ChatDisplay