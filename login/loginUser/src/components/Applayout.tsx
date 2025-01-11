import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const AppLayout = () => {

    return (<>                   
            <div>
                <NavBar />
                <div></div>
                <Outlet />
                <div></div>
            </div>
        
    </>)
}

export default AppLayout