import React from 'react';
import { AlertTriangle, MessageSquare, ThumbsUp, Lightbulb, HelpCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  {
    id: 'informacao',
    nome: 'Informação',
    descricao: 'Solicitar esclarecimento ou informação',
    icon: HelpCircle,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
    selectedColor: 'bg-cyan-600 text-white border-cyan-600',
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="titulo" className="text-base font-semibold text-gray-900 mb-2 block">
            Título da manifestação *
          </Label>
          <Input
            id="titulo"
            value={data.titulo || ''}
            onChange={(e) => onChange({ ...data, titulo: e.target.value })}
            placeholder="Resuma em poucas palavras o assunto da sua manifestação"
            className="text-base h-12"
            maxLength={100}
          />
          <p className="text-sm text-gray-500 mt-1">
            {data.titulo?.length || 0}/100 caracteres
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
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

        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex gap-4 items-start">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/b56eb8397_IZA2.jpg" 
            alt="IZA+"
            className="w-16 h-16 object-contain flex-shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm text-amber-900 font-medium mb-3">
              Esse registro pode ser feito de forma anônima. Porém ao escolher o anonimato você <strong>NÃO PODERÁ ACOMPANHAR</strong> o andamento da sua manifestação.
            </p>
            <a 
              href="https://www.sinj.df.gov.br/sinj/Norma/c87d4625386745569ef03028e6c79397/Instru_o_Normativa_1_05_05_2017.html" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="bg-white hover:bg-amber-50 border-amber-400 text-amber-900">
                <ExternalLink className="w-4 h-4 mr-2" />
                Base Legal
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}