import { useContext, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
// import { Toaster, toast } from "sonner";
import ChatUI from "../Components/ChatUI";
import HorizontalBarChart from "../Components/HorizontalBarChart";
import Screenshots from "../Components/Game/components/Screenshots";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AppGame() {
    const session = useContext(SessionContext);
    const game = useLoaderData();
    const [fav, setFav] = useState([]);

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
            console.log(error.message);

        } else {
            toast.success('Added to favourites')
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
            toast.success('removed successfully')
            readFav();


        }
    }




    console.log(game);


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
                        <div className="bgTransparent d-flex align-items-center">
                            <p className="bgTransparent"><span className="fst-italic bgTransparent">Released</span> {game.released}</p>
                            <div className="bgTransparent txtW ms-2 mb-3 px-2 py-1 rounded">
                                ✪ {game.rating}
                            </div>
                        </div>
                        <h1 className="bgTransparent">{game.name} </h1>
                        <div className="col-md-6 d-flex justify-content-start bgTransparent ">
                            {session &&
                                <div className="d-flex justify-content-around bgTransparent">
                                    {fav.length == 0 ? (
                                        <button onClick={() => insertIntoFav(game)} type="button" className="btn btn-primary mb-3 rounded">Add to favourites</button>
                                    ) : (
                                        <button onClick={() => removeFromFav(game)} type="button" className="btn btn-danger mb-3 rounded">Remove from favourites</button>

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
                            <div className="ratingsContainer bgTransparent w-100" >
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
                    <div className="imgDetail bgTransparent d-flex align-items-center p-1 " loading="lazy">

                        <GameImage image={game.background_image} />
                    </div>

                    <div className="container bgTransparent mt-4">
                        <div className="row justify-content-between bgTransparent ">
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
                                <p className="txtGrey bgTransparent">platforms</p>
                                <p className="txtW bgTransparent">
                                    {game.platforms.map((item, index) => (
                                        <span key={item.platform.id} className="bgTransparent">
                                            <Link to={`/platforms/${item.platform.slug}` } className="text-decoration-none hovBlue bgTransparent">

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

                <div className="mt-5 mb-5 p-1 about">
                    <h5 className="txtGrey descTxt">About</h5>
                    <p className="txtW descTxt">{game.description_raw}</p>
                </div>
            </div>


            <div>

                <h5 className="txtGrey descTxt p-1 w-100">Screenshots</h5>
            </div>
            <div className="screenList">
                <Screenshots gameId={game.id} gameName={game.name} />
            </div>



            <div className="mt-5 mb-5 d-flex flex-column align-items-center">
                <h5 className="txtGrey mb-0 ">Comments</h5>
                <div className="mt-3 mb-3 w-100  h-100">
                    <ChatUI game={game} />
                </div>
                <div className="mb-5 pb-5">
                    <form onSubmit={handleMessageSubmit}>
                        <fieldset role="group" className="d-flex flex-column align-items-center">
                            <textarea type="text" name="message" rows="6" cols="60" placeholder="Write a comment..." className="p-1" />
                            <input type="submit" value="Publish" className="btn btn-primary mt-5 w-25" />
                        </fieldset>
                    </form>
                    {/* <Toaster richColors /> */}


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



