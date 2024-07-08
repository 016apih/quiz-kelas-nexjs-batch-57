import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Layout from "@/layout";
import UserContextProvider from "@/context/userContextProvider";

export default function App({ Component, pageProps }) {
   const [isClient, setIsClient] = useState(false);
   const isLogin = !! Cookies.get("stoken");

   const width = typeof window !== 'undefined' && window.screen.width <= 425 ? "100vw" : "480px";

   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) {
      return null;
   }

   return <ChakraProvider>
      <Layout width={width}>
         {isLogin ? 
            <UserContextProvider>
               <Component {...pageProps} />
            </UserContextProvider>
         :
            <Component {...pageProps} />
         }
      </Layout>
   </ChakraProvider>
}
