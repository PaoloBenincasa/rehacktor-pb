import supabase from "../supabase/client";
import { Toaster, toast } from 'sonner';
import { useNavigate, Link } from "react-router";

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
                await new Promise((resolve) => setTimeout(resolve, 2000));

                formRegister.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }


    };
    return (
        <>
            {/* <div className="d-flex justify-content-center mt-5">
                <div className="d-flex flex-column w-25 text-center bg-newblack p-3 rounded">
                    <h1 className="bg-newblack mt-2">Registrati</h1>
                    <form onSubmit={handleSubmission} className="d-flex flex-column align-items-center bg-newblack">
                        <label htmlFor="username" className="bg-newblack">Nome utente</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="inserisci il tuo username"
                            className="h-75 w-75 mt-2" 
                            autoComplete="username"
                        />
                        <label htmlFor="first_name" className="bg-newblack mt-2" >Nome</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="inserisci il tuo nome"
                            className="h-75 w-75 mt-2" 
                            autoComplete="off"

                        />
                        <label htmlFor="last_name" className="bg-newblack mt-2">Cognome</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="inserisci il tuo cognome"
                            className="h-75 w-75 mt-2" 
                            autoComplete="off"

                        />
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
                            Registrati
                        </button>
                        <p className="bg-newblack">Hai già un account? <Link to={`/signin`} className="bg-newblack">accedi</Link> </p>

                        <Toaster richColors />
                    </form>
                </div>

            </div> */}

            <div className="container">
                <div className="row mt-2 mb-2 align-items-center justify-content-center">
                    <div className="col-md-6 bg-newblack rounded shadow">
                        <h1 className="bg-newblack mt-2">Register</h1>
                        <form onSubmit={handleSubmission} className="p-3 bg-newblack">
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="username" className="form-label bg-newblack">Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" name="username" />
                            </div>
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="first_name" className="form-label bg-newblack">First Name</label>
                                <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" name="first_name" />
                            </div>
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="last_name" className="form-label bg-newblack">Last Name</label>
                                <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp" name="last_name" />
                            </div>
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="email" className="form-label bg-newblack">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" />
                            </div>
                            <div className="mb-3 bg-newblack">
                                <label HTMLfor="password" className="form-label bg-newblack">Password</label>
                                <input type="password" className="form-control" id="password" name="password" />
                            </div>

                            <button type="submit" className="btn btn-primary mb-3 mt-1">Submit</button>
                            <p className="bg-newblack">Hai già un account? <Link to={`/signin`} className="bg-newblack">accedi</Link> </p>

                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AppSignUp;