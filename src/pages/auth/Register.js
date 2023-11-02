import "../../styles/auth.css";
import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { Link } from "react-router-dom";
import { api } from "../../Api/api";
import { BsEyeFill } from "react-icons/bs";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = {
    email: useRef(""),
    password: useRef(""),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      inputs.email.current.value === "" ||
      inputs.password.current.value === ""
    ) {
      setLoading(false);
      return setError("Email, username and password are required");
    }

    if (inputs.password.current.value.length < 6) {
      setLoading(false);
      return setError("Password too short. Must be a minimum of 6 characters");
    }

    try {
      const newUser = {
        email: inputs.email.current.value.toLowerCase(),
      };

      // save to mongoDB
      await api.post("/user", newUser);

      // create account on firebase
      await createUserWithEmailAndPassword(
        auth,
        inputs.email.current.value.toLowerCase(),
        inputs.password.current.value
      ).then(async (userCred) => {
        await updateProfile(auth.currentUser, {
          displayName: userCred.user.displayName,
        });
      });
      setLoading(false);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
        return setLoading(false);
      }

      setLoading(false);
      // eslint-disable-next-line default-case
      switch (err.message) {
        case "Firebase: Error (auth/invalid-email).":
          setError("Invalid Email address");
          break;

        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setError("Password too short. Must be a minimum of 6 characters");
          break;

        case "Firebase: Error (auth/email-already-in-use).":
          setError("Username or email already exists");
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>

      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
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
        <input
          type="email"
          placeholder="Email Address"
          ref={inputs.email}
          spellCheck={false}
        />

        <section>
          <BsEyeFill onClick={() => setShowPassword(!showPassword)} />
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            ref={inputs.password}
          />
        </section>

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
