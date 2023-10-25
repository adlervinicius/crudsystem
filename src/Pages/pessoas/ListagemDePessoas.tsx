import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebouce } from '../../shared/hooks';


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebouce(3000, false);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() => {
            PessoasService.getAll(1, busca).then((result) => {
                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);
                }
            });
        });
    }, [busca]);

    return (
        <LayoutBasePagina 
            titulo='Listagem de pessoas'
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