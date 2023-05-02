import useFetch from "../hooks/useFetch";

const Users = () => {
    // const [users, setUsers] = useState(null);
    // setUsers([...users])
    const {data, isLoading, error} = useFetch('https://localhost:7097/api/users/getAll')
    
    if(data){
        console.log(data);
    }


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
