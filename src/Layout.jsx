import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import NotificacaoButton from '@/components/notificacoes/NotificacaoButton';
import BarraAcessibilidade from '@/components/acessibilidade/BarraAcessibilidade';
import BarraNavegacaoInferior from '@/components/navegacao/BarraNavegacaoInferior';
import { useNotificationMonitor } from '@/components/notificacoes/useNotificationMonitor';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  useNotificationMonitor(user);
  // Páginas que não devem mostrar o header com notificações
  const paginasSemHeader = ['Home', 'NovaManifestacao', 'ConsultarProtocolo', 'Backoffice', 'Termos', 'FAQ', 'Acessibilidade', 'Notificacoes', 'ConfiguracoesNotificacoes'];

  if (paginasSemHeader.includes(currentPageName)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Barra de acessibilidade */}
      <BarraAcessibilidade />
      
      {/* Header com notificações */}
      <header className="bg-[#004A8C] text-white py-2 sm:py-3 shadow-md" role="banner">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity touch-manipulation focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-lg" aria-label="Voltar para página inicial">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center overflow-hidden" aria-hidden="true">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                  alt="Logo do robô IZA"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg">IZA+</h1>
                <p className="text-xs text-blue-100 hidden sm:block">Ouvidoria Inteligente</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <NotificacaoButton />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main>{children}</main>
      
      {/* Barra de navegação inferior (mobile) */}
      <BarraNavegacaoInferior />
    </div>
  );
}