import React, { useEffect, useState } from "react";
import useAuthManager from "../Composables/useAuthManager";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addList, getList, removeList } from "../Redux/listSlice";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getUserId, logout } = useAuthManager();
  const userId = getUserId();
  const [dark, setDark] = useState(true);
  const { list } = useSelector((state) => state.list);
  console.log(list);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (userId) {
      dispatch(getList(userId));
    }
  }, [userId]);

  const clearInput = () => {
    setTitle("");
  };

  const handleLoginLogout = () => {
    if (userId) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_id: userId,
      title,
    };
    dispatch(addList(data)).then((response) => {
        console.log(response)
      if (response.error?.message.length > 0) {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 500,
        });
      }

      if (response.payload?.data?.data?.length > 0) {
        toast.success("Added Successfully", {
          position: "top-right",
          autoClose: 500,
        });
      }
      clearInput();
    });
  };

  const deleteListItem = (id) => {
    const data = { user_id: userId, id };
    dispatch(removeList(data)).then((response) => {
      if (response.error?.message.length > 0) {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 500,
        });
      }

      if (response.payload?.data?.data?.length > 0) {
        toast.success(" Deleted Successfully", {
          position: "top-right",
          autoClose: 500,
        });
      }
    });
  };

  return (
    <div
      className={`w-full ${
        dark ? "bg-black" : "bg-white"
      } h-screen flex flex-col gap-5`}
    >
      <ToastContainer />
      <section className="flex w-full justify-center shadow-md">
        <nav className="h-20 flex p-5 justify-between w-full max-w-1500 ">
          <div className="xsm:text-2xl sm:text-4xl font-mono font-semibold text-pink-600 ">
            TO DO List
          </div>

          <div className="flex justify-evenly gap-20 items-center">
            <div
              className="cursor-pointer"
              onClick={() => setDark((prev) => !prev)}
            >
              {dark ? (
                <MdLightMode className="xsm:text-xl sm:text-3xl text-white" />
              ) : (
                <MdDarkMode className="xsm:text-xl sm:text-3xl  " />
              )}
            </div>

            <div
              className="cursor-pointer bg-green-400 p-2 rounded-md
             text-black font-mono font-semibold hover:bg-green-300"
              onClick={() => handleLoginLogout()}
            >
              {getUserId() ? <p>Logout</p> : <p>Login</p>}
            </div>
          </div>
        </nav>
      </section>

      <section className="flex flex-col w-full items-center gap-5">
        <div className="flex justify-center w-full max-w-1500">
          <form onSubmit={handleSubmit}>
            <div className="flex  gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`p-2 w-full bg-inherit border-b outline-none ${
                  dark ? "border-white text-white" : "border-black text-black"
                }`}
              />
              <button className="bg-gray-500 p-2 rounded-sm font-semibold">
                ADD
              </button>
            </div>
          </form>
        </div>
        <div className=" sm:w-96 xsm:w-84 p-5 flex flex-col justify-center gap-5 ">
          {list.length > 0 &&
            list.map((val, ind) => (
              <>
                <div
                  key={ind}
                  className={`flex gap-2 items-center text-xl ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  <span>{ind + 1 + ". "}</span>
                  <span>{val.title}</span>
                  <span
                    onClick={() => deleteListItem(val._id)}
                    className="hover:scale-110"
                  >
                    <MdDelete />
                  </span>
                </div>
              </>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
