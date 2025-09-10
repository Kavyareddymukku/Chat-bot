import React from 'react';
import ChatWindow from './components/ChatWindow';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  return (
    <div>
      <h2 style={{textAlign:'center'}}>NeoStats Chatbot — Demo</h2>
      <ChatWindow backendUrl={backendUrl} />
    </div>
  );
}

export default App;
