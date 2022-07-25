import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Grid, Skeleton } from '@mui/material'
import { Quote, QuotesItem } from '../QuotesItem/QuotesItem'

function QuotesList() {
	const [data, setData] = useState<Quote[]>([])

	const { isLoading, data: responseData } = useQuery<Quote[]>(
		['repoData'],
		() =>
			fetch(
				'https://programming-quotes-api.herokuapp.com/Quotes?count=50'
			).then((res) => res.json())
	)

	useEffect(() => {
		if (responseData != null) {
			setData([...responseData])
		}
	}, [responseData])

	const onUpdate = useCallback(
		(quote: Quote, index: number) => {
			data[index] = { ...quote }
			setData([...data])
		},
		[data]
	)

	const onDelete = useCallback(
		(index: number) => {
			setData(data.filter((_, i) => i !== index))
		},
		[data]
	)

	const renderedData = useMemo(
		() =>
			data.map((quote: Quote, index) => (
				<Grid item xs={12} sm={12} md={7} key={quote.id}>
					<QuotesItem
						quote={quote}
						onUpdate={(quote) => {
							onUpdate(quote, index)
						}}
						onDelete={() => {
							onDelete(index)
						}}
					></QuotesItem>
				</Grid>
			)),
		[data, onUpdate, onDelete]
	)

	const skeletonLoading = useMemo(
		() =>
			[1, 2, 3, 4].map((_, index) => (
				<Grid item xs={12} sm={12} md={7} key={index}>
					<Skeleton variant="rectangular" width="100%" height="100px" />
				</Grid>
			)),
		[]
	)

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			rowGap={2}
			padding={2}
		>
			{isLoading ? skeletonLoading : renderedData}
		</Grid>
	)
}

export { QuotesList }
