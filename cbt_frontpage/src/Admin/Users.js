import { getUsers } from "../Endpoints";
import useFetch from "../hooks/useFetch";

const Users = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;
    
    const {data, isLoading, error} = useFetch(getUsers, token)
    


    return (
        <div className="users">
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && (
                data.map((data, index) => (
                    <div className="user-preview" key={index}>
                        <h3>{data.FirstName} { data.LastName }</h3>
                        <p>Email: {data.Email} | <span>Joined: {data.Created_at}</span></p>
                    </div>
                ))
            )}
        </div>
    )
};

export default Users;
