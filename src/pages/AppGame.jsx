import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import ChatUI from "../Components/ChatUI";
import Screenshots from "../Components/Game/components/Screenshots";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarChart from "../Components/BarChart";



export default function AppGame() {
    const session = useContext(SessionContext);
    const game = useLoaderData();
    const [fav, setFav] = useState([]);
    const aboutRef = useRef(null);
    const screenshotsRef = useRef(null);
    const commentsRef = useRef(null);

    const scrollToAbout = () => {
        if (aboutRef.current) {
            const offset = 89;
            const elementPosition = aboutRef.current.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    };

    const scrollToScreenshots = () => {
        if (screenshotsRef.current) {
            const offset = 89;
            const elementPosition = screenshotsRef.current.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    };

    const scrollToComments = () => {
        if (commentsRef.current) {
            const offset = 89;
            const elementPosition = commentsRef.current.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    };



    useEffect(() => {
        window.scrollTo(0, 0);
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
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name
            },])
            .select();

        if (error) {
            toast.error('insert failed')
            console.warn(error.message);

        } else {
            toast.success('Added to favourites')
            readFav();

        }
    }

    async function removeFromFav(game) {
        const { error } = await supabase
            .from('Favourites')
            .delete()
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id);

        if (error) {
            toast.error('Removing failed')


        } else {
            toast.success('Removed successfully')
            readFav();


        }
    }

    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        if (!session || !session.user) {
            toast("User session is invalid. Please log in.");
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
                toast.error(`Error posting comment: ${error.message}`);
            } else {
                toast.success("Comment posted!");
                inputMessage.reset();
            }
        } else {
            toast.error("Comment cannot be empty.");
        }
    }

    useEffect(() => {
        if (session) readFav();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scroller = document.getElementById("scroller");
            const scrollThreshold = 78;

            if (window.scrollY > scrollThreshold) {
                scroller.style.display = "block";
            } else {
                scroller.style.display = "none";
            }
        };

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        <div className="container mt-3" >
            <div id="scroller" className="animate__animated animate__fadeInDown ">
                <div className="scrollerContent">
                    <i
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="bi bi-arrow-up-circle fs-2 hovBlue"

                    ></i>
                    <img src={game.background_image} alt="" className="imgScroller" />
                    <div>

                        <h3 className="mb-0 titleScroller">{game.name}</h3>

                        <div className="d-flex gap-2">
                            <div className="hovBlue" onClick={scrollToAbout}>
                                about
                            </div>
                            <div className="hovBlue" onClick={scrollToScreenshots}>
                                screenshots
                            </div>
                            <div className="hovBlue" onClick={scrollToComments}>
                                comments
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row vh-75  justify-content-center  "
                style={{
                    backgroundImage: `url(${game.background_image_additional})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    height: "100%",
                    loading: "lazy"
                }}
            >
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
                        <div className="bgTransparent d-flex align-items-center">
                            <p className="bgTransparent"><span className="fst-italic bgTransparent">Released</span> {game.released}</p>
                            <div className="bgTransparent txtW ms-2 mb-3 px-2 py-1 rounded">
                                ✪ {game.rating}
                            </div>
                        </div>
                        <h1 className="bgTransparent animate__animated animate__fadeInLeft">{game.name} </h1>
                        <div className="col-md-6 d-flex justify-content-start bgTransparent ">
                            {session &&
                                <div className="d-flex justify-content-around bgTransparent">
                                    {fav.length == 0 ? (
                                        <button onClick={() => insertIntoFav(game)} type="button" className="btn btn-outline-primary mb-3 rounded text-start text-light"><span className="fw-light">Add to</span>  Favourites</button>
                                    ) : (
                                        <button onClick={() => removeFromFav(game)} type="button" className="btn btn-outline-danger mb-3 rounded text-start text-light"><span className="fw-light">Remove from</span> Favourites</button>

                                    )}
                                </div>
                            }

                        </div>
                    </div>
                    <div className="row w-100 mt-2 bgTransparent">
                        <div className="col-md-6 bgTransparent">
                            <span className="fs-4 bgTransparent"> {game.ratings_count}</span>
                            <span className="fst-italic fs-6 bgTransparent"> votes</span>

                        </div>
                        {game.ratings && game.ratings.length > 0 && (
                            <div className="ratingsContainer bgTransparent w-100 " >
                                <BarChart ratings={game.ratings} />

                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-5 d-flex flex-column bgTransparent mt-4 "
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}>
                    <div className="imgDetail bgTransparent d-flex align-items-center  animate__animated animate__fadeInRight" loading="lazy">

                        <GameImage image={game.background_image} />
                    </div>

                    <div className="container  mt-4 mb-4">
                        <div className="row  justify-content-between bgTransparent ">
                            <div className="col-md-6 bgTransparent" >
                                <p className="txtGrey bgTransparent">genres</p>
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
                                <p className="txtW bgTransparent">
                                    {Array.isArray(game.developers) && game.developers.length > 0 ? (
                                        game.developers.map((developer, index) => (
                                            <span key={developer.id} className="bgTransparent">
                                                <Link
                                                    to={`/developers/${developer.id}`}
                                                    className="text-decoration-none hovBlue bgTransparent"
                                                >
                                                    {developer.name}
                                                </Link>
                                                {index < game.developers.length - 1 && ', '}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="bgTransparent">No developers found</span>
                                    )}
                                </p>


                            </div>
                        </div>
                        <div className="row  justify-content-between bgTransparent">
                            <div className="col-md-6 bgTransparent">
                                <p className="txtGrey bgTransparent">publisher</p>
                                <p className="txtW bgTransparent">{game.publishers.map((publisher, index) => (
                                    <span key={publisher.id} className="bgTransparent">
                                        {publisher.name}{index < game.publishers.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                            <div className="col-md-6 bgTransparent">
                                <p className="txtGrey bgTransparent">platforms</p>
                                <p className="txtW bgTransparent">
                                    {game.platforms.map((item, index) => (
                                        <span key={item.platform.id} className="bgTransparent">
                                            <Link to={`/platforms/${item.platform.slug}`} className="text-decoration-none hovBlue bgTransparent">
                                                {item.platform.name}
                                            </Link>
                                            {index < game.platforms.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex">

                <div className="mt-5 mb-5 p-1 about w-100">
                    <h5 className="txtGrey descTxt" ref={aboutRef}>About</h5>
                    <p className="txtW descTxt">{game.description_raw}</p>
                </div>
            </div>

            <div>

                <h5 className="txtGrey descTxt p-1 w-100" ref={screenshotsRef}>Screenshots</h5>
            </div>
            <div className="screenList" loading="lazy">
                <Screenshots gameId={game.id} gameName={game.name} />
            </div>

            <div className="mt-5 mb-5 d-flex flex-column align-items-center">
                <h5 className="txtGrey mb-0 " ref={commentsRef}>Comments</h5>
                <div className="mt-3 mb-3 w-100 h-100 chatBox">
                    <ChatUI game={game} />
                </div>
                <div className="mb-5 pb-5">
                    <form onSubmit={handleMessageSubmit}>
                        <fieldset role="group" className="d-flex flex-column align-items-center">
                            <textarea type="text" name="message" rows="6" cols="60" placeholder="Write a comment..." className="p-1 bg-blackk" />
                            <input type="submit" value="Publish" className="btn btn-primary mt-5 w-25 " />
                        </fieldset>
                    </form>
                </div>
                <ToastContainer position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    )
}



