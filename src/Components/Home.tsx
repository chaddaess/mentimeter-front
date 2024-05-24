import {CSSProperties, useEffect, useState} from "react";
import SideBar from "./SideBar";
import MainHomeBox from "./MainHomeBox";


function Home() {
    const mainContentStyle: CSSProperties = {
        flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '23%', // Adjust based on the width of the sidebar
    };
    const [username, setUsername] = useState<string>("stranger");

    useEffect(() => {
        try {
            const userinfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');
            console.log(userinfo);
            if (userinfo && userinfo.username) {
                setUsername(userinfo.username);
            }
        } catch (error) {
            console.error("Failed to parse user info from localStorage", error);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    return (<nav className="container">
        <SideBar/>
        <div className="main-content" style={mainContentStyle}>
            <MainHomeBox name={username}/>
        </div>
    </nav>);
}

export default Home;
