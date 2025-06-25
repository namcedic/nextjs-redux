"use client";

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hook';
import { Button, notification, Typography } from 'antd'
import Link from 'next/link';
import { logoutRequest } from '@/lib/redux/features/auth/slice';
import { useRouter } from 'next/navigation';

const { Text } = Typography;

export const AppHeader = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logoutRequest());
		router.push('/login');
		notification.success({ message: 'Logout successful!' });
	};

	return (
		<header style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0 24px',
			background: '#fff',
			borderBottom: '1px solid #f0f0f0',
			height: '64px'
		}}>
			<Link href="/" passHref>
				<Text strong style={{ fontSize: '20px', cursor: 'pointer' }}>Cedric App</Text>
			</Link>
			<div>
				{isAuthenticated && user ? (
					<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
						<Text>Welcome {user.email}!</Text>
						<Button type="primary" onClick={handleLogout}>Logout</Button>
					</div>
				) : (
					<><Link href="/login" passHref>
						<Button type="primary" className="primary">Login</Button>
					</Link><Link href="/register" passHref>
						<Button type="link">Register</Button>
					</Link></>
				)}
			</div>
		</header>
	);
};