import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import NotificacaoButton from '@/components/notificacoes/NotificacaoButton';
import BarraAcessibilidade from '@/components/acessibilidade/BarraAcessibilidade';

export default function Layout({ children, currentPageName }) {
  // Páginas que não devem mostrar o header com notificações
  const paginasSemHeader = ['Home', 'NovaManifestacao', 'ConsultarProtocolo', 'Backoffice', 'Termos', 'FAQ', 'Acessibilidade', 'Notificacoes', 'ConfiguracoesNotificacoes'];

  if (paginasSemHeader.includes(currentPageName)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      {/* Barra de acessibilidade */}
      <BarraAcessibilidade />
      
      {/* Header com notificações */}
      <header className="bg-[#004A8C] text-white py-3 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
                  alt="IZA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">IZA+</h1>
                <p className="text-xs text-blue-200">Ouvidoria Inteligente</p>
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
    </div>
  );
}