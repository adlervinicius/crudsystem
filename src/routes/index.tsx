import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';

import { 
    Dashboard,
    ListagemDePessoas
} from '../Pages';

export const AppRoutes = () => {

    const { setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};