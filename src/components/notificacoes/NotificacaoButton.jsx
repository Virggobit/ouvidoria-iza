import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, Check, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificacaoButton() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoLidas, setNaoLidas] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (user) {
      carregarNotificacoes();
      
      // Atualizar a cada 30 segundos
      const interval = setInterval(carregarNotificacoes, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const carregarUsuario = async () => {
    try {
      const userData = await base44.auth.me();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const carregarNotificacoes = async () => {
    try {
      const notifs = await base44.entities.Notificacao.filter(
        { usuario_email: user.email },
        '-created_date',
        20
      );
      setNotificacoes(notifs);
      setNaoLidas(notifs.filter(n => !n.lida).length);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  };

  const marcarComoLida = async (id) => {
    try {
      await base44.entities.Notificacao.update(id, {
        lida: true,
        data_leitura: new Date().toISOString()
      });
      await carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const marcarTodasComoLidas = async () => {
    try {
      const promises = notificacoes
        .filter(n => !n.lida)
        .map(n => base44.entities.Notificacao.update(n.id, {
          lida: true,
          data_leitura: new Date().toISOString()
        }));
      await Promise.all(promises);
      await carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      nova_resposta: '💬',
      mudanca_status: '🔄',
      encaminhamento: '📤',
      triagem_concluida: '✅'
    };
    return icons[tipo] || '🔔';
  };

  if (!user) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
          <Bell className="w-5 h-5" />
          {naoLidas > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0 h-5 min-w-5 bg-red-500 text-white text-xs">
              {naoLidas > 9 ? '9+' : naoLidas}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificações</h3>
          <div className="flex items-center gap-2">
            {naoLidas > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={marcarTodasComoLidas}
                className="text-xs"
              >
                <Check className="w-4 h-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
            <Link to={createPageUrl('ConfiguracoesNotificacoes')}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notificacoes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y">
              {notificacoes.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-4 hover:bg-gray-50 transition-colors",
                    !notif.lida && "bg-blue-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTipoIcon(notif.tipo)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className={cn(
                            "text-sm mb-1",
                            !notif.lida && "font-semibold"
                          )}>
                            {notif.titulo}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">{notif.mensagem}</p>
                          {notif.protocolo && (
                            <Link 
                              to={createPageUrl('ConsultarProtocolo') + '?protocolo=' + notif.protocolo}
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => setOpen(false)}
                            >
                              Ver protocolo {notif.protocolo}
                            </Link>
                          )}
                        </div>
                        {!notif.lida && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0"
                            onClick={() => marcarComoLida(notif.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.created_date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t bg-gray-50">
          <Link to={createPageUrl('Notificacoes')} onClick={() => setOpen(false)}>
            <Button variant="outline" size="sm" className="w-full">
              Ver todas as notificações
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}