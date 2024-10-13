/* eslint-disable react/prop-types */
import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

const Form = ({route, method}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"; //"===" is strict equality, checks if the value and type are the same

    const handleSubmit = async (e) => { //Async: Declares an asynchronous function that returns a promise
        setLoading(true);
        e.preventDefault(); //prevents from submitting form, won't refresh the page

        try { 
            const res = await api.post(route, {username, password}) //Await: Pauses the execution of the function until the promise is resolved
            if (method === "login") { //If method was login, will retrieve and set the access & refresh tokens
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/") //After login, redirects to home page
            }
            else {
                navigate("/login") //If method was register, redirects to login page
            }
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} //Calls setUsername with the value of the input, .target refers to the DOM element that triggered the event
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} //Calls setUsername with the value of the input, .target refers to the DOM element that triggered the event
                placeholder="Password"
            />
            {loading && <LoadingIndicator/>} {/* If loading is true, will display the loading indicator, this is called conditional rendering */}
            <button className="form-button" type="submit" >
                {name}
            </button>
        </form>
    );
}

export default Form