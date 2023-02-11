import "antd/dist/reset.css";
import AppRouter from "./components/app-router/AppRouter";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setToken } from "./api/ApiUtils";

function App() {
    const isAuth = Boolean(useSelector((state) => state.token));
    const currentUser = useSelector((state) =>
        state.user ? state.user._id : null
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setToken(isAuth);
    }, [isAuth]);

    return (
        <div className="App">
            <AppRouter
                isAuth={isAuth}
                currentUser={currentUser}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    );
}

export default App;
