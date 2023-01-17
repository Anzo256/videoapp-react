//prettier-ignore
import {Input, Flex, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Button, Text, InputGroup, InputLeftElement, FormLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { IoChevronDown, IoCloudUpload, IoLocation, IoTrash } from 'react-icons/io5';
import { categories } from '../data';
import Spinner from './Spinner';

//prettier-ignore
import {getStorage,ref,uploadBytesResumable,getDownloadURL,deleteObject} from "firebase/storage";
import {firebaseApp} from "../firebase-config";

const Create = () => {
  const { colorMode} = useColorMode();
  const bg = useColorModeValue('gray.600','gray.300');
  const textColor = useColorModeValue("gray.900", "gray.50");


  const [title, settitle] = useState('');
  const [category, setCategory] = useState('Choose a category');
  const [location, setLocation] = useState('');
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1)

  const storage = getStorage(firebaseApp);

  const uploadImage = (e) => {
      setLoading(true)
      const videoFile = e.target.files[0];
      const storageRef = ref(storage,`videos/${Date.now()}-${videoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef,videoFile);

      uploadTask.on('state_changed',(snapshot) =>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(uploadProgress)
    },(error)=>{
     console.log(error);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setVideoAsset(downloadURL)
        setLoading(false)
      });
    });

  };

  const deleteImage =()=>{
    const deleteRef = ref(storage,videoAsset);
    deleteObject(deleteRef).then(()=>{
      setVideoAsset(null);
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
  
  },[videoAsset])

  return (
    <Flex justifyContent={'center'}
    alignItems='center'
    width={'95%'}
    minHeight='100vh'
    padding={10}
    >
      <Flex width={'80%'} 
      height='full' 
      border={'1px'} 
      borderColor='grey.300'
      borderRadius={'md'}
      p='4'
      flexDirection={"column"}
      alignItems="center"
      justifyContent={'center'}
      gap={2}
      >
       <Input 
       variant={'flushed'} 
       placeholder="Title"
       focusBorderColor="gray.400"
       isRequired
       errorBorderColor='red'
       type={'text'}
       _placeholder={{color : "gray.500"}}
       fontSize={20}
       value={title}
       onChange={(e)=> settitle(e.target.value)}
       />
       <Flex justifyContent={'space-between'}
       width='full'
       alignItems={'center'}
       gap={8}
       my={4}
       >
        <Menu>
          <MenuButton 
          width={'full'} 
          colorScheme="blue"   as={Button} rightIcon={<IoChevronDown fontSize={25} />}>
            {category}
          </MenuButton>
          <MenuList>
           {categories && categories.map(data => (
            <MenuItem key={data.id}
            _hover={{bg : 'blackAlpha.300'}}
            fontSize={20}
            px={4}
            onClick={() => setCategory(data.name)}
            >
              {data.iconSrc} <Text fontSize={18}
              ml={4}>{data.name}</Text>
            </MenuItem>
           ))}
          </MenuList>
        </Menu>

          <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<IoLocation fontSize={20} color={`${colorMode ==='dark' ? '#f1f1f1' : '#111'}`}/>}
          />
          <Input 
           variant={'flushed'} 
            placeholder="Location"
            focusBorderColor="gray.400"
            isRequired
            errorBorderColor='red'
            type={'text'}
            _placeholder={{color : "gray.500"}}
            fontSize={20}
            value={location}
            onChange={(e)=> setLocation(e.target.value)}
           />
        </InputGroup>
       </Flex>

       {/**file selection */}
       <Flex
       border={'1px'}
       borderColor="gray.500"
       height={'400px'}
       borderStyle='dashed'
       width="full"
       borderRadius={'md'}
       overflow='hidden'
       position={'relative'}
       >
        {!videoAsset ?  (
          <FormLabel width="full">
            <Flex direction={'column'}
            alignItems="center"
            justifyContent={'center'}
            height='full'
            width={'full'}
            >
            <Flex direction={'column'}
             alignItems="center"
             justifyContent={'center'}
             height='full'
             width={'full'}
             cursor='pointer'
              >
                {loading ? (
                  <Spinner  msg={'Uploading Your Video'} progress={progress}/>
                ) : (
                  <>
                   <IoCloudUpload 
                   fontSize={30} 
                   color={`${colorMode ==='dark' ? '#f1f1f1' : '#111'}`}
                   />
                   <Text mt={5} fontSize={20} color={textColor}>
                     Click to upload
                   </Text>
                  </>
                )}
              </Flex>
            </Flex>

           {!loading && (
             <input 
             type={'file'}
             name='upload-image'
             onChange={uploadImage}
             style={{width : 0 , height : 0}}
             accept="video/mp4,video/x-m4v,video/*"
             />
             
           )}
          </FormLabel>
        ) :  (
          <Flex
          width={'full'}
          height="full"
          justifyContent={"center"}
          alignItems={"center"}
          bg="black"
          position={"relative"}
          >
          <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={'40px'}
          height={"40px"}
          rounded="full"
          bg={'red'}
          top={5}
          right={5}
          position={"absolute"}
          cursor={"pointer"}
          zIndex={10}
          onClick={deleteImage}
          >
         <IoTrash fontSize={20} color="white"/>
          </Flex>
          <video
          src={videoAsset}
          controls
          style={{width: "100%", height:"100%"}}
          />
          </Flex>
        )} 
       </Flex>
      </Flex>
    </Flex>
  )
}

export default Create