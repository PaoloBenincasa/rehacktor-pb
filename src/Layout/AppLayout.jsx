import { Outlet } from "react-router";
import AppNavbar from "../Components/AppNavbar";


export default function AppLayout() {
    return (
        <div className="container-fluid">
            <AppNavbar />
            <Outlet />

        </div>
    )
}