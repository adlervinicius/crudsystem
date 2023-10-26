import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = () => {
        console.log('deletar');
    };

    return (
        <LayoutBasePagina 
            titulo='Detalhe de pessoa'
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoSalvarEFechar

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            <p>Usuario {id}</p>
        </LayoutBasePagina>
    );
};