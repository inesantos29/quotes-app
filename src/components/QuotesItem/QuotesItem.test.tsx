import { fireEvent, render, screen } from '@testing-library/react'

import { Quote, QuotesItem } from './QuotesItem'

const exampleQuote: Quote = {
	id: 'id',
	author: 'Inês Catana',
	en: 'Hello, my name is Inês.',
}

describe('QuotesItem', () => {
	it('should render the component correctly', () => {
		render(
			<QuotesItem
				quote={exampleQuote}
				onUpdate={(_) => {}}
				onDelete={() => {}}
			/>
		)
		const authorText = screen.getByText(/Catana/i)
		expect(authorText).toBeInTheDocument()
		const quoteText = screen.getByText(/my name/i)
		expect(quoteText).toBeInTheDocument()
	})

	it('should call onUpdate prop', () => {
		const onUpdateSpy = jest.fn()
		render(
			<QuotesItem
				quote={exampleQuote}
				onUpdate={onUpdateSpy}
				onDelete={() => {}}
			/>
		)
		const editButton = screen.getByRole('button', { name: /edit/i })
		fireEvent.click(editButton)
		const saveButton = screen.getByRole('button', { name: /save/i })
		fireEvent.click(saveButton)

		expect(onUpdateSpy).toHaveBeenCalled()
	})

	it('should call onDelete prop', () => {
		const onDeleteSpy = jest.fn()
		render(
			<QuotesItem
				quote={exampleQuote}
				onUpdate={() => {}}
				onDelete={onDeleteSpy}
			/>
		)
		const deleteButton = screen.getByRole('button', { name: /delete/i })
		fireEvent.click(deleteButton)

		expect(onDeleteSpy).toHaveBeenCalled()
	})

	it('should update text', () => {
		render(
			<QuotesItem
				quote={exampleQuote}
				onUpdate={() => {}}
				onDelete={() => {}}
			/>
		)
		const editButton = screen.getByRole('button', { name: /edit/i })
		fireEvent.click(editButton)

		let quoteTextInput = screen.getByRole('textbox', { name: /quote/i })

		expect(quoteTextInput).toHaveValue(exampleQuote.en)
		fireEvent.click(quoteTextInput)
		fireEvent.change(quoteTextInput, { target: { value: 'test' } })

		expect(quoteTextInput).toHaveValue('test')
	})

	it('should cancel and restore text', () => {
		render(
			<QuotesItem
				quote={exampleQuote}
				onUpdate={() => {}}
				onDelete={() => {}}
			/>
		)

		const editButton = screen.getByRole('button', { name: /edit/i })
		fireEvent.click(editButton)

		let quoteTextInput = screen.getByRole('textbox', { name: /quote/i })

		expect(quoteTextInput).toHaveValue(exampleQuote.en)
		fireEvent.click(quoteTextInput)
		fireEvent.change(quoteTextInput, { target: { value: 'hello' } })

		const cancelButton = screen.getByRole('button', { name: /close/i })
		fireEvent.click(cancelButton)

		fireEvent.click(editButton)

		quoteTextInput = screen.getByRole('textbox', { name: /quote/i })

		expect(quoteTextInput).toHaveValue(exampleQuote.en)
	})
})
