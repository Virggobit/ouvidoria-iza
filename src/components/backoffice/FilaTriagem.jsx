import React from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig = {
  recebido: { label: 'Novo', color: 'bg-blue-100 text-blue-800' },
  em_triagem: { label: 'Em Triagem', color: 'bg-yellow-100 text-yellow-800' },
  encaminhado: { label: 'Encaminhado', color: 'bg-purple-100 text-purple-800' },
  em_andamento: { label: 'Em Andamento', color: 'bg-orange-100 text-orange-800' },
  respondido: { label: 'Respondido', color: 'bg-emerald-100 text-emerald-800' },
  arquivado: { label: 'Arquivado', color: 'bg-gray-100 text-gray-800' },
};

const prioridadeConfig = {
  alta: { label: 'Alta', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  media: { label: 'Média', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  baixa: { label: 'Baixa', color: 'bg-green-100 text-green-800', icon: CheckCircle },
};

const tipoLabels = {
  denuncia: 'Denúncia',
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão',
  solicitacao: 'Solicitação',
};

export default function FilaTriagem({ manifestacoes, onSelect }) {
  // Sort by priority (alta first) and then by date
  const sortedManifestacoes = [...manifestacoes].sort((a, b) => {
    const prioridadeOrder = { alta: 0, media: 1, baixa: 2, undefined: 3 };
    const prioA = prioridadeOrder[a.ia_prioridade || a.prioridade_final] ?? 3;
    const prioB = prioridadeOrder[b.ia_prioridade || b.prioridade_final] ?? 3;
    if (prioA !== prioB) return prioA - prioB;
    return new Date(b.created_date) - new Date(a.created_date);
  });

  if (manifestacoes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma manifestação na fila
        </h3>
        <p className="text-gray-600">
          Todas as manifestações foram triadas e encaminhadas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="font-semibold text-gray-900">
          Fila de Triagem ({manifestacoes.length} manifestações)
        </h2>
      </div>
      
      <div className="divide-y">
        {sortedManifestacoes.map((manifestacao) => {
          const prioridade = manifestacao.prioridade_final || manifestacao.ia_prioridade || 'media';
          const PrioridadeIcon = prioridadeConfig[prioridade]?.icon || Clock;
          
          return (
            <div
              key={manifestacao.id}
              onClick={() => onSelect(manifestacao)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Priority indicator */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  prioridade === 'alta' ? 'bg-red-100' :
                  prioridade === 'media' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <PrioridadeIcon className={`w-5 h-5 ${
                    prioridade === 'alta' ? 'text-red-600' :
                    prioridade === 'media' ? 'text-yellow-600' : 'text-green-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono font-semibold text-gray-900">
                      {manifestacao.protocolo}
                    </span>
                    <Badge className={statusConfig[manifestacao.status]?.color}>
                      {statusConfig[manifestacao.status]?.label}
                    </Badge>
                    {manifestacao.ia_resumo && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                        <Sparkles className="w-3 h-3 mr-1" />
                        IA
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span className="font-medium">{tipoLabels[manifestacao.tipo]}</span>
                    <span>•</span>
                    <span>{format(new Date(manifestacao.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                    {(manifestacao.tema_final || manifestacao.ia_tema_sugerido) && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{manifestacao.tema_final || manifestacao.ia_tema_sugerido}</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">
                    {manifestacao.ia_resumo || manifestacao.relato || 'Manifestação por áudio'}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}