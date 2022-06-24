import React, { useEffect } from 'react';
import { WebXRApp } from './webxr/webxr-app';

function App() {

  useEffect(() => {
    const webXR = new WebXRApp();
  }, [])
  console.log('test change')
  return (
    <div className="App">

    </div>
  );
}

export default App;
