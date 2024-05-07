import Logo from "./Logo.tsx";
import {Link} from "react-router-dom";
import LogoName from "./LogoName.tsx";
import {CSSProperties} from "react";
export default function sideBar(){
    const sideBarStyle : CSSProperties={
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
               <LogoName/>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:'flex-start',paddingBottom:"1em"}}>
                    <div style={sideBarElementStyle}><a>About us</a></div>
                    <div style={sideBarElementStyle}><a>Help and support</a></div>
                    <Link to="/logout" className="btn" style={sideBarElementStyle}>Logout</Link>
                </div>
            </div>
        </>
    )
}