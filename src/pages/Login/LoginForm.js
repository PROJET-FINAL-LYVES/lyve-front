import { Link } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Query the MongoDB database with the username and password
        axios
            .get("/user", { username, password })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (

        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />

        </form>
    );
}

export default LoginForm;