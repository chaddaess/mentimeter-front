import Logo from "./Logo.tsx";

export default function LogoName() {

    return (<div style={{display: "flex", alignItems: "center"}}>
            <Logo/>
            <h2 style={{fontSize: "2.5rem"}}>
                <span style={{color: "#6C0345"}}>Quiz</span>
                <span style={{color: "#DC6B19"}}>Up</span>
            </h2>
        </div>)
}