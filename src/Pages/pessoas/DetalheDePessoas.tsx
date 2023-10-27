import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null);

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
                    formRef.current?.setData(result);
                }
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoasService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    navigate(`/pessoas/detalhe/${result}`);
                }
            });
        } else {
            PessoasService.updateById(Number(id), {id: Number(id), ...dados}).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
            });
        }
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


                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}

            <Form ref={formRef} onSubmit={handleSave}>
                <VTextField placeholder='Nome completo' name='nomeCompleto' />
                <VTextField placeholder='Email' name='email' />
                <VTextField placeholder='Cidade' name='cidadeId' />
            </Form>
        </LayoutBasePagina>
    );
};