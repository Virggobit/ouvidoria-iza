import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, FileText, Send, Mic, Video, Loader2, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function Artefatos() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoRecording, setVideoRecording] = useState(false);
  
  const [formData, setFormData] = useState({
    tipo: '',
    descricao: '',
    pagina_tela: '',
    canal: 'text',
    audio_url: '',
    video_url: '',
    consentimento_lgpd: false,
  });

  const handleAudioRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const file = new File([blob], 'sugestao_audio.webm', { type: 'audio/webm' });
          
          try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData({ ...formData, audio_url: file_url, canal: 'audio' });
            toast.success('Áudio gravado com sucesso!');
          } catch (error) {
            toast.error('Erro ao fazer upload do áudio');
          }
          
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      } catch (error) {
        toast.error('Erro ao acessar microfone');
      }
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast.error('Vídeo muito grande. Máximo 50MB');
      return;
    }

    setVideoRecording(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, video_url: file_url, canal: 'video' });
      toast.success('Vídeo enviado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer upload do vídeo');
    }
    setVideoRecording(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipo || !formData.descricao) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (!formData.consentimento_lgpd) {
      toast.error('Você precisa aceitar o termo de consentimento LGPD');
      return;
    }

    setLoading(true);
    try {
      await base44.entities.SugestaoMelhoria.create({
        tipo: formData.tipo,
        descricao: formData.descricao,
        pagina_tela: formData.pagina_tela || null,
        canal: formData.canal,
        audio_url: formData.audio_url || null,
        video_url: formData.video_url || null,
        consentimento_lgpd: formData.consentimento_lgpd,
        status: 'pendente',
      });

      toast.success('Sugestão enviada com sucesso!');
      setShowForm(false);
      setFormData({
        tipo: '',
        descricao: '',
        pagina_tela: '',
        canal: 'text',
        audio_url: '',
        video_url: '',
        consentimento_lgpd: false,
      });
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      toast.error('Erro ao enviar sugestão. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#004A8C]"
                aria-label="Voltar para página inicial"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Artefatos e Documentação</h1>
              <p className="text-xs text-blue-200">Contribua com a evolução do IZA+</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Seção Principal com IZA */}
        <section aria-labelledby="intro-heading">
          <Card className="mb-8 border-2 border-[#0E6B4E] shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 flex-shrink-0">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/15f96ba5a_IZA2.jpg"
                    alt="Robô IZA com lupa - assistente inteligente da ouvidoria"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 id="intro-heading" className="text-2xl font-bold text-gray-900 mb-4">
                    Participe da melhoria contínua da solução
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Acesse a documentação completa da solução IZA+ e contribua com sugestões 
                    para aprimorar a experiência de todos os usuários.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://drive.google.com/drive/folders/1MF-E8uMcwzo9fhQ2pX23qf1MNk6LkU_C?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        className="w-full bg-[#0E6B4E] hover:bg-[#0B3D2E] focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2 h-12"
                        size="lg"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Acesse a documentação completa
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <Button
                      onClick={() => setShowForm(!showForm)}
                      variant="outline"
                      className="flex-1 border-2 border-[#0E6B4E] text-[#0E6B4E] hover:bg-[#0E6B4E] hover:text-white focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2 h-12"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar sugestão de melhoria
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Formulário de Sugestão */}
        {showForm && (
          <section aria-labelledby="form-heading">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle id="form-heading" className="text-xl">
                  Formulário de Sugestão de Melhoria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tipo de Sugestão */}
                  <div>
                    <Label htmlFor="tipo" className="text-base font-semibold mb-2 block">
                      Tipo de sugestão <span className="text-red-600" aria-label="obrigatório">*</span>
                    </Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                      required
                    >
                      <SelectTrigger 
                        id="tipo"
                        className="focus:ring-2 focus:ring-[#0E6B4E]"
                        aria-required="true"
                      >
                        <SelectValue placeholder="Selecione o tipo de sugestão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ux">UX - Experiência do Usuário</SelectItem>
                        <SelectItem value="acessibilidade">Acessibilidade</SelectItem>
                        <SelectItem value="bug">Bug - Correção de Erro</SelectItem>
                        <SelectItem value="melhoria_triagem">Melhoria de Triagem</SelectItem>
                        <SelectItem value="integracao_iza">Integração com IZA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descrição */}
                  <div>
                    <Label htmlFor="descricao" className="text-base font-semibold mb-2 block">
                      Descreva sua sugestão <span className="text-red-600" aria-label="obrigatório">*</span>
                    </Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      placeholder="Descreva detalhadamente sua sugestão de melhoria..."
                      className="min-h-32 focus:ring-2 focus:ring-[#0E6B4E]"
                      required
                      aria-required="true"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Seja o mais específico possível para ajudar na implementação
                    </p>
                  </div>

                  {/* Opções de mídia */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">Formas alternativas de envio</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={handleAudioRecord}
                        variant={recording ? 'destructive' : 'outline'}
                        className="focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        {recording ? 'Parar gravação' : 'Gravar áudio'}
                      </Button>
                      
                      <label className="relative cursor-pointer">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="sr-only"
                          disabled={videoRecording}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={videoRecording}
                          className="focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2"
                          asChild
                        >
                          <span>
                            {videoRecording ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Video className="w-4 h-4 mr-2" />
                            )}
                            {videoRecording ? 'Enviando...' : 'Enviar vídeo'}
                          </span>
                        </Button>
                      </label>
                    </div>
                    
                    {formData.audio_url && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Áudio gravado com sucesso</span>
                      </div>
                    )}
                    
                    {formData.video_url && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Vídeo enviado com sucesso</span>
                      </div>
                    )}
                  </div>

                  {/* Página/Tela (Opcional) */}
                  <div>
                    <Label htmlFor="pagina" className="text-base font-semibold mb-2 block">
                      Página ou tela relacionada <span className="text-gray-500">(opcional)</span>
                    </Label>
                    <Input
                      id="pagina"
                      type="text"
                      value={formData.pagina_tela}
                      onChange={(e) => setFormData({ ...formData, pagina_tela: e.target.value })}
                      placeholder="Ex: Página de Nova Manifestação"
                      className="focus:ring-2 focus:ring-[#0E6B4E]"
                    />
                  </div>

                  {/* Consentimento LGPD */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="lgpd"
                        checked={formData.consentimento_lgpd}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, consentimento_lgpd: checked })
                        }
                        className="mt-1 focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2"
                        required
                        aria-required="true"
                      />
                      <Label 
                        htmlFor="lgpd" 
                        className="text-sm text-gray-800 cursor-pointer flex-1"
                      >
                        <strong className="block mb-1">Termo de Consentimento LGPD</strong>
                        Confirmo que não incluirei dados pessoais sensíveis (CPF, RG, endereço, 
                        dados de saúde, etc.) nesta sugestão. Estou ciente de que esta informação 
                        será utilizada exclusivamente para fins de melhoria da plataforma IZA+.
                        <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>
                      </Label>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#0E6B4E] hover:bg-[#0B3D2E] focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2 h-12"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar sugestão
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="focus:ring-2 focus:ring-[#0E6B4E] focus:ring-offset-2"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Informações Adicionais */}
        <section aria-labelledby="info-heading" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle id="info-heading">Sobre os Artefatos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                A documentação completa do IZA+ inclui:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Arquitetura e diagramas do sistema</li>
                <li>Guias de uso e tutoriais</li>
                <li>Especificações técnicas</li>
                <li>Roadmap de desenvolvimento</li>
                <li>Relatórios de acessibilidade</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Todas as sugestões são analisadas pela equipe de desenvolvimento 
                e podem ser implementadas em futuras versões da plataforma.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <VLibrasWidget />
    </div>
  );
}