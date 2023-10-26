import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { LinearProgress } from '@mui/material';


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if(id !== 'nova') {
            setIsLoading(true);

            PessoasService.getById(Number(id)).then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setNome(result.nomeCompleto);
                    console.log(result);
                }
            });
        }
    }, [id]);

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro apagado com sucesso!');
                    navigate('/pessoas');
                }
            });
        }
    };

    return (
        <LayoutBasePagina 
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoSalvarEFechar

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}

            <Form onSubmit={console.log}>
                <VTextField
                    name='nomeCompleto'
                />

                <button type='submit'>Submit</button>
            </Form>
        </LayoutBasePagina>
    );
};