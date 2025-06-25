"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { AppHeader } from "@/components/Header";
import { useStore } from 'react-redux'
import React, { useEffect } from "react";
import { loadAuthFromCookie } from "@/lib/redux/features/auth/slice";
import { AppStore } from "@/lib/redux/store";
import { jwtDecode } from 'jwt-decode'
import { DecodeUser } from '@/types/user'
import "../styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const store = useStore() as AppStore;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            try {
                const decodedUser: DecodeUser = jwtDecode(accessToken);
                const user = {
                    id: decodedUser.sub,
                    email: decodedUser.email,
                }
                store.dispatch(loadAuthFromCookie({ user, accessToken, refreshToken }));
            } catch (e) {
                console.error("Failed to parse user from cookie", e);
            }
        }
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