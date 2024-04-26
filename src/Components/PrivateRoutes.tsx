import { Navigate, Outlet } from 'react-router-dom'
export default function PrivateRoutes(){
    let isAuthenticated = !!localStorage.getItem('loginInfo');
    console.log(localStorage.getItem('loginInfo'))
        return (
            isAuthenticated? <Outlet/> : <Navigate to='/authentication'/>
        )
}
