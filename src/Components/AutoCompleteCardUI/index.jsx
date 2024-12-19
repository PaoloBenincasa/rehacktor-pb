import style from './styles.module.css';

export default function AutoCompleteCardUI({game}){
    const {name, background_image} = game;
    return (
        <div className={style.cardSuggestions}>
            <img src={background_image} alt={"image suggestions"} className={style.imgAvatarSuggestions} />
            <p className='txtW'>{name}</p>
        </div>
    )
}