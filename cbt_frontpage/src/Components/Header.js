import { Button } from "@mui/material";
import { SupervisedUserCircle } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';
import { Outlet } from "react-router-dom";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SpaIcon from '@mui/icons-material/Spa';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
const Header = () => {


  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  }
  var singleUser = JSON.parse(user)


  return (
    <div className="container">
      <div className="header">
        <nav className='Header'>
          <h1 className='heading'> <a href="/"> EverGreen CBT App </a></h1>
          <div className="links">
            {user && <div>
              <Button href={"/user/" + singleUser.Id + "/get"} className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>{singleUser.Email}</Button>
              <Button className="Link" variant="text" color="error" /*startIcon={<CancelPresentationIcon />}*/ onClick={handleLogout}>Log Out</Button>
            </div>
            }
            {!user && <div>
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

export default Header;
