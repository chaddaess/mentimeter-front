import LogoName from "./LogoName.tsx";
import {Link} from "react-router-dom";
import {CSSProperties} from "react";

export default function Navbar(props) {
    const navbarStyle: CSSProperties = {
        backgroundColor: "rgba(229,228,226,0.58)",
        marginTop: "-0.5em",
        marginRight: "-0.5em",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
    const linkContainer = {
        marginLeft: "70%", display: "flex", justifyContent: "center",
    }
    const linkStyle = {
        fontSize: "1.3em", marginRight: "1em", backgroundColor: "rgba(232,207,223,0.94)"

    }

    return (<>
            <div style={navbarStyle}>
                <LogoName/>
                <div className="links" style={linkContainer}>
                    <button
                        style={linkStyle}
                        onClick={() => props.setOpen(o => !o)}
                    >
                        <Link to="">Join</Link>
                    </button>
                    <button style={linkStyle}><Link to="/authentication">Login</Link></button>
                </div>
            </div>
        </>)
}