import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import { useNavigate, Link } from "react-router";


function AppSignIn() {
    const navigate = useNavigate();
    const handleSignIn = async (event) => {
        event.preventDefault();
        const formLogin = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formLogin));
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                toast.error('Accesso non riuscito')
            } else {
                toast.success('Accesso avvenuto correttamente!')
                await new Promise((resolve) => setTimeout(resolve, 2000));

                formLogin.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }

    }
    return (
        <>
          
            <div className="container">
                <div className="row mt-5 align-items-center justify-content-center">
                    <div className="col-md-6 bg-newblack rounded shadow">
                        <h1 className="bg-newblack mt-2">Login</h1>
                        <form onSubmit={handleSignIn} className="p-3 bg-newblack">
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="email" className="form-label bg-newblack">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" />
                            </div>
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="password" className="form-label bg-newblack">Password</label>
                                <input type="password" className="form-control" id="password" name="password" />
                            </div>

                            <button type="submit" className="btn btn-primary mb-3 mt-1">Submit</button>
                            <p className="bg-newblack">Non hai ancora un account? <Link to={`/signup`} className="bg-newblack">registrati</Link> </p>

                        </form>
                        <Toaster richColors />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AppSignIn;