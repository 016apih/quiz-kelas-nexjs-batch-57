import { Box, Card, CardHeader, Flex, Avatar, Tag, TagLabel, Text, } from "@chakra-ui/react";
import { IoChatbubbleOutline } from "react-icons/io5";
import Link from "next/link";

import EemptyPost from "./emptyPost"
import LoadingPost from "./loadingPost"

const SectionReplies = ({ data=[], loading }) => {
   return (
      <Box>
         {data.map((d, idx) => (
            <Card marginBottom="3"  key={'replay'+idx}>
               <CardHeader padding="3">
                  <Flex
                     alignItems="flex-start"
                     justifyContent="flex-start"
                     flexDirection="column"
                  >
                     <Tag
                        size="lg"
                        borderRadius="full"
                        as={Link}
                        href={`profile/${!d?.is_own_reply ? d?.user?.id : ""}`}
                     >
                        <Avatar size="xs" name={d?.user?.name || "X"} ml={-1} mr={2} />
                        <TagLabel>
                           {d?.user?.name || ""}
                           {d?.is_own_reply && " (You)"}
                        </TagLabel>
                     </Tag>
                     <Text fontSize="xs">
                        {new Date(d?.created_at).toDateString() || ""}
                     </Text>
                     <Text>{d?.description || ""}</Text>
                  </Flex>
               </CardHeader>
            </Card>
         ) )}
         
         {data?.length === 0 && !loading && (
            <EemptyPost message="No Replies" icon={IoChatbubbleOutline} />
         )}
         {loading && <LoadingPost />}
      </Box>
   )
}

export default SectionReplies