import useQueries from '@/hooks/useQueries';
import React, { createContext } from 'react'

export const UserContext = createContext({});

const UserContextProvider = ({ children, ...props }) => {
   const { data } = useQueries({ prefixUrl: '/user/me' });
   const width = typeof window !== 'undefined' && window.screen.width <= 425 ? window.screen.width : 480;


   return (
      <UserContext.Provider value={{ ...data, width }} {...props}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextProvider