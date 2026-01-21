import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import AssistenteVoz from '@/components/iza/AssistenteVoz';

export default function RelatoStep({ data, onChange }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(data.audioUrl || null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onChange({ ...data, audioBlob: blob, audioUrl: url });
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const deleteAudio = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    onChange({ ...data, audioBlob: null, audioUrl: null });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const charCount = data.relato?.length || 0;
  const minChars = 20;
  const maxChars = 13000;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Descreva sua manifestação
        </h2>
        <p className="text-gray-600">
          Escreva seu relato detalhadamente ou grave um áudio explicando a situação.
        </p>
      </div>

      <AssistenteVoz 
        onTranscricao={(texto) => onChange({ ...data, relato: (data.relato || '') + '\n\n' + texto })}
      />

      <div>
        <Label htmlFor="relato" className="text-base font-semibold text-gray-900 mb-2 block">
          Relato escrito
        </Label>
        <Textarea
          id="relato"
          value={data.relato || ''}
          onChange={(e) => onChange({ ...data, relato: e.target.value })}
          placeholder="Descreva sua manifestação com detalhes. Seja específico sobre o que aconteceu, quando, onde e quem estava envolvido..."
          className="min-h-[200px] text-base resize-y"
          aria-describedby="relato-help"
        />
        <div className="flex justify-between items-center mt-2">
          <p id="relato-help" className="text-sm text-gray-500">
            Mínimo de {minChars} caracteres
          </p>
          <span className={cn(
            "text-sm font-medium",
            charCount < minChars ? "text-red-500" : "text-gray-500"
          )}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <Label className="text-base font-semibold text-gray-900 mb-4 block">
          Ou grave um áudio
        </Label>
        
        <div className="flex flex-col items-center space-y-4">
          {!audioUrl ? (
            <>
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4",
                  isRecording 
                    ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 animate-pulse" 
                    : "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-300"
                )}
                aria-label={isRecording ? "Parar gravação" : "Iniciar gravação de áudio"}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
              {isRecording && (
                <div className="text-center">
                  <p className="text-red-500 font-semibold text-lg">
                    Gravando... {formatTime(recordingTime)}
                  </p>
                  <p className="text-sm text-gray-500">Clique para parar</p>
                </div>
              )}
              {!isRecording && (
                <p className="text-sm text-gray-500">Clique para gravar</p>
              )}
            </>
          ) : (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center gap-4">
                <audio
                  src={audioUrl}
                  controls
                  className="w-full max-w-md"
                  aria-label="Áudio gravado"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={deleteAudio}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir áudio
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {charCount < minChars && !audioUrl && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            É necessário escrever pelo menos {minChars} caracteres ou gravar um áudio para continuar.
          </p>
        </div>
      )}
    </div>
  );
}