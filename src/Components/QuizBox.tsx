import React from "react";
import {Button} from "./Component.tsx";
import {socket} from '../socket.js'


export default function  QuizBox(props){
    const [isHovered, setIsHovered] = React.useState(false);
    const mainQuizBoxStyle={
        borderRadius:"6px",
        border:"1px solid #D3D3D3",
        width:"20em",
        height:"14em",
        transition: 'box-shadow 0.3s ease',
        boxShadow: isHovered ? ' 0 0 11px rgba(33,33,33,.2)':'none',
        backgroundImage:'url("/assets/question-marks.jpg")',
        backgroundSize:"cover",
        backgroundRepeat: 'repeat',
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    }
    const handleButtonClick=()=>{
        const payload={
            quizCode:props.quiz.id,
            questionNumber:0,
        }
        socket.emit('sendQuestion',payload)
    }



    return(
        <>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={mainQuizBoxStyle}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                >
                    <p style={{fontSize:"1.5rem"}}>{props.quiz.name}</p>
                </div>
                <Button
                    style={{marginTop:"1em"}}
                    onClick={handleButtonClick}
                >
                    Start Quiz
                </Button>
            </div>
        </>
    )
}