import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export const baseUrl = 'https://service.pace-unv.cloud/api';

const useQueries = ({ enabled=true, prefixUrl, withToastSuccess=false}={}) => {
   const toast = useToast();
   const [data, setData] = useState({
      data: null,
      isLoading: false,
      isError: false
   });
   const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

   const showToast = ({title, description, status}) => {
      toast({
         title, 
         description,
         status,
         isClosable: true,
         duration: 1000,
         position: 'top',
         variant: 'top-accent'
      })
   }
   
   const fetchingData = useCallback(async ({ prefixUrl='' }) => {
      setData(s => ({ ...s, isLoading: true }));

      try {
         const resp = await fetch(`${baseUrl}${prefixUrl}`, { 
            method: 'GET',
            headers: { 
               'Content-Type': "application/json",
               'Authorization': `Bearer ${Cookies.get('stoken')}`
            }
         });

         const result = await resp.json();

         if(withToastSuccess){
            showToast({
               title: resp?.statusText || 'Get Posts',
               description: result?.message,
               status: result?.success ? 'success' : 'error'
            })
         }

         setData(s => ({ ...s,
            data: result?.data,
            isLoading: false
         }))

      } catch (err) {
         setData(s => ({ ...s, isLoading: false }) );
         showToast({ title: 'Error', description: err?.resp?.data?.message, status: 'error'})
      }
   })

   const useMutate = useCallback(async ({ prefixUrl='', method='POST', payload={}, title } = {}) => {
      setIsLoadingSubmit(true);
      try {
         const resp = await fetch(`${baseUrl}${prefixUrl}`, { 
            method,
            headers: { 
               'Content-Type': "application/json",
               'Authorization': `Bearer ${Cookies.get('stoken')}`
            },
            body: JSON.stringify(payload)
         });

         const result = await resp.json();
         showToast({
            title: result?.statusText || title,
            description: result?.message,
            status: result?.success ? 'success' : 'error'
         })
         setIsLoadingSubmit(false);
         return result;
      } catch (err) {
         setIsLoadingSubmit(false);
         showToast({ title: title || 'Error', description: err?.resp?.data?.message});

         return err;
      }
   },[]);

   useEffect(() => {
      if(enabled && prefixUrl){
         fetchingData({ prefixUrl})
      }
   },[enabled, prefixUrl])

   return { ...data, fetchingData, isLoadingSubmit, useMutate }
}

const fetchData = ({ prefixUrl = ""}) => {
   const [data, setData] = useState({
      data: null,
      isLoading: true,
      isError: false
   });

   const fetchingData = useCallback( async ({ url='', method='GET' }) => {
      try {
         const resp = await fetch(`${baseUrl}${prefixUrl}`, { 
            method,
            headers: { 
               'Content-Type': "application/json",
               'Authorization': `Bearer ${Cookies.get('stoken')}`
            }
         });
         const result = await resp.json();
         setData(s => ({ ...s, data: result?.data, isLoading: false }) );

      } catch (error) {
         setData({ ...data, isError: true, isLoading: false });
      }
   },[]);
   
   useEffect(() => {
      if(prefixUrl){
         fetchingData({ url: prefixUrl });
      }
   },[]);
   
   return { ...data }
};

export  { fetchData };


export default useQueries;

