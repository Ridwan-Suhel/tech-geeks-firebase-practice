import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import auth from "../../firebase.init";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const provider = new GoogleAuthProvider();

  const submitSignUpForm = (event) => {
    event.preventDefault();

    if (email.value === "") {
      setEmail({ value: "", error: "Email is Required" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Password is Required" });
    }
    if (confirmPassword.value === "") {
      setConfirmPassword({ value: "", error: "Confirm Password is Required" });
    }

    if (
      email.value &&
      password.value &&
      confirmPassword.value === password.value
    ) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  const handleEmailBlur = (emailInput) => {
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid Email" });
    }
  };

  const handlePasswordBlur = (passwordInput) => {
    if (passwordInput.length < 8) {
      setPassword({
        value: "",
        error: "Password should be minimum 8 charecter",
      });
    } else {
      setPassword({
        value: passwordInput,
        error: "",
      });
    }
  };

  const handlePasswordChange = (passwordInput) => {
    if (passwordInput.length > 7) {
      setPassword({
        value: "",
        error: "",
      });
    } else if (password.error) {
      setPassword({
        value: "",
        error: "Password should be minimum 8 charecter",
      });
    } else {
      setPassword({
        value: passwordInput,
        error: "",
      });
    }
  };

  const handleConfirmPasswordBlur = (confirmPasswordInput) => {
    if (confirmPasswordInput === password.value) {
      setConfirmPassword({
        value: confirmPasswordInput,
        error: "",
      });
    } else {
      setConfirmPassword({
        value: "",
        error: "Password not matched",
      });
    }
  };

  const handleConfirmPasswordChange = (confirmPasswordInput) => {
    if (confirmPasswordInput === password.value) {
      setConfirmPassword({
        value: confirmPasswordInput,
        error: "",
      });
    }
  };

  // continue google
  const handleGglSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={submitSignUpForm}>
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
            {email?.error && <p className="error">{email.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(event) => {
                  handlePasswordBlur(event.target.value);
                }}
                onChange={(event) => {
                  handlePasswordChange(event.target.value);
                }}
                type="password"
                name="password"
                id="password"
              />
            </div>
            {password?.error && <p className="error">{password.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                onBlur={(event) => {
                  handleConfirmPasswordBlur(event.target.value);
                }}
                onChange={(event) => {
                  handleConfirmPasswordChange(event.target.value);
                }}
              />
            </div>
            {confirmPassword?.error && (
              <p className="error">{confirmPassword.error}</p>
            )}
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
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

export default Signup;
