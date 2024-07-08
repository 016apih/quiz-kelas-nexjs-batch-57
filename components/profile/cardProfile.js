import { useContext } from 'react';
import { Card, Text, Flex, Heading, CardBody, Avatar, Box } from '@chakra-ui/react';

import { UserContext } from '@/context/userContextProvider';

const CardProfile = () => {
   const profile = useContext(UserContext);

   return (
      <Card my='2'>
         <CardBody>
            <Flex justify='center' alignItems='center' direction='column' mt='3' mb='5' >
               <Avatar name={profile?.name} />
               <Text>{profile?.name}</Text>
            </Flex>
            <Flex justify='space-between'>
               <Box>
                  <Heading size='sm'>
                     Email
                  </Heading>
                  <Text size='sm'>
                     {profile?.email}
                  </Text>
               </Box>
               <Box>
                  <Heading size='sm'>
                     Hobby
                  </Heading>
                  <Text size='sm'>
                     {profile?.hobby ?? '-'}
                  </Text>
               </Box>
               <Box>
                  <Heading size='sm'>
                     Date of birth
                  </Heading>
                  <Text size='sm'>
                     -
                  </Text>
               </Box>
               <Box>
                  <Heading size='sm'>
                     Phone
                  </Heading>
                  <Text size='sm'>
                     {profile?.phone ?? '-'}
                  </Text>
               </Box>
            </Flex>
         </CardBody>
      </Card>
   )
}

export default CardProfile;