import { useState } from "react";
import Link from "next/link";
import { Flex, Stack, Heading, FormControl, InputGroup, Input, InputRightElement, Button, Text, Link as LinkCU, TagLabel, FormLabel } from "@chakra-ui/react";

import useQueries from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const metaForm = [
   { name: 'name', required: true, label: 'Full Name', type: 'text', placeholder: 'Full Name' },
   { name: 'email', required: true, label: 'Email', type: 'text', placeholder: 'email@gmail.com' },
   { name: 'password', required: true, label: 'Password', type: 'password', placeholder: '123456' },
   { name: 'phone', required: false, label: 'Phone Number', type: 'text', placeholder: 'phone' }, 
   { name: 'hobby', required: false, label: 'Hobby', type: 'text', placeholder: 'hobby' }, 
]

const ContainerRegister = () => {
   const router = useRouter();
   const { useMutate, isLoadingSubmit } = useQueries();
   const [isShow, setIsShow] = useState(false);
   const [formdata, setFormData] = useState({
      // "name": "test",
      // "email": "test@gmail.com",
      // "password": "12345",
      // "dob": "",
      // "phone": "",
      // "hobby": ""
   });

   const setShowPassword = () => setIsShow(s => !s);

   const onLogin = async () => {
      const resp = await useMutate({ prefixUrl: '/register', payload: formdata, title: 'Register' });
   }


   return (
      <Flex alignItems="center" justifyContent="center">
         <Stack direction="column">
            <Heading as="h4" size="md" textAlign="center" mb="3">
               REGISTER
            </Heading>
            {metaForm.map(d => (
               d.type === 'password' ?
                  <FormControl isRequired={d.required}>
                     <FormLabel>Password</FormLabel>
                     <InputGroup size="md">
                        <Input
                           pr="4.5rem"
                           type={isShow ? "text" : "password"}
                           placeholder="Password ..."
                           value={formdata.password}
                           onChange={(e) => setFormData(s => ({ ...s, password: e.target.value }) )}
                        />
                        <InputRightElement width="4.5rem">
                           <Button h="1.75rem" size="sm" onClick={setShowPassword}>
                              {isShow ? "Hide" : "Show"}
                           </Button>
                        </InputRightElement>
                     </InputGroup>
                  </FormControl>
            :
               <FormControl isRequired={d.required}>
                  <FormLabel>{d.label}</FormLabel>
                  <Input
                     type={d.type}
                     placeholder={d.placeholder}
                     name={d.name}
                     value={formdata[d.name]}
                     onChange={(e) => setFormData(s => ({ ...s, [d.name]: e.target.value }) )}
                  />
               </FormControl>
            ))}
            <FormControl>
               <Button
                  width="full"
                  colorScheme="messenger"
                  isLoading={isLoadingSubmit}
                  onClick={onLogin}
               >
                  Login
               </Button>
            </FormControl>
            <FormControl>
               <Text>
                  Do you have account ?{" "}
                  <LinkCU as={Link} fontWeight="medium" href="/login">
                     Login Now
                  </LinkCU>
               </Text>
            </FormControl>
         </Stack>
      </Flex>
   )
}

export default ContainerRegister;