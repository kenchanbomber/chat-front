import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import storeAuthData from "../../utils/storeAuthData";

function LoginForm() {
    const [error, setError] = useState("");
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const navigate = useNavigate();

    async function buttonSubmitHandler(e) {
        e.preventDefault();
        const emailValue = inputEmailRef.current.value;
        const passwordValue = inputPasswordRef.current.value;
        try {
            // send request...
            const res = await fetch("http://localhost:3001/auth/sign_in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            if (!res.ok) {
                throw new Error("メールアドレスやパスワードが違います。");
            }

            setError("");
            const data = await res.json();

            storeAuthData(res.headers, data);

            navigate("chatroom");
        } catch (e) {
            const errorMessage = e.message;
            setError(errorMessage);
            console.log(errorMessage);
        }
    }
    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={buttonSubmitHandler}>
                <input
                    type="email"
                    required
                    placeholder="メールアドレス"
                    ref={inputEmailRef}
                />
                <input
                    type="password"
                    required
                    placeholder="パスワード"
                    ref={inputPasswordRef}
                />
                {error.length === 0 || <div className="error">{error}</div>}
                <button>ログインする</button>
            </form>
        </div>
    );
}

export default LoginForm;
