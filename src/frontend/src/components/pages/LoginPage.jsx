import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";

import constants from "../../constants";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const {data} = await axios.post(constants.SERVER_ADDRESS + '/api/token/', {username, password});
    const token = data.access;
    if (token) {
      let isAdmin = false;
      let userResponse  = await axios.get(constants.SERVER_ADDRESS + '/api/me', {headers: {
        Authorization: "Bearer " + token
      }});
      isAdmin = userResponse.data.isAdmin;
      await login({ username, token, isAdmin });
    } else {
      alert("Неверный логин или пароль.");
    }
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};