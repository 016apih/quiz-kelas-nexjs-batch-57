import { useState } from "react";
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

const ModalForm = dynamic(() => import('@/components/formModal'));
const LayoutComponent = dynamic(() => import('@/layout'));

export default function Main({ notes }) {
   const router = useRouter();
   const { mutate } = useMutation();
   const [modal, setModal] = useState({});

   const onShowModal = (type, id) => setModal({
      isOpen: true, type, id
   })

   const onDelete = async (id) => {
      // with modal
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            const resp = await mutate({
               url: `${checkEnv()}/api/notes/${id}`,
               method: 'DELETE'
            });
            resp?.success && router.reload();
            Swal.fire({
               title: "Deleted!",
               text: "note has been deleted.",
               icon: resp?.success ? 'success' : 'error'
            });
         }
      });

      // with page
      // const resp = await mutate({
      //    url: `${checkEnv()}/api/notes/${id}`,
      //    method: 'DELETE'
      // });
      // resp?.success && router.reload();
      // Swal.fire({
      //    title: "Success!",
      //    text: "Note successfully Deleted!",
      //    icon: resp?.success ? 'success' : 'error'
      // });
   };

   return (
      <LayoutComponent metaTitle={"List"}>
         <ModalForm modal={modal} setModal={setModal} />
         <Box padding="5">
            <Flex justifyContent="end">
               <Button
                  colorScheme="blue"
                  onClick={() => onShowModal('add')}
               // onClick={() => router.push("/notes/add")}
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
                                 onClick={() => onShowModal('edit', item?.id)}
                                 // onClick={() => router.push(`/notes/edit/${item?.id}`)}
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