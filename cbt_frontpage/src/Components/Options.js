import React, { useState} from 'react'

function Options({Options}) {
    const [optionA, setOptionA] = useState('')
    const [optionB, setOptionB] = useState('')
    const [optionC, setOptionC] = useState('')
    const [optionD, setOptionD] = useState('')
    // console.log(Options.length);
    if(Options != null)
    {
        setOptionA(Options['Option_A'])
        setOptionB(Options['Option_B'])
        setOptionC(Options['Option_C'])
        setOptionD(Options['Option_D'])

        console.log(optionA);
        console.log(optionB);
        console.log(optionC);
        console.log(optionD);
    }
    
  return (
    <div>
        <p>{optionA}</p>
        <p>{optionB}</p>
        <p>{optionC}</p>
        <p>{optionD}</p>
    </div>
  )
}

export default Options
