import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

const ScreenshotModal = ({ gameId, gameName, show, onClose }) => {
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            fetchScreenshots();
        }
    }, [show]);

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

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header>
                <div data-bs-theme="dark">
                    <button 
                    type="button" 
                    className="btn-close" 
                    aria-label="Close"
                    onClick={onClose}
                    ></button>
                </div>
                <Modal.Title className="ms-5 ">Screenshots di {gameName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Caricamento degli screenshot...</p>
                ) : screenshots.length > 0 ? (
                    <Carousel>
                        {screenshots.map((screenshot) => (
                            <Carousel.Item key={screenshot.id}>
                                <img
                                    src={screenshot.image}
                                    alt={`Screenshot ${screenshot.id}`}
                                    className="d-block w-100"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p>Nessuno screenshot disponibile.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ScreenshotModal;
