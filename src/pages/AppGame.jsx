import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";

export default function AppGame() {
    const session = useContext(SessionContext);
    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        async function fetchGame() {
            const response = await fetch(
                // `${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`
                `${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`
            );
            const json = await response.json();
            setGame(json);
        }
        fetchGame();
    }, [])

    console.log(game);

    return (

        <div className="container">




            <div className="row h-100 justify-content-center">
                <div className="col-md-6">
                    <h1>{game.name}</h1>
                    <p className="txtW">voto: {game.rating}</p>
                    <p className="txtW">{game.description_raw}</p>
                </div>
                <div className="col-md-5 d-flex flex-column">
                    <GameImage image={game.background_image} className="imgDetail" />
                    {session &&

                        <div className="d-flex justify-content-around mt-3">
                            <button className="mb-3 rounded">Aggiungi ai preferiti</button>
                            <button className="mb-3 rounded">leggi la recensione</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}



