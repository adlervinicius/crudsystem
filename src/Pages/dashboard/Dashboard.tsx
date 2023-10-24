import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts/LayoutBasePagina';


export const Dashboard = () => {

    return (
        <LayoutBasePagina 
            titulo='Página inicial' 
            barraDeFerramentas={(
                <FerramentasDaListagem 
                    mostrarInputBusca
                />
            )}
        >
        </LayoutBasePagina>
    );
};