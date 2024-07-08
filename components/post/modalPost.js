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

const ModalPost = ({ modal, setModal, formData, setFormData, onSubmit, replies, isLoadingReplies }) => {
   const initialRef = useRef(null);
   const finalRef = useRef(null);

   const onClose = () => {
      setModal({});
   };

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
                        onCreate={onSubmit}
                        isLoading={modal?.isLoading}
                     />
                  }
               </Box>
               {modal.type === 'replies' && 
                  <SectionReplies 
                     data={replies} 
                     loading={isLoadingReplies} 
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
