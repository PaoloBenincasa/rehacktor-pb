import { createContext, useEffect, useState } from "react";
import GameContext from "./GameContext";

export default function GameContextProvider({ children }) {
    const [games, setGames] = useState([]);

    useEffect(()=>{
        const fetchGames = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2021-06-01,2024-01-01&page=1`);
            const json = await response.json();
            setGames(json.results);
        };
        fetchGames();
    }, [])

    return (
        <GameContext.Provider value={{ games, setGames }}>
            {children}
        </GameContext.Provider>
    );
}