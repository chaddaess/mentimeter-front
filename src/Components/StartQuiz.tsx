import React from "react";
import {Button} from "./Component.tsx";


export default function StartQuiz() {
    const avatarStyle = {
        width: "50px",
        height: "50px",
        borderRadius: " 50%",
        marginBottom: "5px"
    }

    const startQuizStyle =
        {
            textAlign: "center",
            marginTop: "50px"
        }
    const participantCircleStyle =
        {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px"
        }


    const participantBoardStyle =
        {
            backgroundColor:"#eeeeee",
            borderRadius: '5%',
            width: "90vw",
            height: "90vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" ,
            marginTop: "20px"
        }
    const participants = [
        {avatarUrl: 'src/assets/chicken.png', pseudonym: 'Alice'},
        {avatarUrl: 'src/assets/chicken.png', pseudonym: 'Bob'},
        {avatarUrl: 'src/assets/chicken.png', pseudonym: 'Charlie'},
        // Add more participants as needed
    ];


    const ParticipantCircle = ({avatarUrl, pseudonym}) => (
        <div style={participantCircleStyle}>
            <img src={avatarUrl} alt="Participant Avatar" style={avatarStyle}/>
            <div className="pseudonym">{pseudonym}</div>
        </div>
    );

    return (
        <>
            <div style={startQuizStyle}>
                <h1>Join the Quiz!</h1>
                <p>Here's the code to share with your participants:</p>
                <Button variant="contained" >kotkotkot</Button>

                <div style={participantBoardStyle}>
                    {participants.map((participant, index) => (
                        <ParticipantCircle key={index} {...participant} />
                    ))}
                </div>
            </div>
        </>
    )
}