import React from "react";
import { useState } from "react";

export default function Authenticate({ token, setToken }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    async function handleClick() {
    
         if (!token) {
            setError("Submit a valid username and password. No Token exists!");
            console.log(error);
            return;
        }
        try {
            const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/authenticate`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            const result = await response.json();
            setSuccessMessage(result.message);
            setData(result.data.username.username)
            console.log(result);
            console.log(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } 
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{`${successMessage}`}</p>}
            {data &&<p>Username: {data}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    )
}