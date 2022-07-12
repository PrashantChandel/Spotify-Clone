import { Component, Fragment } from "react";

class Authorizeclass extends Component {
    // constructor(props) {
    //     super(props);
    state = {
        CLIENT_ID: "7e3b596e2dc648e3bfbfe27b3638590b",
        REDIRECT_URI: "http://localhost:3000",
        AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
        RESPONSE_TYPE: "token",
        token: ''
    };
    // }
    componentDidMount = () => {
        const hash = window.location.hash
        let tokenn = window.localStorage.getItem("token")
        // getToken()
        if (!tokenn && hash) {
            tokenn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", tokenn)
        }
        // console.log("Tiken : ", window.localStorage.getItem('token'))
        this.setState({ token: tokenn })

    }
    logout = () => {
        this.setState({ token: "" })
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")

        
    }
    render() {
        return (
            <Fragment>
                {!this.state.token ?
                    <a href={`${this.state.AUTH_ENDPOINT}?client_id=${this.state.CLIENT_ID}&redirect_uri=${this.state.REDIRECT_URI}&response_type=${this.state.RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button className="btn" onClick={this.logout}>Logout</button>
                }
            </Fragment>
        );
    }
}

export default Authorizeclass;