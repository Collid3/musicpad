import "../../styles/auth.css";
import React, { useRef, useState } from "react";
import { api } from "../../Api/api";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { BsEyeFill } from "react-icons/bs";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputs = {
    email: useRef(""),
    password: useRef(""),
  };

  const handleLogin = async () => {
    if (
      inputs.email.current.value === "" ||
      inputs.password.current.value === ""
    ) {
      return setError("Email and password required");
    }

    if (inputs.password.current.value.length < 6) {
      return setError("Password too short. Must be a minimum of 6 characters");
    }

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        inputs.email.current.value,
        inputs.password.current.value
      );
      setLoading(false);
      setError("");
    } catch (err) {
      console.log(err.message);
      // eslint-disable-next-line default-case
      switch (err.message) {
        case "Firebase: Error (auth/network-request-failed).":
          setError(
            "No internet conection. Check your wifi or mobile data and try again"
          );
          break;

        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setError("Incorrect username or password");
          break;

        case "Firebase: Error (auth/invalid-login-credentials).":
          setError("Incorrect username or password");
          break;

        case "Firebase: Error (auth/invalid-email).":
          setError("Incorrect username or password. Try again");
          break;

        case "Firebase: Error (auth/wrong-password).":
          setError("Incorrect username or password. Try again");
          break;

        case "Firebase: Error (auth/user-not-found).":
          setError("Incorrect username or password. Try again");
          break;

        case "Request failed with error: undefined":
          setError(
            "Make sure you have internet connection and refresh the page"
          );
          break;
        case "Request failed with status code 401":
          setError("Incorrect username or password");
          break;
      }

      setLoading(false);
    }
  };

  console.log(error);

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        {error && !loading && (
          <p
            style={{
              backgroundColor: "red",
              padding: "5px",
              textAlign: "center",
              borderRadius: "10px",
              transition: "ease-in .5s",
            }}
          >
            {error}
          </p>
        )}

        {loading && (
          <p
            style={{
              backgroundColor: "orange",
              padding: "5px",
              textAlign: "center",
              borderRadius: "10px",
              transition: "ease-in .5s",
            }}
          >
            Loading...
          </p>
        )}

        <input type="text" placeholder="Email address" ref={inputs.email} />

        <section>
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            ref={inputs.password}
          />
          <BsEyeFill onClick={() => setShowPassword(!showPassword)} />
        </section>

        <button type="submit" onClick={handleLogin}>
          Login
        </button>

        <button>Forgot Password</button>

        <p>
          Dont have an account?{" "}
          <span>
            <Link to="/register">Create account</Link>{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
