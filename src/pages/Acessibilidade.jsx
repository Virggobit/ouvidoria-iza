import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Eye, Type, Palette, Zap, Keyboard, Volume2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function Acessibilidade() {
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);
  const [reduzirAnimacoes, setReduzirAnimacoes] = useState(false);

  useEffect(() => {
    // Aplicar alto contraste
    if (altoContraste) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Aplicar tamanho de fonte
    document.documentElement.style.fontSize = `${tamanhoFonte}px`;

    // Reduzir animações
    if (reduzirAnimacoes) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [altoContraste, tamanhoFonte, reduzirAnimacoes]);

  const recursos = [
    {
      icon: Keyboard,
      titulo: 'Navegação por Teclado',
      descricao: 'Todo o site pode ser navegado usando apenas o teclado. Use Tab para avançar, Shift+Tab para voltar e Enter para selecionar.',
      teclas: ['Tab', 'Shift+Tab', 'Enter', 'Esc']
    },
    {
      icon: Eye,
      titulo: 'Leitores de Tela',
      descricao: 'Compatível com leitores de tela como NVDA, JAWS e VoiceOver. Todos os elementos possuem descrições adequadas.',
      tecnologias: ['NVDA', 'JAWS', 'VoiceOver', 'TalkBack']
    },
    {
      icon: Type,
      titulo: 'Rótulos e Descrições',
      descricao: 'Todos os campos de formulário possuem rótulos descritivos e mensagens de ajuda claras.',
      exemplos: ['Labels em campos', 'Textos alternativos', 'Descrições ARIA']
    },
    {
      icon: Palette,
      titulo: 'Contraste de Cores',
      descricao: 'Cores e contrastes seguem o padrão WCAG 2.1 AA, garantindo legibilidade para pessoas com baixa visão.',
      niveis: ['AA (mínimo 4.5:1)', 'AAA (mínimo 7:1)']
    },
    {
      icon: Volume2,
      titulo: 'Gravação de Áudio',
      descricao: 'Registre sua manifestação por áudio diretamente no navegador, ideal para quem tem dificuldade com texto.',
      formatos: ['Gravação no navegador', 'Upload de arquivo']
    },
    {
      icon: Zap,
      titulo: 'Simplicidade e Clareza',
      descricao: 'Interface limpa e mensagens objetivas, seguindo princípios de linguagem simples e design inclusivo.',
      principios: ['Linguagem clara', 'Sem jargões', 'Fluxo intuitivo']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <VLibrasWidget />
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-3">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                    alt="IZA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">IZA+ Ouvidoria</span>
              </div>
              <div className="hidden md:block pl-4 ml-4 border-l border-white/20">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/4add5d15f_Logo_participa_Horizontal-endereco-1.png" 
                  alt="Participa DF"
                  className="h-32 object-contain"
                />
              </div>
            </div>
            <Link to={createPageUrl('Home')} className="text-sm hover:text-blue-200 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Acessibilidade
          </h1>
          <p className="text-gray-600">
            O IZA+ foi desenvolvido seguindo as diretrizes WCAG 2.1 nível AA para garantir 
            que todas as pessoas possam registrar e acompanhar suas manifestações.
          </p>
        </div>

        {/* Controles de Acessibilidade */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ajustes Personalizados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="alto-contraste" className="text-base font-medium">
                  Alto Contraste
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Aumenta o contraste das cores para melhor legibilidade
                </p>
              </div>
              <Switch
                id="alto-contraste"
                checked={altoContraste}
                onCheckedChange={setAltoContraste}
              />
            </div>

            <div>
              <Label htmlFor="tamanho-fonte" className="text-base font-medium mb-3 block">
                Tamanho da Fonte: {tamanhoFonte}px
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-sm">A</span>
                <Slider
                  id="tamanho-fonte"
                  value={[tamanhoFonte]}
                  onValueChange={(value) => setTamanhoFonte(value[0])}
                  min={12}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xl font-bold">A</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="reducao-animacoes" className="text-base font-medium">
                  Reduzir Animações
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Remove movimentos e transições que podem causar desconforto
                </p>
              </div>
              <Switch
                id="reducao-animacoes"
                checked={reduzirAnimacoes}
                onCheckedChange={setReduzirAnimacoes}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recursos de Acessibilidade */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {recurso.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {recurso.descricao}
                      </p>
                      {recurso.teclas && (
                        <div className="flex flex-wrap gap-2">
                          {recurso.teclas.map((tecla, i) => (
                            <kbd key={i} className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                              {tecla}
                            </kbd>
                          ))}
                        </div>
                      )}
                      {recurso.tecnologias && (
                        <div className="flex flex-wrap gap-2">
                          {recurso.tecnologias.map((tec, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              {tec}
                            </span>
                          ))}
                        </div>
                      )}
                      {recurso.exemplos && (
                        <ul className="space-y-1">
                          {recurso.exemplos.map((ex, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                              <Check className="w-3 h-3 text-blue-600" />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      )}
                      {recurso.niveis && (
                        <ul className="space-y-1">
                          {recurso.niveis.map((nivel, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                              <Check className="w-3 h-3 text-blue-600" />
                              {nivel}
                            </li>
                          ))}
                        </ul>
                      )}
                      {recurso.formatos && (
                        <ul className="space-y-1">
                          {recurso.formatos.map((formato, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                              <Check className="w-3 h-3 text-blue-600" />
                              {formato}
                            </li>
                          ))}
                        </ul>
                      )}
                      {recurso.principios && (
                        <ul className="space-y-1">
                          {recurso.principios.map((principio, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                              <Check className="w-3 h-3 text-blue-600" />
                              {principio}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Conformidade */}
        <Card>
          <CardHeader>
            <CardTitle>Conformidade com Padrões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">WCAG 2.1 Nível AA</p>
                  <p className="text-sm text-gray-600">
                    Diretrizes de Acessibilidade para Conteúdo Web do W3C
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">e-MAG (Modelo de Acessibilidade em Governo Eletrônico)</p>
                  <p className="text-sm text-gray-600">
                    Padrão brasileiro de acessibilidade digital
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Lei Brasileira de Inclusão (LBI)</p>
                  <p className="text-sm text-gray-600">
                    Lei nº 13.146/2015 - Estatuto da Pessoa com Deficiência
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            Encontrou alguma barreira de acessibilidade?
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            Estamos constantemente trabalhando para melhorar a acessibilidade do IZA+. 
            Se você encontrou alguma dificuldade, por favor nos informe.
          </p>
          <Link to={createPageUrl('NovaManifestacao')}>
            <Button className="bg-[#0066B3] hover:bg-[#004A8C]">
              Relatar problema de acessibilidade
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}