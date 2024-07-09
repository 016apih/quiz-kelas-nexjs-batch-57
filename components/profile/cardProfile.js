import { useContext, useEffect } from 'react';
import { Card, Text, Flex, Heading, CardBody, Avatar, Box } from '@chakra-ui/react';

import { UserContext } from '@/context/userContextProvider';
import useQueries from '@/hooks/useQueries';

const CardProfile = ({ id }) => {
   const profile = useContext(UserContext);

   const { data, fetchingData } = useQueries();

   useEffect(() => {
      const getProfile = async () => {
         await fetchingData({ prefixUrl: `/user/${id}`})
      }

      id && getProfile();
   }, [id])

   return (
      <Card my='2'>
         <CardBody>
            <Flex justify='center' alignItems='center' direction='column' mt='3' mb='5' >
               <Avatar name={data?.name || profile?.name} />
               <Text>{data?.name || profile?.name}</Text>
            </Flex>
            <Flex justify='space-between'>
               <Box>
                  <Heading size='sm'>
                     Email
                  </Heading>
                  <Text size='sm'>
                     {data?.email || profile?.email}
                  </Text>
               </Box>
               <Box>
                  <Heading size='sm'>
                     Hobby
                  </Heading>
                  <Text size='sm'>
                     {data?.hobby || profile?.hobby}
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
                     {data?.phone || profile?.phone}
                  </Text>
               </Box>
            </Flex>
         </CardBody>
      </Card>
   )
}

export default CardProfile;