import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Bell } from 'lucide-react';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function ConfiguracoesNotificacoes() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [preferencias, setPreferencias] = useState({
    nova_resposta: true,
    mudanca_status: true,
    encaminhamento: true,
    triagem_concluida: true,
    email_notificacoes: false
  });

  useEffect(() => {
    carregarPreferencias();
  }, []);

  const carregarPreferencias = async () => {
    try {
      const userData = await base44.auth.me();
      setUser(userData);

      const prefs = await base44.entities.PreferenciasNotificacao.filter({
        usuario_email: userData.email
      });

      if (prefs.length > 0) {
        setPreferencias(prefs[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    }
    setLoading(false);
  };

  const salvarPreferencias = async () => {
    setSaving(true);
    try {
      const prefExistente = await base44.entities.PreferenciasNotificacao.filter({
        usuario_email: user.email
      });

      const dados = {
        usuario_email: user.email,
        nova_resposta: preferencias.nova_resposta,
        mudanca_status: preferencias.mudanca_status,
        encaminhamento: preferencias.encaminhamento,
        triagem_concluida: preferencias.triagem_concluida,
        email_notificacoes: preferencias.email_notificacoes
      };

      if (prefExistente.length > 0) {
        await base44.entities.PreferenciasNotificacao.update(prefExistente[0].id, dados);
      } else {
        await base44.entities.PreferenciasNotificacao.create(dados);
      }

      alert('Preferências salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      alert('Erro ao salvar preferências');
    }
    setSaving(false);
  };

  const togglePreferencia = (key) => {
    setPreferencias(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Notificacoes')}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Configurações de Notificações</h1>
              <p className="text-sm text-blue-200">Escolha quais notificações deseja receber</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Tipos de Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nova Resposta */}
            <div className="flex items-start justify-between py-4 border-b">
              <div className="flex-1">
                <Label htmlFor="nova_resposta" className="text-base font-medium cursor-pointer">
                  💬 Nova Resposta
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Receba notificações quando sua manifestação receber uma resposta oficial
                </p>
              </div>
              <Switch
                id="nova_resposta"
                checked={preferencias.nova_resposta}
                onCheckedChange={() => togglePreferencia('nova_resposta')}
              />
            </div>

            {/* Mudança de Status */}
            <div className="flex items-start justify-between py-4 border-b">
              <div className="flex-1">
                <Label htmlFor="mudanca_status" className="text-base font-medium cursor-pointer">
                  🔄 Mudança de Status
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Seja notificado quando o status da sua manifestação mudar (em triagem, em andamento, respondido, etc.)
                </p>
              </div>
              <Switch
                id="mudanca_status"
                checked={preferencias.mudanca_status}
                onCheckedChange={() => togglePreferencia('mudanca_status')}
              />
            </div>

            {/* Encaminhamento */}
            <div className="flex items-start justify-between py-4 border-b">
              <div className="flex-1">
                <Label htmlFor="encaminhamento" className="text-base font-medium cursor-pointer">
                  📤 Encaminhamento
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Receba notificações quando sua manifestação for encaminhada para o órgão responsável
                </p>
              </div>
              <Switch
                id="encaminhamento"
                checked={preferencias.encaminhamento}
                onCheckedChange={() => togglePreferencia('encaminhamento')}
              />
            </div>

            {/* Triagem Concluída */}
            <div className="flex items-start justify-between py-4 border-b">
              <div className="flex-1">
                <Label htmlFor="triagem_concluida" className="text-base font-medium cursor-pointer">
                  ✅ Triagem Concluída
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Seja notificado quando a triagem da sua manifestação for concluída pela equipe
                </p>
              </div>
              <Switch
                id="triagem_concluida"
                checked={preferencias.triagem_concluida}
                onCheckedChange={() => togglePreferencia('triagem_concluida')}
              />
            </div>

            {/* Email */}
            <div className="flex items-start justify-between py-4">
              <div className="flex-1">
                <Label htmlFor="email_notificacoes" className="text-base font-medium cursor-pointer">
                  📧 Notificações por Email
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Receba também notificações por email no endereço: {user?.email}
                </p>
              </div>
              <Switch
                id="email_notificacoes"
                checked={preferencias.email_notificacoes}
                onCheckedChange={() => togglePreferencia('email_notificacoes')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={salvarPreferencias}
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {saving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Preferências
              </>
            )}
          </Button>
          <Link to={createPageUrl('Notificacoes')}>
            <Button variant="outline" size="lg">
              Cancelar
            </Button>
          </Link>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            💡 <strong>Dica:</strong> Você pode desativar temporariamente as notificações e reativá-las quando quiser. 
            Suas preferências serão salvas automaticamente.
          </p>
        </div>
      </div>

      <VLibrasWidget />
    </div>
  );
}