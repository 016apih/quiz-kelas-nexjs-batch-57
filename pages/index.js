
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import {
   Box,
   Flex,
   Grid,
   GridItem,
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   Heading,
   Text,
   Button,
} from "@chakra-ui/react";

import { checkEnv } from "@/utils/checkEnv";
import useMutation from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import('@/layout'));

export default function Main({ notes }) {
   const router = useRouter();
   const { mutate } = useMutation();

   const onDelete = async (id) => {
      const resp = await mutate({
         url: `${checkEnv()}/api/notes/${id}`,
         method: 'DELETE'
      });
      resp?.success && router.reload();
      Swal.fire({
         title: "Success!",
         text: "Note successfully Deleted!",
         icon: resp?.success ? 'success' : 'error'
      });
   };

   return (
      <LayoutComponent metaTitle={"List"}>
         <Box padding="5">
            <Flex justifyContent="end">
               <Button
                  colorScheme="blue"
                  onClick={() => router.push("/notes/add")}
               >
                  Add Notes
               </Button>
            </Flex>
            <Flex>
               <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                  {notes?.map((item, id) => (
                     <GridItem key={"key-" + id}>
                        <Card>
                           <CardHeader>
                              <Heading>{item?.title}</Heading>
                           </CardHeader>
                           <CardBody>
                              <Text>{item?.description}</Text>
                           </CardBody>
                           <CardFooter justify="space-between" flexWrap="wrap">
                              <Button
                                 onClick={() => router.push(`/notes/edit/${item?.id}`)}
                                 flex="1"
                                 variant="ghost"
                              >
                                 Edit
                              </Button>
                              <Button
                                 flex="1"
                                 colorScheme="red"
                                 onClick={() => onDelete(item?.id)}
                              >
                                 Delete
                              </Button>
                           </CardFooter>
                        </Card>
                     </GridItem>
                  ))}
               </Grid>
            </Flex>
         </Box>
      </LayoutComponent>
   );
}

export async function getServerSideProps() {
   const res = await fetch(`${checkEnv()}/api/notes`);
   const data = await res.json();

   return { props: { notes: data?.data } }
}