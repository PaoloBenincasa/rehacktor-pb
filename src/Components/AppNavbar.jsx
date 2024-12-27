// import { Link } from "react-router"
// import { useState, useContext } from "react";
// import ModalSearchUI from "./ModalSearchUI";
// import supabase from "../supabase/client";
// import SessionContext from "../context/SessionContext";
// import useProfile from "../hooks/useProfile";

// export default function AppNavbar() {
//     const [focus, setFocus] = useState(false);
//     const session = useContext(SessionContext);
//     const { username } = useProfile(session);
//     console.log(session);

//     // const [userLogged, setUserLogged] = useState('');

//     // useEffect(() => {
//     //   async function getSession(params) {
//     //     const { data, error } = await supabase.auth.getSession();
//     //     const {
//     //       data: { user },
//     //     } = await supabase.auth.getUser()
//     //     let { first_name } = user.user_metadata
//     //     setUserLogged(first_name);

//     //   }
//     //   getSession();
//     // }, [])

//     const handleFocus = () => {
//         setFocus(true);
//     }

//     const handleClickOverlay = () => {
//         setFocus(false);
//     }

//     const signOut = async () => {
//         const { error } = await supabase.auth.signOut();
//         if (error) {
//             alert(error)
//         }
//     }



//     return (
//         <nav className="container-fluid navCo">
//             <ModalSearchUI focus={focus} handleClickOverlay={handleClickOverlay} />
//             <div className="row justify-content-evenly align-items-center mt-3 w-100">
//                 <div className="col-md-2">
//                     <Link to={`/`} className="text-decoration-none">
//                         <h3 className="mt-2 txtW chakra fs-4">Rehacktor</h3>
//                     </Link>
//                 </div>
//                 <div className="col-md-7 navSearchContainer">
//                     <input
//                         type="search"
//                         name="search"
//                         placeholder="search"
//                         className="navSearch"
//                         onFocus={handleFocus}
//                     />
//                 </div>
//                 <div className="col-md-2 mt-2">
//                     {session ? (
//                         <>

                            
//                                 {/* <details className="dropdown">
//                                     <summary>
//                                         {username}
//                                     </summary>
//                                     <ul dir="rtl">
//                                         <li><Link to={'/profile'} href="#" className="account">Profilo</Link></li>
//                                         <li><Link to={'/account'} href="#" className="account">Account</Link></li>
//                                         <li><a href="#" onClick={signOut} className="account">Logout</a></li>
//                                     </ul>
//                                 </details> */}
//                                 <div className="dropdown ms-5 ps-5">
//                                     <a className="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                         {username}
//                                     </a>

//                                     <ul className="dropdown-menu drop">
//                                         <li className="account"><Link to={'/profile'} href="#" className="account" >Profilo</Link></li>
//                                         <li className="account"><Link to={'/account'} href="#" className="account">Account</Link></li>
//                                         <li className="account"><a href="#" onClick={signOut} className="account">Logout</a></li>
//                                     </ul>
//                                 </div>
                            
//                         </>
//                     ) : (
//                         <ul className="d-flex justify-content-evenly list-unstyled">
//                             <li>
//                                 <Link to={`/signin`}>
//                                     <button className="p-1 rounded-2 bg-primary">Accedi</button>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to={`/signup`}>
//                                     <button className="p-1 rounded-2 bg-secondary">Registrati</button>
//                                 </Link>
//                             </li>
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     )
// }

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
        <nav className="container-fluid navCo">
            <div className="row justify-content-evenly align-items-center mt-3 w-100">
                <div className="col-md-2">
                    <Link to={`/`} className="text-decoration-none">
                        <h3 className="mt-2 txtW chakra fs-4">Rehacktor</h3>
                    </Link>
                </div>
                <div className="col-md-7 navSearchContainer position-relative">
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
                                onSelect={()=> setSearch("")} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-md-2 mt-2">
                    {session ? (
                        <div className="dropdown dropAccount">
                            <a
                                className="btn btn-primary dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {username}
                            </a>
                            <ul className="dropdown-menu drop">
                                <li className="account">
                                    <Link to={'/profile'} className="account">Profilo</Link>
                                </li>
                                <li className="account">
                                    <Link to={'/account'} className="account">Modifica account</Link>
                                </li>
                                <li className="account">
                                    <a href="#" onClick={signOut} className="account">Logout</a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <ul className="d-flex justify-content-evenly list-unstyled mt-2">
                            <li>
                                <Link to={`/signin`}>
                                    <button className="p-1 rounded-2 bg-primary">Accedi</button>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/signup`}>
                                    <button className="p-1 rounded-2 bg-secondary">Registrati</button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
