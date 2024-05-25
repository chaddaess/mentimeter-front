import {CSSProperties, useEffect, useState} from 'react';
import {socket} from '../socket.js'
import {randomPseudo} from "../utils/pseudoGenerator.ts"

//styles
const formStyle: CSSProperties = {
    display: "flex", flexDirection: "column", justifyContent: "flex-start"
}
const buttonStyle = {
    width: "10em", height: "4em", borderRadius: "50px", marginTop: "1em", backgroundColor: "rgba(225,175,209,0.94)"
}
const inputStyle = {
    width: "100%", height: "3em", borderRadius: "50px", border: "none", paddingLeft: "1em", margin: "1em 0"
}
const inputGroupStyle: CSSProperties = {
    display: "flex", flexDirection: "column", justifyContent: "center",
}
const labelStyle = {
    marginLeft: "0.5em"
}
const errorStyle = {
    display: "none", color: "#bc2525", marginLeft: "0.5em"
}
const loadJoin: CSSProperties = {
    display: "none", marginLeft: "0.5em", color: "#3a9188", flexDirection: "row", alignItems: "center"
}
const pacStyle = {
    width: "3em", marginRight: "1em"
}
//functions
const QuizJoinForm = () => {
    const [quizCode, setQuizCode] = useState('');
    const [playerName, setPlayerName] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault()
        socket.emit('joinQuiz', {quizCode, playerName});
        console.log(playerName);
        console.log(quizCode);
    }
    useEffect(() => {
        socket.on("errorMsg", () => {
            const success: HTMLElement = document.querySelector(".successJoining")
            const error: HTMLElement = document.querySelector(".errorJoining")
            success.style.display = "none"
            error.style.display = "block";
        })
        socket.on("playerJoined", () => {
            const success: HTMLElement = document.querySelector(".successJoining")
            const error: HTMLElement = document.querySelector(".errorJoining")
            error.style.display = "none"
            success.style.display = "flex";
        })
        // socket.on("endQuiz", (payload) => {
        //     console.log("quiz ended")
        //     navigate(
        //         '/leaderboard',
        //         {
        //             state:{payload:payload}
        //         }
        //     )
        // })

    })


    return (<form onSubmit={handleSubmit} style={formStyle}>
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
            Ooopsie! looks like this quiz doesn't exist !
        </div>
        <div className={"successJoining"} style={loadJoin}>
            Buckle up! joining quiz ..
            <img src="/assets/loader.gif" alt="loader" style={pacStyle}/>
        </div>
        <button type="submit" style={buttonStyle}>Join Quiz</button>
    </form>);
};

export default QuizJoinForm;
