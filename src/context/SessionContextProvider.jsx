import { useState, useEffect} from "react"
import supabase from "../supabase/client"
import SessionContext from "./SessionContext"

export default function SessionContextProvider({children}) {
    const [session, setSession] = useState(null);
    // const [user, setUser] = useState(null);
  
    useEffect(() => {
      const {data: { subscription }} =  supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_OUT') {
            setSession(null)
          } else if (session) {
            setSession(session)
          }
        })

        // const { data: { user } } =  supabase.auth.getUser()
        // if (!user) {
        //     setUser(null)
        //   } else if (session) {
        //     setUser(user)
        //   }
  
      return () => {
        subscription.unsubscribe()
      }
    }, [])
  
    return (
      <SessionContext.Provider value={session}>
        {children}
      </SessionContext.Provider>
    )
  }