import { useState } from "react";
import Link from "next/link";
import { Flex, Stack, Heading, FormControl, InputGroup, Input, InputRightElement, Button, Text, Link as LinkCU } from "@chakra-ui/react";

import useQueries from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ContainerLogin = () => {
   const router = useRouter();
   const { useMutate, isLoadingSubmit } = useQueries();
   const [isShow, setIsShow] = useState(false);
   const [formdata, setFormData] = useState({ email: 'rehan@mail.com', password: '12345'});

   const setShowPassword = () => setIsShow(s => !s);

   const onSubmit = async () => {
      const resp = await useMutate({ prefixUrl: '/login', payload: formdata, title: 'Login' });
      if(resp?.success) {
         Cookies.set('stoken', resp?.data?.token, {
            expires: new Date(resp?.data?.expires_at),
            path: '/'
         });
         router.reload();
      }
   }

   return (
      <Flex alignItems="center" justifyContent="center">
         <Stack direction="column">
            <Heading as="h4" size="md" textAlign="center" mb="3">
               LOGIN
            </Heading>
            <FormControl isRequired>
               <Input
                  placeholder="Email ..."
                  value={formdata.email}
                  onChange={(e) => setFormData(s => ({ ...s, email: e.target.value }) )}
               />
            </FormControl>
            <FormControl>
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
            <FormControl>
               <Button
                  width="full"
                  colorScheme="messenger"
                  isLoading={isLoadingSubmit}
                  onClick={onSubmit}
               >
                  Login
               </Button>
            </FormControl>
            <FormControl>
               <Text>
                  Do you have account ?{" "}
                  <LinkCU as={Link} fontWeight="medium" href="/register">
                     Register Now
                  </LinkCU>
               </Text>
            </FormControl>
         </Stack>
      </Flex>
   )
}

export default ContainerLogin;