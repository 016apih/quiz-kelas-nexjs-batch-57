import { Box } from '@chakra-ui/react';

import CardPost from './cardPost';
import EemptyPost from './emptyPost';
import LoadingPost from './loadingPost';

const SectionPosts = ({ data=[], isLoading, onEdit, onDelete, onLike, onReplies }) => {

   return (
      <Box>
         {/* <ModalPost modal={modal} setModal={setModal}  /> */}
         {data?.length > 0 && data.map((d, id) => (
            <CardPost
               key={'card-post-'+id}
               onLike={() => onLike(d)}
               onReplies={() => onReplies(d)}
               onEdit={() => onEdit(d)}
               onDelete={() => onDelete(d)}
               { ...d }
            />
         ))}
         {data?.length === 0 && !isLoading && <EemptyPost />}
         {isLoading && <LoadingPost />}
      </Box>
   )
}

export default SectionPosts;