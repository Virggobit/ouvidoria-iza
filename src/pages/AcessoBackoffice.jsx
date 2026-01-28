import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function AcessoBackoffice() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Credenciais demo
    const credenciais = {
      'staff@iza.gov.br': 'staff123',
      'admin@iza.gov.br': 'admin123'
    };

    setTimeout(() => {
      if (credenciais[email] === senha) {
        toast.success('Login realizado com sucesso!');
        // Salvar no localStorage para simular autenticação
        localStorage.setItem('backoffice-auth', JSON.stringify({ email, role: email.includes('admin') ? 'admin' : 'staff' }));
        navigate(createPageUrl('Backoffice'));
      } else {
        toast.error('E-mail ou senha inválidos');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Ícone e Título */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#004A8C] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso ao Backoffice
            </h1>
            <p className="text-gray-600">
              Área exclusiva para servidores da Ouvidoria
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                E-mail institucional
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@gov.br"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="senha" className="text-gray-700 mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarSenha ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#F5A623] hover:bg-[#E09612] text-white font-semibold text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Credenciais Demo */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-900 mb-2">
              Credenciais demo:
            </p>
            <div className="space-y-1 text-xs font-mono text-amber-800">
              <p>
                <span className="font-semibold">Staff:</span> staff@iza.gov.br / staff123
              </p>
              <p>
                <span className="font-semibold">Admin:</span> admin@iza.gov.br / admin123
              </p>
            </div>
          </div>

          {/* Link voltar */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(createPageUrl('Home'))}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Voltar para página inicial
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Ambiente seguro - Apenas para servidores autorizados
          </p>
        </div>
      </div>
    </div>
  );
}