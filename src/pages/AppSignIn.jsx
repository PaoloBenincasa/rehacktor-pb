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
                toast.error('Accesso non riuscito');
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
                <div className="d-flex flex-column w-25 text-center">
                    <h1>Accedi</h1>
                    <form onSubmit={handleSignIn} className="d-flex flex-column">
                        <label htmlFor="email">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="inserisci la tua email" />
                        </label>
                        <label htmlFor="password">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="inserisci la tua password" />
                        </label>
                        <button type="submit">
                            Accedi
                        </button>
                        <Toaster richColors />
                    </form>
                </div>

            </div> */}

            <div className="d-flex justify-content-center mt-5">
                <div className="d-flex flex-column w-25 text-center bg-newblack p-3 rounded shadow-lg">
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
                        {/* <label htmlFor="confirm_password">
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="conferma la tua password" />
                        </label> */}
                        <button type="submit" className="mt-4 w-50 mb-3 btn btn-primary">
                            Accedi
                        </button>
                        <p className="bg-newblack">Non hai ancora un account? <Link to={`/signup`} className="bg-newblack">registrati</Link> </p>
                        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div className="toast-body">
                                Error signin in!
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AppSignIn;