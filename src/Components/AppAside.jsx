import { useLoaderData, Link } from "react-router"

export default function AppAside() {
    const { genres, platforms } = useLoaderData();

    return (
        <aside>

         
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h5 className="bg-newblack txtW ps-3 pt-3 underBlue">Browse by:</h5>
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Genres
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            {genres.map((genre) => (
                                <li key={genre.id} className="genreSide d-flex ms-1 mt-2 mb-2" >
                                    <img src={genre.image_background} alt="" className="genrePic me-2" />
                                    <Link className="genreLink mt-1 mb-2" to={`/games/${genre.slug}`}>{genre.name}</Link>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Platforms
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            {platforms.map((platform) => (
                                <li key={platform.id} className="genreSide d-flex ms-1 mt-2 mb-2">
                                    <img src={platform.image_background} alt="" className="genrePic me-2" />
                                    <Link className="genreLink mt-1 mb-2" to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                                </li>
                            ))}                            </div>
                    </div>
                </div>

            </div>

        </aside>
    )
}