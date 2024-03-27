import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../features/auth/context/AuthContext'
import Login from '../features/auth/components/Login'
import Signup from '../features/auth/components/Signup'
import Budget from '../features/budget/components/Budget'
import Test from '../features/auth/components/test'

type Props = {}

const PrivateRoutes = () => {
  const { authTokens } = useContext(AuthContext)

  if(!authTokens) return <Navigate to='/login' replace />

  return <Outlet />
}

const Routes = (_: Props) => {
    return (
        <Router>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/test' element={<Test/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path='/budget' element={<Budget/>}/>
            </Route>
        </Router>
    )
}

export default Routes