import { coursesUrl, singleCourseURL } from "../Endpoints";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useFetch from "../hooks/useFetch";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Dialog } from 'primereact/dialog'
import useCreate from "../hooks/useCreate";
import { createcourse } from "../Endpoints";


const Adcourses = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data, isLoading, error } = useFetch(coursesUrl, token)
    const [visible, setVisible] = useState(false)
    const [Name, setName] = useState('')
    const [Description, setDescription] = useState('')
    const { createUser } = useCreate()
    if (data) {
        // console.log(data);
    }

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData()
            formdata.append('Name', Name)
            formdata.append('Description', Description)

            setVisible(false)
            await createUser(createcourse, formdata)
        } catch (error) {
            console.log(Error);
        }
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
                        <Button variant='contained' color='success' startIcon={<Add />} onClick={() => setVisible(true)}>Create Course</Button>
                    </div>
                    <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
                        <Column field="Name" header="Name" />
                        <Column field="Description" header="Description" />
                        <Column body={actionClick} header="Action" />
                    </DataTable>
                </div>
            )}
            <Dialog
                header='Create Course'
                visible={visible}
                onHide={() => setVisible(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction='column'
                        sx={{ textAlign: 'center' }}
                    >
                        <div>
                            <TextField
                                label='Course Name'
                                name='Name'
                                required
                                variant='outlined'
                                color='success'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Course Description'
                                name='Description'
                                required
                                variant="outlined"
                                color="success"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Button variant="contained" color='success' type="submit"> Submit </Button>
                    </Stack>
                </form>
            </Dialog>
        </div>
    );
}


export default Adcourses;