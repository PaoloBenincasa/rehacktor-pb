import { Link } from "react-router";
import GameImage from "./components/GameImage";
import style from "./styles.module.css"

function Game({ game }) {
    const { background_image: image } = game;
    return (
        <Link to={`/game/${game.id}`}  className="text-decoration-none ">
            <div className={`${style.expose} ${style.gameCard}`}>
                <GameImage image={image} className="position-relative" />
                <div className="position-absolute top-0 end-0 bg-newblack txtW px-2 py-1 m-2 rounded">
                    ✪ {game.rating}
                </div>
                <div className="bg-newblack">
                    <div className="d-flex bg-newblack flex-column justify-content-evenly">
                        <p className="card-title text-truncate fs-5 ps-2 pt-1 text-decoration-none">{game.name}</p>
                        {/* <p className="bg-newblack pt-2 pe-2 position-relative"> ✪ {game.rating}</p> */}
                    </div>
                    {/* <small className="fst-italic fs-7 bg-newblack ps-2">{game.genres.map((genre) => genre.name).join(', ')}</small> */}
                </div>
            </div>
        </Link>




    );
}

export default Game;



