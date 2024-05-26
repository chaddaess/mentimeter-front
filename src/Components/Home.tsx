import SideBar from "./SideBar.tsx";
import MainHomeBox from "./MainHomeBox.tsx";

function Home() {
    const containerStyle = {
        display: 'grid', gridTemplateColumns: 'fit-content(20ch) minmax(min(50vw, 30ch), 1fr)',
    };

    const userinfo = JSON.parse(localStorage.getItem('loginInfo'))
    console.log(userinfo)
    const username = userinfo != null ? userinfo['username'] : "stranger"

    return (<div className="container" style={containerStyle}>
        <SideBar/>
        <div className="main-content">
            <MainHomeBox name={username}/>
        </div>
    </div>);
}

export default Home;
