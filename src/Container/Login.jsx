import React from 'react';
import{Button, Flex, HStack, Image} from "@chakra-ui/react";
import MusicBg from "../img/musicbg.jpg";
import {FcGoogle}  from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {} from 'firebase/firestore';
import { firebaseApp} from '../firebase-config';
import {useNavigate} from "react-router-dom";

const Login = () => {

  const firebaseAuth = getAuth(firebaseApp);
  const provider     = new GoogleAuthProvider();

  const navigate = useNavigate();

   const login = async () =>{
      const {user} = await signInWithPopup(firebaseAuth,provider);
      const {refreshToken, providerData} = user;

      localStorage.setItem("user", JSON.stringify(providerData));
      localStorage.setItem("accessToken", JSON.stringify(refreshToken));
   };


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
          <Button leftIcon={<FcGoogle fontSize={25}/>}
           colorScheme="whiteAlpha"
           shadow={'lg'}
           onClick={() => login()}
           >
           Signin With Google
          </Button>
       </HStack>
     </Flex>
     </Flex>);
};

export default Login