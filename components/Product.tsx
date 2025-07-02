'use client'

import React, { useEffect, useState } from 'react'
import { Pagination, List, Card, notification, GetProps, Input } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/hook'
import { productsRequest } from '@/lib/redux/features/product/slice'
import Search from 'antd/lib/input/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

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

	const onSearch = (value: string) => {
		dispatch(
			productsRequest({
				page,
				limit: PAGE_SIZE,
				key: value,
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
	}

	return (
		<>
			<div className='search-bar'>
				<select className='domain-select'>
					<option value='1688'>1688.com</option>
					<option value='taobao'>Taobao.com</option>
				</select>
				<input
					className='search-input'
					type='text'
					placeholder='Nhập từ khóa hoặc link sản phẩm trên Taobao/Tmall/1688'
				/>
				<button className='search-button'>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>

			<div className='product-search'>
				<Search placeholder='input search text' onSearch={onSearch} />{' '}
			</div>

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
		</>
	)
}

export default ProductPage
