import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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

const AddNotes = () => {
   const { mutate } = useMutation();
   const router = useRouter();
   const [notes, setNotes] = useState({ title: '', description: '' });

   const onSubmit = async () => {
      const resp = await mutate({
         url: `${checkEnv()}/api/notes`,
         payload: notes,
         method: 'POST'
      });
      resp?.success && router.push("/");
      Swal.fire({
         title: "Success!",
         text: "Note successfully added!",
         icon: resp?.success ? 'success' : 'error'
      });
   };

   return (
      <LayoutComponent metaTitle="Add">
         <Card margin="5" padding="5">
            <Heading>Add Notes</Heading>
            <Grid gap="5">
               <GridItem>
                  <Text>Title</Text>
                  <Input
                     type="text"
                     onChange={(e) =>setNotes({ ...notes, title: e.target.value }) }
                  />
               </GridItem>
               <GridItem>
                  <Text>Description</Text>
                  <Textarea
                     onChange={(e) => setNotes({ ...notes, description: e.target.value }) }
                  />
               </GridItem>
               <GridItem>
                  <Button onClick={onSubmit} colorScheme="blue">
                     Submit
                  </Button>
               </GridItem>
            </Grid>
         </Card>
      </LayoutComponent>
   )
}

export default AddNotes;