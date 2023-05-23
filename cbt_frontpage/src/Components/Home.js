import { useState } from 'react';
import { Button, Link, Stack } from "@mui/material";
import { coursesUrl } from "../Endpoints";
import useFetch from "../hooks/useFetch";
import { TextField } from '@mui/material'
import { Refresh } from "@mui/icons-material";
// import Course from "./Course";




const Home = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const { data, isLoading, error } = useFetch(coursesUrl, token)

    const [minWidth, setMinWidth] = useState('35%')
    const [display, setDisplay] = useState('flex')
    const [searchArray, setSearchArray] = useState([])
    // var searchArray = [];
    if (data) {
        // for (let index = 0; index < data.length; index++) {
        //     var name = data[index].Name;
        //     var des = data[index].Description;
        //     searchArray.push({ name: name, des: des });


        // }
        // console.log(searchArray);
        // console.log(data);
    }

    // For the seach bar
    const [searchInput, setSearchInput] = useState([])
    // const searchData = [];
    if(searchInput){

    }
    // const Searchbar = [
    //         data.map((data, index) => (
    //             {
    //                 name: {data.Name}
    //             }
    //         )
    // ]

    const clickedSearch = () => {
        setMinWidth('85%')
        setDisplay('none')
    }
    const unClickedSearch = () => {
        if ((setMinWidth) !== ('35%')) {
            window.location.reload()
        } else {
            setMinWidth('35%')
            setDisplay('flex')
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        const filteredData = data.filter((d) => {
            return Object.values(d)
                .join('')
                .toLowerCase()
                .includes(inputValue.toLowerCase())
        });
        // console.log(inputValue);
        setSearchInput(filteredData)
        setSearchArray(filteredData)
        // console.log(searchArray);
    }
    return (
        <Stack>
            {data &&
                <div className="search">
                    <Button onClick={unClickedSearch}><Refresh /></Button>
                    <TextField type="search" name='Search'
                        variant='outlined'
                        color='success'
                        label='Search'
                        sx={{ minWidth: { minWidth } }}
                        onClick={clickedSearch}
                        // value={searchInput}
                        onChange={handleChange}
                    />
                </div>
            }
            {searchArray &&
                <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}> {
                    searchArray.map((data, index) => (
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
                            key={index}
                        >
                            <div className="CourseDisplay" key={index}>
                                <h3 className="CourseName">{data.Name}</h3>
                                <p>Description: {data.Description}</p>
                            </div>
                        </Link>
                    ))
                }</Stack>
            }
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {data && <Stack sx={{ display: { display }, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}> {
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
                        key={index}
                    >
                        <div className="CourseDisplay" key={index}>
                            <h3 className="CourseName">{data.Name}</h3>
                            <p>Description: {data.Description}</p>
                        </div>
                    </Link>
                ))
            }</Stack>}
        </Stack >
    );
}

export default Home;