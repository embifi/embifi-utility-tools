import React, { useState } from "react";
import { toast } from "react-toastify";
import { LoginBackground } from "../../Constants/colors";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
const Login = () => {
  const { loginUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(cred.email, cred.password);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <>
      <style>{LoginBackground}</style>
      <div className="container">
        <div className="form">
          <div className="title">Login</div>
          <div className="input-box underline">
            <input
              type="text"
              placeholder="Enter Your Email"
              value={cred.email}
              onChange={(e) => {
                setCred({ ...cred, email: e.target.value });
              }}
            />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={cred.password}
              onChange={(e) => {
                setCred({ ...cred, password: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleLogin();
                }
              }}
            />
            <div className="underline"></div>
          </div>
          <div className="input-box button">
            {!isLoading ? (
              <input
                type="submit"
                name=""
                value="Continue"
                onClick={handleLogin}
              />
            ) : (
              <p className="w-100 text-center" style={{ color: "purple" }}>
                Signing in....
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
