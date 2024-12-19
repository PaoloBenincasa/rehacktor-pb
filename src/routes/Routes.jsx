import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../pages/AppHome";
import preLoadedFilters from "../lib/fetch";
import AppGenre from "../pages/AppGenre";
import AppPlatform from "../pages/AppPlatform"
import AppGame from "../pages/AppGame";
import AppSignUp from "../pages/AppSignUp";
import AppSignIn from "../pages/AppSignin";
import AppProfile from "../pages/AppProfile";
import AppAccount from "../pages/AppAccount";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

function ProtectedRoutes(params) {
    const session = useContext(SessionContext);

    if (!session) {
        return <Navigate to={'/'} />
    }

    return <Outlet />
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<AppHome />} loader={preLoadedFilters} />
            <Route path="/games/:genre_slug" element={<AppGenre />} />
            <Route path="/platforms/:platform_slug" element={<AppPlatform />} />
            <Route path="/game/:id" element={<AppGame />} />
            <Route path="/signin" element={<AppSignIn />} />
            <Route path="/signup" element={<AppSignUp />} />

            <Route element={<ProtectedRoutes/>}>
                <Route path="/profile" element={<AppProfile />} />
                <Route path="/account" element={<AppAccount />} />
            </Route>



        </Route>

    )
);

export default router;