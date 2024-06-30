// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
   const { id } = req.query

   // update notes
   if(req.method === "PATCH"){
      const payload = req.body;
      const resp = await (await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
         method: 'PATCH',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
      })).json();

      res.status(200).json({ ...resp });
   } 

   // delete notes
   else if(req.method === "DELETE"){
      const resp = await (await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
         method: 'DELETE',
      })).json();

      res.status(200).json({ ...resp });
   } 
   
   // detail notes
   else {
      try {
         const resp = await (await fetch(`https://service.pace-unv.cloud/api/notes/${id}`)).json();
   
         res.status(200).json({ ...resp });
      } catch (error) {
   
      }
   }

}
