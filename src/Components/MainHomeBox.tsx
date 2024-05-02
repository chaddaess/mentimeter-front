import QuizBox from "./QuizBox.tsx";
import CreateQuizPopup from "./CreateQuizPopup.tsx";
export default function MainHomeBox(props:any){

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


    const quizBoxes = [];
    for (let i = 0; i < 5; i++) {
        quizBoxes.push(
            <div key={i} style={{width:"30%",marginRight:"2em"}}>
                <QuizBox />
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
                    <h2 style={{color:"#F5DD61",fontSize:"2.5rem"}}>Revisit your old quizzes</h2>
                </div>
                <div style={{...box, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {quizBoxes}
                </div>
            </div>
        </>
    )

}