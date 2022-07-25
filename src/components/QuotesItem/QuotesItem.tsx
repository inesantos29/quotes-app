import { useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CardContent from '@mui/material/CardContent'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

export type Quote = {
	author: string
	en: string
	id: string
}

type Props = {
	quote: Quote
	onUpdate: (quote: Quote) => void
	onDelete: () => void
}

function QuotesItem({ quote, onUpdate, onDelete }: Props) {
	const [id] = useState(quote.id)
	const [author, setAuthor] = useState(quote.author)
	const [text, setText] = useState(quote.en)
	const [editing, setEditing] = useState(false)

	return (
		<Card key={quote.id}>
			<CardContent>
				{editing ? (
					<TextField
						value={author}
						onChange={(event) => {
							setAuthor(event.target.value)
						}}
						label="Author"
						variant="standard"
						fullWidth
						sx={{ marginBottom: '10px' }}
					/>
				) : (
					<Typography gutterBottom variant="h5" component="div">
						{author}
					</Typography>
				)}

				{editing ? (
					<>
						<TextField
							role="quote-text"
							name="quote-text"
							value={text}
							onChange={(event) => {
								setText(event.target.value)
							}}
							label="Quote"
							variant="standard"
							fullWidth
						/>
					</>
				) : (
					<Typography variant="body2" color="text.secondary">
						{text}
					</Typography>
				)}
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
				{editing ? (
					<IconButton
						aria-label="save"
						name="save"
						onClick={() => {
							onUpdate({
								id,
								author,
								en: text,
							})
							setEditing(false)
						}}
					>
						<CheckIcon />
					</IconButton>
				) : (
					<IconButton
						role="button"
						onClick={() => {
							setEditing(true)
						}}
						id="edit-button"
						aria-label="edit"
						sx={{
							float: 'right',
						}}
					>
						<EditIcon />
					</IconButton>
				)}

				{editing ? (
					<IconButton
						onClick={() => {
							setAuthor(quote.author)
							setText(quote.en)
							setEditing(false)
						}}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				) : (
					<IconButton
						name="delete"
						onClick={() => {
							onDelete()
							setEditing(false)
						}}
						aria-label="delete"
						sx={{
							float: 'right',
						}}
					>
						<DeleteIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	)
}

export { QuotesItem }
