import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import ChatUI from "../Components/ChatUI";

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




    
    // console.log(game);
    
    
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

        <div className="container">
            <div className="row h-100 justify-content-center">
                <div className="col-md-6">
                    <h1>{game.name}</h1>
                    <p className="txtW">voto: {game.rating}</p>
                    <p className="txtW">{game.description_raw}</p>
                </div>
                <div className="col-md-5 d-flex flex-column">
                    <GameImage image={game.background_image} className="imgDetail" />
                    {session &&
                        <div className="d-flex justify-content-around mt-3">
                            {fav.length == 0 ? (

                                <button onClick={() => insertIntoFav(game)} className="mb-3 rounded">Aggiungi ai preferiti</button>
                            ) : (

                                <button onClick={() => removeFromFav(game)} className="mb-3 rounded">Rimuovi dai preferiti</button>
                            )}
                        </div>
                    }
                    {session && <button className="mb-3 rounded">leggi la recensione</button>}
                    <div>
                        <ChatUI game={game}/>
                    </div>
                    <div>
                        <form onSubmit={handleMessageSubmit}>
                            <fieldset role="group">
                                <input type="text" name="message" placeholder="Chat..." />
                                <input type="submit" value="Invia" />
                            </fieldset>
                        </form>
                        <Toaster richColors/>
                    </div>
                </div>
            </div>
            <Toaster richColors />
        </div>
    )
}



