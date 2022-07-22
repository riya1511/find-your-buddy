import React from 'react';
import logout_icon from '../Images/logout-icon.png';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ user }) => {

  let navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(['user'])

  const logout = () => {
    removeCookie('UserId', cookie.UserId)
    removeCookie('Token', cookie.Token)
    window.location.reload()
    navigate('/')
  }

  return (
    <div className='chat_container-header'>
      <div className='profile'>
        <div className='image_container'>
          <img src={user.image} alt='user' />
        </div>
        <h3>{user.firstName}</h3>
      </div>
      <img className='logout_icon' src={logout_icon} alt='logout icon' onClick={logout} />
    </div>
  )
}

export default ChatHeader