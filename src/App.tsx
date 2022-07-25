import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QuotesList } from './components/QuotesList/QuotesList'
import './App.css'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<QuotesList />
		</QueryClientProvider>
	)
}
