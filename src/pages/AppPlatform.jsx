import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Game from "../Components/Game";

export default function AppPlatform() {
    const { platform_slug } = useParams();
    const [ platformGames, setPlatformGames] = useState([]);

    useEffect(() => {
        async function fetchPlatformGames() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform_id}`);
            const json = await response.json();
            console.log(json);
            setPlatformGames(json.results);
            
        }
        fetchPlatformGames();
    }, [])

    
    return (
        <div>
            <h1>{platform_slug}</h1>
            
            <div className="gamesWrapper">
                <div className="gamesList">
                    {platformGames.map((game) => (
                        <Game key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    )
}