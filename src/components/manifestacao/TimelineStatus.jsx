import React from 'react';
import { CheckCircle, Clock, Send, Eye, FileCheck, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const statusSteps = [
  { id: 'recebido', label: 'Recebido', icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 'em_triagem', label: 'Em Triagem', icon: Eye, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { id: 'encaminhado', label: 'Encaminhado', icon: Send, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { id: 'em_andamento', label: 'Em Andamento', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { id: 'respondido', label: 'Respondido', icon: FileCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
];

const getStatusIndex = (status) => {
  const index = statusSteps.findIndex(s => s.id === status);
  return index >= 0 ? index : 0;
};

export default function TimelineStatus({ manifestacao }) {
  const currentIndex = getStatusIndex(manifestacao.status);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Andamento da Manifestação</h3>
      
      <div className="relative">
        {/* Linha de progresso */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />
        <div 
          className="absolute left-5 top-5 w-0.5 bg-emerald-500 transition-all duration-500"
          style={{ height: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative space-y-8">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step.id} className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300',
                    isCompleted ? step.bgColor : 'bg-gray-100',
                    isCurrent && 'ring-4 ring-emerald-200 scale-110'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isCompleted ? step.color : 'text-gray-400')} />
                </div>
                <div className="flex-1 pt-1">
                  <p className={cn(
                    'font-semibold',
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  )}>
                    {step.label}
                  </p>
                  {step.id === 'recebido' && manifestacao.created_date && (
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(manifestacao.created_date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  )}
                  {step.id === 'em_triagem' && manifestacao.data_triagem && (
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(manifestacao.data_triagem), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  )}
                  {step.id === 'encaminhado' && manifestacao.encaminhamento_final && (
                    <p className="text-sm text-emerald-600 mt-1">
                      → {manifestacao.encaminhamento_final}
                    </p>
                  )}
                  {step.id === 'respondido' && manifestacao.data_resposta && (
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(manifestacao.data_resposta), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {manifestacao.mensagem_status_cidadao && (
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500 mb-2">Mensagem atual</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">{manifestacao.mensagem_status_cidadao}</p>
          </div>
        </div>
      )}
    </div>
  );
}