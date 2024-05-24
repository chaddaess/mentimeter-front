import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Authentification from './Components/Authentification';
import BuildQuiz from './Components/BuildQuiz';
import Home from './Components/Home';
import Leaderboard from './Components/Leaderboard';
import LogoutComponent from './Components/LogoutComponent';
import PrivateRoutes from './Components/PrivateRoutes';
import WelcomePage from './Components/WelcomePage';

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
                <Route path="leaderboard" element={<Leaderboard/>}></Route>
                <Route path="/startquiz" Component={StartQuiz} />
                <Route path="/qspage" Component={QuestionPage} />


            </Routes>
        </BrowserRouter>
    );
}
export default App;
