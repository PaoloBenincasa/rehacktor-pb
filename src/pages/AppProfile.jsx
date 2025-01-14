import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { Link } from "react-router";
import supabase from '../supabase/client';
import { getSession } from "../hooks/useSession";
import Avatar from '../Components/AvatarUI'

import Game from "../Components/Game";

export default function AppProfile() {
  const { first_name, last_name, username } = useProfile();
  const [profile, setProfile] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
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
    const fetchAvatar = async () => {
      if (!session || !session.user) {
        console.error("Session or user is not defined");
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', session.user.id);

      if (error) {
        console.error(error);
      } else {
        console.log("Fetched avatar_url:", data);
        console.log(getAvatarUrl(avatar_url));

        setAvatarUrl(data[0]?.avatar_url || null);
      }
    };

    if (session) {
      fetchAvatar();
    }
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
    <div className="container mb-5 mt-5 bg-newblack rounded">
      <div className="row p-3 ">
        <div className="col-md-6 p-5 d-flex flex-column align-items-center">
          <h1 className="underBlue">Hey {username}!</h1>
          <img
            src={getAvatarUrl(avatar_url) || "https://picsum.photos/id/1/200/300"}
            onError={(e) => {
              e.target.src = "https://picsum.photos/id/1/200/300";
            }}
            alt="Profile"
            className=" mb-3 mb-md-0 me-md-3 proPic"
          />
          <p className="mt-4 ps-3">
            You added {numFavourites} games to your favourites.
          </p>
        </div>

        <div className="col-md-6 p-2">
          <div className="bg-blackk rounded p-3 ps-5">

            <h3 className="underBlue pt-4">Your favourites</h3>
            {favourites.length > 0 ? (
              favourites.map((favourite) => (
                <Link
                  to={`/game/${favourite.game_id}`}
                  key={favourite.game_id}
                  className="text-decoration-none"
                >
                  <p className="favList">{favourite.game_name}</p>
                </Link>
              ))
            ) : (
              <p>Non hai ancora preferiti.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
