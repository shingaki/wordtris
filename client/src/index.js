import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";


// This is the ID of the div in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);



// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
