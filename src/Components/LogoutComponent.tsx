import {Navigate} from "react-router";

export default function LogoutComponent() {
    localStorage.removeItem('loginInfo');
    return (<Navigate to="/authentication"/>)
}