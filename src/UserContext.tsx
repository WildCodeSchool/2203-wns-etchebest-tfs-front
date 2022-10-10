import { createContext,ReactElement,useState } from "react";


export interface IAuthUserCtx {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: string;
}

export interface IAuthCtx {
  authUser: IAuthUserCtx | null;
  setAuthUser: (user:IAuthUserCtx)=>void
}

export const AuthContext = createContext<IAuthCtx | null>(null);

export const AuthProvider = ({children}:{children:ReactElement[]}) => {


   const authContext: IAuthUserCtx = {
    id: 21,
    firstname: 'test',
    lastname: 'test',
    email: 'test@exemple.com',
    roles: 'ADMIN'
  };
 
  // State utiliser dans le contexte pour définir quelle est l'utilisateur est connecté
  // On envoi également le setter pour pouvoir "setté" l'utilisateur une fois connecté
  const [authUser, setAuthUser] = useState<IAuthUserCtx | null>(authContext)
  const value = {authUser, setAuthUser}

  return (  
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}




