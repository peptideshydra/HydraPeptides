import { useState, useRef, useEffect } from 'react'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const initialMessages: Message[] = [
  { from: 'bot', text: 'Hi there! 👋' },
  { from: 'bot', text: "I'm your Hydra Peptides assistant and can help you find products." },
  { from: 'bot', text: 'Note: All products are sold for *research use only*.' },
]

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32">
      <path fill="currentColor" d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32">
      <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="m2 21l21-9L2 3v7l15 2l-15 2z" />
    </svg>
  )
}

function renderText(text: string) {
  return text.replace(/\*(.*?)\*/g, '<em>$1</em>')
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: 'Error in workflow' }])
      setTyping(false)
    }, 800 + Math.random() * 600)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9990] flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div
          className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#e5e7eb]"
          style={{ width: 'min(380px, calc(100vw - 40px))', height: 'min(520px, calc(100vh - 120px))' }}
        >
          {/* Header */}
          <div className="shrink-0 px-5 py-4" style={{ background: 'linear-gradient(135deg, #0a9edd 0%, #004974 100%)' }}>
            <h3 className="font-primary font-semibold text-[16px] text-white leading-tight">Need product advice?</h3>
            <p className="font-primary text-[13px] text-white/70 mt-0.5">Chat with our research-only assistant.</p>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: '#f8f9fa' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`font-primary text-[13px] leading-relaxed px-3.5 py-2.5 rounded-2xl max-w-[80%] ${
                    msg.from === 'user'
                      ? 'bg-[#0a9edd] text-white rounded-br-md'
                      : 'bg-white text-[#333] border border-[#e5e7eb] rounded-bl-md'
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                />
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#e5e7eb] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-[#e5e7eb] bg-white px-4 py-3 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question..."
              className="flex-1 resize-none font-primary text-[13px] text-[#333] outline-none bg-transparent py-1.5 leading-snug"
              rows={1}
              style={{ maxHeight: 80 }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || typing}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none ${
                input.trim() && !typing ? 'bg-[#0a9edd] text-white' : 'bg-[#e5e7eb] text-[#aaa]'
              }`}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer border-none"
        style={{ background: 'linear-gradient(135deg, #0a9edd 0%, #004974 100%)' }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <ChevronDownIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  )
}
