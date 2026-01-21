import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export function MensagemValidacao({ tipo = 'info', mensagem }) {
  const configs = {
    erro: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
    },
    sucesso: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      iconColor: 'text-emerald-600',
    },
    aviso: {
      icon: AlertCircle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      iconColor: 'text-amber-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
    },
  };

  const config = configs[tipo] || configs.info;
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-3 p-4 ${config.bgColor} border ${config.borderColor} rounded-lg`}>
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm ${config.textColor}`}>{mensagem}</p>
    </div>
  );
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  return numeros.length >= 10 && numeros.length <= 11;
}

export function formatarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  } else if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }
  return telefone;
}