function storeAuthData(headers, data) {
    const name = data.data.name;
    const uid = headers.get("uid");
    const client = headers.get("client");
    const accessToken = headers.get("access-token");

    // store data
    window.localStorage.setItem("uid", uid);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("client", client);
    window.localStorage.setItem("access-token", accessToken);
}

export default storeAuthData;
