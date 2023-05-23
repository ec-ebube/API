import { coursesUrl } from "../Endpoints";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useFetch from "../hooks/useFetch";
import { Delete } from "@mui/icons-material";


const Adcourses = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data, isLoading, error } = useFetch(coursesUrl, token)
    console.log(data);

    return (
        <div>
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && (
                <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{minWidth: '90%', minHeight: '20rem'}}>
                    <Column field="Name" header="Name" />
                    <Column field="Description" header="Description" />
                </DataTable>
            )}
        </div>
    );
}

export default Adcourses;