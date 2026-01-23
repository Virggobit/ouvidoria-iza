import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

import StepIndicator from '@/components/manifestacao/StepIndicator';
import TipoStep from '@/components/manifestacao/TipoStep';
import RelatoStep from '@/components/manifestacao/RelatoStep';
import AnexosStep from '@/components/manifestacao/AnexosStep';
import IdentificacaoStep from '@/components/manifestacao/IdentificacaoStep';
import RevisaoStep from '@/components/manifestacao/RevisaoStep';
import ProtocoloSuccess from '@/components/manifestacao/ProtocoloSuccess';
import ChatbotAssistente from '@/components/iza/ChatbotAssistente';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function NovaManifestacao() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protocolo, setProtocolo] = useState(null);
  const [iaAnalysis, setIaAnalysis] = useState(null);
  
  const [formData, setFormData] = useState({
    tipo: '',
    anonimo: false,
    titulo: '',
    relato: '',
    canal: 'text',
    audioBlob: null,
    audioUrl: null,
    anexos: [],
    nome: '',
    email: '',
    telefone: '',
    consentimento: false,
  });

  const generateProtocolo = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `${year}-${random}`;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.tipo !== '' && formData.titulo && formData.titulo.length >= 5;
      case 2:
        return (formData.relato && formData.relato.length >= 20) || formData.audioUrl;
      case 3:
        return true;
      case 4:
        return formData.anonimo || (formData.nome && formData.email);
      case 5:
        return formData.consentimento;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);
    try {
      const newProtocolo = generateProtocolo();
      
      // Upload audio if exists
      let audioUrl = null;
      if (formData.audioBlob) {
        const audioFile = new File([formData.audioBlob], 'audio.webm', { type: 'audio/webm' });
        const uploadResult = await base44.integrations.Core.UploadFile({ file: audioFile });
        audioUrl = uploadResult.file_url;
      }

      // Upload anexos
      const anexosUrls = [];
      for (const anexo of formData.anexos) {
        const uploadResult = await base44.integrations.Core.UploadFile({ file: anexo.file });
        anexosUrls.push(uploadResult.file_url);
      }

      // Determinar canal
      let canal = 'text';
      if (audioUrl && anexosUrls.length > 0) {
        canal = 'mixed';
      } else if (audioUrl) {
        canal = 'audio';
      } else if (anexosUrls.length > 0) {
        const hasVideo = formData.anexos.some(a => a.type.startsWith('video/'));
        canal = hasVideo ? 'video' : 'image';
      }

      // Create manifestacao
      const manifestacao = await base44.entities.Manifestacao.create({
        protocolo: newProtocolo,
        tipo: formData.tipo,
        titulo: formData.titulo,
        relato: formData.relato,
        canal: canal,
        audio_url: audioUrl,
        anexos: anexosUrls,
        anonimo: formData.anonimo,
        nome_cidadao: formData.anonimo ? null : formData.nome,
        email_cidadao: formData.anonimo ? null : formData.email,
        telefone_cidadao: formData.anonimo ? null : formData.telefone,
        consentimento_termos: formData.consentimento,
        status: 'recebido',
        mensagem_status_cidadao: 'Sua manifestação foi recebida e será analisada em breve.',
        ia_tipo_sugerido: iaAnalysis?.tipo,
        ia_tema_sugerido: iaAnalysis?.tema,
        ia_prioridade: iaAnalysis?.prioridade,
        ia_resumo: iaAnalysis?.resumo,
        ia_encaminhamento_sugerido: iaAnalysis?.encaminhamento,
        ia_confianca: iaAnalysis?.confianca,
      });

      // Create audit log
      await base44.entities.LogAuditoria.create({
        manifestacao_id: manifestacao.id,
        protocolo: newProtocolo,
        acao: 'criacao',
        usuario: 'cidadao',
        dados_novos: JSON.stringify({ protocolo: newProtocolo, tipo: formData.tipo }),
        sugestao_ia: JSON.stringify(iaAnalysis),
      });

      setProtocolo(newProtocolo);
      toast.success('Manifestação registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.error('Erro ao enviar manifestação. Tente novamente.');
    }
    setIsSubmitting(false);
  };

  if (protocolo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="bg-[#1e3a5f] text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-[#1e3a5f] font-bold text-sm">IZA</span>
              </div>
              <span className="font-semibold">IZA+ Ouvidoria</span>
            </div>
          </div>
        </header>
        <ProtocoloSuccess protocolo={protocolo} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#0B3D2E] text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
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
            <Link to={createPageUrl('Home')} className="text-sm hover:text-emerald-300 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <StepIndicator currentStep={currentStep} />

          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <TipoStep data={formData} onChange={setFormData} />
            )}
            {currentStep === 2 && (
              <RelatoStep data={formData} onChange={setFormData} />
            )}
            {currentStep === 3 && (
              <AnexosStep data={formData} onChange={setFormData} />
            )}
            {currentStep === 4 && (
              <IdentificacaoStep data={formData} onChange={setFormData} />
            )}
            {currentStep === 5 && (
              <RevisaoStep 
                data={formData} 
                onChange={setFormData}
                iaAnalysis={iaAnalysis}
                setIaAnalysis={setIaAnalysis}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-12 px-8 bg-[#0E6B4E] hover:bg-[#0B3D2E]"
              >
                Avançar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="h-12 px-8 bg-[#0E6B4E] hover:bg-[#0B3D2E]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Manifestação
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>

      <ChatbotAssistente />
      <VLibrasWidget />
    </div>
  );
}