import {CSSProperties, useEffect, useState} from 'react';
import {socket} from '../socket.js';
import {randomPseudo} from "../utils/pseudoGenerator.ts";

//styles
const avatarStyle = {
    width: '65px', height: '65px', borderRadius: '50%', marginInline: "0.5rem"
};
const buttonStyle = {
    width: "10em",
    height: "4em",
    borderRadius: "50px",
    marginTop: "1em",
    backgroundColor: "rgba(225,175,209,0.94)",
    cursor: "pointer"
};
const inputStyle = {
    minHeight: "3em", borderRadius: "50px", border: "none", paddingInlineStart: "1em", marginBlock: "1em"
};
const inputGroupStyle: CSSProperties = {
    display: "flex", flexDirection: "column", justifyContent: "center", marginBlockEnd: "1em"
};
const labelStyle = {
    marginLeft: "0.5em"
};
const errorStyle = {
    display: "none", color: "#bc2525", marginLeft: "0.5em"
};
const loadJoin: CSSProperties = {
    display: "none", marginLeft: "0.5em", color: "#3a9188", flexDirection: "row", alignItems: "center"
};
const pacStyle = {
    width: "3em", marginRight: "1em"
};

const predefinedAvatars = ['https://robohash.org/1.png?set=set4', 'https://robohash.org/2.png?set=set4', 'https://robohash.org/3.png?set=set4', 'https://robohash.org/4.png?set=set4', 'https://robohash.org/5.png?set=set4', 'https://robohash.org/6.png?set=set4', 'https://robohash.org/7.png?set=set4', 'https://robohash.org/8.png?set=set4',];

const QuizJoinForm = ({sessionCode = ''}) => {
    const [quizCode, setQuizCode] = useState(sessionCode);
    const [playerName, setPlayerName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(predefinedAvatars[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.on('connect', () => console.log('connected'));
        socket.emit('joinQuiz', {"quizCode": quizCode, "playerName": playerName, "avatar": selectedAvatar});
    };

    const handleAvatarSelect = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
    };

    useEffect(() => {
        socket.on("errorMsg", () => {
            const success: HTMLElement = document.querySelector(".successJoining");
            const error: HTMLElement = document.querySelector(".errorJoining");
            success.style.display = "none";
            error.style.display = "block";
        });
        socket.on("playerJoined", () => {
            const success: HTMLElement = document.querySelector(".successJoining");
            const error: HTMLElement = document.querySelector(".errorJoining");
            error.style.display = "none";
            success.style.display = "flex";
        });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Quiz code </label>
                <input
                    type="text"
                    placeholder="7007024f-e0c7-46bb-8517-181c34968318"
                    value={quizCode}
                    onChange={(e) => setQuizCode(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Your pseudo </label>
                <input
                    type="text"
                    placeholder={randomPseudo}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <div className={"errorJoining"} style={errorStyle}>
                Ooopsie! looks like this quiz doesn't exist!
            </div>
            <div>
                <p style={labelStyle}>Select an Avatar</p>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                    {predefinedAvatars.map((avatarUrl, index) => (
                        <img
                            key={index}
                            src={avatarUrl}
                            alt={`Avatar ${index}`}
                            style={{...avatarStyle, border: avatarUrl === selectedAvatar ? '2px solid blue' : 'none'}}
                            onClick={() => handleAvatarSelect(avatarUrl)}
                        />
                    ))}
                </div>
            </div>
            <div className={"successJoining"} style={loadJoin}>
                Buckle up! joining quiz..
                <img src="/assets/loader.gif" alt="loader" style={pacStyle}/>
            </div>
            <button type="submit" style={buttonStyle}>Join Quiz</button>
        </form>
    );
};

export default QuizJoinForm;
