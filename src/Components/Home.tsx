import {Link} from "react-router-dom";

function  Home(){
    return(
        <>
            <div >
                This is the Home page
            </div>
            <Link to="/test" className="btn v">Go to test page</Link>
        </>
    )
}
export default Home