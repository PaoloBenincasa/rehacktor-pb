import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import Game from "../Components/Game";

export default function AppDeveloper() {
    const { developer_id } = useParams();
    const [games, setGames] = useState([]);
    const [developerDetails, setDeveloperDetails] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    function stripHTML(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    }

    function decodeApostrophe(text) {
        return text.replace(/&#39;/g, "'");
    }

    async function fetchDeveloperDetails() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}developers/${developer_id}?key=${import.meta.env.VITE_API_KEY}`
            );
            const json = await response.json();
            json.description = stripHTML(json.description || "");
            setDeveloperDetails(json);
        } catch (error) {
            console.error("Error fetching developer details:", error);
        }
    }

    async function fetchDeveloperGames(page = 1) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&developers=${developer_id}&page=${page}`
            );
            const json = await response.json();

            if (json.results && json.results.length > 0) {
                // Aggiungi solo i giochi che non sono già presenti
                setGames((prevGames) => {
                    const newGames = json.results.filter(
                        (newGame) => !prevGames.some((game) => game.id === newGame.id)
                    );
                    return [...prevGames, ...newGames];
                });
                setNextPage(json.next);
            } else {
                console.log("No games found for this developer.");
                setGames([]);
            }
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    }

    useEffect(() => {
        fetchDeveloperDetails();
        fetchDeveloperGames();
    }, [developer_id]);

    useEffect(() => {
        if (inView && nextPage && !isLoading) {
            setIsLoading(true);
            fetchDeveloperGames(nextPage);
        }
    }, [inView, nextPage, isLoading]);

    return (
        <div className="mt-3">
            <div
                className="text-center mt-4 mb-3 d-flex flex-column align-items-center genreWrapper"
                style={{
                    backgroundImage: developerDetails?.image_background
                        ? `url(${developerDetails.image_background})`
                        : "",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                ></div>
                <h1
                    className="bgTransparent mt-2"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        textDecoration: "underline",
                        textDecorationColor: "var(--blue)",
                    }}
                >
                    Games by {developerDetails?.name || developer_id}
                </h1>
                <p
                    className="bgTransparent"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        textDecoration: "underline",
                        textDecorationColor: "var(--blue)",
                    }}
                >
                    {developerDetails?.games_count} games developed
                </p>
                {developerDetails && developerDetails.description && (
                    <div
                        className="w-75 bgTransparent"
                        style={{
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        <p className="developer-description bgTransparent">
                            {decodeApostrophe(developerDetails.description)}
                        </p>
                    </div>
                )}
            </div>

            <div className="genreWrapper mt-4 pb-4">
                <div className="gamesDeveloperList">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <Game key={`${game.id}-${index}`} game={game} />
                        ))
                    ) : (
                        <p>No games found for this developer.</p>
                    )}
                    <div ref={ref} aria-busy="true" className="loading"></div>
                </div>
            </div>
        </div>
    );
}
