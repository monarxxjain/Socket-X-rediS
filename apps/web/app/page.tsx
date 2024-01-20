'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider'
import classes from './page.module.css'

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  
  return (
    <div>
      <div>
        <input onChange={ e => setMessage(e.target.value) } className={classes["chat-input"]} placeholder="Message..." />
        <button onClick={ e => sendMessage(message) } className={classes["button"]}>Send</button>
      </div>
      <ul>
        {messages.map((msg, id) => {
          return(
            <li key={id}>{msg}</li>
          )
        })}
      </ul>
    </div>
  )
}