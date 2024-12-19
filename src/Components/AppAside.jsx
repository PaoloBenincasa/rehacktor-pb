import { useLoaderData, Link } from "react-router"

export default function AppAside() {
    const { genres, platforms } = useLoaderData();
    return (
        <aside>
            <nav>
                <div className="pb-3">
                    <h5>Generi</h5>
                    <details className="dropdown">
                        <summary>Vedi Generi</summary>
                        <ul>
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
                <div className="pb-3">
                    <h5>Console</h5>
                    <details className="dropdown">
                        <summary>Vedi Console</summary>
                        <ul>
                            {platforms.map((platform) => (
                                <li key={platform.id}>
                                    <Link to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
            </nav>
        </aside>
    )
}