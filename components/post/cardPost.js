import Link from 'next/link'
import React from 'react'
import { IoChatbubbleOutline, IoEllipsisVertical, IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Avatar, 
   Badge, 
   Box, 
   Button, 
   Card, 
   CardBody, 
   CardFooter, 
   CardHeader, 
   Flex, 
   Heading, 
   Icon, 
   IconButton, 
   Menu, 
   MenuButton, 
   MenuItem, 
   MenuList,
   Text
} from '@chakra-ui/react'

const CardPost = ({ ...p }) => {
   return (
      <Card marginBottom='3'>
         <CardHeader>
            <Flex spacing='4'>
               <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name={'P' | 'X'} />
                  <Box>
                     <Heading size='sm' as={Link} href={`/profile/${!p?.is_own_post ? p?.user?.id : ""}`}>
                        {p?.user?.name || ''}
                        {p?.is_own_post ? '(You)' : ''}
                     </Heading>
                     <Text>
                        {p?.user?.email || ''}
                     </Text>
                     <Text fontSize='xs'>
                        {new Date(p?.created_at).toDateString() || ''}&nbsp;
                        {p?.created_at !== p?.updated_at && <Badge>Edited</Badge>}
                     </Text>
                  </Box>
               </Flex>

               {p?.is_own_post && (
                  <Menu placement='bottom-end'>
                     <MenuButton as={IconButton} size='sm' icon={<Icon as={IoEllipsisVertical} boxSize={'4'} />} variant='ghost' />
                     <MenuList zIndex='2' minWidth='0'>
                        <MenuItem onClick={p?.onEdit}>
                           Edit
                        </MenuItem>
                        <MenuItem onClick={p?.onDelete} color='red'>
                           Delete
                        </MenuItem>
                     </MenuList>
                  </Menu>
               )}
            </Flex>
         </CardHeader>

         <CardBody paddingTop='0' paddingBottom='0'>
            <Text>{p?.description ?? ''}</Text>
         </CardBody>

         <CardFooter justify='space-between' flexWrap='wrap' overflow='hidden'>
            <Button size='sm' flex='1' variant='ghost'
               leftIcon={<Icon as={p?.is_like_post ? IoHeart : IoHeartOutline} boxSize='5' color={p?.is_like_post && 'red'} />}
               onClick={() => p?.onLike(p?.is_like_post)}
            >
               {p?.likes_count || 0} {p?.likes_count > 1 ? 'Likes' : 'Like'}
            </Button>
            <Button size='sm' flex='1' variant='ghost'
               leftIcon={<Icon as={IoChatbubbleOutline} boxSize='5' />}
               onClick={p?.onReplies}
            >
               {p?.replies_count || 0}
            </Button>
         </CardFooter>
      </Card>
   )
}

export default CardPost;