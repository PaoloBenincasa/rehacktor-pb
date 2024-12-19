import useProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";


export default function AppProfile() {
    
    const { first_name, last_name, username, avatar_url} = useProfile(); 

    return (
        <div>
            <article>
                <header>
                    <h1>ciao {first_name} </h1>
                </header>
                <div className="user_card">
                    <section className="user_data m-2">
                        <img src={avatar_url && getAvatarUrl(avatar_url)} alt={'image profile'} className="h-50 w-50"></img>
                        <h4>{username}</h4>
                        <p>{first_name} {last_name}</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, ipsam enim quis alias, quia exercitationem odio repudiandae voluptas nam aliquam repellendus totam eius explicabo nisi numquam ratione vero reiciendis delectus.</p>
                    </section>
                    <section className="user_info m-2">
                        
                        <details>
                            <summary role="button" className="secondary">Preferiti</summary>
                            <p>...</p>
                        </details>

                        
                        <details>
                            <summary role="button" className="contrast">Recensioni fatte</summary>
                            <p>...</p>
                        </details>
                    </section>
                </div>
            </article>
        </div>
    )
}