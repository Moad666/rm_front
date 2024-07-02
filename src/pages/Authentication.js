import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';


function Authentication(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            });

            // Save the token in local storage
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            //NotificationManager.success('Welcome !');
            navigate('/MainPage/rulekanban');
        } catch (err) {
            //setError('Login failed. Please check your email and password.');
            //NotificationManager.error('Incorrect Email / Password');   
            console.error('Error logging in:', err);
        }
    };
    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-white p-6 rounded-lg shadow-md w-96'>
                <form onSubmit={handleLogin} className='space-y-4'>
                    <h1 className='text-center text-2xl'><b> Welcome Back </b></h1>
                    <h2 className='text-center text-gray-500'><small> Please enter your credentials </small></h2>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                    <a href='#' className='text-xs text-blue-500'>Forgot Password ?</a>
                    <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded'>
                        Login
                    </button>
                </form>
                {error && <p className='mt-4 text-red-500'>{error}</p>}
                {/* <NotificationContainer /> */}
            </div>
        </div>
        
    );
}

export default Authentication;