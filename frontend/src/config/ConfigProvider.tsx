import globalConfig from '.';
import React from 'react';

export const ConfigContext = React.createContext({});

interface ConfigProviderProps {
    children: React.ReactNode
}

const ConfigProvider = ({ children } : ConfigProviderProps) => (
    <ConfigContext.Provider value={globalConfig()}>{children}</ConfigContext.Provider>
);

export default ConfigProvider;