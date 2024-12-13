import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth)
console.log(auth)
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const clearForm = () => {
    setName("");
    setMail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value.length === 0 || value.length > 20) {
      setNameError("User Name must be less than 20 characters");
    } else {
      setNameError("");
    }
  };

  const handleMailChange = (e) => {
    const value = e.target.value;
    setMail(value);

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.match(mailRegex)) {
      setMailError("Please enter a valid email address");
    } else {
      setMailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!value.match(passwordRegex)) {
      setPasswordError(
        "Password should include at least one special character, one capital letter, and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameError && !mailError && !passwordError && !confirmPasswordError) {
      const userInfo = {
        name,
        mail,
        password,
      };

      dispatch(registerUser(userInfo))
        .then((response) => {
          console.log(response);
          if (response.meta.requestStatus === "fulfilled") {
            toast.success("Registered Successfully", {
              position: "top-right",
              autoClose: 2000,
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            toast.error(auth.error, {
              position: "top-right",
              autoClose: 2000,
            });
          }

          clearForm();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Please enter valid data", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center px-4"
      style={{ background: "linear-gradient(to right, #d9a7c7, #fffcdc)" }}
    >
      <ToastContainer />

      <div className="w-96   shadow-xl border-black p-4 flex flex-col gap-5 bg-white rounded-md">
        <div className="text-4xl font-semibold font-mono ">Register</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <p>Name :</p>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              className="border-b border-black outline-none bg-inherit"
            />
            {nameError && (
              <span className="text-sm text-red-500  p-2 w-full ">
                {nameError}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <p>Mail:</p>
            <input
              type="mail"
              placeholder="Enter Mail"
              value={mail}
              onChange={handleMailChange}
              className="border-b border-black  outline-none bg-inherit"
            />
             {mailError && (
              <span className="text-sm text-red-500  p-2 w-full ">
                {mailError}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <p>Password : </p>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              className="border-b border-black  outline-none bg-inherit"
            />
             {passwordError && (
              <span className="text-sm text-red-500  p-2 w-full ">
                {passwordError}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <p>Confirm Password: </p>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="border-b border-black  outline-none bg-inherit"
            />
             {confirmPasswordError && (
              <span className="text-sm text-red-500  p-2 w-full ">
                {confirmPasswordError}
              </span>
            )}
          </div>
          <div>
            <button className="bg-green-500 p-2 px-4 hover:scale-105">
              Signup
            </button>
          </div>
        </form>
        <div>
          <p>
            Already have an account{" "}
            <span className="text-blue-600 font-semibold hover:text-blue-400">
              <Link to="/login">login</Link>
            </span>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
