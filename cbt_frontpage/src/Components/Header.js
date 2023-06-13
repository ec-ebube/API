import { Button, useMediaQuery, useTheme } from "@mui/material";
import { SupervisedUserCircle } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';
import { Outlet } from "react-router-dom";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SpaIcon from '@mui/icons-material/Spa';
import DrawerComp from "./DrawerComp";
const Header = () => {


  const { user } = useAuthContext();
  const { logout } = useLogout();
  const theme = useTheme();
  const size = useMediaQuery(theme.breakpoints.down('md'))
  const size2 = useMediaQuery(theme.breakpoints.down('sm'))

  const handleLogout = () => {
    logout();
  }
  var singleUser = JSON.parse(user)


  return (
    <div className="container">
      <div className="header">
        <nav className='Header'>
          {!size2 ?
            <h1 className='heading'> <a href="/"> EverGreen CBT App </a></h1>
            :
            <h1 className='heading'> <a href="/"> <SpaIcon /></a></h1>
          }
          <div className="links">
            {user && <div>{!size ? <div>
              <Button href={"/user/" + singleUser.Id + "/get"} className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>{singleUser.Email}</Button>
              <Button className="Link" variant="text" color="error" /*startIcon={<CancelPresentationIcon />}*/ onClick={handleLogout}>Log Out</Button>
            </div> :
              <DrawerComp />
            }
            </div>
            }
              {!user && <div>{!size ? <div>
                <Button href="/login" /*label="Login"*/ className="Link" variant="text" color="error" startIcon={<LoginRoundedIcon />}> Login </Button>
                <Button href="/CreateAcct" className="Link" variant="outlined" color="warning" startIcon={<ExitToAppRoundedIcon />}> SignUp </Button>
              </div> :
                <DrawerComp />
              }
              </div>
              }
            </div>
        </nav>
      </div >
      <Outlet />
    </div >
  );
}

export default Header;
