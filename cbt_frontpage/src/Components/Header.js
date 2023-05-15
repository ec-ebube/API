// import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { /*Logout,*/ SupervisedUserCircle } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
const Header = () => {

  const { Logout } = useLogout();

  const handleLogout = () => {
    Logout();
  }


  return (
    <div>
      <nav className='Header'>
        <h1 className='heading'> <a href="/"> EverGreen CBT App </a></h1>
        <div className="links">
          <Button href="/Users" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Users</Button>
          <Button to="/Questions" className="Link" variant="text" color="error" /*startIcon={<Logout className="logoutIcon" />}*/ onClick={handleLogout}>Log Out</Button>
        </div>
      </nav>
      {/* <h3>
        {error && <p>{Error}</p>}
        {data && (

        )}
      </h3> */}
    </div>
  );
}

export default Header;
