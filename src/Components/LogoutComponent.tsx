import {Navigate} from "react-router";

export default  function LogoutComponent(props){
    localStorage.removeItem('loginInfo');
    return(
    <>
        <Navigate to="/authentication"/>
    </>
)
}