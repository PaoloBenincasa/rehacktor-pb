import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import Game from "../Components/Game";

// Il mapping da slug a ID numerico
const platformMappings = {
    "pc": 4,
    "playstation5": 187,
    "playstation4": 18,
    "xbox-one": 1,
    "xbox360": 14,
    "nintendo-switch": 7,
    "nintendo-3ds": 8,
    "nintendo-wii-u": 10,
    "nintendo-wii": 11,
    "ios": 3,
    "android": 21,
    "macos": 5,
    "linux": 6,
    "xbox-series-x": 186,
    "playstation3": 16,
    "playstation2": 15,
    "playstation": 27,
    "ps-vita": 19,
    "psp": 17,
    "wii": 11,
    "gamecube": 105,
    "nintendo-64": 83,
    "game-boy-advance": 24,
    "game-boy-color": 43,
    "game-boy": 26,
    "snes": 79,
    "nes": 49,
    "classic-macintosh": 55,
    "apple-ii": 41,
    "commodore-amiga": 166,
    "atari-7800": 28,
    "atari-5200": 31,
    "atari-2600": 23,
    "atari-flashback": 22,
    "atari-8-bit": 25,
    "atari-st": 34,
    "atari-lynx": 46,
    "atari-xegs": 50,
    "genesis": 167,
    "sega-saturn": 107,
    "sega-cd": 119,
    "sega-32x": 117,
    "sega-master-system": 74,
    "dreamcast": 106,
    "3do": 111,
    "jaguar": 112,
    "game-gear": 77,
    "neogeo": 12
  };

export default function AppPlatform() {
    const { platform_id } = useParams();
    const [games, setGames] = useState([]);
    const [platformDetails, setPlatformDetails] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    // Funzione per rimuovere HTML dai testi
    function stripHTML(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    }

    // Funzione per decodificare gli apostrofi
    function decodeApostrophe(text) {
        return text.replace(/&#39;/g, "'");
    }

    // Funzione per recuperare i dettagli della piattaforma
    async function fetchPlatformDetails() {
        const platformId = platformMappings[platform_id]; // Usa il mapping per ottenere l'ID numerico

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}platforms/${platformId}?key=${import.meta.env.VITE_API_KEY}`
            );
            const json = await response.json();
            json.description = stripHTML(json.description || ""); 
            setPlatformDetails(json);
        } catch (error) {
            console.error("Error fetching platform details:", error);
        }
    }

    // Funzione per recuperare i giochi per la piattaforma
    async function fetchPlatformGames(page = 1) {
        const platformId = platformMappings[platform_id]; // Usa il mapping per ottenere l'ID numerico

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platformId}&page=${page}`
            );
            const json = await response.json();
            console.log("INFINITO", json.next)
            if (json.results && json.results.length > 0) {
                setGames((prevGames) => [...prevGames, ...json.results]);
                setNextPage(json.next); // Aggiorniamo la pagina successiva
            } else {
                console.log("No games found for this platform.");
                setGames([]);
            }
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    }

    useEffect(() => {
        fetchPlatformDetails();
        fetchPlatformGames(); // Recupera i giochi iniziali
    }, [platform_id]);

    useEffect(() => {
        if (inView && nextPage && !isLoading) {
            // setIsLoading(true);
            fetchPlatformGames(nextPage); // Carica i giochi della pagina successiva
        }
    }, [inView, nextPage, isLoading]);

    return (
        <div className="mt-3">
            {/* Rendering dei dettagli della piattaforma */}
            <div
                className="text-center mt-4 mb-3 d-flex flex-column align-items-center genreWrapper"
                style={{
                    backgroundImage: platformDetails?.image_background
                        ? `url(${platformDetails.image_background})`
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
                    Games for {platformDetails?.name || platform_id}
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
                    {platformDetails?.games_count} games available for this platform
                </p>
                {platformDetails && platformDetails.description && (
                    <div
                        className="w-75 bgTransparent"
                        style={{
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        <p className="platform-description bgTransparent">
                            {decodeApostrophe(platformDetails.description)}
                        </p>
                    </div>
                )}
            </div>

            <div className="genreWrapper mt-4">
                <div className="gamesGenreList">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <Game key={`${game.id}-${index}`} game={game} />
                        ))
                    ) : (
                        <p>No games found for this platform.</p>
                    )}
                    <div ref={ref} aria-busy="true" className="loading"></div>
                </div>
            </div>
        </div>
    );
}
