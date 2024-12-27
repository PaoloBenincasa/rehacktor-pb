import { useContext, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import ChatUI from "../Components/ChatUI";
import HorizontalBarChart from "../Components/HorizontalBarChart";
import DoughnutChart from "../Components/DoughnutChart";
// import ScreenshotModal from "../Components/ScreenshotModal";
// import { Carousel } from "react-bootstrap";
import Screenshots from "../Components/Game/components/Screenshots";

export default function AppGame() {
    const session = useContext(SessionContext);
    const game = useLoaderData();
    const [fav, setFav] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    // const [screenshots, setScreenshots] = useState([]);


    // const handleOpenModal = () => {
    //     setShowModal(true);
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };
    useEffect(()=>{
        window.scrollTo(0,0);
    }, []);

    async function readFav() {
        let { data: Favourites, error } = await supabase
            .from('Favourites')
            .select("*")
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id);
        if (error) {
            console.log(error);

        }
        setFav(Favourites)

    }

    async function insertIntoFav(game) {
        const { data, error } = await supabase
            .from('Favourites')
            .insert([{ profile_id: session.user.id, game_id: game.id, game_name: game.name },])
            .select();

        if (error) {
            toast.error('insert failed')
            console.log(error.message);

        } else {
            toast.success('insert success!')
            readFav();
            console.log(data);

        }
    }

    async function removeFromFav(game) {
        const { error } = await supabase
            .from('Favourites')
            .delete()
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id);

        if (error) {
            toast.error('removing failed')


        } else {
            toast.success('removed successfylly')
            readFav();


        }
    }





    console.log(game);


    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        // Check if session is valid
        if (!session || !session.user) {
            toast.error("User session is invalid. Please log in.");
            return;
        }

        if (typeof message === "string" && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from("Messages")
                .insert([
                    {
                        profile_id: session.user.id,
                        profile_username: session.user.user_metadata.username,
                        game_id: game.id,
                        content: message,
                    }
                ])
                .select();

            if (error) {
                toast.error(`Error sending message: ${error.message}`);
            } else {
                toast.success("Message sent successfully!");
                inputMessage.reset();
                console.log("Response:", data);
            }
        } else {
            toast.error("Message cannot be empty.");
        }
    }


    useEffect(() => {
        if (session) readFav();
    }, [])

    return (

        <div className="container mt-5" >
            <div className="row vh-75 justify-content-center "
                style={{
                    backgroundImage: `url(${game.background_image_additional})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    height: "100%",

                }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.8)"
                }}>

                </div>
                <div className="col-md-6 bgTransparent mt-4 mb-4 gameInfo"
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}>
                    <div className="bgTransparent">
                        <p className="bgTransparent"><span className="fst-italic bgTransparent">Released</span> {game.released}</p>
                        <h1 className="bgTransparent">{game.name} </h1>
                        <div className="col-md-6 d-flex justify-content-start bgTransparent ">
                            {session &&
                                <div className="d-flex justify-content-around bgTransparent">
                                    {fav.length == 0 ? (
                                        <button onClick={() => insertIntoFav(game)} type="button" className="btn btn-primary mb-3 rounded">Aggiungi ai preferiti</button>
                                    ) : (
                                        <button onClick={() => removeFromFav(game)} type="button" className="btn btn-danger mb-3 rounded">Rimuovi dai preferiti</button>

                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row w-100 mt-2 bgTransparent">
                        <div className="col-md-6 bgTransparent">
                            {/* <span className="fst-italic fs-6 bgTransparent">votato</span> */}
                            <span className="fs-4 bgTransparent"> {game.ratings_count}</span>
                            <span className="fst-italic fs-6 bgTransparent"> votes</span>
                        </div>
                        {game.ratings && game.ratings.length > 0 && (
                            <div className="ratingsContainer bgTransparent w-100">
                                <HorizontalBarChart ratings={game.ratings} />
                            </div>
                        )}
                    </div>





                </div>
                <div className="col-md-5 d-flex flex-column bgTransparent mt-4 "
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}>
                    <div className="imgDetail bgTransparent d-flex align-items-center p-1">

                        <GameImage image={game.background_image}  />
                    </div>

                    <div className="container bgTransparent mt-4">
                        <div className="row justify-content-between bgTransparent ">
                            <div className="col-md-6 bgTransparent" >
                                <p className="txtGrey bgTransparent">generi</p>
                                <p className="txtW bgTransparent">{game.genres.map((genre, index) => (
                                    <span key={genre.id} className="bgTransparent">
                                        <Link to={`/games/${genre.slug}`} className="text-decoration-none hovBlue bgTransparent">
                                            {genre.name}
                                        </Link>
                                        {index < game.genres.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                            <div className="col-md-6 bgTransparent">
                                <p className="txtGrey bgTransparent">developer</p>
                                <p className="txtW bgTransparent">{game.developers.map((developer, index) => (
                                    <span key={developer.id} className="bgTransparent">
                                        {developer.name}{index < game.developers.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                        </div>
                        <div className="row justify-content-between bgTransparent">
                            <div className="col-md-6 bgTransparent">
                                <p className="txtGrey bgTransparent">publisher</p>
                                <p className="txtW bgTransparent">{game.publishers.map((publisher, index) => (
                                    <span key={publisher.id} className="bgTransparent">
                                        {publisher.name}{index < game.publishers.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                            <div className="col-md-6 bgTransparent">
                                <p className="txtGrey bgTransparent">console</p>
                                <p className="txtW bgTransparent">
                                    {game.platforms.map((item, index) => (
                                        <span key={item.platform.id} className="bgTransparent">
                                            {item.platform.name}{index < game.platforms.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* <ScreenshotModal
                        gameId={game.id}
                        gameName={game.name}
                        show={showModal}
                        onClose={handleCloseModal}
                        /> */}
                </div>
            </div>
            <div className="mt-5 mb-5 p-1">
                <h5 className="txtGrey descTxt">About</h5>
                <p className="txtW descTxt">{game.description_raw}</p>
            </div>

            <div className="screenList">
                <Screenshots gameId={game.id} gameName={game.name} />
            </div>
            <div className="mt-3">
                <ChatUI game={game} />
            </div>
            <div className="d-flex justify-content-center mb-5">
                <form onSubmit={handleMessageSubmit}>
                    <fieldset role="group">
                        <input type="text" name="message" placeholder="Chat..." />
                        <input type="submit" value="Invia" className="bg-blue" />
                    </fieldset>
                </form>
                <Toaster richColors />
            </div>
            <Toaster richColors />
        </div>
    )
}



