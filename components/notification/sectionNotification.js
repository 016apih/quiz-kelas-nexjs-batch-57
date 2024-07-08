import { Box, Card, CardHeader, Flex, Tag, Avatar, TagLabel, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { formatDistance } from "date-fns";

import LoadingPost from "../post/loadingPost";
import EemptyPost from "../post/emptyPost";

const SectionNotification = ({ data, loading }) => {
   return (
      <Box>
         {data?.length > 0 &&
            data.map((d, idx) => (
               <Card marginBottom="3" key={'notifikasi-'+idx}>
                  <CardHeader padding="3">
                     <Flex spacing="4">
                        <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
                           <Tag
                              size="lg"
                              borderRadius="full"
                              as={Link}
                              href={`profile/${d.user?.id || ""}`}
                           >
                              <Avatar
                                 size="xs"
                                 name={d.user?.name || "X"}
                                 ml={-1}
                                 mr={2}
                              />
                              <TagLabel>{d.user?.name || ""}</TagLabel>
                           </Tag>
                           <Text>
                              {d.remark || ""} your post,{" "}
                              <span style={{ fontStyle: "italic", fontSize: "11pt" }}>
                                 {`"${formatDistance(new Date(d.created_at), new Date(), {
                                    addSuffix: true,
                                 })}"`}
                              </span>
                           </Text>
                        </Flex>
                     </Flex>
                  </CardHeader>
               </Card>
            ))}
         {data?.length === 0 && !loading && (
            <EemptyPost message="No Notifications" icon={IoNotificationsOutline} />
         )}
         {loading && <LoadingPost />}
      </Box>
   )
}

export default SectionNotification