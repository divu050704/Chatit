import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login.jsx";
import sha256 from "./components/sha256";
import Home from "./components/Home";
import Verifying from "./components/Verifying";


function Main() {
  
  // State for username field
  const [username, setUsername] = React.useState("");
  // State to check wheteher the user is already logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // State for password field
  const [password, setPassword] = React.useState("");
  // State to hide or unhide password
  const [passwordHidden, setPasswordHidden] = React.useState(false);
  // State for the status of fetch
  const [status, setStatus] = React.useState("");
  //Loading page for verifying
  const [verifying, setVerifying] = React.useState(true);
  // State for logging in animation and other uses
  const [loggingIn, setLoggingIn] = React.useState(false);

  React.useEffect(() => {
    const requestOptions = {
      credentials: "include"
    };
    fetch(
      "https://Chatit-backend.divu050704.repl.co/api/verify",
      requestOptions
    )
      .then((res) => res.json())
      .then((last) => {

        if (last.checked) {
          setUsername((prev) =>
            prev === "" ? localStorage.getItem("user") : prev
          );
          setIsLoggedIn(true);
        }
        setVerifying(false);
      });
  }, []);
  // Update the value of usernmae state onChange
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  // Update the value of password state onChange
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  // Login button
  const login = () => {
    setLoggingIn(true);
    if (username !== "" && password !== "") {
      const hashedpasswd = sha256(password);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, passwd: hashedpasswd }),
        credentials: "include"
      };
      fetch(
        "https://Chatit-backend.divu050704.repl.co/api/auth/login",
        requestOptions
      )
        .then((res) => res.json())
        .then((last) => {
          if (last === null) {
            setStatus("Wrong username or password");
          } else {
            setStatus("Logged in as "+ username)
            localStorage.setItem("user", username);
            window.location.reload();
          }
          setLoggingIn(false);
        });
    } else {
      setStatus("All fields are required!");
      setLoggingIn(false);
    }
  };
  // Hide or unhide passwd
  const handlePasswdhide = (event) => {
    setPasswordHidden(event.target.checked);
  };
  // Sign up function
  const signup = () => {
    setLoggingIn(true);
    if (username !== "" && password !== "") {
      const hashedpasswd = sha256(password);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, passwd: hashedpasswd })
      };
      fetch("https://Chatit-backend.divu050704.repl.co/signup", requestOptions)
        .then((res) => res.json())
        .then((last) => {
          if (last.Created === "OK") {
            setStatus("Account created");
            window.location.reload()
          } else {
            setStatus("Account already exists!");
          }
          setLoggingIn(false);
        });
    } else {
      setStatus("All fields are required!");
      setLoggingIn(false);
    }
  };
  return (
    <div>
      {verifying ? (
        <div>
          <Verifying />
        </div>
      ) : (
        <div>
          {!isLoggedIn ? (
            !loggingIn ? (
              <Login
                status={status}
                username={username}
                password={password}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                login={login}
                signup={signup}
                passwordHidden={passwordHidden}
                handlePasswdhide={handlePasswdhide}
                loggingIn={loggingIn}
              />
            ) : (
              <Verifying />
            )
          ) : (
            <Home username={username} />
          )}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
