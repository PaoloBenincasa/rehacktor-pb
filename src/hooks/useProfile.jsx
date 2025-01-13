import { useState, useEffect, useContext } from 'react'
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'

export default function useProfile() {
    const session = useContext(SessionContext)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [avatar_url, setAvatarUrl] = useState('')

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)

            if (!session || !session.user) {
                console.warn("Session is null or user is not available.")
                setLoading(false)
                return
            } 

            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, first_name, last_name, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username)
                    setFirst_name(data.first_name)
                    setLast_name(data.last_name)
                    setAvatarUrl(data.avatar_url)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    return {
        loading,
        first_name,
        last_name,
        username,
        avatar_url,
        setAvatarUrl,
        setLoading,
        setFirst_name,
        setLast_name,
        setUsername
    }
}

