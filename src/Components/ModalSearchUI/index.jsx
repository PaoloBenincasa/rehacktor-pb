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
        <dialog open={focus}>
            <article className="bg-newblack">
                <header className="bg-newblack">
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={handleClickOverlay}>
                    </button>
                    <h3 className="bg-newblack">cerca il tuo gioco</h3>
                </header>
                <form className="bg-newblack">
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
                <footer className="bg-newblack">
                    <button>Submit Search</button>
                </footer>
            </article>
        </dialog>
    )
}