
import React from 'react'


export type Viewer = {
    name: string,
    email: string,
    address: string,
    city: string,
    state: string,
    pinCode: string,

}

export interface Config {
    viewer?: Viewer | null
    role?: "STUDENT" | "ADMIN" | "TEACHER"

}

export interface ConfigProviderProps extends Config {
    setConfig: (conf: Partial<Config>) => void
    refetchViewer: () => Promise<Viewer | null | undefined | void>
}


export const ConfigContext = React.createContext<ConfigProviderProps>({
    setConfig: () => undefined,
    refetchViewer: () => Promise.resolve(),
})

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, ...props }) => {
    return <ConfigContext.Provider value={props}>{children}</ConfigContext.Provider>
}



export default ConfigProvider
