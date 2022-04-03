function removeAuthData() {
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("client");
    window.localStorage.removeItem("access-token");
    return;
}

export default removeAuthData;
