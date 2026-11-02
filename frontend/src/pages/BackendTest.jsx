
import { useEffect, useState } from "react";
import API from "../services/api";

function BackendTest() {
    const [message, setMessage] = useState("Connecting...");
    const [error, setError] = useState("");

    useEffect(() => {
        API.get("/health")
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch(() => {
                setError("Could not connect to the backend.");
            });
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h1>Backend Connection Test</h1>

            {error ? (
                <p>{error}</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}

export default BackendTest;
