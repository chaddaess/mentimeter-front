import { Navigate, Outlet } from 'react-router-dom'
export default function PrivateRoutes(){
    let isAuthenticated = !!localStorage.getItem('loginInfo');
    //TODO: remove this once authentication sorted
    isAuthenticated=true
    console.log(localStorage.getItem('loginInfo'))
        return (
            isAuthenticated? <Outlet/> : <Navigate to='/test'/>
        )
}
