import 'antd/dist/reset.css';
import AppRouter from './components/app-router/AppRouter';
import './App.css'
import { useSelector } from 'react-redux';

function App() {
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className="App">
            <AppRouter isAuth={isAuth}/>
        </div>
    );
}

export default App;
