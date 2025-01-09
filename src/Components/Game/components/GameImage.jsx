import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function GameImage({ image }) {
    return (
       

            <LazyLoadImage

                alt="game image"
                effect="opacity"
                wrapperProps={{

                    style: { transitionDelay: "0.5s"}
                }}
                style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                }}
                src={image}
                loading="lazy"
            />
        


    )
}