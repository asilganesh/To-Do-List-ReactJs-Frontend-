import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../Redux/authSlice";
import lodash from "lodash";

export default function useAuthManager() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({ type: "loginSuccess", payload: userInfo });
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  const loginWithCredentials = async (userData) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUser(userData))
        .then((response) => {
          if (response.meta.requestStatus === 'rejected') {
            return reject(response.error);
          }
  
          const userInfo = response?.payload?.userDetails?.userInfo;
          if (userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          }
  
          resolve(response);
        })
        .catch((error) => {
          reject(error); 
        });
    });
  };

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userInfo");
  };

  const getEmail = () => lodash.get(auth, "user.mail", null);
  const getUserId = () => lodash.get(auth, "user.id", null);
  const getUserName = () => lodash.get(auth, "user.name", null);
  const getUserToken = () => lodash.get(auth, "user.token", null);

  return {
    loginWithCredentials,
    logout,
    getEmail,
    getUserId,
    getUserName,
    getUserToken,
  };
}
