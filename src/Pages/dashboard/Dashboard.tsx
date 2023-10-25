import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-detalhes/FerramentasDeDetalhe';
import { LayoutBasePagina } from '../../shared/layouts/LayoutBasePagina';


export const Dashboard = () => {

    return (
        <LayoutBasePagina 
            titulo='Página inicial' 
            barraDeFerramentas={(
                <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
            )}
        >
        </LayoutBasePagina>
    );
};