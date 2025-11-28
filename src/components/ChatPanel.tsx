'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ChatPanel = ({ isOpen, setIsOpen }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm Spencer's AI assistant. I can help answer questions about his work, experience, or how he might be able to help your business. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    // Track chat message sent
    if (typeof window !== 'undefined' && window.OmniWolf) {
      window.OmniWolf.track('chat_message_sent', {
        message_length: inputValue.length,
        message_count: messages.filter(m => m.isUser).length + 1,
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Send to n8n webhook (replace with your actual webhook URL)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Track successful chat response
        if (typeof window !== 'undefined' && window.OmniWolf) {
          window.OmniWolf.track('chat_response_received', {
            response_type: 'success',
            response_length: data.response?.length || 0
          })
        }
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || "I'm processing your message. Spencer will get back to you soon!",
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Track chat error
      if (typeof window !== 'undefined' && window.OmniWolf) {
        window.OmniWolf.track('chat_response_received', {
          response_type: 'error',
          error_message: 'Failed to send message'
        })
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm having trouble connecting right now, but Spencer will see your message and get back to you soon. You can also reach him directly at hello@spencertoogood.com",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => {
          // Track chat panel toggle
          if (typeof window !== 'undefined' && window.OmniWolf) {
            window.OmniWolf.track('chat_panel_toggle', {
              action: isOpen ? 'close' : 'open',
              device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            })
          }
          
          setIsOpen(!isOpen)
        }}
        className={`fixed bottom-6 z-50 w-14 h-14 bg-st-navy rounded-full flex items-center justify-center text-white shadow-lg hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'md:right-[420px] md:rotate-45 right-6' : 'right-6'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Desktop Chat Panel - Sidebar Style */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-40 hidden md:block ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="bg-st-navy text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center mr-3">
              <span className="text-st-navy font-bold text-sm">AI</span>
            </div>
            <div>
              <h3 className="font-semibold">Spencer&apos;s Assistant</h3>
              <p className="text-xs opacity-75">Usually replies instantly</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-140px)] space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-st-navy text-white rounded-br-none'
                    : 'bg-st-gray-100 text-st-navy rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.isUser ? 'text-st-gray-200' : 'text-st-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-st-gray-100 text-st-navy p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-st-gray-200 bg-white flex-shrink-0">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Spencer's work..."
              className="flex-1 px-3 py-2 border border-st-gray-200 rounded-full focus:outline-none focus:border-st-cyan text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-st-navy text-white rounded-full flex items-center justify-center hover:bg-st-cyan hover:text-st-navy transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Chat Panel - Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Full-screen backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom sheet modal */}
          <div className="relative h-full flex items-end">
            <div className="w-full bg-white rounded-t-3xl shadow-xl max-h-[80vh] flex flex-col transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-8 fade-in-50">
              {/* Header with close button */}
              <div className="bg-st-navy text-white p-4 flex items-center justify-between flex-shrink-0 rounded-t-3xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center mr-3">
                    <span className="text-st-navy font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Spencer&apos;s Assistant</h3>
                    <p className="text-xs opacity-75">Usually replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Track mobile chat close
                    if (typeof window !== 'undefined' && window.OmniWolf) {
                      window.OmniWolf.track('chat_panel_toggle', {
                        action: 'close',
                        device: 'mobile',
                        location: 'header_close_button'
                      })
                    }
                    
                    setIsOpen(false)
                  }}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:text-st-navy rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-st-navy text-white rounded-br-none'
                          : 'bg-st-gray-100 text-st-navy rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.isUser ? 'text-st-gray-200' : 'text-st-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-st-gray-100 text-st-navy p-3 rounded-2xl rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-st-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-st-gray-200 bg-white flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Spencer's work..."
                    className="flex-1 px-3 py-2 border border-st-gray-200 rounded-full focus:outline-none focus:border-st-cyan text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 bg-st-navy text-white rounded-full flex items-center justify-center hover:bg-st-cyan hover:text-st-navy transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatPanel