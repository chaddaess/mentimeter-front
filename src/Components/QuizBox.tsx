import React from "react";
import {Button} from "./Component.tsx";

export default function  QuizBox(){
    const [isHovered, setIsHovered] = React.useState(false);
    const mainqQuizBoxStyle={
        borderRadius:"6px",
        border:"1px solid #D3D3D3",
        width:"20em",
        height:"14em",
        transition: 'box-shadow 0.3s ease',
        boxShadow: isHovered ? ' 0 0 11px rgba(33,33,33,.2)':'none',
    }



    return(
        <>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                <div style={mainqQuizBoxStyle}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                >

                </div>
                <Button variant="contained" >Start Quiz</Button>

            </div>
        </>
    )
}