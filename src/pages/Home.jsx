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
import InstallPrompt from '@/components/pwa/InstallPrompt';
import BarraAcessibilidade from '@/components/acessibilidade/BarraAcessibilidade';
import BarraNavegacaoInferior from '@/components/navegacao/BarraNavegacaoInferior';
import NotificationPermissionPrompt from '@/components/notificacoes/NotificationPermissionPrompt';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16 md:pb-0">
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-900 focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400 font-semibold text-base"
      >
        Pular para o conteúdo principal
      </a>
      
      {/* Barra de acessibilidade */}
      <BarraAcessibilidade />
      
      {/* Header */}
      <header className="bg-[#004A8C] text-white" role="banner">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden" aria-hidden="true">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                    alt="IZA - Robô mascote da Ouvidoria Inteligente do Distrito Federal"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-xl">IZA+</h1>
                  <p className="text-xs text-blue-100">Ouvidoria Inteligente</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
                <a 
                  href="https://www.participa.df.gov.br/static/faq-participa-df" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-lg"
                  aria-label="Acessar site do Participa DF - abre em nova aba"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/4add5d15f_Logo_participa_Horizontal-endereco-1.png" 
                    alt="Logo do Participa DF - Plataforma de participação social do Distrito Federal"
                    className="h-32 lg:h-40 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Menu principal">
                <Link to={createPageUrl('Acessibilidade')} className="text-sm hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">
                  Acessibilidade
                </Link>
                <Link to={createPageUrl('Artefatos')} className="text-sm hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">
                  Artefatos
                </Link>
                <Link to={createPageUrl('ConsultarProtocolo')} className="text-sm hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">
                  Consultar Protocolo
                </Link>
                <Link to={createPageUrl('AcessoBackoffice')} className="text-sm hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">
                  Área Interna
                </Link>
              </nav>
              <button 
                className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded" 
                onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
                aria-label="Abrir menu de navegação"
                aria-expanded="false"
                aria-controls="mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav id="mobile-menu" className="hidden md:hidden bg-[#004A8C] border-t border-white/10" role="navigation" aria-label="Menu mobile">
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
          <Link to={createPageUrl('Acessibilidade')} className="block py-3 text-base hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2">
            Acessibilidade
          </Link>
          <Link to={createPageUrl('Artefatos')} className="block py-3 text-base hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2">
            Artefatos
          </Link>
          <Link to={createPageUrl('ConsultarProtocolo')} className="block py-3 text-base hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2">
            Consultar Protocolo
          </Link>
          <Link to={createPageUrl('AcessoBackoffice')} className="block py-3 text-base hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2">
            Área Interna
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="main-content" className="bg-gradient-to-br from-[#004A8C] to-[#0066B3] text-white py-16 md:py-24" role="region" aria-label="Seção principal de boas-vindas">
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to={createPageUrl('NovaManifestacao')} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-semibold h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg shadow-xl touch-manipulation focus:outline-none focus:ring-4 focus:ring-yellow-400" aria-label="Registrar nova manifestação">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                    Registrar Manifestação
                  </Button>
                </Link>
                <Link to={createPageUrl('ConsultarProtocolo')} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 active:scale-95 h-12 sm:h-14 px-6 sm:px-8 font-semibold touch-manipulation focus:outline-none focus:ring-4 focus:ring-yellow-400" aria-label="Consultar protocolo de manifestação">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                    Consultar Protocolo
                  </Button>
                </Link>
                <a href="https://www.participa.df.gov.br/static/orientacao-manifestacao" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 active:scale-95 h-12 sm:h-14 px-6 sm:px-8 font-semibold touch-manipulation focus:outline-none focus:ring-4 focus:ring-yellow-400" aria-label="Ver orientações sobre manifestações - abre em nova aba">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                    Orientações
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center" role="img" aria-label="Ilustração do robô IZA, mascote da Ouvidoria Inteligente">
              <div className="relative">
                  <div className="w-72 h-72 bg-blue-400/20 rounded-full absolute -top-8 -left-8 animate-pulse will-change-transform" aria-hidden="true" />
                <div className="w-80 h-80 bg-white/10 backdrop-blur rounded-3xl p-8 relative z-10 flex items-center justify-center">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                    alt="Robô IZA+ - Assistente virtual inteligente da Ouvidoria do Distrito Federal"
                    className="w-full h-full object-contain drop-shadow-2xl animate-float will-change-transform"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Manifestação */}
      <section className="py-16 md:py-24" role="region" aria-label="Tipos de manifestação disponíveis">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como podemos ajudar?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Escolha o tipo de manifestação que melhor se adequa à sua necessidade
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Denúncia', desc: 'Relate irregularidades', color: 'bg-red-500', icon: '🚨' },
              { name: 'Reclamação', desc: 'Reclame de serviços', color: 'bg-orange-500', icon: '📢' },
              { name: 'Sugestão', desc: 'Proponha melhorias', color: 'bg-blue-500', icon: '💡' },
              { name: 'Elogio', desc: 'Reconheça bom atendimento', color: 'bg-blue-500', icon: '⭐' },
            ].map((tipo) => (
              <Link key={tipo.name} to={createPageUrl('NovaManifestacao')}>
                <Card className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer border-0 shadow-md active:scale-95 touch-manipulation h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${tipo.color} rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform will-change-transform`}>
                      {tipo.icon}
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{tipo.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">{tipo.desc}</p>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-2 sm:mt-4 group-hover:translate-x-2 transition-transform" />
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
      <section className="bg-slate-50 py-12 md:py-24" role="region" aria-label="Benefícios da plataforma IZA+">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { 
                icon: Sparkles, 
                title: 'Inteligência Artificial', 
                desc: 'A IZA+ analisa sua manifestação e sugere a classificação correta, agilizando o atendimento.',
                ariaLabel: 'Benefício: Inteligência Artificial'
              },
              { 
                icon: Clock, 
                title: 'Resposta Rápida', 
                desc: 'Acompanhe o status em tempo real e receba atualizações sobre o andamento.',
                ariaLabel: 'Benefício: Resposta Rápida'
              },
              { 
                icon: Shield, 
                title: 'Anonimato Garantido', 
                desc: 'Faça denúncias de forma anônima com total proteção da sua identidade.',
                ariaLabel: 'Benefício: Anonimato Garantido'
              },
              { 
                icon: MessageSquare, 
                title: 'WhatsApp Integrado', 
                desc: 'Registre manifestações por WhatsApp com texto, áudio, foto ou vídeo de forma prática.',
                ariaLabel: 'Benefício: WhatsApp Integrado'
              },
            ].map((benefit, i) => (
              <article key={i} className="text-center" aria-label={benefit.ariaLabel}>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#004A8C] text-white py-12" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden" aria-hidden="true">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                  alt="Logo do robô IZA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">IZA+ Ouvidoria</p>
                <p className="text-xs text-blue-300">Governo do Distrito Federal</p>
              </div>
            </div>
            <nav className="flex items-center gap-6 text-sm" role="navigation" aria-label="Menu do rodapé">
              <a href="https://ouvidoria.df.gov.br/category/ouvidoria/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1" aria-label="Central 162 - abre em nova aba">Central 162</a>
              <Link to={createPageUrl('FAQ')} className="hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">Perguntas Frequentes</Link>
              <Link to={createPageUrl('Acessibilidade')} className="hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">Acessibilidade</Link>
              <Link to={createPageUrl('Termos')} className="hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1">Termos e Privacidade</Link>
            </nav>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2025 Ouvidoria-Geral do Distrito Federal. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">Protótipo demonstrativo (MVP) - Desafio Participa DF</p>
          </div>
        </div>
      </footer>

      <ChatbotAssistente />
      <VLibrasWidget />
      <InstallPrompt />
      <NotificationPermissionPrompt />
      <BarraNavegacaoInferior />
      </div>
      );
      }