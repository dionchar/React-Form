import React, { useState } from 'react';

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
        
            const validUsername = /.{8,20}$/;
            const validPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

            if (!validUsername.test(username)) {
                setError("Invalid Username! Must be between 8 and 20 characters long");
                return;
            }

            if (!validPassword.test(password)) {
                setError("Invalid Password! Must be between 8 and 20 characters long, contain one digit, one letter and one special character");
                return;
            }

            const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: { username },
                        password: { password }
                    })
                });
            const result = await response.json();
            setToken(result.token);
            console.log(result);
            alert("Valid Username and password submitted!")
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Username:{" "}
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPasssword(e.target.value)}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}