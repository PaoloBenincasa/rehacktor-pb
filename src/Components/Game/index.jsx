import { Link } from "react-router";
import GameImage from "./components/GameImage";
import style from "./styles.module.css"

function Game({ game }) {
    const { background_image: image } = game;
    return (
        <Link to={`/game/${game.id}`} className="text-decoration-none">
            <div className={` ${style.gameCard} `} >
                <GameImage image={image} className="position-relative" />
                <div className={`${style.star}`}>
                    ✪ {game.rating}
                </div>
                <p className={`${style.cardTitle}`} > {game.name}</p>
            </div>
        </Link>
    );
}

export default Game;



