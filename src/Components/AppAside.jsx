import { useLoaderData, Link } from "react-router"

export default function AppAside() {
    const { genres, platforms } = useLoaderData();
    return (
        <aside>
            
            <ul className="genreSide ps-1 rounded">
                <h5 className="genreSide ms-2 pt-1 chakra">Generi</h5>
                {genres.map((genre) => (
                    <li key={genre.id} className="genreSide d-flex" >
                        <img src={genre.image_background} alt="" className="genrePic me-2"/>
                        <Link className="genreLink" to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </li>
                ))}
                
            </ul>
        </aside>
    )
}