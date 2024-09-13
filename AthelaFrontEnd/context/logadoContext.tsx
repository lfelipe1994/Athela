import React, { createContext, useState, ReactNode, useContext } from 'react';

interface LogadoContextProps {
  logado: boolean;
  setLogado: React.Dispatch<React.SetStateAction<boolean>>;
  clientes: any[];
  setClientes: React.Dispatch<React.SetStateAction<any[]>>;
  idUsuario: string | null;
  setIdUsuario: React.Dispatch<React.SetStateAction<string | null>>;
  diasNotificacao: string;
  setDiasNotificacao: React.Dispatch<React.SetStateAction<string>>;
}

const LogadoContext = createContext<LogadoContextProps | undefined>(undefined);

export const LogadoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [logado, setLogado] = useState<boolean>(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [idUsuario, setIdUsuario] = useState<string | null>(null);
  const [diasNotificacao, setDiasNotificacao] = useState<string>(''); // Adicionando o novo state

  return (
    <LogadoContext.Provider value={{ 
      logado, 
      setLogado, 
      clientes, 
      setClientes, 
      idUsuario, 
      setIdUsuario,
      diasNotificacao, 
      setDiasNotificacao // Incluindo o novo state no provider
    }}>
      {children}
    </LogadoContext.Provider>
  );
};

export const useLogado = (): LogadoContextProps => {
  const context = useContext(LogadoContext);
  if (context === undefined) {
    throw new Error('useLogado must be used within a LogadoProvider');
  }
  return context;
};
