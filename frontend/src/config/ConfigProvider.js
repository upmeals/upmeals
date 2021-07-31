import config from '.';
import React from 'react';

export const ConfigContext = React.createContext({});

const ConfigProvider = ({ children }) => (
    <ConfigContext.Provider value={config()}>{children}</ConfigContext.Provider>
);

export default ConfigProvider;