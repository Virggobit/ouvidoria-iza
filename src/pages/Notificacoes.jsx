import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bell, Check, Settings, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // todas, nao_lidas, lidas
  const [user, setUser] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const userData = await base44.auth.me();
      setUser(userData);
      
      const notifs = await base44.entities.Notificacao.filter(
        { usuario_email: userData.email },
        '-created_date'
      );
      setNotificacoes(notifs);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
    setLoading(false);
  };

  const marcarComoLida = async (id) => {
    try {
      await base44.entities.Notificacao.update(id, {
        lida: true,
        data_leitura: new Date().toISOString()
      });
      await carregarDados();
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
      await carregarDados();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const excluirNotificacao = async (id) => {
    try {
      await base44.entities.Notificacao.delete(id);
      await carregarDados();
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
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

  const getTipoLabel = (tipo) => {
    const labels = {
      nova_resposta: 'Nova Resposta',
      mudanca_status: 'Mudança de Status',
      encaminhamento: 'Encaminhamento',
      triagem_concluida: 'Triagem Concluída'
    };
    return labels[tipo] || tipo;
  };

  const notificacoesFiltradas = notificacoes.filter(n => {
    if (filtro === 'nao_lidas') return !n.lida;
    if (filtro === 'lidas') return n.lida;
    return true;
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Notificações</h1>
                <p className="text-sm text-blue-200">
                  {naoLidas > 0 ? `${naoLidas} não lida${naoLidas > 1 ? 's' : ''}` : 'Todas as notificações lidas'}
                </p>
              </div>
            </div>
            <Link to={createPageUrl('ConfiguracoesNotificacoes')}>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filtros e Ações */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filtro === 'todas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro('todas')}
            >
              Todas ({notificacoes.length})
            </Button>
            <Button
              variant={filtro === 'nao_lidas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro('nao_lidas')}
            >
              Não lidas ({naoLidas})
            </Button>
            <Button
              variant={filtro === 'lidas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro('lidas')}
            >
              Lidas ({notificacoes.length - naoLidas})
            </Button>
          </div>
          {naoLidas > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={marcarTodasComoLidas}
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {/* Lista de Notificações */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-gray-600 mt-4">Carregando notificações...</p>
          </div>
        ) : notificacoesFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">
              {filtro === 'nao_lidas' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notificacoesFiltradas.map((notif) => (
              <Card
                key={notif.id}
                className={cn(
                  "transition-all hover:shadow-md",
                  !notif.lida && "border-blue-200 bg-blue-50/50"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">
                      {getTipoIcon(notif.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {!notif.lida && (
                              <Badge className="bg-blue-600 text-white text-xs">Nova</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {getTipoLabel(notif.tipo)}
                            </Badge>
                          </div>
                          <h3 className={cn(
                            "text-base",
                            !notif.lida && "font-semibold"
                          )}>
                            {notif.titulo}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          {!notif.lida && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => marcarComoLida(notif.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => excluirNotificacao(notif.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notif.mensagem}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                          {new Date(notif.created_date).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {notif.protocolo && (
                          <Link 
                            to={createPageUrl('ConsultarProtocolo') + '?protocolo=' + notif.protocolo}
                            className="text-xs text-blue-600 hover:underline font-medium"
                          >
                            Ver protocolo {notif.protocolo} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <VLibrasWidget />
    </div>
  );
}