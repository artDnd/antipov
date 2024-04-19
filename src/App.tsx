import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './components/hooks/isAuth'
import { LoginPage } from './pages/Auth/LoginPage'
import { RegisterPage } from './pages/Auth/RegisterPage'
import { HomePage } from './pages/Home/HomePage'
import { PersonPage } from './pages/Person/PersonPage'

function App() {
	const { isAuth } = useAuth()
	console.log(isAuth)
	return (
		<Routes>
			{isAuth ? (
				<>
					<Route path='/' element={<HomePage />} />
					<Route path='/person/:id' element={<PersonPage />} />
				</>
			) : (
				<>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/' element={<RegisterPage />} />
				</>
			)}
			<Route path='*' element={<Navigate to={'/'} />} />
		</Routes>
	)
}

export default App
