import React, { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function NotificacaoEmail({ manifestacao }) {
  const [mensagem, setMensagem] = useState('');
  const [isEnviando, setIsEnviando] = useState(false);

  const enviarNotificacao = async () => {
    if (!manifestacao.email_cidadao) {
      toast.error('Esta manifestação não possui e-mail cadastrado');
      return;
    }

    if (!mensagem.trim()) {
      toast.error('Digite uma mensagem para enviar');
      return;
    }

    setIsEnviando(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: manifestacao.email_cidadao,
        subject: `Atualização da manifestação ${manifestacao.protocolo}`,
        body: `
Prezado(a) ${manifestacao.nome_cidadao || 'Cidadão(ã)'},

Sua manifestação de protocolo ${manifestacao.protocolo} teve uma atualização:

${mensagem}

---
Status atual: ${manifestacao.status}
${manifestacao.encaminhamento_final ? `Encaminhado para: ${manifestacao.encaminhamento_final}` : ''}

Para acompanhar o andamento completo, acesse:
[Link da plataforma IZA+]

Atenciosamente,
Equipe IZA+ Ouvidoria
Governo do Distrito Federal

---
Este é um e-mail automático. Não responda.
        `
      });

      // Update status message
      await base44.entities.Manifestacao.update(manifestacao.id, {
        mensagem_status_cidadao: mensagem,
        updated_date: new Date().toISOString(),
      });

      toast.success('E-mail enviado com sucesso!');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      toast.error('Erro ao enviar e-mail');
    }
    setIsEnviando(false);
  };

  if (manifestacao.anonimo) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          Manifestação anônima - não é possível enviar notificação por e-mail
        </p>
      </div>
    );
  }

  if (!manifestacao.email_cidadao) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-600">
          Nenhum e-mail cadastrado para esta manifestação
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-gray-900">Notificar Cidadão</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="mensagem">Mensagem de atualização</Label>
          <Textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Ex: Sua manifestação foi encaminhada para a Secretaria de Saúde e está em análise..."
            rows={4}
            className="mt-2"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Destinatário:</strong> {manifestacao.email_cidadao}
          </p>
        </div>

        <Button
          onClick={enviarNotificacao}
          disabled={isEnviando || !mensagem.trim()}
          className="w-full bg-[#0E6B4E] hover:bg-[#0B3D2E]"
        >
          {isEnviando ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Enviar Notificação
            </>
          )}
        </Button>
      </div>
    </div>
  );
}