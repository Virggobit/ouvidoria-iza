import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Bell, Save, Loader2, BellRing, Mail, Smartphone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import VLibrasWidget from '@/components/iza/VLibrasWidget';
import { NotificationService } from '@/components/notificacoes/NotificationService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ConfiguracoesNotificacoes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [preferences, setPreferences] = useState({
    nova_resposta: true,
    mudanca_status: true,
    encaminhamento: true,
    triagem_concluida: true,
    email_notificacoes: false,
    push_notificacoes: false,
  });

  useEffect(() => {
    loadUserAndPreferences();
    setPushEnabled(NotificationService.hasPermission());
  }, []);

  const loadUserAndPreferences = async () => {
    try {
      const userData = await base44.auth.me();
      setUser(userData);

      const prefs = await base44.entities.PreferenciasNotificacao.filter({
        usuario_email: userData.email,
      });

      if (prefs.length > 0) {
        setPreferences({
          nova_resposta: prefs[0].nova_resposta ?? true,
          mudanca_status: prefs[0].mudanca_status ?? true,
          encaminhamento: prefs[0].encaminhamento ?? true,
          triagem_concluida: prefs[0].triagem_concluida ?? true,
          email_notificacoes: prefs[0].email_notificacoes ?? false,
          push_notificacoes: prefs[0].push_notificacoes ?? false,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
      toast.error('Erro ao carregar preferências');
    }
    setLoading(false);
  };

  const handlePushToggle = async (enabled) => {
    if (enabled) {
      const granted = await NotificationService.requestPermission();
      setPushEnabled(granted);
      if (granted) {
        setPreferences({ ...preferences, push_notificacoes: true });
      }
    } else {
      setPushEnabled(false);
      setPreferences({ ...preferences, push_notificacoes: false });
      toast.info('Para desativar completamente, bloqueie nas configurações do navegador');
    }
  };

  const testNotification = async () => {
    if (!pushEnabled) {
      toast.error('Ative as notificações push primeiro');
      return;
    }
    await NotificationService.showNotification(
      'Teste de notificação - IZA+',
      {
        body: 'Se você está vendo isso, as notificações estão funcionando! 🎉',
      }
    );
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const existingPrefs = await base44.entities.PreferenciasNotificacao.filter({
        usuario_email: user.email,
      });

      const data = {
        usuario_email: user.email,
        ...preferences,
      };

      if (existingPrefs.length > 0) {
        await base44.entities.PreferenciasNotificacao.update(existingPrefs[0].id, data);
      } else {
        await base44.entities.PreferenciasNotificacao.create(data);
      }

      toast.success('Preferências salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar preferências. Tente novamente.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0E6B4E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-8">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Notificacoes')}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Configurações de Notificações</h1>
              <p className="text-xs text-blue-200">Personalize seus alertas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Notificações Push Card */}
          <Card className="border-2 border-[#0E6B4E]">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-[#0E6B4E]" />
                  <div>
                    <CardTitle>Notificações Push</CardTitle>
                    <CardDescription>Receba alertas em tempo real no navegador</CardDescription>
                  </div>
                </div>
                <Switch
                  checked={pushEnabled && preferences.push_notificacoes}
                  onCheckedChange={handlePushToggle}
                />
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {!('Notification' in window) ? (
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Seu navegador não suporta notificações push. Use um navegador moderno como Chrome, Firefox ou Edge.
                  </p>
                </div>
              ) : Notification.permission === 'denied' ? (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 mb-2">
                      As notificações estão bloqueadas no seu navegador. Para ativá-las:
                    </p>
                    <ol className="text-xs text-red-700 space-y-1 list-decimal list-inside">
                      <li>Clique no ícone de cadeado na barra de endereço</li>
                      <li>Encontre "Notificações" nas permissões</li>
                      <li>Altere para "Permitir"</li>
                      <li>Recarregue a página</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Receba alertas instantâneos sobre atualizações das suas manifestações, 
                    mesmo quando não estiver navegando no site.
                  </p>
                  {pushEnabled && (
                    <Button 
                      onClick={testNotification}
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <BellRing className="w-4 h-4 mr-2" />
                      Enviar notificação de teste
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Tipos de Notificação Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Tipos de notificação
              </CardTitle>
              <CardDescription>Escolha quais eventos você deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <Label htmlFor="nova_resposta" className="font-medium text-gray-900 cursor-pointer">
                      📬 Nova resposta
                    </Label>
                    <p className="text-sm text-gray-500">
                      Quando sua manifestação receber uma resposta oficial
                    </p>
                  </div>
                  <Switch
                    id="nova_resposta"
                    checked={preferences.nova_resposta}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, nova_resposta: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <Label htmlFor="mudanca_status" className="font-medium text-gray-900 cursor-pointer">
                      🔄 Mudança de status
                    </Label>
                    <p className="text-sm text-gray-500">
                      Quando o status da sua manifestação for alterado
                    </p>
                  </div>
                  <Switch
                    id="mudanca_status"
                    checked={preferences.mudanca_status}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, mudanca_status: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <Label htmlFor="encaminhamento" className="font-medium text-gray-900 cursor-pointer">
                      ➡️ Encaminhamento
                    </Label>
                    <p className="text-sm text-gray-500">
                      Quando sua manifestação for encaminhada para um órgão responsável
                    </p>
                  </div>
                  <Switch
                    id="encaminhamento"
                    checked={preferences.encaminhamento}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, encaminhamento: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <Label htmlFor="triagem_concluida" className="font-medium text-gray-900 cursor-pointer">
                      ✅ Triagem concluída
                    </Label>
                    <p className="text-sm text-gray-500">
                      Quando a análise inicial da sua manifestação for concluída
                    </p>
                  </div>
                  <Switch
                    id="triagem_concluida"
                    checked={preferences.triagem_concluida}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, triagem_concluida: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canais de Notificação Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Canais de notificação
              </CardTitle>
              <CardDescription>Escolha como deseja receber as notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 flex-1">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <div>
                      <Label className="font-medium text-gray-900 cursor-pointer">
                        Notificações no aplicativo
                      </Label>
                      <p className="text-sm text-gray-500">
                        Ver notificações quando estiver usando o site
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    Sempre ativo
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Mail className="w-5 h-5 text-gray-700" />
                    <div>
                      <Label htmlFor="email_notificacoes" className="font-medium text-gray-900 cursor-pointer">
                        Notificações por e-mail
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receber também por e-mail ({user?.email})
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="email_notificacoes"
                    checked={preferences.email_notificacoes}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, email_notificacoes: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#0E6B4E] hover:bg-[#0B3D2E] px-8 h-12"
              size="lg"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Preferências
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      <VLibrasWidget />
    </div>
  );
}