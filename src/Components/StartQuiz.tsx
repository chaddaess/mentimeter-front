import {CSSProperties, useEffect, useState} from "react";
import {Button} from "./Component.tsx";
import {socket} from "../socket";
import {Link} from "react-router-dom";

export default function StartQuiz() {
    const [participants, setParticipants] = useState([{
        avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'
    }, {avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'}, {
        avatarUrl: '/assets/chicken.png', pseudonym: 'kotkot'
    },]);

    const avatarStyle = {
        width: "50px", height: "50px", borderRadius: " 50%", marginBottom: "0.5rem"
    }

    const startQuizStyle: CSSProperties = {
        textAlign: "center", marginTop: "50px"
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
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        marginTop: "2em"
    }

    const ParticipantCircle = ({avatarUrl, pseudonym}) => (<div style={participantCircleStyle}>
        <img src={avatarUrl} alt="Participant Avatar" style={avatarStyle}/>
        <div className="pseudonym">{pseudonym}</div>
    </div>);

    useEffect(() => {
        socket.on('playerJoined', (newParticipant) => {
            setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
        });

        return () => {
            socket.off('playerJoined');
        };
    }, []);

    return (<div style={startQuizStyle} className={"flow wrapper"}>
        <h1>Join the Quiz!</h1>
        <h2>Here's the code to share with your participants:</h2>
        {/*TODO: change this to be the real code*/}
        <p>2869b39e-be82-4675-b77d-f9ba0c361c32</p>
        <div>
            <Button variant="contained" style={{marginRight: "1em"}}><Link to="/home">Cancel</Link></Button>
            <Button variant="contained">Start now</Button>
        </div>
        <div style={participantBoardStyle}>
            {participants.map((participant, index) => (<ParticipantCircle key={index} {...participant} />))}
        </div>
    </div>)
}