import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppRoutes } from './routes';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { Login, MenuLateral } from './shared/components';

export const App = () => {
    return (
        <AuthProvider>
            <AppThemeProvider>
                <Login>
                    
                    <DrawerProvider>
                        <BrowserRouter>

                            <MenuLateral>
                                <AppRoutes />
                            </MenuLateral>

                        </BrowserRouter>
                    </DrawerProvider>
                    
                </Login>
            </AppThemeProvider>
        </AuthProvider>
    );
};