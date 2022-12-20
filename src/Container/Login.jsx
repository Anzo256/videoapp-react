import React from 'react';
import{Button, Flex, HStack, Image} from "@chakra-ui/react";
import MusicBg from "../img/musicbg.jpg";
import {FcGoogle}  from "react-icons/fc";

const Login = () => {
   
     return (
     <Flex 
     justifyContent={'center'}
     alignContent={'center'}
     width={"100vw"}
     height={'100vh'}
     position={'relative'}
     >  
     <Image src={MusicBg} objectFit="cover"  width={'full'} height={'full'}/>

     <Flex position={'absolute'}
     width={'100vw'}
     height={'100vh'}
     bg={'blackAlpha.600'}
     top={0}
     left={0}
     justifyContent={'center'}
     alignItems={'center'}
     >
       <HStack>
          <Button leftIcon={<FcGoogle fontSize={25}/>} colorScheme="whiteAlpha" shadow={'lg'}>
               Signin With Google
          </Button>
       </HStack>
     </Flex>
     </Flex>);
};

export default Login