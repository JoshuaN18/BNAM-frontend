import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./features/auth/context/AuthContext"
import Routes from './utils/PrivateRoute'

function App() {
  return(
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  ) 
}

export default App;