import React, { useState } from 'react';
import { useOutsideClick } from '../../../hooks';
import { AiOutlineLoading } from 'react-icons/ai';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const doLogin = async event =>  {
        console.log(username, password);

        event.preventDefault();

        await fetch('https://only-hands.herokuapp.com/api/login', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json', },
            body: {
                username: JSON.stringify(username),
                password: JSON.stringify(password)
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sessionStorage.setItem("token", data.token);
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-xl p-2">
                Welcome Back!
            </h1>
            <form onSubmit={doLogin}>
                <div className="flex flex-col">
                    <label htmlFor="username">Username
                        <br />
                        <input
                            value={username}
                            id="username"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">Password
                        <br />
                        <input
                            value={password}
                            id="password"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="*********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="text-center">
                    <button type="submit" className="px-5 py-2 m-2 bg-gray-700 text-white rounded grow-transition">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;