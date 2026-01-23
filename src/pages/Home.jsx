import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  FileText, 
  Search, 
  HelpCircle, 
  ChevronRight, 
  Shield, 
  Clock, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChatbotAssistente from '@/components/iza/ChatbotAssistente';
import WhatsAppConnect from '@/components/iza/WhatsAppConnect';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                alt="IZA Robô"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl">IZA+</h1>
              <p className="text-xs text-emerald-200">Ouvidoria Inteligente</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to={createPageUrl('ConsultarProtocolo')} className="text-sm hover:text-yellow-300 transition-colors">
              Consultar Protocolo
            </Link>
            <Link to={createPageUrl('Backoffice')} className="text-sm hover:text-yellow-300 transition-colors">
              Área Interna
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#004A8C] to-[#0066B3] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Inteligência Artificial a seu serviço</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Mais integridade,<br />
                <span className="text-blue-300">mais transparência</span><br />
                <span className="text-blue-300">e mais controle social</span>
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Registre sua manifestação de forma simples e acessível por texto, áudio, imagem ou vídeo. 
                A IZA+ utiliza inteligência artificial para agilizar o atendimento 
                e garantir que sua demanda chegue ao órgão certo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl('NovaManifestacao')}>
                  <Button size="lg" className="w-full sm:w-auto bg-blue-400 hover:bg-blue-500 text-white font-semibold h-14 px-8 text-lg shadow-xl">
                    <FileText className="w-5 h-5 mr-2" />
                    Registrar Manifestação
                  </Button>
                </Link>
                <Link to={createPageUrl('ConsultarProtocolo')}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 h-14 px-8">
                    <Search className="w-5 h-5 mr-2" />
                    Consultar Protocolo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                  <div className="w-72 h-72 bg-blue-400/20 rounded-full absolute -top-8 -left-8 animate-pulse" />
                <div className="w-80 h-80 bg-white/10 backdrop-blur rounded-3xl p-8 relative z-10 flex items-center justify-center">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                    alt="IZA+ Robô Assistente"
                    className="w-full h-full object-contain drop-shadow-2xl animate-float"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Manifestação */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Como podemos ajudar?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o tipo de manifestação que melhor se adequa à sua necessidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Denúncia', desc: 'Relate irregularidades', color: 'bg-red-500', icon: '🚨' },
              { name: 'Reclamação', desc: 'Reclame de serviços', color: 'bg-orange-500', icon: '📢' },
              { name: 'Sugestão', desc: 'Proponha melhorias', color: 'bg-blue-500', icon: '💡' },
              { name: 'Elogio', desc: 'Reconheça bom atendimento', color: 'bg-blue-500', icon: '⭐' },
            ].map((tipo) => (
              <Link key={tipo.name} to={createPageUrl('NovaManifestacao')}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 ${tipo.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {tipo.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">{tipo.name}</h4>
                    <p className="text-sm text-gray-500">{tipo.desc}</p>
                    <ChevronRight className="w-5 h-5 text-gray-400 mt-4 group-hover:translate-x-2 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Integration */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Atendimento pelo WhatsApp
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Registre e acompanhe suas manifestações de forma ainda mais prática através do WhatsApp
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <WhatsAppConnect />
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Sparkles, 
                title: 'Inteligência Artificial', 
                desc: 'A IZA+ analisa sua manifestação e sugere a classificação correta, agilizando o atendimento.' 
              },
              { 
                icon: Clock, 
                title: 'Resposta Rápida', 
                desc: 'Acompanhe o status em tempo real e receba atualizações sobre o andamento.' 
              },
              { 
                icon: Shield, 
                title: 'Anonimato Garantido', 
                desc: 'Faça denúncias de forma anônima com total proteção da sua identidade.' 
              },
              { 
                icon: MessageSquare, 
                title: 'WhatsApp Integrado', 
                desc: 'Registre manifestações por WhatsApp com texto, áudio, foto ou vídeo de forma prática.' 
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#004A8C] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                  alt="IZA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">IZA+ Ouvidoria</p>
                <p className="text-xs text-blue-300">Governo do Distrito Federal</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-blue-300 transition-colors">Central 162</a>
              <Link to={createPageUrl('Acessibilidade')} className="hover:text-blue-300 transition-colors">Acessibilidade</Link>
              <Link to={createPageUrl('Termos')} className="hover:text-blue-300 transition-colors">Termos e Privacidade</Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2025 Ouvidoria-Geral do Distrito Federal. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">Protótipo demonstrativo (MVP) - Desafio Participa DF</p>
          </div>
        </div>
      </footer>

      <ChatbotAssistente />
      <VLibrasWidget />
      </div>
      );
      }