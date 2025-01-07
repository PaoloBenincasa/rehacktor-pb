import { useLoaderData, Link } from "react-router"

export default function AppAside() {
    const { genres,  } = useLoaderData();
    return (
        <aside>
            
            <ul className="genreSide ps-1 ">
                <h5 className="genreSide ms-2 mb-3 mt-1 pt-1 chakra">Genres</h5>
                {genres.map((genre) => (
                    <li key={genre.id} className="genreSide d-flex ms-1 mt-2 mb-2" >
                        <img src={genre.image_background} alt="" className="genrePic me-2"/>
                        <Link className="genreLink mt-1 mb-2" to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </li>
                ))}
                
            </ul>
            
        </aside>
    )
}