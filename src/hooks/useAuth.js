// useAuth Hook
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { login, logout } from "../api";
import { GlobalContext } from "../Context/GlobalContext";
import { toast } from "react-toastify";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);

  // const createUser = async (email, name, dob, userType) => {
  //   let payload = {
  //     email,
  //     name,
  //     dob,
  //     userType,
  //   };

  //   try {
  //     let { data } = await create(payload);

  //     // if (data?.status) {
  //     //   setUser(data?.data);
  //     //   navigate('/')
  //     // }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //     //   enqueueSnackbar(error.response.data.errors[0].message, {variant:"error"})
  //   }
  // };

  const loginUser = async (email, password) => {
    let payload = {
      email,
      password,
    };

    try {
      let { data } = await login(payload);

      if (data?.status) {
        setUser(data?.data);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      //   enqueueSnackbar(error.response.data.errors[0].message, {variant:"error"})
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    loginUser,
    logoutUser,
    error,
    // createUser,
  };
}
