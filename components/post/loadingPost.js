import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingPost = () => {
   return (
      <Flex justify='center'>
         <Spinner
            thickness='6px'
            speed='0.5'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
         />  
      </Flex>
   )
}

export default LoadingPost;