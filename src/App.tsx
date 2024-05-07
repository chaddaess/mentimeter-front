import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./Components/Home.tsx";
import Authentification from './Components/Authentification.tsx';
import LogoutComponent from "./Components/LogoutComponent.tsx"
import React from "react";
import './App.css'
import PrivateRoutes from "./Components/PrivateRoutes.tsx";
import BuildQuiz from "./Components/BuildQuiz.tsx";
import Leaderboard from "./Components/Leaderboard.tsx";
import WelcomePage from "./Components/WelcomePage.tsx";

function App() {
    const [signIn, toggle] = React.useState(true);
    return (<BrowserRouter>
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Home/>}></Route>
                <Route path='/build' element={<BuildQuiz/>}></Route>
            </Route>
            <Route path="/logout"
                   element={<LogoutComponent/>}
            >
            </Route>
            <Route path="authentication" element={<Authentification
                signIn={signIn}
                toggle={toggle}
            />}>
            </Route>
            <Route path="leaderboard" element={<Leaderboard/>}></Route>

        </Routes>

    </BrowserRouter>)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/build" element={<BuildQuiz />} />
                    <Route path="/test" element={<Test />} />
                </Route>
                <Route path="/logout" element={<LogoutComponent />} />
                <Route path="/authentication" element={
                    <Authentification signIn={signIn} toggle={toggle} />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
