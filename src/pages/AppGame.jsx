import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import ChatUI from "../Components/ChatUI";
import HorizontalBarChart from "../Components/HorizontalBarChart";
import DoughnutChart from "../Components/DoughnutChart";

export default function AppGame() {
    const session = useContext(SessionContext);
    const game = useLoaderData();
    const [fav, setFav] = useState([]);

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

        <div className="container mt-3">
            <div className="row h-100 justify-content-center">
                <div className="col-md-6">
                    <h1>{game.name}</h1>
                    <div className="ratingsContainer">
                        {/* <HorizontalBarChart ratings={game.ratings} /> */}
                        <DoughnutChart ratings={game.ratings} />

                    </div>
                    {session &&
                        <div className="d-flex justify-content-around mt-3">
                            {fav.length == 0 ? (
                                <button onClick={() => insertIntoFav(game)} type="button" className="btn btn-primary mb-3 rounded">Aggiungi ai preferiti</button>
                            ) : (
                                <button onClick={() => removeFromFav(game)} type="button" className="btn btn-danger mb-3 rounded">Rimuovi dai preferiti</button>

                            )}
                        </div>
                    }

                  

                    <div className="mt-3">
                    <h5>About</h5>
                    <p className="txtW">{game.description_raw}</p>
                    </div>



                </div>
                <div className="col-md-5 d-flex flex-column">
                    <GameImage image={game.background_image} className="imgDetail" />
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <p>generi</p>
                                <p className="txtW">{game.genres.map((genre, index) => (
                                    <span key={genre.id}>
                                        {genre.name}{index < game.genres.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                            <div className="col-md-6">
                                <p>developer</p>
                                <p className="txtW">{game.developers.map((developer, index) => (
                                    <span key={developer.id}>
                                        {developer.name}{index < game.developers.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <p>publisher</p>
                                <p className="txtW">{game.publishers.map((publisher, index) => (
                                    <span key={publisher.id}>
                                        {publisher.name}{index < game.publishers.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                            <div className="col-md-6">
                                <p>console</p>
                                <p className="txtW">
                                    {game.platforms.map((item, index) => (
                                        <span key={item.platform.id}>
                                            {item.platform.name}{index < game.platforms.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                            </div>
                        </div>
                    </div>
                   
                    <div className="mt-3">
                        <ChatUI game={game} />
                    </div>
                    <div>
                        <form onSubmit={handleMessageSubmit}>
                            <fieldset role="group">
                                <input type="text" name="message" placeholder="Chat..." />
                                <input type="submit" value="Invia" />
                            </fieldset>
                        </form>
                        <Toaster richColors />
                    </div>
                </div>
            </div>
            <Toaster richColors />
        </div>
    )
}



