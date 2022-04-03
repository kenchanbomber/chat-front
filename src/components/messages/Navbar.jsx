import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Navbar.module.css";
import removeAuthData from "../../utils/removeAuthData";

function Navbar() {
    const [hasError, setHasError] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const uid = window.localStorage.getItem("uid");
        const name = window.localStorage.getItem("name");
        setUserInfo([uid, name]);
    }, []);

    async function logoutButtonHandler() {
        try {
            const res = await fetch("http://localhost:3001/auth/sign_out", {
                method: "DELETE",
                headers: {
                    uid: window.localStorage.getItem("uid"),
                    client: window.localStorage.getItem("client"),
                    "access-token": window.localStorage.getItem("access-token"),
                },
            });

            if (!res.ok) {
                throw new Error("ログアウトに失敗しました。");
            }

            setHasError(false);
            removeAuthData();
            navigate("/");
        } catch (e) {
            setHasError(true);
        }
    }

    return (
        <nav className={classes.nav}>
            <div>
                <p>こんにちは、{userInfo[1]}さん</p>
                <p className={classes.email}>{userInfo[0]}でログイン中</p>
                {hasError && (
                    <div className="error">ログアウトできませんでした。</div>
                )}
            </div>
            <button onClick={logoutButtonHandler}>ログアウト</button>
        </nav>
    );
}

export default Navbar;
