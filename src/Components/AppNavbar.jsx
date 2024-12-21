import { Link } from "react-router"
import { useState, useContext } from "react";
import ModalSearchUI from "./ModalSearchUI";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import useProfile from "../hooks/useProfile";

export default function AppNavbar() {
    const [focus, setFocus] = useState(false);
    const session = useContext(SessionContext);
    const { username } = useProfile(session);    
    console.log(session);

    // const [userLogged, setUserLogged] = useState('');

    // useEffect(() => {
    //   async function getSession(params) {
    //     const { data, error } = await supabase.auth.getSession();
    //     const {
    //       data: { user },
    //     } = await supabase.auth.getUser()
    //     let { first_name } = user.user_metadata
    //     setUserLogged(first_name);

    //   }
    //   getSession();
    // }, [])

    const handleFocus = () => {
        setFocus(true);
    }

    const handleClickOverlay = () => {
        setFocus(false);
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error)
        }
    }

    return (
        <nav className="container-fluid navCo">
            <ModalSearchUI focus={focus} handleClickOverlay={handleClickOverlay} />
            <div className="row justify-content-around align-items-center mt-3 w-100">
                <div className="col-md-2">
                    <Link to={`/`} className="text-decoration-none">
                        <h3 className="mb-3 txtW chakra fs-4">Rehacktor</h3>
                    </Link>
                </div>
                <div className="col-md-7 navSearchContainer">
                    <input
                        type="search"
                        name="search"
                        placeholder="search"
                        className="navSearch"
                        onFocus={handleFocus}
                    />
                </div>
                <div className="col-md-2 mb-2">
                    {session ? (
                        <ul>

                            <li>
                                <details className="dropdown">
                                    <summary>
                                        {username}
                                    </summary>
                                    <ul dir="rtl">
                                        <li><Link to={'/profile'} href="#" className="account">Profilo</Link></li>
                                        <li><Link to={'/account'} href="#" className="account">Account</Link></li>
                                        <li><a href="#" onClick={signOut} className="account">Logout</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <Link to={`/signin`}>
                                    <button className="p-1 mb-3 rounded-2 bg-primary">Accedi</button>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/signup`}>
                                    <button className="p-1 mb-3 rounded-2 bg-secondary">Registrati</button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}