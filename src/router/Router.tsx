import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import MainLayout from "../pages/Main/MainLayout"
import LoginLayout from "../pages/Login/LoginLayout"
import Main from "../pages/Main"
import Grid from "../pages/Grid"
import Login from "../pages/Login"
import Signup from "../pages/Login/singup"
import Profile from "../pages/Profile"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    element: <LoginLayout />,
                    children: [
                        {
                            path: "login",
                            element: <Login />,
                        },
                        {
                            path: "signup",
                            element: <Signup />,
                        },
                    ]
                },
                {
                    element: <MainLayout />,
                    children: [
                        {
                            index: true,
                            element: <Main />,
                        },
                        {
                            path: "grid",
                            element: <Grid />,
                        },
                        {
                            path: "profile",
                            element: <Profile />,
                        }
                    ],
                },
            ],
        },
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
        }, // react router dom v6에서 생기는 브라우저 경고창해결을 위한 코드
    },
) // 라우팅 관리를 위한 코드 설정
