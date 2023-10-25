import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';

import { 
    Dashboard,
    ListagemDeCidades
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
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            <Route path="/cidades" element={<ListagemDeCidades />} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};