import { useContext, useEffect, useState } from "react"
import AppAside from "../Components/AppAside"
import Game from "../Components/Game/index"
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import SessionContext from "../context/SessionContext";
import { useParams } from "react-router";
import AppBrowse from "../Components/AppBrowse";




export default function AppHome() {
  const { ordering_id } = useParams();
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);

  const toggleBrowserVisibility = () => {
    setIsBrowserVisible(!isBrowserVisible);
  };


  let games = useAsyncList({
    async load({ signal, cursor }) {

      let res = await fetch(
        cursor ||
        `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-05-01,2024-01-01&page=1&ordering=${ordering_id}`, {
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
          <h2 className="underBlue">All your games. One place. Infinite adventures.</h2>
          <p className="intro bg-blue p-2 rounded fs-5 mt-3">Welcome to <strong>ReHacktor</strong>, your go-to place for the world of video games. Explore a wide selection of titles, organize your experience by genre and platform, and easily find the game you're looking for and add it to your favourites. Whether you're a fan of action, adventure, strategy, or more, ReHacktor makes gaming even more fun, all in one place!</p>
          <div className="gamesBrowser">
            <button className="btn btn-outline-primary mb-1" onClick={toggleBrowserVisibility}>
              {isBrowserVisible ? "Hide browser" : "Browse by genre or platform"}
            </button>
            {isBrowserVisible && (
              <div className="genrePlatformBrowser">
                <AppBrowse />
              </div>
            )}
          </div>

        </div>
        <div className="gamesList mt-4">
          {games.items.map(game => (
            <Game key={game.id} game={game} />

          ))}

          <div ref={ref} aria-busy="true" className="loading"></div>
        </div>
      </div>

    </div>

  )
}