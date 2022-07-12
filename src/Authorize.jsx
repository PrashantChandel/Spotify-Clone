import { useEffect, useState } from "react"


function Authorize(props) {
    const CLIENT_ID = "7e3b596e2dc648e3bfbfe27b3638590b"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let tokenn = window.localStorage.getItem("token")

        // getToken()
        if (!tokenn && hash) {
            tokenn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", tokenn)
        }
        // console.log(token)
        setToken(tokenn)

    }, [])


    const logout = () => {
        setToken("")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("token")
    }

    return (

        <>
            {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to Spotify</a>
                : <button className="btn" onClick={logout}>Logout</button>
            }
        </>

    )

}

export default Authorize;