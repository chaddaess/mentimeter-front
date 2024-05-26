import { socket } from '../socket.js'
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function QuestionPage() {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [questionNumber,setQuestionNumber]=useState(0);
    const [questions, setQuestions] = useState([]);
    const [answerState, setAnswerState] = useState("");
    const [isAnswering,setIsAnswering]=useState(false);
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { value } = event.target;
        setAnswerState(value);
    };
    //TODO: set this code dynamically from when the user clicks "join" in main page
    const code = "9218cc53-f6b5-47e8-a72d-c6b0fc8ee100"
    const sendAnswer = (event) => {
        event.preventDefault();
        setIsAnswering(true)
        socket.emit("getAnswer", {
            quizCode: code,
            answer: answerState,
            questionNumber: questionNumber,
            playerPseudo: "chadda"
        });
    }

    useEffect(() => {
        if (isFirstTime) {
            socket.emit("joinQuiz", {
                quizCode: code,
                playerName: "chadda",
                avatar: ""
            });

            socket.emit("sendQuestion", {
                quizCode: code,
                questionNumber: 0
            });

            setIsFirstTime(false);
        }

        socket.on("question", (question) => {
            setQuestions((prevQuestions) => [...prevQuestions, question]);
            setQuestionNumber(question.questionNumber);
        });

        socket.on("endQuiz", (payload) => {
            navigate('/leaderboard', {
                state: { payload: payload }
            });
        });

        return () => {
            socket.off("question");
            socket.off("endQuiz");
        };
    }, [isFirstTime, navigate]);

    const currentQuestion = questions.find(q => q.questionNumber === questionNumber) || {};
    const { question, options } = currentQuestion.question || {};

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

    return (
        <Container>
            <div>
                <h2 style={{ marginTop: '8%', marginBottom: '8%' }}>
                    <span style={{ color: "#6C0345" }}>Quiz</span>
                    <span style={{ color: "#DC6B19" }}>Up</span>
                </h2>
                <form onSubmit={sendAnswer}>
                    <div>
                        <p style={questionStyle}>{question}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: '1em' }}>
                            {options && options.map((option, index) => (
                                <div key={index} style={{ ...optionStyle, borderColor: borderColors[index] }}>
                                    <input
                                        type="radio"
                                        id={`option${index}`}
                                        name="answer"
                                        value={option}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor={`option${index}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button style={buttonStyle} type="submit" disabled={isAnswering}>Submit Answer</button>
                </form>
            </div>
        </Container>
    )
}
