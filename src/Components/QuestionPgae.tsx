import { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import io from "socket.io-client";

export default function QuestionPage(){

    const quizId="fff2c4b1-c688-482e-af3c-9de4e77f791c";
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the WebSocket server
        const socketConnection = io("http://localhost:3001");
    
        socketConnection.on("connect", () => {
          console.log("Connected to WebSocket server");
          socketConnection.emit("getQuestion", { quizCode: quizId, questionNumber: currentQuestionIndex });
        });
        
        socketConnection.on("question", (question) => {
          console.log("here");
          console.log("Received question:", question);
          setQuestions((prevQuestions) => [...prevQuestions, question]);
        });
        
        setSocket(socketConnection);
    
        return () => {
          socketConnection.disconnect();
        };
      }, [currentQuestionIndex]);
    
      
      const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        socket.emit("getQuestion", { quizCode: quizId, questionNumber: nextIndex });
      };
    
      let QuestionText = "";
      let QuestionOptions = [];
    
      if (questions.length > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        console.log("currentQuestion", currentQuestion);
        QuestionText = currentQuestion?.text || "";
        QuestionOptions = currentQuestion?.options || [];
      }

    const Container = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    top:10%;
    width: 500px;
    height:600px;
    max-width: 100%;
    min-height: 400px;
    `;
    function getRandomColor() {
        const min = 150; // Minimum value for r, g, b to ensure lighter shades
        const max = 256; // Maximum value for r, g, b to ensure pastel shades
        const r = Math.floor(Math.random() * (max - min) + min);
        const g = Math.floor(Math.random() * (max - min) + min);
        const b = Math.floor(Math.random() * (max - min) + min);
        return `rgb(${r}, ${g}, ${b})`;
    }
    const borderColors = [getRandomColor(), getRandomColor(), getRandomColor()];

    const optionStyle={
        border: '2px solid ',
        padding: '1em', 
        borderRadius: '5px',
        display: 'flex',
        alignItems:'left',
        width:'85%',
        margin:'auto',
        marginBottom: '1em',
    }
    const buttonStyle = {
        marginTop: '3em',
        backgroundColor: '#6C0345',
        color: 'white',
    }
    const questionStyle={
        fontSize: '1.5em'
    }
    return(
        <>
      <Container>
        <div>
          <h2 style={{ marginTop: "8%", marginBottom: "8%" }}>
            <span style={{ color: "#6C0345", display: "inline-flex", alignItems: "center" }}>
              <p style={{ fontSize: "7px", margin: 0 }}>
                <Logo />
              </p>
              Quiz
              <span style={{ color: "#DC6B19" }}>Up</span>
            </span>
          </h2>
          <form>
            <div>
              <p style={questionStyle}>{QuestionText}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginTop: "1em" }}>
                <div>
                  {QuestionOptions.map((option, index) => (
                    <div key={index} style={{ ...optionStyle, borderColor: borderColors[index] }}>
                      <input type="radio" id={`option${index + 1}`} name="answer" value={`option${index + 1}`} />
                      <label htmlFor={`option${index + 1}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button style={buttonStyle} type="button" onClick={nextQuestion}>
              Next Question
            </button>
          </form>
        </div>
      </Container>
    </>
    )

}