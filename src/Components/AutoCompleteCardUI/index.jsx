// import style from './styles.module.css';

// export default function AutoCompleteCardUI({game}){
//     const {name, background_image} = game;
//     return (
//         <div className={style.cardSuggestions}>
//             <img src={background_image} alt={"image suggestions"} className={style.imgAvatarSuggestions} />
//             <p className='txtW'>{name}</p>
//         </div>
//     )
// }

import style from './styles.module.css';
import { Link } from "react-router";

export default function AutoCompleteCardUI({ game }) {
    const { name, background_image } = game;

    const handleClick = () => {
        if (onSelect){
            onSelect();
        }
     };

    return (
        <div className={`autocomplete-item ${style.cardSuggestions}`} >
            <img
                src={background_image}
                alt={`Image of ${name}`}
                className={style.imgAvatarSuggestions}
            />
            <Link to={`/game/${game.id}`} 
                onClick={handleClick} 
                className="txtW titleAuto text-decoration-none">{name}</Link>

        </div>
    );
}
