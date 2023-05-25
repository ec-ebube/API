import { coursesUrl, singleCourseURL } from "../Endpoints";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useFetch from "../hooks/useFetch";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Adcourses = () => {
    const navigate = useNavigate();

    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data, isLoading, error } = useFetch(coursesUrl, token)
    // console.log(data);

    const handleDelete = (id) => {
        console.log(id);
        fetch(singleCourseURL + id + '/delete',
            {
                method: 'DELETE'
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            }).then(() => {
                console.log('Deleted')
            })
    }
    const handleCreate = () => {
        navigate('/admin/createcourse')
    }

    const actionClick = (data) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button"><Edit /></Button>
                <Button type="button" onClick={() => handleDelete(data.Id)}><Delete /></Button>
            </div>
        )
    }

    return (
        <div>
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <div style={{ marginLeft: 'auto', maxWidth: '15rem' }}>
                        <Button variant='contained' color='success' startIcon={<Add />} onClick={handleCreate}>Create Course</Button>
                    </div>
                    <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
                        <Column field="Name" header="Name" />
                        <Column field="Description" header="Description" />
                        <Column body={actionClick} header="Action" />
                    </DataTable>
                </div>
            )}
        </div>
    );
}

export default Adcourses;