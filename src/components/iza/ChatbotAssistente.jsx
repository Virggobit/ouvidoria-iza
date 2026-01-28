import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';

const perguntasFrequentes = [
  'Como registrar uma denúncia?',
  'Posso fazer de forma anônima?',
  'Quanto tempo leva para ter resposta?',
  'Como acompanho minha manifestação?',
];

export default function ChatbotAssistente() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou a IZA+, sua assistente virtual. Como posso ajudar você hoje? 😊',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Você é a IZA+, assistente virtual da Ouvidoria do Distrito Federal.
        
Contexto: O cidadão está usando o sistema IZA+ para registrar manifestações (denúncias, reclamações, elogios, sugestões).

Pergunta do cidadão: ${text}

Responda de forma clara, objetiva e amigável em português do Brasil. 
Seja útil e direcione o cidadão sobre como usar o sistema.
Mantenha respostas curtas (máximo 3-4 linhas).

Se for sobre:
- Como registrar: explique que pode registrar por texto, áudio, imagem ou vídeo
- Anonimato: pode optar por anonimato no início do processo
- Protocolo: sempre gera protocolo automático para acompanhamento
- Tempo: depende da complexidade, mas todas são analisadas pela equipe
- Status: pode consultar pelo número do protocolo`,
      });

      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro no chat:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, tive um problema. Tente novamente ou ligue para 162.',
      }]);
    }
    setIsTyping(false);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#0E6B4E] hover:bg-[#0B3D2E] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-[9999] group"
          aria-label="Abrir assistente IZA+"
        >
          <div className="relative">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
              alt="IZA"
              className="w-10 h-10 object-cover"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-2rem)] sm:h-[600px] max-h-[calc(100vh-2rem)] sm:max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B3D2E] to-[#0E6B4E] text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                  alt="IZA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">IZA+</h3>
                <p className="text-xs text-emerald-200">Assistente Virtual</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5',
                    message.role === 'user'
                      ? 'bg-[#0E6B4E] text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t bg-white">
              <p className="text-xs text-gray-500 mb-2">Perguntas frequentes:</p>
              <div className="flex flex-wrap gap-2">
                {perguntasFrequentes.map((pergunta, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(pergunta)}
                    className="text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full transition-colors"
                  >
                    {pergunta}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputText.trim() || isTyping}
                className="bg-[#0E6B4E] hover:bg-[#0B3D2E]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}