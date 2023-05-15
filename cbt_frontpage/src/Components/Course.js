import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { /*singleCourseURL,*/ assessmentsURL } from '../Endpoints'
import { Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Stack } from '@mui/material';

const choose = [];
function Course() {


  const navigate = useNavigate();

  const { Id } = useParams()
  const url = assessmentsURL;
  const { data, isLoading, error } = useFetch(url);
  let [answered, setAnswered] = useState(0);
  const [checked] = useState([]);

  var courseAssessment = []
  var ansArray = []
  if (data) {
    data.map((courses) => {
      if (courses.CourseId === Id) {
        courseAssessment.push(courses)

      }
      return 0
    })
  }

  if (courseAssessment) {
    ansArray.push(courseAssessment.Answer)
  }


  const handleAnswered = (e) => {





    var ele = e.target.name
    var opt = e.target.value


    if (checked.includes(ele)) {
      var len = checked.indexOf(ele);
      // console.log(len);
      // console.log('exists');
      choose[len].ans = opt;
      // checked[opt] == len;
    } else {
      checked.push(ele);
      choose.push({ ans: opt, id: ele });

    }
    console.log(checked);
    console.log(choose);





    if ((checked.length) <= (courseAssessment.length)) {
      return setAnswered(answered + 1);
    } else {
      alert('The end Question');
    }


    return { choose, checked };
  }


  const handleSubmit = () => {
    if (data) {
      console.log(choose);
      navigate('/answers/' + Id)
    } else {
      console.log("No data found");
    }
  }

  return (
    <div>
      {isLoading && <div>Loading ...</div>}
      {error && <div>{Error}</div>}
      {/* For Testing and seeing the Assessments */}
      {data && (
        courseAssessment.map((data, index) => (
          <Link sx={{ textDecoration: 'none' }} key={index}>
            <FormControl
              className='QuestionView'
              key={index}
              sx={{
                maxWidth: '70vw',
                justifyContent: 'center'
              }}
            >
              <FormLabel id='question-group-head'>{data.Question}</FormLabel>
              <RadioGroup onClick={handleAnswered}
                aria-labelledby='question-group-head'
                name={data.Id}
                onChange={(() => {
                  // console.log(courseAssessmant.Answer);
                })}

                sx={{
                  width: '40vw',
                  textAlign: 'left',
                  justifyContent: 'center'
                }}>

                <FormControlLabel value={data.Option_A} control={<Radio />} label={"A : " + data.Option_A} className='option' />
                <FormControlLabel value={data.Option_B} control={<Radio />} label={"B : " + data.Option_B} className='option' />
                <FormControlLabel value={data.Option_C} control={<Radio />} label={"C : " + data.Option_C} className='option' />
                <FormControlLabel value={data.Option_D} control={<Radio />} label={"D : " + data.Option_D} className='option' />
              </RadioGroup>
            </FormControl>
          </Link>
        ))
      )
      }
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center'
        }}
      >

        <h2>{checked.length} of {courseAssessment.length} answered </h2>
        <Button variant='contained' color='success' size='large'
          sx={{
            maxWidth: '10vw',
            marginLeft: 'auto'
          }}
          onClick={handleSubmit}
        >Submit</Button>
      </Stack>
    </div >
  )
}

export const choosed = choose;

export default Course
