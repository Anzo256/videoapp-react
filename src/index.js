import React from "react";
import App from "./App";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import {BrowserRouter as Router} from 'react-router-dom';
import { theme } from "./theme";

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <ChakraProvider>
        <ColorModeScript  initialColorMode={theme.config.initialColorMode}/>
        <Router>
        <App/>
        </Router>
    </ChakraProvider> 
 );
