import supabase from "../supabase/client";
// import { Toaster, toast } from 'sonner';
import { useNavigate, Link } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            </div>

        </>
    )
}

export default AppSignUp;