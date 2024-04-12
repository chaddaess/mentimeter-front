// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Components/Home.tsx";
import Test from "./Components/Test.tsx";

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="test" element={<Test/>}></Route>
        </Routes>

    </BrowserRouter>
    )
}

export default App
