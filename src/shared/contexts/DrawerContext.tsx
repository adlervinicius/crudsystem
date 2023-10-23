import { 
    createContext, 
    useCallback, 
    useContext, 
    useState 
} from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean,
    toggleDrawerOpen: () => void;
}

interface IAppDrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {

    return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setisDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};