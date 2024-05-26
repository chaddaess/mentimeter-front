import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./Components/Home.tsx";
import Authentification from './Components/Authentification.tsx';
import LogoutComponent from "./Components/LogoutComponent.tsx"
import './App.css'
import PrivateRoutes from "./Components/PrivateRoutes.tsx";
import BuildQuiz from "./Components/BuildQuiz.tsx";
import StartQuiz from "./Components/StartQuiz.tsx";
import QuestionPage from './Components/QuestionPgae.tsx';
import {useState} from "react";
import WelcomePage from "./Components/WelcomePage.tsx";
import Leaderboard from "./Components/Leaderboard.tsx";
function App() {
    const [signIn, setSignIn] = useState(true);
    const toggleSignIn = () => setSignIn(!signIn);

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/build" element={<BuildQuiz/>}/>
            </Route>
            <Route path="/logout" element={<LogoutComponent/>}/>
            <Route path="/authentication" element={<Authentification signIn={signIn} toggle={toggleSignIn}/>}/>
            <Route path="/startquiz" Component={StartQuiz} />
            <Route path="qspage" element={
                <QuestionPage/>
            }>
            </Route>


        </Routes>
    </BrowserRouter>);
}

export default App;
