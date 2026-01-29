import React, { useEffect, useState } from 'react';
import { Save, Clock, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DRAFT_KEY = 'iza_manifestacao_rascunho';
const AUTOSAVE_INTERVAL = 30000; // 30 segundos

export function useDraftAutoSave(formData, setFormData) {
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Carregar rascunho ao montar
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Verificar se há dados relevantes
        if (draft.titulo || draft.relato || draft.tipo) {
          // Mostrar notificação sobre rascunho encontrado
          toast.info('Rascunho encontrado! Deseja continuar de onde parou?', {
            action: {
              label: 'Carregar',
              onClick: () => {
                setFormData(draft.data);
                setLastSaved(new Date(draft.timestamp));
                toast.success('Rascunho carregado!');
              }
            },
            duration: 10000,
          });
        }
      } catch (e) {
        console.error('Erro ao carregar rascunho:', e);
      }
    }
  }, []);

  // Salvar rascunho automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges && (formData.titulo || formData.relato || formData.tipo)) {
        saveDraft();
      }
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [formData, hasChanges]);

  // Detectar mudanças
  useEffect(() => {
    setHasChanges(true);
  }, [formData]);

  const saveDraft = () => {
    try {
      const draft = {
        data: formData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setLastSaved(new Date());
      setHasChanges(false);
      return true;
    } catch (e) {
      console.error('Erro ao salvar rascunho:', e);
      return false;
    }
  };

  const deleteDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setLastSaved(null);
    setHasChanges(false);
    toast.success('Rascunho excluído');
  };

  const manualSave = () => {
    if (saveDraft()) {
      toast.success('Rascunho salvo!');
    } else {
      toast.error('Erro ao salvar rascunho');
    }
  };

  return {
    lastSaved,
    hasChanges,
    saveDraft: manualSave,
    deleteDraft,
  };
}

export function DraftIndicator({ lastSaved, hasChanges, onSave, onDelete }) {
  const getTimeAgo = () => {
    if (!lastSaved) return null;
    const seconds = Math.floor((new Date() - lastSaved) / 1000);
    if (seconds < 60) return 'agora mesmo';
    if (seconds < 3600) return `há ${Math.floor(seconds / 60)} min`;
    return `há ${Math.floor(seconds / 3600)} h`;
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {hasChanges ? (
              <>
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 animate-pulse" />
                <span className="text-xs text-gray-600 truncate">
                  Alterações não salvas
                </span>
              </>
            ) : lastSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 truncate">
                  Salvo {getTimeAgo()}
                </span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-600">
                  Não salvo
                </span>
              </>
            )}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {hasChanges && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onSave}
                className="h-7 px-2 text-xs"
                title="Salvar agora"
              >
                <Save className="w-3 h-3" />
              </Button>
            )}
            {lastSaved && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDelete}
                className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Excluir rascunho"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}