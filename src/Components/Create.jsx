//prettier-ignore
import {Input, Flex, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Button, Text, InputGroup, InputLeftElement, FormLabel, Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import { IoChevronDown, IoLocation } from 'react-icons/io5';
import { categories } from '../data';

const Create = () => {
  const { colorMode} = useColorMode();
  const bg = useColorModeValue('gray.600','gray.300');
  const textColor = useColorModeValue("gray.900", "gray.50");


  const [title, settitle] = useState('');
  const [category, setCategory] = useState('Choose a category');
  const [location, setLocation] = useState('');
  const [videoAsset, setVideoAsset] = useState(null);

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
                hi
              </Flex>
            </Flex>

          </FormLabel>
        ) :  (<Box>Something</Box>)} 
       </Flex>
      </Flex>
    </Flex>
  )
}

export default Create