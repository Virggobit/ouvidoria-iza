import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Edit3, 
  Send,
  FileText,
  Mic,
  Image,
  User,
  Shield,
  Clock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NotificacaoEmail from '@/components/manifestacao/NotificacaoEmail';

const tipoLabels = {
  denuncia: 'Denúncia',
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão',
  solicitacao: 'Solicitação',
  informacao: 'Informação',
};

const temas = [
  'saude', 'seguranca', 'educacao', 'transporte', 'limpeza', 
  'infraestrutura', 'atendimento', 'meio_ambiente', 'habitacao', 'outros'
];

const encaminhamentos = [
  'Secretaria de Saúde',
  'Secretaria de Segurança Pública',
  'Secretaria de Educação',
  'Secretaria de Transporte',
  'Serviço de Limpeza Urbana',
  'NOVACAP',
  'CEB',
  'CAESB',
  'Defesa Civil',
  'Procon',
  'Outros'
];

export default function DetalheManifestacao({ manifestacao, onBack, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [triagem, setTriagem] = useState({
    tipo: manifestacao.tipo_final || manifestacao.ia_tipo_sugerido || manifestacao.tipo,
    tema: manifestacao.tema_final || manifestacao.ia_tema_sugerido || '',
    prioridade: manifestacao.prioridade_final || manifestacao.ia_prioridade || 'media',
    encaminhamento: manifestacao.encaminhamento_final || manifestacao.ia_encaminhamento_sugerido || '',
    justificativa: manifestacao.justificativa_triagem || '',
  });

  const aceitarSugestoesIA = () => {
    setTriagem({
      tipo: manifestacao.ia_tipo_sugerido || manifestacao.tipo,
      tema: manifestacao.ia_tema_sugerido || '',
      prioridade: manifestacao.ia_prioridade || 'media',
      encaminhamento: manifestacao.ia_encaminhamento_sugerido || '',
      justificativa: 'Sugestões da IA aceitas sem alterações.',
    });
    toast.success('Sugestões da IA aplicadas!');
  };

  const salvarTriagem = async (encaminhar = false) => {
    setIsSaving(true);
    try {
      const user = await base44.auth.me();
      const dataTriagem = {
        tipo_final: triagem.tipo,
        tema_final: triagem.tema,
        prioridade_final: triagem.prioridade,
        encaminhamento_final: triagem.encaminhamento,
        justificativa_triagem: triagem.justificativa,
        triador_responsavel: user?.email,
        data_triagem: new Date().toISOString(),
        status: encaminhar ? 'encaminhado' : 'em_triagem',
      };

      await base44.entities.Manifestacao.update(manifestacao.id, dataTriagem);

      // Create audit log
      const aceiteIA = 
        triagem.tipo === manifestacao.ia_tipo_sugerido &&
        triagem.tema === manifestacao.ia_tema_sugerido &&
        triagem.prioridade === manifestacao.ia_prioridade &&
        triagem.encaminhamento === manifestacao.ia_encaminhamento_sugerido;

      await base44.entities.LogAuditoria.create({
        manifestacao_id: manifestacao.id,
        protocolo: manifestacao.protocolo,
        acao: encaminhar ? 'encaminhamento' : 'triagem_humana',
        usuario: user?.email || 'sistema',
        dados_anteriores: JSON.stringify({
          tipo: manifestacao.tipo,
          tema: manifestacao.tema_final,
          prioridade: manifestacao.prioridade_final,
          status: manifestacao.status,
        }),
        dados_novos: JSON.stringify(dataTriagem),
        sugestao_ia: JSON.stringify({
          tipo: manifestacao.ia_tipo_sugerido,
          tema: manifestacao.ia_tema_sugerido,
          prioridade: manifestacao.ia_prioridade,
          encaminhamento: manifestacao.ia_encaminhamento_sugerido,
        }),
        decisao_humana: JSON.stringify(triagem),
        aceito_ia: aceiteIA,
        observacao: triagem.justificativa,
      });

      toast.success(encaminhar ? 'Manifestação encaminhada!' : 'Triagem salva!');
      onUpdate();
      onBack();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar triagem');
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à fila
        </Button>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800 text-base px-4 py-1 font-mono">
            {manifestacao.protocolo}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* IA Analysis */}
          {manifestacao.ia_resumo && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Análise IZA+</h3>
                </div>
                <Button 
                  size="sm" 
                  onClick={aceitarSugestoesIA}
                  className="bg-[#0E6B4E] hover:bg-[#0B3D2E]"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Aceitar Sugestões
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Tipo sugerido</p>
                  <p className="font-medium">{tipoLabels[manifestacao.ia_tipo_sugerido] || '-'}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Tema</p>
                  <p className="font-medium capitalize">{manifestacao.ia_tema_sugerido || '-'}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Prioridade</p>
                  <Badge className={
                    manifestacao.ia_prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                    manifestacao.ia_prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {manifestacao.ia_prioridade?.charAt(0).toUpperCase() + manifestacao.ia_prioridade?.slice(1) || '-'}
                  </Badge>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Confiança</p>
                  <p className="font-medium">{Math.round((manifestacao.ia_confianca || 0.8) * 100)}%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-500 mb-1">Resumo</p>
                <p className="text-sm">{manifestacao.ia_resumo}</p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Encaminhamento sugerido</p>
                <p className="text-sm font-medium text-blue-700">{manifestacao.ia_encaminhamento_sugerido || '-'}</p>
              </div>
            </div>
          )}

          {/* Original Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Conteúdo da Manifestação</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Tipo original</p>
                  <p className="font-medium">{tipoLabels[manifestacao.tipo]}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Relato</p>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {manifestacao.relato || 'Enviado por áudio'}
                  </p>
                </div>
              </div>

              {manifestacao.audio_url && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Áudio</p>
                    <audio src={manifestacao.audio_url} controls className="mt-2 w-full" />
                  </div>
                </div>
              )}

              {manifestacao.anexos?.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Anexos ({manifestacao.anexos.length})</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {manifestacao.anexos.map((url, i) => (
                        <a 
                          key={i} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img 
                            src={url} 
                            alt={`Anexo ${i + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {manifestacao.anonimo ? <Shield className="w-5 h-5 text-amber-600" /> : <User className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Identificação</p>
                  {manifestacao.anonimo ? (
                    <p className="font-medium text-amber-700">Anônimo</p>
                  ) : (
                    <div>
                      <p className="font-medium">{manifestacao.nome_cidadao}</p>
                      <p className="text-sm text-gray-600">{manifestacao.email_cidadao}</p>
                      {manifestacao.telefone_cidadao && (
                        <p className="text-sm text-gray-600">{manifestacao.telefone_cidadao}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Data de registro</p>
                  <p className="font-medium">
                    {format(new Date(manifestacao.created_date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Notification */}
          <NotificacaoEmail manifestacao={manifestacao} />
        </div>

        {/* Right Column - Triagem Form */}
        <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Triagem</h3>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="w-4 h-4 mr-1" />
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Tipo</Label>
              <Select 
                value={triagem.tipo} 
                onValueChange={(value) => setTriagem({...triagem, tipo: value})}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tipoLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tema</Label>
              <Select 
                value={triagem.tema} 
                onValueChange={(value) => setTriagem({...triagem, tema: value})}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  {temas.map((tema) => (
                    <SelectItem key={tema} value={tema} className="capitalize">
                      {tema.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Prioridade</Label>
              <Select 
                value={triagem.prioridade} 
                onValueChange={(value) => setTriagem({...triagem, prioridade: value})}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Encaminhamento</Label>
              <Select 
                value={triagem.encaminhamento} 
                onValueChange={(value) => setTriagem({...triagem, encaminhamento: value})}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {encaminhamentos.map((enc) => (
                    <SelectItem key={enc} value={enc}>{enc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Justificativa (opcional)</Label>
              <Textarea
                value={triagem.justificativa}
                onChange={(e) => setTriagem({...triagem, justificativa: e.target.value})}
                placeholder="Justifique alterações ou observações..."
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => salvarTriagem(false)}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar'}
            </Button>
            <Button 
              className="flex-1 bg-[#0E6B4E] hover:bg-[#0B3D2E]"
              onClick={() => salvarTriagem(true)}
              disabled={isSaving || !triagem.encaminhamento}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Encaminhar
                </>
              )}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}