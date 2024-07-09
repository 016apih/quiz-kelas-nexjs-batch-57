import { useRef } from 'react';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Box
} from '@chakra-ui/react';

import CreatePost from './createPost';
import SectionReplies from './sectionReplies';
import useQueries from '@/hooks/useQueries';

const ModalPost = ({ modal, setModal, formData, setFormData, onSubmit, replies, isLoadingReplies }) => {
   const initialRef = useRef(null);
   const finalRef = useRef(null);
   const { useMutate } = useQueries();

   const onClose = () => {
      setModal({});
   };

   const onEditReplies = async () => {
      const resp = await useMutate({
         prefixUrl: `/replies/post/${formData?.detail?.id}`,
         method: 'POST',
         payload: { description: formData?.description }
      });
      resp.success && modal?.fetchingReplies();
      setFormData({ ...formData, description: '', detail: undefined })
   }

   const onActReplies = async (type, d) => {
      if(type === 'delete'){
         const resp = await useMutate({ prefixUrl: `/replies/delete/${d.id}`, method: 'DELETE' });
         resp.success && modal?.fetchingReplies();
      } else {
         setFormData({ ...formData, description: d.description, detail: d })
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
         <ModalContent mb={2}>
            <ModalHeader className='capitalize text-3xl'>
               {modal?.type} Post
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody position='relative' maxHeight='500px' overflow='auto'>
               <Box position='sticky' top='0' zIndex='3' mb='3'>
                  {modal.type === 'delete'? 
                     <div>Are you sure delete this post ?</div>
                  :
                     <CreatePost
                        variant="unstyled"
                        padding="0"
                        placeholder="description ..."
                        textButton="Submit"
                        value={formData?.description}
                        onChange={description => setFormData(s => ({ ...s, description }) )}
                        onCreate={() => formData?.detail ? onEditReplies() : onSubmit()}
                        isLoading={modal?.isLoading}
                     />
                  }
               </Box>
               {modal.type === 'replies' && 
                  <SectionReplies 
                     data={replies} 
                     loading={isLoadingReplies} 
                     onClose={onClose}
                     setFormData={setFormData}
                     onActReplies={onActReplies}
                  />
               }
            </ModalBody>

            {modal.type === 'delete' && 
               <ModalFooter>
                  <Button size="sm" isLoading={modal?.isLoading} onClick={onSubmit}>
                     Yes
                  </Button>
               </ModalFooter>
            }

         </ModalContent>
      </Modal>
   )
}

export default ModalPost;
