import Link from "next/link";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Container, Box, Flex, Heading, Menu, MenuList, MenuItem, MenuButton, Button, Avatar, Icon } from "@chakra-ui/react";
import { IoChevronDownOutline, IoLogOutOutline, IoNotificationsOutline, IoPersonOutline } from 'react-icons/io5';

import { UserContext } from "@/context/userContextProvider";
import useQueries from "@/hooks/useQueries";

const Header = () => {
   const router = useRouter();
   const { useMutate } = useQueries();
   const isLogin = !!Cookies.get('stoken');
   const profile = useContext(UserContext);

   const onLogout = async () => {
      const resp = await useMutate({ prefixUrl: '/logout', payload:{} });
      if(resp?.success){
         Cookies.remove('stoken');
         router.reload();
      }
   }

   return (
      <Container>
         <Box height="5vh">
            <Flex
               height="full"
               alignItems="center"
               justifyContent="space-between"
               padding="2"
               borderBottom="1px"
               borderBottomColor="gray.200"
            >
               <Heading as={Link} size="md" href="/">
                  Sanber Daily
               </Heading>
               {isLogin && (
                  <Menu placement="bottom-end">
                     <MenuButton
                        as={Button}
                        size="sm"
                        leftIcon={<Avatar name={profile?.name || "AP"} size="xs" />}
                        rightIcon={<Icon as={IoChevronDownOutline} boxSize="5" />}
                     />
                     <MenuList zIndex="3">
                        <MenuItem
                           as={Link}
                           href='/profile'
                           icon={<Icon as={IoPersonOutline} boxSize="5" />}
                        >
                           My Profile
                        </MenuItem>
                        <MenuItem
                           as={Link}
                           href='/notifications'
                           icon={<Icon as={IoNotificationsOutline} boxSize="5" />}
                        >
                           Notifikations
                        </MenuItem>
                        <MenuItem
                           onClick={onLogout}
                           icon={<Icon as={IoLogOutOutline} boxSize="5" />}
                        >
                           Logout
                        </MenuItem>
                     </MenuList>
                  </Menu>
               )}
            </Flex>
         </Box>
      </Container>
   )
}

export default Header;
