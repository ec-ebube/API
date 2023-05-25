import React from 'react'
import { Button } from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { SupervisedUserCircle } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useAuthContext } from '../hooks/useAuthContext';
import { Outlet } from "react-router-dom";

function Adheader() {
    const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  }
//   var singleUser = JSON.parse(user)


  return (
    <div className="container">
      <div className="header">
      <nav className='Header'>
        <h1 className='heading'> <a href="/admin"> EverGreen CBT App </a></h1>
        <div className="links">
          {user && <div>
            <Button href="/admin/users" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Users</Button>
            <Button href="/admin/courses" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Courses</Button>
            <Button href="/admin/assessments" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Assessments</Button>
            <Button className="Link" variant="text" color="error" /*startIcon={<CancelPresentationIcon />}*/ onClick={handleLogout}>Log Out</Button>
          </div>
          }
          {!user &&
            <div>
              <Button href="/login" className="Link" variant="text" color="error" startIcon={<LoginRoundedIcon />}> Login </Button>
              <Button href="/CreateAcct" className="Link" variant="outlined" color="warning" startIcon={<ExitToAppRoundedIcon />}> SignUp </Button>
            </div>
          }
        </div>
      </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default Adheader
