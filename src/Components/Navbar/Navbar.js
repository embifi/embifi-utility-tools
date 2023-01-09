import React, { useContext, useState } from "react";
import "./Navbar.css";
import eLogo from "../../assets/e.png";
import HandymanIcon from "@mui/icons-material/Handyman";
import { Avatar, Menu, MenuItem } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {

  const {logoutUser} = useAuth()
  const {user} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div className="navbar-wrapper">
        <div className="nav-content">
          <div className="nav-items-left">
            <div className="branding">
              <img src={eLogo} draggable={false} />{" "}
              <p className="brand-text">
                <HandymanIcon className="me-2" />
                TOOLS
              </p>
            </div>
          </div>
          <div className="nav-items-right">
            <Avatar id="basic-button" className="avatar" onClick={handleClick}>
              {user?.name?.[0]}
            </Avatar>
          </div>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
