import React from 'react';
import { User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function IdentificacaoStep({ data, onChange }) {
  if (data.anonimo) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registro Anônimo
          </h2>
          <p className="text-gray-600">
            Você optou por fazer um registro anônimo. Sua identidade será preservada.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
          <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">
            Sua identidade está protegida
          </h3>
          <p className="text-emerald-700">
            Nenhum dado pessoal será solicitado ou vinculado a esta manifestação.
            Você poderá acompanhar o andamento através do número de protocolo.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Atenção:</strong> Em caso de manifestação anônima, não será possível 
            entrar em contato para solicitar informações adicionais. Seja o mais detalhado 
            possível no seu relato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seus dados de identificação
        </h2>
        <p className="text-gray-600">
          Preencha seus dados para que possamos entrar em contato sobre sua manifestação.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nome" className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome completo *
          </Label>
          <Input
            id="nome"
            type="text"
            value={data.nome || ''}
            onChange={(e) => onChange({ ...data, nome: e.target.value })}
            placeholder="Digite seu nome completo"
            className="h-12 text-base"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            E-mail *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="seu.email@exemplo.com"
            className="h-12 text-base"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Você receberá atualizações sobre sua manifestação por e-mail
          </p>
        </div>

        <div>
          <Label htmlFor="telefone" className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone (opcional)
          </Label>
          <Input
            id="telefone"
            type="tel"
            value={data.telefone || ''}
            onChange={(e) => onChange({ ...data, telefone: e.target.value })}
            placeholder="(61) 99999-9999"
            className="h-12 text-base"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Privacidade:</strong> Seus dados são protegidos conforme a Lei Geral de 
          Proteção de Dados (LGPD) e serão utilizados apenas para tratamento desta manifestação.
        </p>
      </div>
    </div>
  );
}