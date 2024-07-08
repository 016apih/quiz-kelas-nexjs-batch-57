import useQueries from '@/hooks/useQueries';
import React, { createContext } from 'react'

export const UserContext = createContext({});

const UserContextProvider = ({ children, ...props }) => {
   const { data } = useQueries({ prefixUrl: '/user/me' });

   return (
      <UserContext.Provider value={data} {...props}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextProvider