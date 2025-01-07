import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { Link } from "react-router";
import supabase from '../supabase/client';
import { getSession } from "../hooks/useSession";
import Game from "../Components/Game";

export default function AppProfile() {
  const { first_name, last_name, username, avatar_url } = useProfile();
  const [profile, setProfile] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const numFavourites = favourites.length;

  useEffect(() => {
    getSession().then((session) => setSession(session));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) setError(error);
      else setProfile(data);
    };

    if (session?.user?.id) fetchProfile();
  }, [session]);

  useEffect(() => {

    const fetchFavourites = async () => {
      const { data, error } = await supabase
        .from('Favourites')
        .select('game_id, game_name')
        .eq('profile_id', session.user.id);

      console.log("Session user ID:", session.user.id);
      console.log("Fetched favourites:", data);


      if (error) console.error("Error fetching favourites:", error);
      else setFavourites(data || []);
    };

    if (session?.user?.id) fetchFavourites();
  }, [session]);

  if (error) return <div>Error fetching profile: {error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="container p-5">
      <article>
        <header>
          <h1>Welcome back {username}!</h1>
        </header>
        <div className="user_card">
          <section className="user_data m-2">
            <img
              src={avatar_url && getAvatarUrl(avatar_url)}
              alt="Profile"
              className="h-50 w-50"
            />
            <p>you added {numFavourites} games to your favourites</p>
          </section>

          <div>
            <h3>Your favourites</h3>
            {favourites.length > 0 ? (
              favourites.map((favourite) => (
                <Link to={`/game/${favourite.game_id}`} key={favourite.game_id} className="text-decoration-none">
                  <p className="favList">{favourite.game_name} </p>
                  
                </Link>
              ))
            ) : (
              <p>Non hai ancora preferiti.</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
