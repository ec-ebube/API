import React from 'react'
import { useParams } from 'react-router-dom'
import { assessmentsURL } from '../Endpoints';
import useFetch from '../hooks/useFetch';
import { Stack } from '@mui/material';
import { choosed } from './Course'

function Corrections() {

    let score = 0;
    let percentage = 0;
    let gotArray = [];

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
                        {choosed.map((c) => {
                            if (data.Answer === c.ans) {
                                score = score + 2;
                                gotArray.push(c.ans);
                            }
                            return data.Id === c.id && (<h5>Your Answer: {c.ans}</h5>)
                        })
                        }
                    </Stack>
                ))
            )}
            <h3>
                Got {gotArray.length} out of {courseAssessment.length}
            </h3>
            <h3>Total percentage gotten is <span>
                {percentage = Math.round(((score) / (2 * courseAssessment.length)) * 100)}%
            </span>
            </h3>
            {console.log(percentage)}
        </div>
    )
}

export default Corrections