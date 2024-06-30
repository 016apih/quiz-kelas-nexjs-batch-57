// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
   if(req.method === "POST"){
      const payload = req.body;
      const resp = await (await fetch('https://service.pace-unv.cloud/api/notes', {
         method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
      })).json();

      res.status(200).json({ ...resp });
   } else {
      try {
         const resp = await (await fetch('https://service.pace-unv.cloud/api/notes')).json();
         res.status(200).json({ ...resp });
      } catch (error) {
   
      }
   }

}
