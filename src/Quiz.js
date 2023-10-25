import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Quiz() {
    //state to hold all questions
    const [questions,setquestions]=useState([])
    //to set current question
    const [cq,scq]=useState(0)
    //to set score
    const [score,setscore]=useState(0)
    const [showscore,setshowscore]=useState(false)

    const getallquestions=async ()=>{
        const {data}=await axios.get('/db.json')
        // console.log(data.questions);
        setquestions(data.questions)
    }
    // console.log(questions);
    // console.log(questions[0]);

    useEffect(()=>{
        getallquestions()
    },[])

    const handleadd=(iscorrect)=>{
        if(iscorrect=="true"){
            setscore(score+1)
            // console.log(score);
        }
        scq(cq+1)
        if(cq<questions.length-1){
            // setshowscore(true)
        }
        else{
            setshowscore(true)
        }
    }


  return (
    <div className='container w-50 border my-5 p-5 text-center text-white' style={{backgroundColor:"#333399"}}>
        {
            showscore? <h3>Your Score {score} out of {questions.length}</h3>:
            <div><h1>Questions {cq+1}/{questions.length}</h1>
            <h5>{questions[cq]?.question}</h5>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                {
                    questions[cq]?.options.map(i=>(
                        <button onClick={()=>handleadd(i.iscorrect)} className='btn border w-25 my-2 text-white'>{i.option1}</button>
                        ))
                }
            </div></div>
        }
    </div>
  )
}

export default Quiz