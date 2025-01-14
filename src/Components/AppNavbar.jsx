import { Link } from "react-router";
import { useState, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import useProfile from "../hooks/useProfile";
import AutoCompleteCardUI from "./AutoCompleteCardUI";

export default function AppNavbar() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);
    const session = useContext(SessionContext);
    const { username } = useProfile(session);

    const fetchSearchedGames = async (query) => {
        if (!query) {
            setGames([]);
            return;
        }
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY
            }&page=1&search=${query}`
        );
        const json = await response.json();
        setGames(json.results);
        setLoading(false);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearch(query);
        fetchSearchedGames(query);
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error);
        }
    };

    return (

        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid p-0">
                    <div className="row w-100 align-items-center justify-content-between">
                        <Link to={`/`} className="text-decoration-none col-md-2 col-2">

                            <div className="col-md-2 col-2 d-flex align-items-center fs-5 ps-4">
                                <i className="bi bi-rocket-takeoff fs-4"></i>
                                <p className="mt-3 txtW chakra ps-2 logo">ReHacktor</p>
                            </div>
                        </Link>

                        <div className="col-md-8 col-7 search-bar ps-5">
                            <div className="navSearchContainer position-relative">
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Search"
                                    value={search}
                                    className="navSearch"
                                    onChange={handleSearchChange}
                                />
                                {search && (
                                    <div className="autocomplete-container">
                                        {loading && <p className="text-white">Loading...</p>}
                                        {games.map((game) => (
                                            <AutoCompleteCardUI
                                                key={game.id}
                                                game={game}
                                                onSelect={() => setSearch("")} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-2 col-2 text-md-end profile-section">
                            <div>
                                {session ? (
                                    <div className="dropdown dropAccount">
                                        <a
                                            className="btn bgTransparent dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i class="bi bi-person-fill-check fs-3 "></i>
                                        </a>

                                        <ul className="dropdown-menu drop dropdown-menu-end">
                                            <li className="account">
                                                <Link to={'/profile'} className="account">Profile</Link>
                                            </li>
                                            <li className="account">
                                                <Link to={'/account'} className="account">Update account</Link>
                                            </li>
                                            <li className="account">
                                                <a href="#" onClick={signOut} className="account">Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="dropdown dropAccount">
                                        <a
                                            className="btn bgTransparent dropdown-toggle "
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-person-fill-x fs-3 "></i>
                                        </a>
                                        <ul className="dropdown-menu drop dropdown-menu-end">
                                            <li className="account">
                                                <Link to={'/signin'} className="account">Login</Link>
                                            </li>
                                            <li className="account">
                                                <Link to={'/signup'} className="account">Register</Link>
                                            </li>

                                        </ul>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>


    );

}
