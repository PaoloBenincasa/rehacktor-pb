import { useEffect, useState } from "react";
import supabase from "../../supabase/client";
import FavContext from "./FavContext";

export default function FavContextProvider({ children }){
    const [favourites, setFavourites] = useState([]);

    const getFavourites = async () => {
        const { data, error } = await supabase
            .from('Favourites')
            .select('*');
           

        if (error) {
            console.error(error);
        } else {
            setFavourites(data);
        }
    };      

    useEffect(() => {
        getFavourites();
    }, []);

    return (
        <FavContext.Provider value={{ favourites, setFavourites }}>
            {children}
        </FavContext.Provider>
    );
}