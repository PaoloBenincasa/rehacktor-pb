import { useEffect, useState } from "react";
import AutoCompleteCardUI from "../AutoCompleteCardUI";

export default function ModalSearchUI({ focus, handleClickOverlay }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const timeoutAPI = setTimeout(() => {
            async function fetchSearchedGames() {
                if (!search) return;
                setGames([]);
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY
                    }&page=1&search=${search}`
                );
                const json = await response.json();
                setGames(json.results);
                setLoading(false);
            }
            fetchSearchedGames()
        }, 500);

        return () => {
            clearTimeout(timeoutAPI);
        }
    }, [search]);

    return (
        <dialog open={focus} className="w-25">
            <article className="bg-newblack text-center ">
                <header className="bg-newblack d-flex mb-2 pt-2">
                    {/* <h3 className="bg-newblack ms-1">cerca il tuo gioco</h3> */}
                    <button
                        aria-label="Close"
                        className="btn-close ms-auto p-2"
                        rel="prev"
                        onClick={handleClickOverlay}>
                    </button>
                </header>
                <form className="bg-newblack mb-3">
                    <input
                        type="search"
                        name="search"
                        value={search}
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(event) => setSearch(event.target.value)} 
                        />
                </form>
                <div className="autoSuggestedWrapper">
                    {loading && <article aria-busy="true"></article>}
                    {games && games.map((game) => (
                        <AutoCompleteCardUI key={game.id} game={game} />
                    ))}
                </div>
                <footer className="bg-newblack pb-2">
                    <button>Submit Search</button>
                </footer>
            </article>
        </dialog>
    )
}

// import { useEffect, useState } from "react";
// import AutoCompleteCardUI from "../AutoCompleteCardUI";

// export default function ModalSearchUI() {
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [games, setGames] = useState([]);

//     const handleSubmit = (event) =>{
//         event.preventDefault();
//         setSearch("");
//         setGames([]);
//     };

//     useEffect(() => {
//         const timeoutAPI = setTimeout(() => {
//             async function fetchSearchedGames() {
//                 if (!search) return;
//                 setGames([]);
//                 setLoading(true);
//                 const response = await fetch(
//                     `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&search=${search}`
//                 );
//                 const json = await response.json();
//                 setGames(json.results);
//                 setLoading(false);
//             }
//             fetchSearchedGames();
//         }, 500);

//         return () => {
//             clearTimeout(timeoutAPI);
//         };
//     }, [search]);

//     return (
//         <>
//             {/* Trigger Button */}
          

//             {/* Modal */}
//             <div
//                 className="modal fade"
//                 id="searchModal"
//                 tabIndex="-1"
//                 aria-labelledby="searchModalLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="searchModalLabel">
//                                 Cerca il tuo gioco
//                             </h5>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             ></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleSubmit}>
//                                 <input
//                                     type="search"
//                                     name="search"
//                                     value={search}
//                                     placeholder="Search"
//                                     aria-label="Search"
//                                     className="form-control"
//                                     onChange={(event) => setSearch(event.target.value)}
//                                 />
//                             </form>
//                             <div className="mt-3">
//                                 {loading && (
//                                     <div
//                                         className="spinner-border text-primary"
//                                         role="status"
//                                     >
//                                         <span className="visually-hidden">Loading...</span>
//                                     </div>
//                                 )}
//                                 <div className="list-group">
//                                     {games &&
//                                         games.map((game) => (
//                                             <AutoCompleteCardUI
//                                                 key={game.id}
//                                                 game={game}
//                                             />
//                                         ))}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button
//                                 type="button"
//                                 className="btn btn-secondary"
//                                 data-bs-dismiss="modal"
//                             >
//                                 Chiudi
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
