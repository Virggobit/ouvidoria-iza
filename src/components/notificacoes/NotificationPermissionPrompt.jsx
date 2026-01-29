import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NotificationService } from './NotificationService';

const PROMPT_DISMISSED_KEY = 'iza_notification_prompt_dismissed';

export default function NotificationPermissionPrompt() {
  const [show, setShow] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Verificar se deve mostrar o prompt
    const dismissed = localStorage.getItem(PROMPT_DISMISSED_KEY);
    const hasPermission = NotificationService.hasPermission();
    const isBlocked = 'Notification' in window && Notification.permission === 'denied';

    // Mostrar prompt apenas se:
    // 1. Não foi dispensado
    // 2. Não tem permissão
    // 3. Não está bloqueado
    if (!dismissed && !hasPermission && !isBlocked) {
      // Aguardar um pouco antes de mostrar para não ser intrusivo
      const timer = setTimeout(() => {
        setShow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = async () => {
    setIsRequesting(true);
    const granted = await NotificationService.requestPermission();
    if (granted) {
      setShow(false);
    }
    setIsRequesting(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(PROMPT_DISMISSED_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="bg-white shadow-2xl border-2 border-[#0E6B4E] overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B3D2E] to-[#0E6B4E] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white" />
              <h3 className="font-semibold text-white text-sm">Ative as notificações</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Dispensar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600">
            Receba alertas em tempo real sobre atualizações do status de suas manifestações, 
            mesmo quando não estiver no site.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleAllow}
              disabled={isRequesting}
              className="flex-1 bg-[#0E6B4E] hover:bg-[#0B3D2E] text-white"
              size="sm"
            >
              <Bell className="w-4 h-4 mr-2" />
              Ativar notificações
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
            >
              Agora não
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Você pode alterar isso depois nas configurações
          </p>
        </div>
      </Card>
    </div>
  );
}