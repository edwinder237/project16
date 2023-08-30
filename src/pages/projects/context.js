import createContext from"react";

const user = "Montreal Honda";

export const ClientNameContext = createContext<user | undefined>(undefined);