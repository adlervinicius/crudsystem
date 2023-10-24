import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({ 
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,
}) => {

    const theme = useTheme();

    return (
        <Box 
            height={theme.spacing(5)} 
            component={Paper}
            display='flex'
            alignItems='center'
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) &&(
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvar}
                >
                    Salvar
                </Button>
            )}

            {mostrarBotaoSalvarCarregando &&(
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) &&(
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvarEFechar}
                >
                    Salvar e voltar
                </Button>
            )}

            {mostrarBotaoSalvarEFecharCarregando &&(
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) &&(
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarEmApagar}
                >
                    Apagar
                </Button>
            )}

            {mostrarBotaoApagarCarregando &&(
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) &&(
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >
                    {textoBotaoNovo}
                </Button>
            )}

            {mostrarBotaoNovoCarregando &&(
                <Skeleton width={110} height={60} />
            )}

            <Divider
                variant='middle'
                orientation='vertical'
                
            />

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&(
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarEmVoltar}
                >
                    Voltar
                </Button>
            )}

            {mostrarBotaoVoltarCarregando &&(
                <Skeleton width={110} height={60} />
            )}

        </Box>
    );
};