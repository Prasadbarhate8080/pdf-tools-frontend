'use client'
import { useEffect, useState } from 'react'

function page() {
  let [messages, setMessages] = useState([])
  async function getMessages() {
    try {
      let response = await fetch('/api/get-messages')
      if (!response.ok) throw new Error(response.statusText)
      let data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMessages()
  }, [])
  return (
    <div className="mt-24">
      {messages.length > 0 ? (
        <ul className="flex flex-wrap items-start max-w-5xl h-48 mx-auto gap-2 border p-2">
          {messages.map((message, index) => (
            <li className="border" key={index}>
              <div>{message.name}</div>
              <div>{message.email}</div>
              <div>{message.subject}</div>
              <div>{message.message}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap max-w-6xl mx-auto gap-2">
          <span>No messages found</span>
        </div>
      )}
    </div>
  )
}

export default page
