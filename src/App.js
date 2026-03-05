import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, Fragment } from 'react';

import DefaultLayout from './layouts/DefaultLayout';
import Loading from './pages/Loading';
import { privateRoutes, publicRoutes } from './routes';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { NotificationProvider } from './context/NotificationContext';

function App() {
    function RenderChildRoute(insideChildren) {
        return insideChildren.map((route, index) => {
            const Page = route.Component;
            if (route.insideRoute && Object.keys(route.insideRoute).length != 0) {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Page />
                            </Suspense>
                        }
                    >
                        {RenderChildRoute(route.insideRoute)}
                    </Route>
                );
            }
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Suspense fallback={<Loading />}>
                            <Page />
                        </Suspense>
                    }
                />
            );
        });
    }
    return (
        <Suspense fallback={<Loading />}>
            <NotificationProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <div className="App">
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    let Layout = route.layout;
                                    const Page = route.Component;
                                    if (Layout === null) {
                                        Layout = Fragment;
                                    } else if(!Layout) {
                                        Layout = DefaultLayout;
                                    }
                                    if (route.insideRoute) {
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
                                            >
                                                {RenderChildRoute(route.insideRoute)}
                                            </Route>
                                        );
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
                                {privateRoutes.map((route, index) => {
                                    let Layout = route.layout;
                                    const Page = route.Component;
                                    if (Layout === null) {
                                        Layout = Fragment;
                                    } else if(!Layout) {
                                        Layout = DefaultLayout;
                                    }
                                    if (route.insideRoute) {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <PrivateRoute>
                                                        <Layout>
                                                            
                                                            <Suspense fallback={<Loading />}>
                                                                <Page />
                                                            </Suspense>
                                                            
                                                        </Layout>
                                                    </PrivateRoute>
                                                }
                                            >
                                                {RenderChildRoute(route.insideRoute)}
                                            </Route>
                                        );
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <PrivateRoute>
                                                    <Layout>
                                                        
                                                            <Suspense fallback={<Loading />}>
                                                                <Page />
                                                            </Suspense>
                                                        
                                                    </Layout>
                                                </PrivateRoute>
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
                        {/* <div>
                            <Routes>
                                <Route path='/projects' element = {<h1>h1h1h1h1h</h1>} />
                                
                            </Routes>
                        </div> */}
                    </BrowserRouter>
                </AuthProvider>
            </NotificationProvider>
        </Suspense>
        // <div>haha</div>
    );
}

export default App;
