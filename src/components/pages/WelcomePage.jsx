import { useState } from "react";

import classes from "./Welcome.module.css";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";

function WelcomePage() {
    const [isFirstTime, setIsFirstTime] = useState(true);

    function changeFromHandler(event) {
        setIsFirstTime((state) => !state);
    }

    return (
        <div className={classes.welcome + " container"}>
            <p>ようこそ！</p>
            {isFirstTime ? <SignUpForm /> : <LoginForm />}

            <p className={classes["change-form"]}>
                {isFirstTime ? (
                    <>
                        アカウントをお持ちの方は
                        <span onClick={changeFromHandler}>こちら</span>
                        をクリック
                    </>
                ) : (
                    <>
                        初めての方は
                        <span onClick={changeFromHandler}>こちら</span>
                        をクリック
                    </>
                )}
            </p>
        </div>
    );
}

export default WelcomePage;
