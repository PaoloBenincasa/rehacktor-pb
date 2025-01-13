import { useEffect, useState } from "react";
import { Link } from "react-router";

const Screenshots = ({ gameId, gameName }) => {
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);

   
    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}games/${gameId}/screenshots?key=${import.meta.env.VITE_API_KEY}`
                );
                const data = await response.json();
                setScreenshots(data.results || []);
            } catch (error) {
                console.error("Error fetching screenshots:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchScreenshots()
    }, [gameId])

    return (
        <>
            {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="row">
                    <div className="p-1">
                        <img
                            src={screenshot.image}
                            alt={`Screenshot ${screenshot.id}`}
                            className="d-block w-100  "
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedScreenshot(screenshot.image)}
                        />
                    </div>
                </div>
            ))}

            {selectedScreenshot && (
                <div className="modal-overlay" onClick={() => setSelectedScreenshot(null)}>
                    <div className="modal-content">
                        <img
                            src={selectedScreenshot}
                            alt="Selected Screenshot"
                            className="d-block w-100"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Screenshots;