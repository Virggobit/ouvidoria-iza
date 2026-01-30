import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, FileText, Search, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BarraNavegacaoInferior() {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Início',
      icon: Home,
      path: 'Home',
      ariaLabel: 'Ir para página inicial'
    },
    {
      name: 'Registrar',
      icon: FileText,
      path: 'NovaManifestacao',
      ariaLabel: 'Registrar nova manifestação'
    },
    {
      name: 'Consultar',
      icon: Search,
      path: 'ConsultarProtocolo',
      ariaLabel: 'Consultar protocolo'
    },
    {
      name: 'Ajuda',
      icon: HelpCircle,
      path: 'FAQ',
      ariaLabel: 'Perguntas frequentes e ajuda'
    }
  ];

  const isActive = (path) => {
    return location.pathname === createPageUrl(path) || location.pathname === `/${path}`;
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40 safe-area-inset-bottom"
      role="navigation"
      aria-label="Navegação principal inferior"
    >
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={createPageUrl(item.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:scale-95",
                active 
                  ? "text-[#004A8C] bg-blue-50" 
                  : "text-gray-500 hover:text-[#004A8C] hover:bg-gray-50"
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className={cn("w-6 h-6 mb-1", active && "stroke-[2.5]")} />
              <span className={cn(
                "text-xs",
                active && "font-semibold"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}