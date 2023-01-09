import { createContext, useEffect, useState } from "react";
import useFindUser from "../hooks/useFindUser";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

  const { user, setUser, isLoading } = useFindUser();

  const [signUpData, setSignup] = useState({
    mobile: "",
    password: "",
    cpassword: "",
  });

  // useEffect(()=>{
  //   console.log(user);
  // },[user])



  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        signUpDataState: [signUpData, setSignup],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
