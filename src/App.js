import React from 'react';
import './App.css';
import {Main, Navigation} from "./Routing";

function App() {
    return (
        <div className={'app'}>
            <Navigation/>
            <Main/>
        </div>
    );
}

export default App;
