import { useEffect } from "react";
import { Container, Text, Stack, Divider, Heading, Box, Flex, Input, Spacer, Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [messageReceieved, setMessageReceived] = useState("");
  
  
  // rooms related states
  const [room, setRoom] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  const [roomMessageReceieved, setRoomMessageReceived] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", message);
    socket.emit("send_message", {
        message: message 
    });
    setMessage("")
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
        
    });
  }, [socket])
  

  return (
<Container>

    <Container maxW='2xl' bg='#424769' centerContent>
    <Box padding='4' bg='#F6B17A' color='black' maxW='md'>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <Heading>
            Single Messages
          </Heading>
          <FormLabel>Type Message</FormLabel>
          <Input
            type="text"
            placeholder="Enter your message"
            value={message}
            focusBorderColor='pink.400'
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
        <Flex>
        {messageReceieved && <Box p='4' bg='red.400'>
          {messageReceieved}
        </Box>}
        <Spacer />
        </Flex>
        <Button colorScheme="teal" onClick={handleLogin}>
          Send Message
        </Button>
      </VStack>
    </Box>
    </Container>

<Container maxW='2xl' bg='#CCC' centerContent>
<Stack direction='row' h='100px' p={4}>
<Divider orientation='vertical' />
<Heading>Multiple Room</Heading>
</Stack>
</Container>
<Container maxW='2xl' bg='#43766C' centerContent>
    <Box padding='4' bg='#76453B' color='black' maxW='md'>
      <VStack spacing={4} align="stretch">
      <FormControl>
          <Heading>
            Multiple Messages
          </Heading>
          <FormLabel>Type Message</FormLabel>
          <Input
            type="text"
            placeholder="Room Number..."
            value={roomMessage}
            focusBorderColor='pink.400'
            onChange={(e) => setRoom(e.target.value)}
          />
           <Button colorScheme="teal" onClick={joinRoom}>
          Send Message
        </Button>
        </FormControl>
        <FormControl>
          <Heading>
            Multiple Messages
          </Heading>
          <FormLabel>Type Message</FormLabel>
          <Input
            type="text"
            placeholder="Enter your message"
            value={roomMessage}
            focusBorderColor='pink.400'
            onChange={(e) => setRoomMessage(e.target.value)}
          />
        </FormControl>
        <Flex>
        {roomMessageReceieved && <Box p='4' bg='red.400'>
          {roomMessageReceieved}
        </Box>}
        <Spacer />
        </Flex>
        <Button colorScheme="teal" onClick={sendMessage}>
          Send Message
        </Button>
      </VStack>
    </Box>
    </Container>
</Container>
  );
};


export default LoginForm;
