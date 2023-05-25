import { assessmentsURL } from "../Endpoints";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useFetch from "../hooks/useFetch";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";


const Adassessments = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data, isLoading, error } = useFetch(assessmentsURL, token)
    // console.log(data);
    const handleDelete = (id) => {
        fetch(assessmentsURL + id + '/delete',
            {
                method: 'DELETE'
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            }).then(() => {
                console.log('Deleted')
            })
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
                        <Button variant='contained' color='success' startIcon={<Add />}>Create an Assessment</Button>
                    </div>
                    <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
                        <Column field="Question" header="Question" />
                        <Column field="Option_A" header="Option_A" />
                        <Column field="Option_B" header="Option_B" />
                        <Column field="Option_C" header="Option_C" />
                        <Column field="Option_D" header="Option_D" />
                        <Column field="Answer" header="Answer" />
                        <Column body={actionClick} header="Action" />
                    </DataTable>
                </div>
            )}
        </div>
    );
}

export default Adassessments;