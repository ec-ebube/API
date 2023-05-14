// import {useState} from 'react'
import { Link, Stack } from "@mui/material";
import { coursesUrl } from "../Endpoints";
import useFetch from "../hooks/useFetch";
// import Course from "./Course";




const Home = () => {

    const { data, isLoading, error } = useFetch(coursesUrl)
    // const dynmicLink = '/courses/' + data.id;

    return (
        <Stack>
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}> {
                data.map((data, index) => (
                    <Link href={'/courses/' + data.Id}
                        className="courseCard"
                        sx={{
                            textDecoration: 'none',
                            height: '30vh',
                            border: '1px dashed #333',
                            borderRadius: '2rem',
                            width: '30vw',
                            padding: '2rem',
                            marginTop: '2vh',
                            marginBottom: '2vh',
                            backgroundColor: '#08e652'
                        }}
                    >
                        <Link sx={{ textDecoration: 'none', color: '#2b2626'}}>
                            <div className="CourseDisplay" key={index}>
                                <h3 className="CourseName">{data.Name}</h3>
                                <p>Description: {data.Description}</p>
                            </div>
                        </Link>
                    </Link>
                ))
            }</Stack>}
        </Stack >
    );
}

export default Home;