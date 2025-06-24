'use client';

import React from 'react';
import { useAppSelector } from '@/lib/redux/hook';
import { Typography, Card } from 'antd';

const { Title, Text } = Typography;

const MePage = () => {
	const user = useAppSelector((state) => state.auth.user);

	debugger
	if (!user) {
		return (
			<Card style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
				<Title level={3}>Bạn chưa đăng nhập</Title>
			</Card>
		);
	}

	return (
		<Card style={{ maxWidth: 600, margin: '100px auto' }}>
			<Title level={2}>Thông tin cá nhân</Title>
			<Text strong>Email:</Text>
			<p>{user.email}</p>
		</Card>
	);
};

export default MePage;
