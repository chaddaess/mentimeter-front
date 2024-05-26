import {socket} from '../socket.js'
import {useNavigate} from "react-router";

import styled from "styled-components";
import {useState} from "react";


export default function QuestionPage() {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [questionNumber,setQuestionNumber]=useState(0);
    const [isAnswering,setIsAnswering]=useState(false);
    const navigate = useNavigate()
    const Container = styled.div`
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        position: relative;
        overflow: hidden;
        top: 10%;
        width: 500px;
        height: 600px;
        max-width: 100%;
        min-height: 400px;
    `;
    //TODO: set this code dynamically from when the user clicks "join" in main page
    const code = "136fbd90-2a2b-4f1b-804c-5adb7009c8b0"
    const sendAnswer = (event) => {
        event.preventDefault();
        setIsAnswering(true)
        socket.emit("getAnswer",
            {
                quizCode: code,
                //TODO: get the answer dynamically from the form
                answer: "4",
                questionNumber:questionNumber,
                playerPseudo: "chadda"
            }
        )
    }

    if(isFirstTime){
        socket.emit("joinQuiz", {
            quizCode: code,
            playerName: "chadda",
            avatar: ""
        });
        socket.emit("sendQuestion", {
            quizCode: code,
            questionNumber: 0
        });

        setIsFirstTime(false)
    }
    socket.on("question", (question) => {
        setIsAnswering(false)
        setQuestionNumber(question.questionNumber)
        console.log(question)
        const questionTimer = setTimeout(() => {
            if (!isAnswering) {
                socket.emit("getAnswer", {
                    quizCode: code,
                    answer: "",
                    questionNumber: questionNumber,
                    playerPseudo: "chadda"
                });
            }
        },10000);
        return () => clearTimeout(questionTimer);
    })

    socket.on("endQuiz", (payload) => {
        console.log("quiz ended")
        navigate(
            '/leaderboard',
            {
                state: {payload: payload}
            }
        )
    })

    function getRandomColor() {
        const min = 150; // Minimum value for r, g, b to ensure lighter shades
        const max = 256; // Maximum value for r, g, b to ensure pastel shades
        const r = Math.floor(Math.random() * (max - min) + min);
        const g = Math.floor(Math.random() * (max - min) + min);
        const b = Math.floor(Math.random() * (max - min) + min);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const borderColors = [getRandomColor(), getRandomColor(), getRandomColor()];

    const optionStyle = {
        border: '2px solid ',
        padding: '1em',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'left',
        width: '85%',
        margin: 'auto',
        marginBottom: '1em',
    }
    const buttonStyle = {
        marginTop: '5em',
        backgroundColor: '#6C0345',
        color: 'white',
        cursor: isAnswering ? 'not-allowed' : 'pointer',
    }

    return (


            <Container>
                <div>
                    <h2 style={{marginTop: '8%', marginBottom: '8%'}}>
                        <span style={{color: "#6C0345"}}>Quiz</span>
                        <span style={{color: "#DC6B19"}}>Up</span>
                    </h2>
                    {/*TODO:change the hardcoded question to the question recieved from the websocket*/}
                    <form onSubmit={sendAnswer}>
                        <div>
                            <p>HOW MANY FINGERS DO I HAVE ??? VERY HARD QUESTION</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{marginTop: '1em'}}>

                                <div style={{...optionStyle, borderColor: borderColors[0]}}>
                                    <input type="radio" id="option1" name="answer" value="option1"/>
                                    <label htmlFor="option1">Option 1</label>
                                </div>
                                <div style={{...optionStyle, borderColor: borderColors[1]}}>
                                    <input type="radio" id="option2" name="answer" value="option2"/>
                                    <label htmlFor="option2">Option 2</label>
                                </div>
                                <div style={{...optionStyle, borderColor: borderColors[2]}}>
                                    <input type="radio" id="option3" name="answer" value="option3"/>
                                    <label htmlFor="option3">Option 3</label>
                                </div>
                            </div>
                    </div>
                    <button style={buttonStyle} type="submit" disabled={isAnswering}>Submit Answer</button>
                </form>
            </div>
        </Container>)
}