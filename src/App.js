import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import LoginForm from './components/form';
import './App.css';

function App() {
  return (
    <div className="App">
          <ChakraProvider>
      <LoginForm />
    </ChakraProvider>
    </div>
  );
}

export default App;
