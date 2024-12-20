import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import SessionContextProvider from "./context/SessionContextProvider";
import FavContextProvider from "./Components/favContext/favContextProvider";
function App() {
  return (
    <RouterProvider router={router} />
  )
}

function Root() {
  return (
    <SessionContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </SessionContextProvider>
  )
}

export default Root;
