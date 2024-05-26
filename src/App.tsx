import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./Components/Home.tsx";
import Authentification from './Components/Authentification.tsx';
import LogoutComponent from "./Components/LogoutComponent.tsx"
import './App.css'
import PrivateRoutes from "./Components/PrivateRoutes.tsx";
import BuildQuiz from "./Components/BuildQuiz.tsx";
import StartQuizPage from "./pages/StartQuizPage.tsx";
import QuestionPage from './pages/QuestionPage.tsx';
import {useState} from "react";
import WelcomePage from "./pages/WelcomePage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
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
            <Route path="/startquiz" Component={StartQuizPage} />
            <Route path="/qspage" Component={QuestionPage} />
            <Route path="leaderboard" element={<LeaderboardPage/>}></Route>
        </Routes>
    </BrowserRouter>);
}

export default App;
