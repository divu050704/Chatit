import React from "react";
import "../css/loginStyle.css";
import "boxicons";
import Verifying from "./Verifying";

export default function Login(props) {
  // Checks wheteher the user wants to login or signup
  const [login, setLogin] = React.useState(true);
  const handleLoginChange = () => {
    setLogin((prev) => !prev);
  };
  React.useEffect(() => {
    if (props.status !== "") {
      alert(props.status);
    }
  }, [props.status]);

  return (
    <div>
      <div className="login">
        <div className="login--main">
          <img
            src="https://github.com/divu050704/assets-holder/blob/main/chatit/image.png?raw=true"
            alt="chatit-icon"
          />
          <h2>{login ? "Login to your account" : "Create new account"}</h2>
          <input
            type="text"
            placeholder="Username"
            className="login--input-box"
            value={props.username}
            onChange={props.handleUsername}
          />
          <input
            type={props.passwordHidden ? "text" : "password"}
            placeholder="Password"
            className="login--input-box"
            value={props.password}
            onChange={props.handlePassword}
          />
          <div className="login--check">
            <div className="check">
              <input
                id="check"
                type="checkbox"
                onChange={props.handlePasswdhide}
              />
              <label htmlFor="check"></label>
            </div>
            &nbsp; Show password
          </div>
          {login ? (
            <div>
              <button className="login--button" onClick={props.login}>
                {props.loggingIn && <Verifying />}
                Login
              </button>
            </div>
          ) : (
            <div>
              <button className="login--button" onClick={props.signup}>Sign up</button>
            </div>
          )}
        </div>
      </div>
      {login ? (
        <div className="login--option">
          Don't have an account?{"  "}
          <span className="login--change-option" onClick={handleLoginChange}>
            Sign up
          </span>
        </div>
      ) : (
        <div className="login--option">
          Already have an account?{"  "}
          <span className="login--change-option" onClick={handleLoginChange}>
            Log in
          </span>
        </div>
      )}
    </div>
  );
}
