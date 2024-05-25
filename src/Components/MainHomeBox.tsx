import QuizBox from "./QuizBox.tsx";
import CreateQuizPopup from "./CreateQuizPopup.tsx";
import {useEffect, useState} from "react";
export default function MainHomeBox(props:any){
    const [quizzes, setQuizzes] = useState([]);


    const mainHomeBoxStyle={
        display:'flex',
        flexDirection:'column' as const,
        margin:'0 auto',
        width: "100%",
        paddingTop:"1em",
    }
    const box={
        width:'100%',
        display: 'flex',
        // border:'1px solid magenta',
        justifyContent:'flex-start'
    }
    const userinfo = JSON.parse(localStorage.getItem('loginInfo'))
    console.log(userinfo)
    const email = userinfo != null ? userinfo['email'] : "stranger@gmail.com"

    useEffect(()=>{
        fetch(`http://localhost:3000/users/${email}/quizzes`)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                console.log("this user's quizzes are",data)
                setQuizzes(data);
            })

    },[])


    const quizBoxes = [];
    for (let i = 0; i < 5; i++) {
        quizBoxes.push(
            <div key={i} style={{width:"30%",marginRight:"2em"}}>
                <QuizBox  />
            </div>
        );
    }
    return(
        <>
            <div className="MainHomeBox" style={mainHomeBoxStyle}>
                <div style={box}>
                    <h1 style={{color:"#6C0345"}}>
                        Welcome back, {props.name} !
                    </h1>
                </div>
                <div style={box}>
                    <CreateQuizPopup/>
                </div>
                <div style={box}>
                    <h2 style={{color:"#F5DD61",fontSize:"2.5rem",margin:"1em 0"}}>Revisit your old quizzes</h2>
                </div>

                <div style={{...box, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {quizzes.map((quiz) => (
                        <div style={{width: "30%", marginRight: "2em"}}>
                            <QuizBox name={quiz.name}/>
                        </div>
                ))}
            </div>
        </div>
        </>
    )

}