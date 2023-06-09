import { CreateAssessURL, assessmentsURL, coursesUrl } from "../Endpoints";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useFetch from "../hooks/useFetch";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import useCreate from "../hooks/useCreate";


const Adassessments = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data: assessData, isLoading, error } = useFetch(assessmentsURL, token)
    const { data: courseData } = useFetch(coursesUrl, token)
    const [visible, setVisible] = useState(false)
    const [Question, setQuestion] = useState('')
    const [Option_A, setOption_A] = useState('')
    const [Option_B, setOption_B] = useState('')
    const [Option_C, setOption_C] = useState('')
    const [Option_D, setOption_D] = useState('')
    const [Answer, setAnswer] = useState('')
    const [CourseId, setCourseId] = useState('')

    const { createUser } = useCreate()
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData()
            formdata.append('Question', Question)
            formdata.append('Option_A', Option_A)
            formdata.append('Option_B', Option_B)
            formdata.append('Option_C', Option_C)
            formdata.append('Option_D', Option_D)
            formdata.append('Answer', Answer)
            formdata.append('CourseId', CourseId)

            setVisible(false)
            await createUser(CreateAssessURL, formdata)
        } catch (error) {

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
            {assessData && (
                <div>
                    <div style={{ marginLeft: 'auto', maxWidth: '15rem' }}>
                        <Button variant='contained' color='success' startIcon={<Add />} onClick={() => setVisible(true)}>Create an Assessment</Button>
                    </div>
                    <DataTable value={assessData} stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '90%', minHeight: '20rem' }}>
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
            <Dialog
                visible={visible}
                header="Create Assessment"
                onHide={() => setVisible(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing={2}
                        direction='column'
                        sx={{ textAlign: 'center' }}
                    >
                        <FormControl>
                            <InputLabel>Select Course</InputLabel>
                            <Select
                                type="Select"
                                name="CourseId"
                                value={CourseId}
                                required
                                color='success'
                                onChange={(e) => setCourseId(e.target.value)}
                            >
                                {courseData && courseData.map((courseData, index) => (
                                    <MenuItem key={index} value={courseData.Id}>
                                        {courseData.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                label='Question'
                                name="Question"
                                required
                                variant='outlined'
                                color='success'
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='OptionA'
                                name="Option_A"
                                required
                                variant="outlined"
                                color="success"
                                onChange={(e) => setOption_A(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label='OptionB'
                                name="Option_B"
                                required
                                variant="outlined"
                                color="success"
                                onChange={(e) => setOption_B(e.target.value)}
                            />
                        </div><div>
                            <TextField onClick={() => { console.log(courseData) }}
                                label='OptionC'
                                name="Option_C"
                                required
                                variant="outlined"
                                color="success"
                                onChange={(e) => setOption_C(e.target.value)}
                            />
                        </div><div>
                            <TextField
                                label='OptionD'
                                name="Option_D"
                                required
                                variant="outlined"
                                color="success"
                                onChange={(e) => setOption_D(e.target.value)}
                            />
                        </div>
                        <FormControl>
                            <InputLabel>Answer</InputLabel>
                            <Select
                                type="Select"
                                name="Answer"
                                value={Answer}
                                required
                                color='success'
                                onChange={(e) => setAnswer(e.target.value)}
                            >
                                <MenuItem value={Option_A}>Option A</MenuItem>
                                <MenuItem value={Option_B}>Option B</MenuItem>
                                <MenuItem value={Option_C}>Option C</MenuItem>
                                <MenuItem value={Option_D}>Option D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color='success' type="submit"> Submit </Button>
                    </Stack>
                </form>
            </Dialog>
        </div>
    );
}

export default Adassessments;