import React, {useState, useRef} from 'react';
import axios from 'axios';

export default function ChatWindow({backendUrl}) {
  const [messages, setMessages] = useState([
    {role: 'system', content: 'You are NeoStats Assistant. Provide clear, concise answers.'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef();

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = {role: 'user', content: input.trim()};
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const resp = await axios.post(`${backendUrl}/chat`, { messages: newMsgs });
      const assistantText = resp.data?.choices?.[0]?.message?.content || resp.data?.result || 'No reply';
      const assistantMsg = {role: 'assistant', content: assistantText};
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {role:'assistant', content: 'Error: failed to get response.'}]);
      console.error(err);
    } finally {
      setLoading(false);
      messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
    }
  };

  return (
    <div style={{maxWidth:800, margin:'auto'}}>
      <div style={{border:'1px solid #ddd', padding:12, minHeight:300, overflowY:'auto'}}>
        {messages.filter(m => m.role!=='system').map((m, i) => (
          <div key={i} style={{margin:8, textAlign: m.role === 'user' ? 'right' : 'left'}}>
            <div style={{display:'inline-block', background: m.role==='user' ? '#e6f7ff':'#f1f1f1', padding:8, borderRadius:8}}>
              <b>{m.role}</b>: <span>{m.content}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>

      <div style={{display:'flex', gap:8, marginTop:8}}>
        <input value={input} onChange={e => setInput(e.target.value)} style={{flex:1}} onKeyDown={e => {if(e.key==='Enter') send();}}/>
        <button onClick={send} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
}
