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
            {/* <div className="d-flex justify-content-center mt-5">
                <div className="d-flex flex-column signInContainer text-center bg-newblack p-3 rounded shadow-lg">
                    <h1 className="bg-newblack mt-2">Accedi</h1>
                    <form onSubmit={handleSignIn} className="d-flex flex-column align-items-center bg-newblack">
                        
                       
                      
                        <label htmlFor="email" className="bg-newblack mt-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="inserisci la tua email"
                            className="h-75 w-75 mt-2"
                            autoComplete="email"
                        />
                        <label htmlFor="password" className="bg-newblack mt-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="inserisci la tua password"
                            className="h-75 w-75 mt-2"
                            autoComplete="password"
                        />
                      
                        <button type="submit" className="mt-4 w-50 mb-3 btn btn-primary">
                            Accedi
                        </button>
                        <p className="bg-newblack">Non hai ancora un account? <Link to={`/signup`} className="bg-newblack">registrati</Link> </p>
                        <Toaster richColors />
                    </form>
                </div>

            </div> */}
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
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AppSignIn;