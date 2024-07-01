import { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Input,
   FormControl,
   FormLabel,
   Textarea
} from '@chakra-ui/react';

import { checkEnv } from '@/utils/checkEnv';
import useMutation from "@/hooks/useMutation";

const ModalForm = ({ modal, setModal}) => {
   const router = useRouter();
   const { mutate } = useMutation();
   const initialRef = useRef(null);
   const finalRef = useRef(null);

   const [notes, setNotes] = useState();
   const [errForm, setErrForm] = useState();

   useEffect(() => {
      async function fetchingData() {
         const res = await fetch(`${checkEnv()}/api/notes/${modal?.id}`);
         const listNotes = await res.json();
         setNotes(listNotes?.data)
      }
      fetchingData();
   }, [modal?.id]);

   const onClose = () => { 
      setModal(null);
      setNotes();
   };

   const onSave = async () => {
      let resp, baseUrl = `${checkEnv()}/api/notes`;
      setModal(s => ({ ...s, isLoading: true }));
      if(modal?.type === 'add'){
         resp = await mutate({
            url: baseUrl,
            payload: notes,
            method: 'POST'
         });
      } else {
         resp = await mutate({
            url: `${baseUrl}/${modal?.id}`,
            method: 'PATCH',
            payload: { title: notes?.title, description: notes?.description },
         });
      }

      if(resp?.success){
         router.reload();
         setModal(null);
         setNotes();
      }
      setModal(s => ({ ...s, isLoading: false }));
   
      Swal.fire({
         title: "Success!",
         text: `Note successfully ${modal?.type}ed!`,
         icon: resp?.success ? 'success' : 'error'
      });
   }

   const onSubmit = () => {
      if(notes?.title &&  notes?.description){
         onSave()
      } else {
         setErrForm('form not empty');
         setTimeout(() => setErrForm(), 800);
      }
   }

   return (
      <Modal
         initialFocusRef={initialRef}
         finalFocusRef={finalRef}
         isOpen={modal?.isOpen}
         onClose={onClose}
         closeOnOverlayClick={!modal?.isLoading}
      >
         <ModalOverlay />
         <ModalContent className='p-4 m-4'>
            <ModalHeader className='capitalize text-3xl'>
               {modal?.type} Note
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <div className='text-sm text-red-500 italic'>{errForm}</div>
               <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input ref={initialRef} placeholder='Title' 
                     value={notes?.title || ""} 
                     onChange={e => setNotes(s => ({ ...s, title: e.target.value }) )}
                  />
               </FormControl>

               <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder='Description' 
                     value={notes?.description || ""} 
                     onChange={e => setNotes(s => ({ ...s, description: e.target.value }) )}
                  />
               </FormControl>
            </ModalBody>

            <ModalFooter>
               <Button colorScheme='blue' mr={3} onClick={onSubmit}>
                  {modal?.isLoading ? 'Please wait ...' : 'Save'}
               </Button>
               <Button onClick={onClose}>
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default ModalForm;
