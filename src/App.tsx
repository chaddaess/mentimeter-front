import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./Components/Home.tsx";
import Test from "./Components/Test.tsx";
import Authentification from './Components/Authentification.tsx';
import LogoutComponent from "./Components/LogoutComponent.tsx"
import React from "react";


function App() {
    const [signIn, toggle] = React.useState(true);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="test" element={<Test/>}></Route>
                <Route path="authentication" element={
                    <Authentification
                        signIn={signIn}
                        toggle={toggle}
                    />
                }>
                </Route>
                <Route path="/logout"
                       element={
                           <LogoutComponent/>
                       }
                >
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
