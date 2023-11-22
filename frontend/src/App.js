import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import {Header} from "./components/header";
import {MainPage} from "./pages/MainPage";
import {TopicsPage} from "./pages/TopicsPage";
import {TopicPage} from "./pages/TopicPage";
import {AuthPage} from "./pages/AuthPage";
import {AccountPage} from "./pages/AccountPage";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {checkSession} from "./store/actions/auth";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(checkSession());
        }, 600000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
            <BrowserRouter>
               <Header/>
                <div className="mainDiv">
                <Routes>
                    <Route path='/' index element={<MainPage />}/>
                    <Route path="/auth/:action/:login?" element={<AuthPage />} />
                    <Route path='topics' element={<TopicsPage />}/>
                    <Route path='account' element={<AccountPage />}/>
                    <Route path='topic/:id' element={<TopicPage />}/>
                </Routes>
                </div>
            </BrowserRouter>

    );
}

export default App;