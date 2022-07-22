import React, { useState } from 'react'
import closeIcon from '../Images/close-icon.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {

    let navigate = useNavigate();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState('');

    const [cookies, setCookies, removeCookies] = useCookies(['user'])

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(isSignUp && password !== confirmPassword){
                setError('Passwords need to match!')
                return
            }

            // const response = await axios.post(` https://find-your-buddy-app.herokuapp.com/${isSignUp ? 'signup' : 'login'}`, { email, password })
            const response = await axios.post(`https://find-your-buddy-app.herokuapp.com/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookies('Token', response.data.token)
            setCookies('UserId', response.data.userId)

            const success = response.status === 201;

            if(success && isSignUp) navigate('/onboarding')
            if(success && !isSignUp) navigate('/dashboard')

            window.location.reload()

        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='auth-modal'>
        <div className='close-icon' onClick={handleClick}><img src={closeIcon} alt='close' /></div>
        <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
        <p>By clicking, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>

        <form onSubmit={handleSubmit}>
            <input 
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
                <input 
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />)
            }
            <input 
                className='secondary-button'
                type='submit'
            />
            <p>{error}</p>
        </form>
        <hr />

        <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModal