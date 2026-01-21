import React, { useState, useEffect } from 'react';
import { FileText, Mic, Image, User, Shield, CheckCircle, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';

const tipoLabels = {
  denuncia: 'Denúncia',
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão',
  solicitacao: 'Solicitação',
};

const tipoColors = {
  denuncia: 'bg-red-100 text-red-800',
  reclamacao: 'bg-orange-100 text-orange-800',
  elogio: 'bg-emerald-100 text-emerald-800',
  sugestao: 'bg-blue-100 text-blue-800',
  solicitacao: 'bg-purple-100 text-purple-800',
};

export default function RevisaoStep({ data, onChange, iaAnalysis, setIaAnalysis }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [consentimento, setConsentimento] = useState(data.consentimento || false);

  useEffect(() => {
    if (!iaAnalysis && data.relato) {
      analyzeWithIA();
    }
  }, []);

  const analyzeWithIA = async () => {
    setIsAnalyzing(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analise a seguinte manifestação de ouvidoria e retorne uma classificação. 
        
Tipo selecionado pelo cidadão: ${tipoLabels[data.tipo]}
Relato: ${data.relato || 'Apenas áudio enviado'}

Classifique e retorne:
1. Tipo confirmado (denuncia, reclamacao, elogio, sugestao, solicitacao)
2. Tema principal (ex: saúde, segurança, educação, transporte, limpeza, infraestrutura, atendimento, outros)
3. Prioridade (alta, media, baixa)
4. Resumo executivo em 2-3 linhas
5. Área sugerida para encaminhamento
6. Nível de confiança (0 a 1)
7. Justificativa curta para a classificação`,
        response_json_schema: {
          type: "object",
          properties: {
            tipo: { type: "string" },
            tema: { type: "string" },
            prioridade: { type: "string" },
            resumo: { type: "string" },
            encaminhamento: { type: "string" },
            confianca: { type: "number" },
            justificativa: { type: "string" }
          }
        }
      });
      setIaAnalysis(result);
    } catch (error) {
      console.error('Erro na análise IA:', error);
    }
    setIsAnalyzing(false);
  };

  const handleConsentimentoChange = (checked) => {
    setConsentimento(checked);
    onChange({ ...data, consentimento: checked });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Revise sua manifestação
        </h2>
        <p className="text-gray-600">
          Confira os dados antes de enviar. A IZA+ analisou seu relato e sugeriu uma classificação.
        </p>
      </div>

      {/* Análise IA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Análise IZA+</h3>
        </div>
        
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mr-3" />
            <span className="text-blue-700">Analisando sua manifestação...</span>
          </div>
        ) : iaAnalysis ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Tipo sugerido</p>
                <Badge className={tipoColors[iaAnalysis.tipo] || 'bg-gray-100'}>
                  {tipoLabels[iaAnalysis.tipo] || iaAnalysis.tipo}
                </Badge>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Tema</p>
                <p className="font-medium capitalize">{iaAnalysis.tema}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Prioridade</p>
                <Badge className={
                  iaAnalysis.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                  iaAnalysis.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {iaAnalysis.prioridade?.charAt(0).toUpperCase() + iaAnalysis.prioridade?.slice(1)}
                </Badge>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Confiança</p>
                <p className="font-medium">{Math.round((iaAnalysis.confianca || 0.8) * 100)}%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Resumo</p>
              <p className="text-sm text-gray-700">{iaAnalysis.resumo}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Encaminhamento sugerido</p>
              <p className="text-sm font-medium text-blue-700">{iaAnalysis.encaminhamento}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Não foi possível analisar a manifestação.</p>
        )}
      </div>

      {/* Resumo dos dados */}
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Tipo da manifestação</p>
            <Badge className={tipoColors[data.tipo]}>
              {tipoLabels[data.tipo]}
            </Badge>
          </div>
        </div>

        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Relato</p>
            <p className="text-gray-900 line-clamp-3">{data.relato || 'Enviado por áudio'}</p>
          </div>
        </div>

        {data.audioUrl && (
          <div className="p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mic className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Áudio anexado</p>
              <audio src={data.audioUrl} controls className="mt-2 w-full max-w-xs" />
            </div>
          </div>
        )}

        {data.anexos?.length > 0 && (
          <div className="p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Image className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Anexos ({data.anexos.length})</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {data.anexos.map((anexo, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {anexo.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {data.anonimo ? <Shield className="w-5 h-5 text-amber-600" /> : <User className="w-5 h-5 text-amber-600" />}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Identificação</p>
            {data.anonimo ? (
              <p className="text-gray-900 font-medium">Registro anônimo</p>
            ) : (
              <div>
                <p className="text-gray-900">{data.nome}</p>
                <p className="text-sm text-gray-600">{data.email}</p>
                {data.telefone && <p className="text-sm text-gray-600">{data.telefone}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consentimento */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consentimento"
            checked={consentimento}
            onCheckedChange={handleConsentimentoChange}
            className="mt-1"
          />
          <Label htmlFor="consentimento" className="text-sm text-gray-700 cursor-pointer">
            Declaro que as informações prestadas são verdadeiras e estou ciente de que 
            declarações falsas podem configurar crime previsto no Código Penal Brasileiro. 
            Autorizo o tratamento dos dados conforme a LGPD.
          </Label>
        </div>
      </div>

      {!consentimento && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            É necessário aceitar os termos para enviar a manifestação.
          </p>
        </div>
      )}
    </div>
  );
}