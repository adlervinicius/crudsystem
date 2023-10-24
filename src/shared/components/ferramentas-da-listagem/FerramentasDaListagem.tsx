import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IFerramentasDaListagemProps {
    textoDaBusca?: string,
    mostrarInputBusca?:  boolean,
    aoMudarTextoDaBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string,
    mostrarBotaoNovo?:  boolean,
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({ 
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDaBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo,
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
            {mostrarInputBusca && (
                <TextField 
                    size='small'
                    placeholder='Pesquisar...'
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
                />
            )}
            <Box
                display='flex'
                flex={1}
                justifyContent='end'
            >
                { mostrarBotaoNovo && (
                    <Button
                        color='primary'
                        variant='contained'
                        disableElevation
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>
        </Box>
    );
};