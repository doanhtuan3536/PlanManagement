import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, Fragment } from 'react';

import DefaultLayout from './layouts/DefaultLayout';
import Loading from './pages/Loading';
import { publicRoutes } from './routes';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <div classNae="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = route.layout;
                            const Page = route.Component;
                            if (Layout === null) {
                                Layout = Fragment;
                            } else {
                                Layout = DefaultLayout;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Suspense fallback={<Loading />}>
                                                <Page />
                                            </Suspense>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route
                            path="*"
                            element={
                                <DefaultLayout>
                                    <NotFoundPage />
                                </DefaultLayout>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
