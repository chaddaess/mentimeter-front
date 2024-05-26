import {CSSProperties, useEffect, useState} from "react";
import {Button} from "../Components/Component.tsx";
import {socket} from "../socket";
import {Link, useLocation} from "react-router-dom";

export default function StartQuizPage() {
    const location = useLocation();
    console.log(location)
    const sessionCode = location.state?.sessionCode || "N/A";
    const [participants, setParticipants] = useState([]);

    const avatarStyle = {
        width: "50px",
        height: "50px",
        borderRadius: " 50%",
        marginBottom: "0.5rem",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)"
    }

    const startQuizStyle: CSSProperties = {
        textAlign: "center", marginTop: "1rem"
    }
    const participantCircleStyle: CSSProperties = {
        display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem"
    }

    const participantBoardStyle: CSSProperties = {
        backgroundColor: "#eeeeee",
        borderRadius: '5%',
        minHeight: "50vh",
        display: "flex",
        flexWrap: "wrap",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
    };
    const codeStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: "bold",
        padding: "0.5em 1em",
        backgroundColor: "#e0f7fa",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
    };
    const buttonContainerStyle: CSSProperties = {
        display: "flex", justifyContent: "center", gap: "1em"
    };
    const ParticipantCircle = ({avatar, playerName}) => (<div style={participantCircleStyle}>
        <img src={avatar} alt="Participant Avatar" style={avatarStyle}/>
        <div className="pseudonym">{playerName}</div>
    </div>);

    useEffect(() => {
        socket.on('playerJoined', (newParticipant) => {
            console.log(newParticipant)
            setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
        });

        return () => {
            socket.off('playerJoined');
        };
    }, []);

    return (<div style={startQuizStyle} className={"flow wrapper"}>
        <h1>Join the Quiz!</h1>
        <h2>Here's the code to share with your participants:</h2>
        <p style={codeStyle}>{sessionCode}</p>
        <div style={buttonContainerStyle}>
            <Button><Link to="/home">Cancel</Link></Button>
            <Button>Start now</Button>
        </div>
        <div style={participantBoardStyle}>
            {participants.map((participant, index) => (<ParticipantCircle key={index} {...participant} />))}
        </div>
    </div>)
}