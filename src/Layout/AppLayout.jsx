import { Outlet } from "react-router";
import AppNavbar from "../Components/AppNavbar";


export default function AppLayout() {
    return (
        <div className="container-fluid bg-blackk min-vh-100">
            <AppNavbar />
            <Outlet />

        </div>
    )
}