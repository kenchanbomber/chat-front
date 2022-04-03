import { useRef, useState } from "react";

function SignUpForm() {
    const [error, setError] = useState("");
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmationInputRef = useRef();

    async function buttonSubmitHandler(e) {
        e.preventDefault();
        const nameValue = nameInputRef.current.value;
        const emailValue = emailInputRef.current.value;
        const passwordValue = passwordInputRef.current.value;
        const passwordConfirmationValue =
            passwordConfirmationInputRef.current.value;

        // send request...
        let res;
        try {
            // send request...
            res = await fetch("http://localhost:3001/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: nameValue,
                    email: emailValue,
                    password: passwordValue,
                    password_confirmation: passwordConfirmationValue,
                }),
            });
            if (!res) {
                throw new Error("リクエストの送信に失敗しました。");
            }
            if (!res.ok) {
                throw new Error("正しい値を入力してください。");
            }
            setError("");
        } catch (e) {
            const errorMessage = e.message;
            setError(errorMessage);
            console.log(errorMessage);
        }

        const data = await res.json();
        console.log(data);
    }
    return (
        <div>
            <h2>アカウントを登録</h2>
            <form onSubmit={buttonSubmitHandler}>
                <input
                    type="text"
                    required
                    placeholder="名前"
                    ref={nameInputRef}
                />
                <input
                    type="email"
                    required
                    placeholder="メールアドレス"
                    ref={emailInputRef}
                />
                <input
                    type="password"
                    required
                    placeholder="パスワード"
                    ref={passwordInputRef}
                />
                <input
                    required
                    type="password"
                    placeholder="パスワード（確認用）"
                    ref={passwordConfirmationInputRef}
                />
                {error.length === 0 || <div className="error">{error}</div>}
                <button>登録する</button>
            </form>
        </div>
    );
}

export default SignUpForm;
