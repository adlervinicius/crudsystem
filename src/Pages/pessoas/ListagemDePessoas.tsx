import { useMemo, useEffect ,useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebouce } from '../../shared/hooks';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebouce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca).then((result) => {
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
    }, [busca, pagina]);

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows(oldRows => {
                        return [
                            ...oldRows.filter(oldRow => oldRow.id !== id),
                        ];
                    } );
                    alert('Registro apagado com sucesso!');
                }
            });
        }
    };



    return (
        <LayoutBasePagina 
            titulo='Listagem de pessoas'
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoDaBusca={busca}
                    textoBotaoNovo='Nova'
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto, pagina: '1'}, { replace: true})}
                    mostrarInputBusca
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
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
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row.id)} size='small'>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/pessoas/detalhe/${row.id}`)} size='small'>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}
                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true})}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBasePagina>
    );
};