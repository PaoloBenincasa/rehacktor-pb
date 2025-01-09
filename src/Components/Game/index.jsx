import { Link } from "react-router";
import GameImage from "./components/GameImage";
import style from "./styles.module.css"

function Game({ game }) {
    const { background_image: image } = game;
    return (
        <Link to={`/game/${game.id}`}  className="text-decoration-none ">
            <div className={` ${style.gameCard}`}>
                <GameImage image={image} className="position-relative" />
                <div className={`${style.star}`}>
                    ✪ {game.rating}
                </div>
                {/* <div className="bg-newblack">
                    <div className="d-flex bg-newblack flex-column justify-content-evenly">
                        <p className="card-title text-truncate fs-5 ps-2 pt-1 text-decoration-none">{game.name}</p>
                       
                    </div>
                </div> */}
                
                <p className={`${style.cardTitle}`} > {game.name}</p>
                
                
                
            </div>
        </Link>




    );
}

export default Game;



