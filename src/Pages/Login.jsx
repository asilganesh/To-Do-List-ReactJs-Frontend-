import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthManager from "../Composables/useAuthManager";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginWithCredentials } = useAuthManager();
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearForm = () => {
    setMail("");
    setPassword("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mailError && !passwordError) {
      const userInfo = {
        mail,
        password,
      };

      loginWithCredentials(userInfo)
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            toast.success("Login Successfully", {
              position: "top-right",
              autoClose: 1000,
            });

            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Login failed", {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .finally(() => {
          clearForm();
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
        <div className="text-4xl font-semibold font-mono">Login</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {" "}
            <p>Mail:</p>
            <input
              type="mail"
              placeholder="Enter Mail"
              value={mail}
              onChange={handleMailChange}
              className="border-b border-black  outline-none"
            />
            {mailError && (
              <p className="text-sm text-red-500  p-2 w-full ">
                {mailError}
              </p>
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
              className="border-b border-black  outline-none"
            />
            {passwordError && (
              <p className="text-sm text-red-500  p-2 w-full">
                {passwordError}
              </p>
            )}
          </div>

          <div className="">
            <button className="bg-green-500 p-2 px-4 hover:scale-105">
              Login
            </button>
          </div>
        </form>
        <div>
          <p>
            Don't have an account{" "}
            <span className="text-blue-600 font-semibold hover:text-blue-400">
              <Link to="/register">register</Link>
            </span>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
