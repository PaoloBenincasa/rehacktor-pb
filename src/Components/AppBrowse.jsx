import { useLoaderData, Link } from "react-router"
export default function AppBrowse() {
    const { genres, platforms } = useLoaderData();

    return (
        <div>
            <div className="d-flex flex-wrap w-100">
                <h5 className="underBlue ms-1 mt-1 mb-1">Genres</h5>
                {genres.map((genre) => (
                    <p key={genre.id} className="d-inline-block ms-1 mt-1 mb-1" >
                        <Link className=" genreLink p-1 rounded " to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </p>
                ))}
            </div>
            <div className="d-flex flex-wrap w-100 mt-1">
                <h5 className="underBlue ms-1 mt-1 mb-1">Platforms</h5>
                {platforms.map((platform) => (
                    <p key={platform.id} className="d-inline-block ms-1 mt-1 mb-1" >
                         <Link className="genreLink p-1 rounded" to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                    </p>
                ))}
            </div>
        </div>
    )
}