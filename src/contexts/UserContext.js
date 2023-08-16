import { createContext, useState } from 'react';
export const UserContext = createContext(0);
export function UserContextProvider({ children }) {
  const [usuario, setUsuario] = useState('');
  const [logado, setLogado] = useState(false);
  const [user, setUser] = useState('');
  const [projetos, setProjetos] = useState([])

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        logado,
        setLogado,
        user,
        setUser,
        projetos,
        setProjetos
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
