import  {CSSProperties} from "react";
import {Button} from "./Component.tsx";

export default function StartQuiz() {
    const avatarStyle = {
        width: "50px", height: "50px", borderRadius: " 50%", marginBottom: "5px"
    }

    const startQuizStyle: CSSProperties = {
        textAlign: "center", marginTop: "50px"
    }
    const participantCircleStyle:CSSProperties = {
        display: "flex", flexDirection: "column", alignItems: "center", margin: "10px"
    }


    const participantBoardStyle:CSSProperties = {
        backgroundColor: "#eeeeee",
        borderRadius: '5%',
        width: "90vw",
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        marginTop: "20px"
    }
    const participants = [{
        avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'
    }, {avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'}, {
        avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'
    },
    ];


    const ParticipantCircle = ({avatarUrl, pseudonym}) => (<div style={participantCircleStyle}>
        <img src={avatarUrl} alt="Participant Avatar" style={avatarStyle}/>
        <div className="pseudonym">{pseudonym}</div>
    </div>);

    return (<div style={startQuizStyle}>
        <h1>Join the Quiz!</h1>
        <p>Here's the code to share with your participants:</p>
        <Button variant="contained">kotkotkot</Button>
        <Button variant="contained">Start now</Button>

        <div style={participantBoardStyle}>
            {participants.map((participant, index) => (<ParticipantCircle key={index} {...participant} />))}
        </div>
    </div>)
}