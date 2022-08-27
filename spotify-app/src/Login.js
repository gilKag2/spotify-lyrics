import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?" +
    "client_id=0d7c87c65ee1487eb1299d394eef32f8&response_type=code&redirect_uri=http://localhost:3000&" +
    "scope=streaming%20user-read-email%20user-read-private%20user-library-read%20" +
    "user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <a href={AUTH_URL} className="btn btn-success btn-lg">Login With Spotify</a>
        </Container>
    );

}
