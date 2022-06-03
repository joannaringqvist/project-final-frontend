/* eslint-disable */
import React, { useState, useEffect}  from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "utils/utils";

import user from "reducers/user";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    const errorMessage = useSelector((store) => store.user.error);

    useEffect( ()=>{
        if(accessToken) {
            navigate('/plants');
        }
    }, [accessToken]);

    const onLoginFormSubmit = (event)=> {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };

        fetch(API_URL('login'), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    batch(()=> {
                        dispatch(user.actions.setUserId(data.userId));
                        dispatch(user.actions.setAccessToken(data.accessToken));
                        dispatch(user.actions.setUserName(data.username));
                        dispatch(user.actions.setError(null));
                    });
                   
                } else {
                    batch(()=> {
                        dispatch(user.actions.setError(data.response));
                        dispatch(user.actions.setUserId(null));
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setUserName(null));
                    });
                }
            })
    }


    return (
        <div>
            <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={onLoginFormSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id ="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id ="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div> 
    )
}

export default Login;