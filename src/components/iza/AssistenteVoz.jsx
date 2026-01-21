import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function AssistenteVoz({ onTranscricao }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processarAudio(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      toast.error('Não foi possível acessar o microfone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processarAudio = async (blob) => {
    setIsProcessing(true);
    try {
      // Upload audio
      const audioFile = new File([blob], 'audio.webm', { type: 'audio/webm' });
      const { file_url } = await base44.integrations.Core.UploadFile({ file: audioFile });

      // Transcribe with LLM
      const transcricao = await base44.integrations.Core.InvokeLLM({
        prompt: 'Transcreva o áudio fornecido em texto claro e formatado em português do Brasil. Corrija erros de dicção e pontuação.',
        file_urls: [file_url],
      });

      onTranscricao(transcricao);
      toast.success('Áudio transcrito com sucesso!');
    } catch (error) {
      console.error('Erro ao processar áudio:', error);
      toast.error('Erro ao processar áudio');
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-purple-900">Assistente de Voz</h3>
      </div>

      <p className="text-sm text-purple-700 mb-4">
        Grave sua manifestação falando e a IZA+ converterá em texto automaticamente.
      </p>

      <div className="flex justify-center">
        {isProcessing ? (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-3" />
            <p className="text-sm text-purple-700">Transcrevendo áudio...</p>
          </div>
        ) : (
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
          >
            {isRecording ? (
              <StopCircle className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </Button>
        )}
      </div>

      {isRecording && (
        <p className="text-center text-sm text-red-600 font-medium mt-4">
          Gravando... clique para parar
        </p>
      )}
    </div>
  );
}