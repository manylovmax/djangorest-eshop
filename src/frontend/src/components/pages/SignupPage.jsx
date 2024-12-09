import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";

import constants from "../../constants";


export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (user)
      navigate("/");
  }, []);


  function validate() {
    let newFormErrors = [];
    if (!username) {
        newFormErrors.push({attribute: "username", value: "Необходимо ввести значение"})
    }
    if (!password) {
        newFormErrors.push({attribute: "password", value: "Необходимо ввести значение"})
    }
    if (!passwordConfirm) {
        newFormErrors.push({attribute: "passwordConfirm", value: "Необходимо ввести значение"})
    }
    setFormErrors(newFormErrors);
  }
  useEffect(() => validate(), [username, password, passwordConfirm]);
  
  const handleSignup = async (e) => {
    e.preventDefault();
    let response = await axios.post(constants.SERVER_ADDRESS + '/api/signup', {username, password});
    if (!response.data.success)
      setFormErrors(response.data.errors);
    else
      navigate("/login");
  };

  const handleChangeUsername = (value) => {
    setUsername(value);
    // обнуляем ошибки на юзернейме при изменении юзернейма для валидациии на бекенде
    setFormErrors(formErrors.filter(error => error.attribute != 'username'));
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <form className="card p-3" onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="username" className="from-label">Юзернейм:</label>
            <input id="username" type="text" value={username} className={"form-control " + (formErrors.filter(item => item.attribute == "username").length ? "is-invalid" : "is-valid") }
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
            <div className="invalid-feedback">
              {formErrors.filter(item => item.attribute == "username").map((item, key) => (
                <div key={key}>{item.value}</div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="from-label">Пароль:</label>
            <input id="password" type="password" value={password} className={"form-control " + (formErrors.filter(item => item.attribute == "password").length ? "is-invalid" : "is-valid") }
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">
              {formErrors.filter(item => item.attribute == "password").map((item, key) => (
                <div key={key}>{item.value}</div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password-confirm" className="from-label">Подтверждение пароля:</label>
            <input id="password-confirm" type="password" value={passwordConfirm} className={"form-control " + (formErrors.filter(item => item.attribute == "passwordConfirm").length ? "is-invalid" : "is-valid") }
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <div className="invalid-feedback">
              {formErrors.filter(item => item.attribute == "passwordConfirm").map((item, key) => (
                <div key={key}>{item.value}</div>
              ))}
            </div>
          </div>

          <button disabled={ formErrors.length ? true : false} className="btn btn-success" type="submit">Регистрация</button>
        </form>
      </div>
    </div>
  );
};