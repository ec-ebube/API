import { DataTable } from "primereact/datatable";
import { CreateUserURL, getUsers, userURL } from "../Endpoints";
import useFetch from "../hooks/useFetch";
import { Column } from "primereact/column";
import { Button, Stack, TextField } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
// import { useParams } from "react-router-dom";
import { Dialog } from 'primereact/dialog'
import { useState } from "react";
import useCreate from "../hooks/useCreate";

const Users = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    // const { Id } = useParams();

    const { data, isLoading, error } = useFetch(getUsers, token)
    const [visible, setVisible] = useState(false)
    const [see, setSee] = useState(false)
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Password, setPassword] = useState('')
    const Role = 'Admin'
    const { createUser } = useCreate()
    const [userId, setUserId] = useState(null)
    // console.log(data[0].Id);

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
                setSee(false)
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData()
            formdata.append('FirstName', FirstName)
            formdata.append('LastName', LastName)
            formdata.append('Email', Email)
            formdata.append('PhoneNumber', PhoneNumber)
            formdata.append('Role', Role)
            formdata.append('Password', Password)
            console.log(formdata);
            setVisible(false)


            await createUser(CreateUserURL, formdata)
        } catch (error) {
            console.log(error.message);
        }
    }

    const onDemand = () => {
        return (
            <div>
                Sure you want to delete User?
                {userId}
                <Stack spacing={4} direction='row'>
                    <Button onClick={() => handleDelete(userId)} variant="contained" color='error'>Delete</Button>
                    <Button onClick={() => setSee(false)} variant="contained" color='info'>Cancel</Button>
                </Stack>
            </div>
        )
    }

    const actionClick = (data) => {
        return (
            <div>
                <Button type="button"><Edit /></Button>
                <Button type="button" onClick={() => {
                    setSee(true)
                    onDemand(data.id)
                    setUserId(data.Id)
                }}><Delete /></Button>
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
                        <Button variant='contained' color='success' startIcon={<Add />} onClick={() => setVisible(true)}>Create Admin</Button>
                    </div>
                    <DataTable value={data} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
                        <Column field="FirstName" header="FirstName" />
                        <Column field="LastName" header="LastName" />
                        <Column field="Email" header="Email" />
                        <Column field="PhoneNumber" header="PhoneNumber" />
                        <Column body={actionClick} header="Action" />
                    </DataTable>
                    <Dialog
                        header={onDemand}
                        visible={see}
                        onHide={() => setSee(false)}
                        style={{ width: '50vw' }}
                        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                    />
                </div>
            )}
            <Dialog
                header='Create Admin'
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
                                label='FirstName'
                                name='FirstName'
                                required
                                variant='outlined'
                                color='success'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='LastName'
                                name='LastName'
                                variant='outlined'
                                required
                                color='success'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Email'
                                required
                                name='Email'
                                variant='outlined'
                                color='success'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='PhoneNumber'
                                name='PhoneNumber'
                                variant='outlined'
                                required
                                color='success'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Role'
                                name='Role'
                                variant="standard"
                                color="primary"
                                value='Admin'
                            />
                        </div>
                        <div>
                            <TextField
                                label='Password'
                                name='Password'
                                variant='outlined'
                                required
                                color='success'
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button variant="contained" color='success' type="submit"> Submit </Button>
                    </Stack>
                </form>
            </Dialog>

        </div>
    )
};

export default Users;
