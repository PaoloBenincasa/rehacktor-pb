import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import Game from "../Components/Game";

export default function AppGenre() {
    const { genre_slug } = useParams();
    const [genreGames, setGenreGames] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [genreDetails, setGenreDetails] = useState();

    const { ref, inView } = useInView({
        threshold: 0,
    });

    function stripHTML(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, ""); 
    }

    function decodeApostrophe(text) {
        return text.replace(/&#39;/g, "'");
    }

    async function fetchGenreDetails() {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}genres/${genre_slug}?key=${import.meta.env.VITE_API_KEY}`
        );
        const json = await response.json();
        json.description = stripHTML(json.description);
        setGenreDetails(json);
    }

    async function fetchGenreGames(url) {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setGenreGames((prevGames) => [...prevGames, ...json.results]);
        setNextPage(json.next);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchGenreDetails();
        const initialUrl = `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`;
        fetchGenreGames(initialUrl);

    }, [genre_slug]);

    useEffect(() => {
        const initialUrl = `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`;
        fetchGenreGames(initialUrl);
    }, [genre_slug]);

    useEffect(() => {
        if (inView && nextPage && !isLoading) {
            fetchGenreGames(nextPage);
        }
    }, [inView, nextPage, isLoading]);

    console.log(genre_slug);

    return (
        <div className="mt-3">
            <div
                className="text-center mt-4 mb-3 d-flex flex-column align-items-center genreWrapper"
                style={{
                    backgroundImage: genreDetails?.image_background
                        ? `url(${genreDetails.image_background})`
                        : "",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.7)"
                }}></div>
                <h1 className="bgTransparent mt-2"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        textDecoration: "underline",
                        textDecorationColor: "var(--blue)",
                    }}>
                    {genreDetails?.name || genre_slug} games
                </h1>
                <p className="bgTransparent"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        textDecoration: "underline",
                        textDecorationColor: "var(--blue)",
                    }}>{genreDetails?.games_count} games in this genre</p>
                {genreDetails && genreDetails.description && (
                    <div className="w-75 bgTransparent "
                        style={{
                            position: "relative",
                            zIndex: 2
                        }}>
                        <p className="genre-description bgTransparent">{decodeApostrophe(genreDetails.description)}</p>

                    </div>
                )}
            </div>

            <div className="genreWrapper mt-4">
                <div className="gamesGenreList">
                    {genreGames.map((game, index) => (
                        <Game key={`${game.id}-${index}`} game={game} />
                    ))}
                    <div ref={ref} aria-busy="true" className="loading"></div>
                </div>
            </div>
        </div>
    )
}

