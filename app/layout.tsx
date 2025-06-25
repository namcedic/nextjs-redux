"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { AppHeader } from "@/components/Header";
import { useDispatch, useStore } from 'react-redux'
import React, { useEffect } from "react";
import { loadAuthFromCookie, refreshTokenRequest } from "@/lib/redux/features/auth/slice";
import { AppStore } from "@/lib/redux/store";
import { jwtDecode } from 'jwt-decode'
import { DecodePayload, DecodeUser } from '@/types/user'
import "../styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const store = useStore() as AppStore;
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshAccessToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            console.log(accessToken, refreshToken, 'accessToken, refreshToken');
            if (!accessToken || !refreshToken) return;

            try {
                const decoded: DecodePayload = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                   dispatch(
                        refreshTokenRequest({
                                payload: { refreshToken },
                            cb: (data) => {
                                if (data.accessToken) {
                                    localStorage.setItem("accessToken", data.accessToken);
                                    if (data.refreshToken) {
                                        localStorage.setItem("refreshToken", data.refreshToken);
                                    }
                                    console.log("data", data);
                                    const newDecoded: DecodeUser = jwtDecode(data.accessToken);
                                    const user = {
                                        id: newDecoded.sub,
                                        email: newDecoded.email,
                                    };
                                    store.dispatch(loadAuthFromCookie({
                                        user,
                                        accessToken: data.accessToken,
                                        refreshToken: data.refreshToken || refreshToken,
                                    }));
                                } else {
                                    console.error("Refresh token failed, logging out");
                                    localStorage.removeItem("accessToken");
                                    // localStorage.removeItem("refreshToken");
                                    // window.location.href = "/login";
                                }
                            }
                        })
                   )
                } else {
                    const user = {
                        id: decoded.sub,
                        email: decoded.email,
                    };
                    store.dispatch(loadAuthFromCookie({ user, accessToken, refreshToken }));
                }
            } catch (e) {
                console.error("Auth error:", e);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        };

        void refreshAccessToken();
    }, [store]);

    return <>{children}</>;
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>
                <AuthLoader>
                    <AppHeader />
                    <main>{children}</main>
                </AuthLoader>
        </StoreProvider>
        </body>
        </html>
    );
}