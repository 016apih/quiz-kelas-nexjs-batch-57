import { Button, Card, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'

const CreatePost = ({
   padding = '4',
   variant = 'elevated',
   placeholder = `What's happening`,
   value,
   onChange,
   isLoading,
   onCreate,
   textBtn = 'Post'
}) => {
   return (
      <Card padding={padding} variant={variant}>
         <Stack>
            <Textarea
               placeholder={placeholder}
               variant='filled'
               value={value}
               onChange={e => onChange(e.target.value)}
            />
            <Button colorScheme='blue' size='sm' 
               isDisabled={!value} 
               onClick={onCreate} 
               isLoading={isLoading}
            >
               {textBtn}
            </Button>
         </Stack>
      </Card>
   )
}

export default CreatePost;