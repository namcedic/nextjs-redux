'use client'

import React, { useEffect, useState } from 'react'
import { Pagination, List, Card, notification } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/hook'
import { productsRequest } from '@/lib/redux/features/product/slice'

const PAGE_SIZE = 10

const ProductPage = () => {
	const [products, setProducts] = useState<any[]>([])
	const [total, setTotal] = useState(0)

	const dispatch = useAppDispatch()
	const searchParams = useSearchParams()
	const router = useRouter()

	const page = parseInt(searchParams.get('page') || '1', 10)

	useEffect(() => {
		dispatch(
			productsRequest({
				page,
				limit: PAGE_SIZE,
				key: '',
				cb: (res) => {
					if (res.products) {
						setProducts(res.products)
						setTotal(res.total || 0)
					} else {
						notification.error({ message: res.error || 'Get products failed' })
					}
				}
			})
		)
	}, [page, dispatch])

	const onChangePage = (pageNumber: number) => {
		router.push(`?page=${pageNumber}`)
	}

	return (
		<div style={{ padding: 24 }}>
			<h2>Danh sách sản phẩm</h2>

			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 4,
					xxl: 4
				}}
				dataSource={products}
				renderItem={(item) => (
					<List.Item>
						<Card title={item.name}>{item.description}</Card>
					</List.Item>
				)}
			/>

			<Pagination
				current={page}
				pageSize={PAGE_SIZE}
				total={total}
				onChange={onChangePage}
				style={{ marginTop: 16, textAlign: 'center' }}
			/>
		</div>
	)
}

export default ProductPage
