import React from 'react'
import { useParams} from 'react-router-dom'
import { assessmentsURL } from '../Endpoints';
import useFetch from '../hooks/useFetch';
import { Stack } from '@mui/material';

function Corrections() {


    const { Id } = useParams()
    const url = assessmentsURL;
    const { data, isLoading, error } = useFetch(url);

    var courseAssessment = []
    if (data) {
        data.map((courses) => {
            if (courses.CourseId === Id) {
                courseAssessment.push(courses)

            }
            return 0
        })
    }

    return (
        <div>
            {isLoading && <div>Loading ...</div>}
            {error && <div>{Error}</div>}
            {data && (
                courseAssessment.map((data, index) => (
                    <Stack>
                        <h3>{data.Question}</h3>
                        {/* {The correct answer} */}
                        <h5>Correct Answer: {data.Answer}</h5>
                        {/* {Your answer} */}
                        <h5>Your Answer: {data.Answer}</h5>
                    </Stack>
                ))
            )}
        </div>
    )
}

export default Corrections