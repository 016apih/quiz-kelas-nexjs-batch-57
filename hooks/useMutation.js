import { useCallback, useState } from "react";

const useMutation = () => {
   const [data, setData] = useState({
      data: null,
      isLoading: true,
      isError: false
   });

   const mutate = useCallback(async ({ url='', method='POST', payload={}} = {}) => {
      try {
         const resp = await fetch(url, { 
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
         });
         const res = resp.json();
         setData({ ...data, data: res, isLoading: false });
         return res;
      } catch (error) {
         setData({ ...data, isError: true, isLoading: false});
         return error
      }
   },[]);

   return { ...data, mutate }
}

export default useMutation;
