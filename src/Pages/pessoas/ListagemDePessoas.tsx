import { useMemo, useEffect ,useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebouce } from '../../shared/hooks';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebouce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, busca).then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);

                    setRows(result.data);
                    setTotalCount(result.totalCount);
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
            <TableContainer 
                component={Paper}
                variant='outlined'
                sx={{ m: 1, width: 'auto' }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBasePagina>
    );
};