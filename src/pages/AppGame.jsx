import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import GameImage from "../Components/Game/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";

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




    useEffect(() => {
        if (session) readFav();
    }, [])

    console.log(game);

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

                                <button onClick={()=> removeFromFav(game)} className="mb-3 rounded">Rimuovi dai preferiti</button>
                            )}
                        </div>
                    }
                    {session && <button className="mb-3 rounded">leggi la recensione</button>}
                </div>
            </div>
            <Toaster richColors />
        </div>
    )
}



