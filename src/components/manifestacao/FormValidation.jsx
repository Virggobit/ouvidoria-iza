import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// Regras de validação
export const validationRules = {
  titulo: {
    required: true,
    minLength: 5,
    maxLength: 100,
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return { valid: false, message: 'O título é obrigatório' };
      }
      if (value.trim().length < 5) {
        return { valid: false, message: 'O título deve ter no mínimo 5 caracteres' };
      }
      if (value.length > 100) {
        return { valid: false, message: 'O título não pode exceder 100 caracteres' };
      }
      return { valid: true, message: 'Título válido' };
    }
  },
  relato: {
    required: true,
    minLength: 20,
    maxLength: 13000,
    validate: (value, data) => {
      // Se tem áudio ou vídeo, o relato não é obrigatório
      if (data?.audioUrl || data?.videoUrl) {
        return { valid: true, message: 'Áudio/vídeo fornecido' };
      }
      if (!value || value.trim().length === 0) {
        return { valid: false, message: 'O relato é obrigatório (ou grave um áudio/vídeo)' };
      }
      if (value.trim().length < 20) {
        return { valid: false, message: `Faltam ${20 - value.trim().length} caracteres` };
      }
      if (value.length > 13000) {
        return { valid: false, message: 'O relato excede o limite de caracteres' };
      }
      return { valid: true, message: 'Relato completo' };
    }
  },
  nome: {
    required: true,
    validate: (value, data) => {
      if (data?.anonimo) {
        return { valid: true, message: 'Registro anônimo' };
      }
      if (!value || value.trim().length === 0) {
        return { valid: false, message: 'O nome é obrigatório' };
      }
      if (value.trim().split(' ').length < 2) {
        return { valid: false, message: 'Digite seu nome completo' };
      }
      return { valid: true, message: 'Nome válido' };
    }
  },
  email: {
    required: true,
    validate: (value, data) => {
      if (data?.anonimo) {
        return { valid: true, message: 'Registro anônimo' };
      }
      if (!value || value.trim().length === 0) {
        return { valid: false, message: 'O e-mail é obrigatório' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: 'E-mail inválido' };
      }
      return { valid: true, message: 'E-mail válido' };
    }
  },
  telefone: {
    required: false,
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return { valid: true, message: 'Telefone opcional' };
      }
      const phoneRegex = /^[\d\s()-]+$/;
      if (!phoneRegex.test(value)) {
        return { valid: false, message: 'Formato inválido' };
      }
      const numbers = value.replace(/\D/g, '');
      if (numbers.length < 10 || numbers.length > 11) {
        return { valid: false, message: 'Telefone deve ter 10 ou 11 dígitos' };
      }
      return { valid: true, message: 'Telefone válido' };
    }
  },
  tipo: {
    required: true,
    validate: (value) => {
      if (!value) {
        return { valid: false, message: 'Selecione um tipo de manifestação' };
      }
      return { valid: true, message: 'Tipo selecionado' };
    }
  },
  consentimento: {
    required: true,
    validate: (value) => {
      if (!value) {
        return { valid: false, message: 'Você deve aceitar os termos para continuar' };
      }
      return { valid: true, message: 'Termos aceitos' };
    }
  }
};

// Componente de feedback visual
export function ValidationFeedback({ field, value, data, touched = false, showSuccess = true }) {
  if (!touched) return null;

  const rule = validationRules[field];
  if (!rule) return null;

  const result = rule.validate(value, data);

  if (result.valid && !showSuccess) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 mt-1.5 text-sm transition-all",
      result.valid ? "text-green-600" : "text-red-600"
    )}>
      {result.valid ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span>{result.message}</span>
    </div>
  );
}

// Validar formulário completo
export function validateForm(data) {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const result = validationRules[field].validate(data[field], data);
    if (!result.valid) {
      errors[field] = result.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Formatar telefone
export function formatarTelefone(value) {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return value;
}