import { IoFilterOutline } from 'react-icons/io5';
import { Flex, Icon, Text } from '@chakra-ui/react';

const EemptyPost = ({ msg='No Post', icon=IoFilterOutline}) => {
   return (
      <Flex flexDirection='column' align='center'>
         <Text fontWeight='medium'>
            {msg}
         </Text>
         <Icon as={icon} boxSize='6' />
      </Flex>
   )
}

export default EemptyPost