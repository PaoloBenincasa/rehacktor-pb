import supabase from "../supabase/client";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router";

function AppSignUp() {
    const navigate = useNavigate();
    const handleSubmission = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password, username, first_name, last_name } = Object.fromEntries(new FormData(formRegister));
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        first_name,
                        last_name,
                    },
                },
            })
            if (error) {
                toast.error('Registrazione non riuscita')

            } else {
                toast.success('Registrazione avvenuta correttamente!')
                await new Promise((resolve)=> setTimeout(resolve, 2000));
                
                formRegister.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }


    };
    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <div className="d-flex flex-column w-25 text-center">
                    <h1>Registrati</h1>
                    <form onSubmit={handleSubmission} className="d-flex flex-column">
                        <label htmlFor="username">Nome utente</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="inserisci il tuo username"
                            className="h-75"
                            autoComplete="username"
                        />
                        <label htmlFor="first_name">Nome</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="inserisci il tuo nome"
                            className="h-75"
                            autoComplete="off"

                        />
                        <label htmlFor="last_name">Cognome</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="inserisci il tuo cognome"
                            className="h-75"
                            autoComplete="off"

                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="inserisci la tua email"
                            className="h-75"
                            autoComplete="email"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="inserisci la tua password"
                            className="h-75"
                            autoComplete="password"
                        />
                        {/* <label htmlFor="confirm_password">
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="conferma la tua password" />
                        </label> */}
                        <button type="submit" >
                            Registrati
                        </button>
                        <Toaster richColors />
                    </form>
                </div>

            </div>
        </>
    )
}

export default AppSignUp;