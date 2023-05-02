import { Link } from "react-router-dom";
const Header = () => {
  
  return (
    <nav className='Header'>
      <h1 className='heading'>EverGreen CBT App</h1>
      <div className="links">
        <Link to="/" className="Link">Home</Link>
        <Link to="/Questions" className="Link">Create Question</Link>
      </div>
    </nav>
  );
}
 
export default Header;
