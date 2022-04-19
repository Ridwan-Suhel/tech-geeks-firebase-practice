import React, { useState } from "react";
import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import PageTitle from "../Shared/PageTitle";

const Login = () => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSignInForm = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    if (email === "") {
      setEmail({ value: "", error: "Email Is Required" });
    }
    const password = event.target.password.value;
    if (password === "") {
      setPassword({ value: "", error: "Password Is Required" });
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Sign in");
        navigate("/");
        toast.success("Sucessfully logged in", { id: "toast4" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("wrong-password")) {
          toast.error("Oops! wrong-password", { id: "toast5" });
        }
      });
  };

  const handleEmailBlur = (inputEmail) => {
    if (inputEmail !== "") {
      setEmail({ value: "", error: "" });
    }
  };

  const handlePasswordBlur = (inputPass) => {
    if (inputPass !== "") {
      setPassword({ value: "", error: "" });
    }
  };

  const handleGglSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
        toast.success("Sucessfully logged in", { id: "toast6" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("popup-closed-by-user")) {
          toast.error("You didn't sign in", { id: "toast7" });
        }
      });
  };

  return (
    <div className="auth-form-container ">
      <PageTitle title="Login"></PageTitle>
      <div className="auth-form">
        <h1>Login</h1>
        <form onSubmit={handleSignInForm}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onBlur={(event) => {
                  handleEmailBlur(event.target.value);
                }}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {<p className="error">{email?.error && email.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(event) => {
                  handlePasswordBlur(event.target.value);
                }}
                type="password"
                name="password"
                id="password"
              />
            </div>
            {password?.error && <p className="error">{password.error}</p>}
          </div>
          <button type="submit" className="auth-form-submit">
            Login
          </button>
        </form>
        <p className="redirect">
          New to Tech Geeks?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button onClick={handleGglSignIn} className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
