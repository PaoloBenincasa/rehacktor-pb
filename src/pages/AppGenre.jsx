import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Game from "../Components/Game";

export default function AppGenre() {
    const { genre_slug } = useParams();
    const [genreGames, setGenreGames] = useState([]);

    useEffect(() => {
        async function fetchGenreGames() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`);
            const json = await response.json();
            setGenreGames(json.results);
        }
        fetchGenreGames();
    }, [])

    return (
        <div>
            <h1>{genre_slug}</h1>
            <div className="gamesWrapper">

                <div className="gamesList">
                    {genreGames.map((game) => (
                        <Game key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    )
}