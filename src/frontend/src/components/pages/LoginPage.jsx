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
        Authorization: "Bearer " + tokenLoginPage
      }});
      isAdmin = userResponse.data.isAdmin;
      await login({ username, token, isAdmin });
    } else {
      alert("Неверный логин или пароль.");
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <form className="card p-3" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="from-label">Юзернейм:</label>
            <input id="username" type="text" value={username} className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="from-label">Password:</label>
            <input id="password" type="password" value={password} className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};