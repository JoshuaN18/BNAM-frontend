import { createContext, useState, ReactNode, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate, register, refreshToken  } from '../api/AuthApi'
import { jwtDecode } from 'jwt-decode'

type Props = {
    children?: ReactNode;
}

type User = {
    user_id: string;
    username: string;
}

type AuthTokens = {
    access: string;
    refresh: string;
}

type IAuthContext = {
    user: User | null;
    authTokens: AuthTokens | null;
    loginUser: (e: React.FormEvent<HTMLFormElement>) => void;
    registerUser: (e: React.FormEvent<HTMLFormElement>) => void;
    logoutUser: () => void;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    authTokens: null,
    loginUser: () => {},
    registerUser: () => {},
    logoutUser: () => {},
});

const AuthProvider = ({children}: Props) => {
    const [ authTokens, setAuthTokens ] = useState<AuthTokens | null>(null);
    const [ user, setUser ] = useState(null)

    const navigate = useNavigate()

    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        console.log({
            username: data.get("username"),
            password: data.get("password"),
            confirm_password: data.get("confirm_password"),
            email: data.get("email"),
        });
        register(data).then((response) =>{
            if (response.status === 202){
                authenticateUser(data)
            }
            else{
                console.log(response.status)
            }
        })
    }

    const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        console.log({
            username: data.get("username"),
            password: data.get("password"),
        });
        authenticateUser(data)
    }

    const authenticateUser = (data: FormData) => {
        authenticate(data).then((response) =>{
            if (response.status === 200){
                const tokens: AuthTokens = {
                    access: response.data.access,
                    refresh: response.data.refresh,
                };
                setAuthTokens(tokens);
                setUser(jwtDecode(response.data.access))

                navigate('/budget');
            }
            else{
                console.log(response.status)
            }
        })
    }

    const logoutUser= () => {
        setUser(null)
        setAuthTokens(null)
        navigate('/login');
    }

    const updateToken = () => {
        if (authTokens === null) {
            logoutUser()
            return
        }
        refreshToken(authTokens.refresh).then((response) => {
            if (response.status === 200) {
                console.log('refreshed')
                localStorage.setItem('access token', response.data.access)
                const tokens: AuthTokens = {
                    access: response.data.access,
                    refresh: authTokens.refresh,
                };
                setAuthTokens(tokens);
                setUser(jwtDecode(response.data.access))
            } else {
                logoutUser()
            }
        }) 
    }

    const contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    const contextValue = useMemo<IAuthContext>(() => ({
        user,
        authTokens,
        loginUser,
        logoutUser,
        registerUser,
    }), [user, authTokens, loginUser, registerUser, logoutUser]);

    useEffect(() => {

        const fourteenMinutes = 1000 * 60 * 9
        const interval = setInterval(()=> {
            if(authTokens) {
                updateToken()
            }
        }, fourteenMinutes)
        return () => clearInterval(interval)

    }, [authTokens])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }