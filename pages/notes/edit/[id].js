import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import {
   Grid,
   GridItem,
   Card,
   Heading,
   Text,
   Button,
   Input,
   Textarea,
} from "@chakra-ui/react";

import { checkEnv } from "@/utils/checkEnv";
import useMutation from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

const EditNotes = () => {
   const router = useRouter();
   const { mutate } = useMutation();
   const { id } = router?.query;
   const [notes, setNotes] = useState()

   const onSubmit = async () => {
      const resp = await mutate({
         url: `${checkEnv()}/api/notes/${id}`,
         method: 'PATCH',
         payload: { title: notes?.title, description: notes?.description },
      });
      resp?.success && router.push("/");
      Swal.fire({
         title: "Success!",
         text: "Note successfully edited!",
         icon: resp?.success ? 'success' : 'error'
      });
   };

   useEffect(() => {
      async function fetchingData() {
         const res = await fetch(`${checkEnv()}/api/notes/${id}`);
         const listNotes = await res.json();
         setNotes(listNotes?.data)
      }
      fetchingData();
   }, [id]);

   return (
      <LayoutComponent metaTitle="Detail">
         <Card margin="5" padding="5">
            <Heading>Edit Notes</Heading>
            <Grid gap="5">
               <GridItem>
                  <Text>Title</Text>
                  <Input
                     type="text"
                     value={notes?.title || ""}
                     onChange={(e) => setNotes({ ...notes, title: e.target.value }) }
                  />
               </GridItem>
               <GridItem>
                  <Text>Description</Text>
                  <Textarea
                     value={notes?.description || ""}
                     onChange={(e) => setNotes({ ...notes, description: e.target.value }) }
                  />
               </GridItem>
               <GridItem>
                  <Button onClick={() => onSubmit()} colorScheme="blue">
                     Submit
                  </Button>
               </GridItem>
            </Grid>
         </Card>
      </LayoutComponent>
   )
}

export default EditNotes;