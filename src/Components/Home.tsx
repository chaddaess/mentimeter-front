import SideBar from "./SideBar.tsx";
import MainHomeBox from "./MainHomeBox.tsx";
import {CSSProperties} from "react";

function Home() {
    const containerStyle = {
        display: 'flex',
        height: '200vh',
        padding: 0,
        margin: 0,
        width: "98%",
    };

    const mainContentStyle : CSSProperties = {
        flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '23%', // Adjust based on the width of the sidebar
    };
    const userinfo = JSON.parse(localStorage.getItem('loginInfo'))
    console.log(userinfo)
    const username = userinfo != null ? userinfo['username'] : "stranger"

    return (<>
            <div className="container" style={containerStyle}>
                <SideBar/>
                <div className="main-content" style={mainContentStyle}>
                    <MainHomeBox name={username}/>
                </div>
            </div>
        </>);
}

export default Home;
