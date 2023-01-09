import { useState, useEffect } from "react";
import axios from "axios";
import { verifyAuth } from "../api";

export default function useFindUser() {
  
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    async function findUser() {
        
        setLoading(true)
        try{
            let { data } = await verifyAuth();
            setLoading(false)
            setUser(data.data)

        }catch(err){
            setLoading(false)
            setUser(null)
        }
      
    }

    findUser();
  }, []);

//   useEffect(()=>{
//     if(user){
//         localStorage.setItem("userData", JSON.stringify(user));
//     }else{
//         localStorage.removeItem("userData");
//     }
//   },[user])

  return {
    user,
    setUser,
    isLoading,
  };
}
