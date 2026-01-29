import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { NotificationService } from './NotificationService';

// Hook para monitorar notificações do usuário e enviar push
export function useNotificationMonitor(user) {
  useEffect(() => {
    if (!user?.email) return;

    let unsubscribe;

    const setupMonitoring = async () => {
      try {
        // Buscar preferências do usuário
        const prefs = await base44.entities.PreferenciasNotificacao.filter({
          usuario_email: user.email
        });

        const preferences = prefs[0] || {
          push_notificacoes: false,
          nova_resposta: true,
          mudanca_status: true,
          encaminhamento: true,
          triagem_concluida: true,
        };

        // Se push está desativado, não monitorar
        if (!preferences.push_notificacoes || !NotificationService.hasPermission()) {
          return;
        }

        // Subscrever às notificações do usuário
        unsubscribe = base44.entities.Notificacao.subscribe((event) => {
          if (event.type === 'create' && event.data.usuario_email === user.email) {
            const notification = event.data;
            
            // Verificar se o tipo de notificação está habilitado
            const tipoMap = {
              'nova_resposta': preferences.nova_resposta,
              'mudanca_status': preferences.mudanca_status,
              'encaminhamento': preferences.encaminhamento,
              'triagem_concluida': preferences.triagem_concluida,
            };

            if (tipoMap[notification.tipo]) {
              // Enviar notificação push baseada no tipo
              switch (notification.tipo) {
                case 'nova_resposta':
                  NotificationService.notifyNewResponse(
                    notification.protocolo,
                    notification.mensagem
                  );
                  break;
                case 'mudanca_status':
                  NotificationService.notifyStatusChange(
                    notification.protocolo,
                    'em_andamento', // você pode extrair do contexto
                    notification.mensagem
                  );
                  break;
                case 'encaminhamento':
                  NotificationService.notifyEncaminhamento(
                    notification.protocolo,
                    notification.mensagem
                  );
                  break;
                case 'triagem_concluida':
                  NotificationService.notifyTriagemConcluida(
                    notification.protocolo
                  );
                  break;
              }
            }
          }
        });
      } catch (error) {
        console.error('Erro ao configurar monitoramento de notificações:', error);
      }
    };

    setupMonitoring();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);
}