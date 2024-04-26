import Logo from "./Logo.tsx";
import {Link} from "react-router-dom";
export default function sideBar(){
    const sideBarStyle={
        display:'flex',
        flexDirection:"column",
        alignItems:'flex-start',
        height:'100%',
        width:'20%',
        backgroundColor:'#F6F5F2',
        position:"fixed",
        justifyContent:"space-between",
        paddingLeft:"1em"

    }
    const sideBarElementStyle={
        margin:'0 1em'
    }
    return(
        <>
            <div className="side-bar" style={sideBarStyle}>
                <div style={{display:"flex",alignItems:"center"}}>
                    <Logo/>
                    <h2 style={{fontSize:"2.5rem"}}>
                        <span style={{color:"#6C0345"}}>Quiz</span>
                        <span style={{color:"#DC6B19"}}>Up</span>
                    </h2>

                </div>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:'flex-start',paddingBottom:"1em"}}>
                    <div style={sideBarElementStyle}><a>About us</a></div>
                    <div style={sideBarElementStyle}><a>Help and support</a></div>
                    <Link to="/logout" className="btn" style={sideBarElementStyle}>Logout</Link>
                </div>
            </div>
        </>
    )
}