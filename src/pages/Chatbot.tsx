
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import ApiKeyModal from '../components/ApiKeyModal';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chatbot = () => {
  const { user } = useGoogleAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getApiKey = () => {
    return localStorage.getItem('openai-api-key');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'คุณเป็นผู้ช่วยด้านสุขภาพที่เป็นมิตรและมีความรู้ กรุณาตอบคำถามเกี่ยวกับสุขภาพในภาษาไทยอย่างชัดเจนและเป็นประโยชน์ อย่าลืมแนะนำให้ปรึกษาแพทย์สำหรับอาการที่รุนแรงหรือต้องการการรักษา'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: inputMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-medical-light">
        <div className="container-custom py-8 h-full">
          <div className="max-w-4xl mx-auto h-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-medical-dark">แชทบอทสุขภาพ</h1>
                <p className="text-gray-600">พูดคุยกับ AI เกี่ยวกับปัญหาสุขภาพของคุณ</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsApiKeyModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                ตั้งค่า API Key
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
              {/* Messages area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-medical-blue" />
                    <p>เริ่มการสนทนาโดยการพิมพ์ข้อความด้านล่าง</p>
                    <p className="text-sm mt-2">ฉันพร้อมให้คำแนะนำเกี่ยวกับสุขภาพของคุณ</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-medical-blue text-white' 
                          : 'bg-gray-100 text-medical-blue'
                      }`}>
                        {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-medical-blue text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <span className={`text-xs mt-1 block ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('th-TH', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-medical-blue flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="max-w-[70%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="พิมพ์ข้อความของคุณ..."
                    className="flex-grow resize-none"
                    rows={2}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  กด Enter เพื่อส่งข้อความ หรือ Shift+Enter เพื่อขึ้นบรรทัดใหม่
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
      />
    </div>
  );
};

export default Chatbot;
