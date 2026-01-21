import { createContext, useContext } from 'react';
import type { TabsOrientation, TabsSize, TabsVariant, TabsActivationMode } from './Tabs.types';

interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    orientation: TabsOrientation;
    variant: TabsVariant;
    size: TabsSize;
    activationMode: TabsActivationMode;
}

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs subcomponents must be used within a Tabs component');
    }
    return context;
};
