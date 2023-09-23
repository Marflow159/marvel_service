import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage, ComicsPage, SingleComicPage, SingleCharPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import('../pages/404'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<span>Loading</span>}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/:charId" element={<SingleCharPage/>}/>
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:comicId" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;