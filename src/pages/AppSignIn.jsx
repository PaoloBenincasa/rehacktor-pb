import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";


function AppSignIn() {
    const navigate = useNavigate();
    const handleSignIn = async (event) =>{
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
                await new Promise((resolve)=> setTimeout(resolve, 2000));
                
                formLogin.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }

    }
    return (
        <>
            <div className="d-flex justify-content-center mt-5">
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

            </div>
        </>
    )
}

export default AppSignIn;