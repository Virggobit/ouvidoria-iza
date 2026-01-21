import React from 'react';
import { AlertTriangle, MessageSquare, ThumbsUp, Lightbulb, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const tipos = [
  {
    id: 'denuncia',
    nome: 'Denúncia',
    descricao: 'Relatar irregularidade ou ato ilícito',
    icon: AlertTriangle,
    color: 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100',
    selectedColor: 'bg-red-600 text-white border-red-600',
  },
  {
    id: 'reclamacao',
    nome: 'Reclamação',
    descricao: 'Expressar insatisfação com serviço público',
    icon: MessageSquare,
    color: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100',
    selectedColor: 'bg-orange-600 text-white border-orange-600',
  },
  {
    id: 'sugestao',
    nome: 'Sugestão',
    descricao: 'Propor melhoria em serviço público',
    icon: Lightbulb,
    color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
    selectedColor: 'bg-blue-600 text-white border-blue-600',
  },
  {
    id: 'elogio',
    nome: 'Elogio',
    descricao: 'Reconhecer atendimento ou serviço de qualidade',
    icon: ThumbsUp,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
    selectedColor: 'bg-emerald-600 text-white border-emerald-600',
  },
  {
    id: 'solicitacao',
    nome: 'Solicitação',
    descricao: 'Requerer informação ou providência',
    icon: HelpCircle,
    color: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
    selectedColor: 'bg-purple-600 text-white border-purple-600',
  },
];

export default function TipoStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Qual o tipo da sua manifestação?
        </h2>
        <p className="text-gray-600">
          Selecione a opção que melhor descreve o que você deseja registrar.
        </p>
      </div>

      <fieldset>
        <legend className="sr-only">Tipo de manifestação</legend>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tipos.map((tipo) => {
            const Icon = tipo.icon;
            const isSelected = data.tipo === tipo.id;
            return (
              <button
                key={tipo.id}
                type="button"
                onClick={() => onChange({ ...data, tipo: tipo.id })}
                className={cn(
                  "flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300",
                  isSelected ? tipo.selectedColor : tipo.color
                )}
                aria-pressed={isSelected}
              >
                <Icon className="w-10 h-10 mb-3" aria-hidden="true" />
                <span className="font-semibold text-lg">{tipo.nome}</span>
                <span className={cn(
                  "text-sm mt-1 text-center",
                  isSelected ? "text-white/90" : "text-gray-500"
                )}>
                  {tipo.descricao}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="anonimo" className="text-base font-semibold text-gray-900">
              Deseja fazer o registro de forma anônima?
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              Sua identidade não será revelada ao órgão responsável
            </p>
          </div>
          <Switch
            id="anonimo"
            checked={data.anonimo}
            onCheckedChange={(checked) => onChange({ ...data, anonimo: checked })}
            aria-describedby="anonimo-desc"
          />
        </div>
      </div>
    </div>
  );
}