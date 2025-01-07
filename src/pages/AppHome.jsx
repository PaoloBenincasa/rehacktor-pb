import { useContext, useEffect, useState } from "react"
import AppAside from "../Components/AppAside"
import Game from "../Components/Game/index"
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import SessionContext from "../context/SessionContext";




export default function AppHome() {


  // const [userLogged, setUserLogged] = useState('');

  // useEffect(() => {
  //   async function getSession(params) {
  //     const { data, error } = await supabase.auth.getSession();
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser()
  //     let { first_name } = user.user_metadata
  //     setUserLogged(first_name);

  //   }
  //   getSession();
  // }, [])

  let games = useAsyncList({
    async load({ signal, cursor }) {

      let res = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-05-01,2024-01-01&page=1`, {
        signal
      });
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });


  useEffect(() => {
    if (games.items.length && inView && !games.isLoading) {
      games.loadMore();
    }
  }, [inView, games]);




  return (
    <div className="container-fluid d-flex homeWrap">
      <div className="sidebar">
        <AppAside />

      </div>
      <div className="gamesWrapper">
        <div className="mb-3">
          <h1> all your videogames in one place</h1>
          {/* {loading && <progress />} */}
        </div>
        <div className="gamesList">
          {games.items.map(game => (
            <Game key={game.id} game={game} />

          ))}

          <div ref={ref} aria-busy="true" className="loading"></div>
        </div>
      </div>

    </div>

  )
}