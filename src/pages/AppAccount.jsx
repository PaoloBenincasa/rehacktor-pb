import { useEffect, useContext, useState } from 'react'
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import Avatar from '../Components/AvatarUI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppAccount() {
    const session = useContext(SessionContext)
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirst_name] = useState(null);
    const [last_name, setLast_name] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name, avatar_url`)
                .eq("id", user.id)
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

    async function updateProfile(event, avatarUrl) {
        event.preventDefault()

        setLoading(true)
        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from("profiles").upsert(updates)

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('user updated!')
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }

    return (
        <div className="container mt-5 mb-2">
            <div className="row mt-3  align-items-center justify-content-center">
                <div className="bg-newblack ">
                    <form onSubmit={updateProfile} className="p-3 bg-newblack">
                        <div className='row bg-newblack'>
                            <div className=' col-md-6 '>
                                <h1 className="bg-newblack mt-2">Update profile</h1>
                                <div className='d-flex flex-column'>
                                    <Avatar
                                        url={avatar_url}
                                        size={150}
                                        onUpload={(event, url) => {
                                            updateProfile(event, url);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='col-md-6 mt-3 bg-blackk rounded pt-4'>
                                <div className='mb-3 bg-newblack d-flex flex-column '>
                                    <label htmlFor="email" className='bg-newblack me-2 ms-1'>Email</label>
                                    <input id="email" type="text" value={session.user.email} disabled />
                                </div>
                                <div className='mb-3 bg-newblack d-flex flex-column '>
                                    <label htmlFor="username" className='bg-newblack me-2 ms-1'>Name</label>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        value={username || ''}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3 bg-newblack d-flex flex-column '>
                                    <label htmlFor="first_name" className='bg-newblack me-2 ms-1'>First name</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={first_name || ''}
                                        onChange={(e) => setFirst_name(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3 bg-newblack d-flex flex-column '>
                                    <label htmlFor="last_name" className='bg-newblack me-2 ms-1'>Last name</label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={last_name || ''}
                                        onChange={(e) => setLast_name(e.target.value)}
                                        
                                    />
                                </div>
                                <div className='d-flex justify-content-center p-1 m-2 gap-3 bg-blackk'>
                                    <button className="btn btn-primary mb-3 rounded" type="submit" disabled={loading}>
                                        {loading ? 'Loading ...' : 'Update'}
                                    </button>
                                    <button className="btn btn-danger mb-3 rounded" type="button" onClick={() => supabase.auth.signOut()}>
                                        Sign Out
                                    </button>

                                </div>
                                <ToastContainer position="bottom-right"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick={true}
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

