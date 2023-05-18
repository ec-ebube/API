import { Button } from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { /*CancelPresentationIcon,*/ SupervisedUserCircle } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
const Header = () => {

  const { logout } = useLogout();
  var user = localStorage.getItem('user');
  user = JSON.parse(user);

  const handleLogout = () => {
    logout();
  }


  return (
    <div>
      <nav className='Header'>
        <h1 className='heading'> <a href="/"> EverGreen CBT App </a></h1>
        <div className="links">
          {user && <div>
          <Button href={"/user/" + user.Id + "/get"} className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>{user.Email}</Button>
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
  );
}

export default Header;
