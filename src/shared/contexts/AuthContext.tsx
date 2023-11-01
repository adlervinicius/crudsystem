import { createContext, useCallback, useMemo, useState, useEffect, useContext} from 'react';

import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContexData {
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContexData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {

    const [iaccessToken, setIAccessToken] = useState<string>();
    console.log(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (accessToken) {
            setIAccessToken(JSON.parse(accessToken));
        } else {
            setIAccessToken(undefined);
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);

        if(result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
            setIAccessToken(result.accessToken);
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setIAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => iaccessToken !== undefined, [iaccessToken]);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);