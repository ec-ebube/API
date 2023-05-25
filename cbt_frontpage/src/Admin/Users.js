import { DataTable } from "primereact/datatable";
import { getUsers, userURL } from "../Endpoints";
import useFetch from "../hooks/useFetch";
import { Column } from "primereact/column";
import { Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const Users = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { Id } = useParams();

    const { data, isLoading, error } = useFetch(getUsers, token)

    const handleDelete = (id) => {
        // console.log(data);
        fetch(userURL + id + '/delete', 
        {
            method: 'DELETE'
        },
        {
            headers: { Authorization: 'Bearer ' + token }
        }).then(() => {
            console.log('Deleted')
        })
        // console.log(data);
    }

    const actionClick = (data) => {
        return (
            <div>
                <Button type="button"><Edit /></Button>
                <Button type="button" onClick={() => handleDelete(data.Id)}><Delete /></Button>
            </div>
        )
    }


    return (
        <div className="users">
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <div style={{ marginLeft: 'auto', maxWidth: '15rem' }}>
                        <Button variant='contained' color='success' startIcon={<Add />}>Create Admin</Button>
                    </div>
                    <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
                        <Column field="FirstName" header="FirstName" />
                        <Column field="LastName" header="LastName" />
                        <Column field="Email" header="Email" />
                        <Column field="PhoneNumber" header="PhoneNumber" />
                        <Column body={actionClick} header="Action" />
                    </DataTable>
                </div>
            )}
        </div>
    )
};

export default Users;
