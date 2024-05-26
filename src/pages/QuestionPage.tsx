import {socket} from '../socket.js'
import {useNavigate} from "react-router";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export default function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [answerState, setAnswerState] = useState("");
    const [isAnswering, setIsAnswering] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {value} = event.target;
        setAnswerState(value);
    };

    const location = useLocation();
    console.log(location)
    const code = location.state?.payload.quizCode || "N/A";

    const sendAnswer = (event) => {
        event.preventDefault();
        socket.emit("getAnswer", {
            quizCode: code,
            answer: answerState,
            questionNumber: questionNumber,
            playerPseudo: localStorage.getItem('name')
        });
    }

    useEffect(() => {
        socket.emit("sendQuestion", {
            quizCode: code, questionNumber: 0
        });


        socket.on("question", (question) => {
            setIsAnswering(false)
            setQuestions((prevQuestions) => [...prevQuestions, question]);
            setQuestionNumber(question.questionNumber);
            const questionTimer = setTimeout(() => {
                if (!isAnswering) {
                    socket.emit("getAnswer", {
                        quizCode: code,
                        answer: "",
                        questionNumber: questionNumber,
                        playerPseudo: localStorage.getItem('name')
                    });
                }
            }, 10000);
            return () => clearTimeout(questionTimer);
        });

        socket.on("endQuiz", (payload) => {
            navigate('/leaderboard', {
                state: {payload: payload}
            });
            // localStorage.removeItem('name');
        });

        return () => {
            socket.off("question");
            socket.off("endQuiz");
        };
    }, [navigate]);

    const currentQuestion = questions.find(q => q.questionNumber === questionNumber) || {};
    const {question, options} = currentQuestion.question || {};

    function getRandomColor() {
        const min = 150;
        const max = 256;
        const r = Math.floor(Math.random() * (max - min) + min);
        const g = Math.floor(Math.random() * (max - min) + min);
        const b = Math.floor(Math.random() * (max - min) + min);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const borderColors = [getRandomColor(), getRandomColor(), getRandomColor()];

    const Container = styled.div`
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        position: relative;
        margin: auto;
        margin-top: 2%;
        overflow: hidden;
        top: 10%;
        width: 500px;
        height: 600px;
        max-width: 100%;
        min-height: 400px;
    `;

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
        borderRadius: '5px',
        cursor: isAnswering ? 'not-allowed' : 'pointer',
    }
    const questionStyle = {
        fontSize: '1.5em'
    }

    return (<Container>
        <div>
            <h2 style={{marginTop: '8%', marginBottom: '8%'}}>
                <span style={{color: "#6C0345"}}>Quiz</span>
                <span style={{color: "#DC6B19"}}>Up</span>
            </h2>
            <form onSubmit={sendAnswer}>
                <div>
                    <p style={questionStyle}>{question}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginTop: '1em'}}>
                        {options && options.map((option, index) => (
                            <div key={index} style={{...optionStyle, borderColor: borderColors[index]}}>
                                <input
                                    type="radio"
                                    id={`option${index}`}
                                    name="answer"
                                    value={option}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`option${index}`}>{option}</label>
                            </div>))}
                    </div>
                </div>
                <button style={buttonStyle} type="submit" disabled={isAnswering}>Submit Answer</button>
            </form>
        </div>
    </Container>)
}