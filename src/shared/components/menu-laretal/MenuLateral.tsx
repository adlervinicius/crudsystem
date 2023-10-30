import React from 'react';

//importação itens mui
import { 
    Avatar, 
    Box, 
    Divider, 
    Drawer, 
    Icon, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    useMediaQuery, 
    useTheme 
} from '@mui/material';

// navegate
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

//context para abrir e fechar o drawer
import { useAppDrawerContext, useAppThemeContext } from '../../contexts';

//interface's
interface IAppMenuLateralProps {
    children: React.ReactNode;
}
interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
}

//componente para navegação drawer e icones
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};


//main
export const MenuLateral: React.FC<IAppMenuLateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { drawerOptions, isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();
    const { toggleTheme } = useAppThemeContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box 
                    width={theme.spacing(28)} 
                    display="flex" 
                    flexDirection="column"
                    height="100%"
                >
                    <Box 
                        width="100%" 
                        height={theme.spacing(20)} 
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar 
                            src="https://pbs.twimg.com/profile_images/1717346010811314176/D9t1A7U2_400x400.jpg" 
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    to={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Altenar tema' />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box display='flex' textAlign='center' justifyContent='center' fontSize={12}>versão 1.0.0</Box>
                </Box>
            </Drawer>
            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>

    );
};