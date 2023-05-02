import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notfound">
            <h2>Sorry</h2>
            <p className="n404f">404 sorry, URL not found</p>
            <Link to="/" className="to-home">Go to homepage</Link>
        </div>
    );
}
 
export default NotFound;