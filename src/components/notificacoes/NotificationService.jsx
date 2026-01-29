// Sistema de notificações push no navegador
import { toast } from 'sonner';

const NOTIFICATION_PERMISSION_KEY = 'iza_notification_permission';

export class NotificationService {
  static async requestPermission() {
    if (!('Notification' in window)) {
      toast.error('Seu navegador não suporta notificações');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      toast.error('Notificações bloqueadas. Habilite nas configurações do navegador.');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
        toast.success('Notificações ativadas com sucesso!');
        return true;
      } else {
        toast.info('Você pode ativar notificações depois nas configurações');
        return false;
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  static hasPermission() {
    return 'Notification' in window && Notification.permission === 'granted';
  }

  static async showNotification(title, options = {}) {
    if (!this.hasPermission()) {
      return false;
    }

    try {
      const notification = new Notification(title, {
        icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png',
        badge: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png',
        vibrate: [200, 100, 200],
        requireInteraction: false,
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        if (options.onClick) {
          options.onClick();
        }
        notification.close();
      };

      return true;
    } catch (error) {
      console.error('Erro ao mostrar notificação:', error);
      return false;
    }
  }

  static async notifyNewResponse(protocolo, mensagem) {
    return await this.showNotification(
      '📬 Nova resposta - IZA+',
      {
        body: `Protocolo ${protocolo}: ${mensagem}`,
        tag: `response-${protocolo}`,
        onClick: () => {
          window.location.href = `/ConsultarProtocolo?protocolo=${protocolo}`;
        }
      }
    );
  }

  static async notifyStatusChange(protocolo, novoStatus, mensagem) {
    const statusEmojis = {
      recebido: '📥',
      em_triagem: '🔍',
      encaminhado: '➡️',
      em_andamento: '⚙️',
      respondido: '✅',
      arquivado: '📁'
    };

    return await this.showNotification(
      `${statusEmojis[novoStatus] || '📋'} Status atualizado - IZA+`,
      {
        body: `Protocolo ${protocolo}: ${mensagem}`,
        tag: `status-${protocolo}`,
        onClick: () => {
          window.location.href = `/ConsultarProtocolo?protocolo=${protocolo}`;
        }
      }
    );
  }

  static async notifyEncaminhamento(protocolo, area) {
    return await this.showNotification(
      '➡️ Manifestação encaminhada - IZA+',
      {
        body: `Protocolo ${protocolo} foi encaminhado para: ${area}`,
        tag: `encaminhamento-${protocolo}`,
        onClick: () => {
          window.location.href = `/ConsultarProtocolo?protocolo=${protocolo}`;
        }
      }
    );
  }

  static async notifyTriagemConcluida(protocolo) {
    return await this.showNotification(
      '✅ Triagem concluída - IZA+',
      {
        body: `A triagem do protocolo ${protocolo} foi concluída`,
        tag: `triagem-${protocolo}`,
        onClick: () => {
          window.location.href = `/ConsultarProtocolo?protocolo=${protocolo}`;
        }
      }
    );
  }
}

// Hook para usar notificações em componentes React
export function useNotifications() {
  const [hasPermission, setHasPermission] = React.useState(
    NotificationService.hasPermission()
  );

  const requestPermission = async () => {
    const granted = await NotificationService.requestPermission();
    setHasPermission(granted);
    return granted;
  };

  return {
    hasPermission,
    requestPermission,
    showNotification: NotificationService.showNotification,
    notifyNewResponse: NotificationService.notifyNewResponse,
    notifyStatusChange: NotificationService.notifyStatusChange,
    notifyEncaminhamento: NotificationService.notifyEncaminhamento,
    notifyTriagemConcluida: NotificationService.notifyTriagemConcluida,
  };
}