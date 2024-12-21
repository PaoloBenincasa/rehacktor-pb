import { Link } from "react-router";
import GameImage from "./components/GameImage";
import style from "./styles.module.css"

function Game({ game }) {
    const { background_image: image } = game;
    return (
        <Link to={`/game/${game.id}`} className="text-decoration-none">
            <div className={`${style.expose} ${style.gameCard}`}>
                    <GameImage image={image}/>

                <div>
                    <p className="card-title text-truncate p-1 text-decoration-none">{game.name}</p>
                    {/* <small>{game.genres.map((genre) => genre.name).join(', ')}</small> */}
                </div>
            </div>
        </Link>
        
      
        

    );
}

export default Game;