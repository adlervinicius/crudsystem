import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts';


export const ListagemDeCidades: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    return (
        <LayoutBasePagina 
            titulo='Listagem de cidades'
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoDaBusca={busca}
                    textoBotaoNovo='Nova'
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true})}
                    mostrarInputBusca
                />
            }
        >

        </LayoutBasePagina>
    );
};