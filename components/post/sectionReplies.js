import { Box, Card, CardHeader, Flex, Avatar, Tag, TagLabel, Text, Spacer, } from "@chakra-ui/react";
import { IoChatbubbleOutline } from "react-icons/io5";
import Link from "next/link";

import EmptyPost from "./emptyPost"
import LoadingPost from "./loadingPost"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const SectionReplies = ({ data=[], loading, onClose, onActReplies }) => {

   if(loading)
      return (
         <Box py='3'>
            <LoadingPost />
         </Box>
      )

   return (
      <Box>
         {data.map((d, idx) => (
            <Card marginBottom="3"  key={'replay'+idx}>
               <CardHeader padding="3">
                  <Flex justify='space-between'>
                     <Box>
                        <Tag
                           size="lg"
                           borderRadius="full"
                           as={Link}
                           href={`profile/${!d?.is_own_reply ? d?.user?.id : "../"}`}
                           onClick={() => onClose()}
                        >
                           <Avatar size="xs" name={d?.user?.name || "X"} ml={-1} mr={2} />
                           <TagLabel>
                              {d?.user?.name || ""}
                              {d?.is_own_reply && " (You)"}
                           </TagLabel>
                        </Tag>
                     </Box>
                     <Spacer />
                     <Box>
                        <EditIcon w={5} h={5} color="blue.500" 
                           onClick={() => onActReplies('edit', d)} 
                        />
                        <DeleteIcon w={5} h={5} color="red.500" 
                           onClick={() => onActReplies('delete', d)}
                        />
                     </Box>
                  </Flex>
                  <Text fontSize="xs">
                     {new Date(d?.created_at).toDateString() || ""}
                  </Text>
                  <Text>{d?.description || ""}</Text>
               </CardHeader>
            </Card>
         ) )}
         
         {data?.length === 0 && !loading && (
            <EmptyPost msg="No Replies" icon={IoChatbubbleOutline} />
         )}
      </Box>
   )
}

export default SectionReplies