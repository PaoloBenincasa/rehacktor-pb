import style from './styles.module.css';
import { Link } from "react-router";

export default function AutoCompleteCardUI({ game }) {
    const { name, background_image } = game;

    const handleClick = () => {
        if (onSelect) {
            onSelect();
        }
    };

    return (
        <Link
            to={`/game/${game.id}`}
            onClick={handleClick}
            className={`autocomplete-item ${style.cardSuggestions} text-decoration-none`}>
            <div className='bgTransparent'>
                <img
                    src={background_image}
                    alt={`Image of ${name}`}
                    className={style.imgAvatarSuggestions}
                />
                <span className="txtW titleAuto">{name}</span>
            </div>
        </Link>
    );
}
