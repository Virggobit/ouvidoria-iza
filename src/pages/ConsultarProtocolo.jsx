import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TimelineStatus from '@/components/manifestacao/TimelineStatus';
import ChatbotAssistente from '@/components/iza/ChatbotAssistente';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

const statusConfig = {
  recebido: { label: 'Recebido', color: 'bg-blue-100 text-blue-800', icon: Clock },
  em_triagem: { label: 'Em Triagem', color: 'bg-yellow-100 text-yellow-800', icon: Search },
  encaminhado: { label: 'Encaminhado', color: 'bg-purple-100 text-purple-800', icon: FileText },
  em_andamento: { label: 'Em Andamento', color: 'bg-orange-100 text-orange-800', icon: Clock },
  respondido: { label: 'Respondido', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
  arquivado: { label: 'Arquivado', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
};

const tipoLabels = {
  denuncia: 'Denúncia',
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão',
  solicitacao: 'Solicitação',
  informacao: 'Informação',
};

export default function ConsultarProtocolo() {
  const [protocolo, setProtocolo] = useState('');
  const [manifestacao, setManifestacao] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const protocoloParam = urlParams.get('protocolo');
    if (protocoloParam) {
      setProtocolo(protocoloParam);
      searchProtocolo(protocoloParam);
    }
  }, []);

  const searchProtocolo = async (searchValue = protocolo) => {
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    setNotFound(false);
    setManifestacao(null);

    try {
      const results = await base44.entities.Manifestacao.filter({ protocolo: searchValue.trim() });
      if (results.length > 0) {
        setManifestacao(results[0]);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      setNotFound(true);
    }
    setIsSearching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProtocolo();
  };

  const StatusIcon = manifestacao ? statusConfig[manifestacao.status]?.icon || Clock : Clock;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-3">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                    alt="IZA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">IZA+ Ouvidoria</span>
              </div>
              <div className="hidden md:block pl-4 ml-4 border-l border-white/20">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/4add5d15f_Logo_participa_Horizontal-endereco-1.png" 
                  alt="Participa DF"
                  className="h-32 object-contain"
                />
              </div>
            </div>
            <Link to={createPageUrl('Home')} className="text-sm hover:text-blue-300 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Consultar Manifestação
          </h1>
          <p className="text-gray-600 mb-8">
            Digite o número do protocolo para acompanhar o andamento da sua manifestação.
          </p>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="protocolo" className="sr-only">Número do Protocolo</Label>
                <Input
                  id="protocolo"
                  type="text"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="Ex: 2025-123456"
                  className="h-14 text-lg"
                />
              </div>
              <Button
                type="submit"
                disabled={isSearching || !protocolo.trim()}
                className="h-14 px-8 bg-[#0E6B4E] hover:bg-[#0B3D2E]"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Consultar
                  </>
                )}
              </Button>
            </div>
          </form>

          {notFound && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Protocolo não encontrado
              </h3>
              <p className="text-red-700">
                Verifique se o número foi digitado corretamente e tente novamente.
              </p>
            </div>
          )}

          {manifestacao && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Protocolo</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">
                      {manifestacao.protocolo}
                    </p>
                  </div>
                  <Badge className={`${statusConfig[manifestacao.status]?.color} text-base px-4 py-2 flex items-center gap-2`}>
                    <StatusIcon className="w-5 h-5" />
                    {statusConfig[manifestacao.status]?.label}
                  </Badge>
                </div>
                {manifestacao.titulo && (
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <p className="text-sm text-gray-600 mb-1">Assunto</p>
                    <p className="font-medium text-gray-900">{manifestacao.titulo}</p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <TimelineStatus manifestacao={manifestacao} />

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Histórico Detalhado</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Manifestação recebida</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(manifestacao.created_date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  {manifestacao.data_triagem && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Search className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Triagem realizada</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(manifestacao.data_triagem), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                        {manifestacao.encaminhamento_final && (
                          <p className="text-sm text-gray-600 mt-1">
                            Encaminhado para: {manifestacao.encaminhamento_final}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {manifestacao.resposta && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Resposta enviada</p>
                        {manifestacao.data_resposta && (
                          <p className="text-sm text-gray-500">
                            {format(new Date(manifestacao.data_resposta), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        )}
                        <div className="mt-2 p-4 bg-emerald-50 rounded-lg">
                          <p className="text-sm text-gray-700">{manifestacao.resposta}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detalhes */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Detalhes da Manifestação</h3>
                <dl className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Tipo</dt>
                    <dd className="font-medium text-gray-900">{tipoLabels[manifestacao.tipo]}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Data de registro</dt>
                    <dd className="font-medium text-gray-900">
                      {format(new Date(manifestacao.created_date), "dd/MM/yyyy", { locale: ptBR })}
                    </dd>
                  </div>
                  {manifestacao.tema_final && (
                    <div>
                      <dt className="text-sm text-gray-500">Tema</dt>
                      <dd className="font-medium text-gray-900 capitalize">{manifestacao.tema_final}</dd>
                    </div>
                  )}
                  {manifestacao.encaminhamento_final && (
                    <div>
                      <dt className="text-sm text-gray-500">Área responsável</dt>
                      <dd className="font-medium text-gray-900">{manifestacao.encaminhamento_final}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Precisa de ajuda?</h3>
            <p className="text-gray-600 text-sm">
              Ligue para a Central 162 ou envie um e-mail para ouvidoria@df.gov.br
            </p>
          </div>
        </div>
      </main>

      <ChatbotAssistente />
      <VLibrasWidget />
    </div>
  );
}