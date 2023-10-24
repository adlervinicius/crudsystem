import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts/LayoutBasePagina';


export const Dashboard = () => {

    return (
        <LayoutBasePagina 
            titulo='Página inicial' 
            barraDeFerramentas={(
                <BarraDeFerramentas 
                    mostrarInputBusca
                />
            )}
        >
        </LayoutBasePagina>
    );
};