import { 
    createContext, 
    useCallback, 
    useContext, 
    useState 
} from 'react';

//interfaces
interface IDrawerOption {
    icon: string,
    path: string,
    label: string,
}

interface IDrawerContextData {
    isDrawerOpen: boolean,
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
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
    const [drawerOptions, setDraweerOptions] = useState<IDrawerOption[]>([]);


    const toggleDrawerOpen = useCallback(() => {
        setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDraweerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{ setDrawerOptions: handleSetDrawerOptions, isDrawerOpen, drawerOptions, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};