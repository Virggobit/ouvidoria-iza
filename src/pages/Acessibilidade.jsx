import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Eye, Type, Palette, Zap, Keyboard, Volume2, Check, Mic, Image, Video, MessageSquare, FileText } from 'lucide-react';
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
              <div className="hidden lg:block pl-4 ml-4 border-l border-white/20">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/4add5d15f_Logo_participa_Horizontal-endereco-1.png" 
                  alt="Participa DF"
                  className="h-24 lg:h-32 object-contain"
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

        {/* Seção: Como Registrar Manifestação */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileText className="w-6 h-6 text-blue-600" />
              Como Registrar sua Manifestação de Forma Acessível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              A IZA+ oferece múltiplas formas de registrar sua manifestação, garantindo que todos possam participar independentemente de suas necessidades ou preferências.
            </p>

            <div className="space-y-4">
              {/* Texto */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Type className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">📝 Registro por Texto</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Digite sua manifestação usando o teclado. Ideal para quem prefere escrever ou usa tecnologias assistivas como leitores de tela.
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Compatível com leitores de tela (NVDA, JAWS, VoiceOver)</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Navegação por teclado (Tab, Enter, Setas)</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Sem limite de caracteres</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Áudio */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">🎤 Registro por Áudio</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Grave sua manifestação com sua voz. Perfeito para quem tem dificuldade com escrita ou prefere se expressar falando.
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Gravação direta pelo navegador</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Não precisa instalar aplicativo</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Pode ouvir antes de enviar</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Ideal para pessoas com dificuldades de digitação</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Imagem */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">📷 Registro por Imagem</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Anexe fotos como prova ou complemento da sua manifestação. Mostre visualmente o problema.
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Aceita fotos do celular ou computador</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Até 5 imagens por manifestação</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Análise automática pela IA</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Formatos: JPG, PNG, WEBP</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vídeo */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">🎥 Registro por Vídeo</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Envie vídeos para explicar situações complexas ou mostrar problemas em movimento.
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Upload de vídeos até 100MB</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Formatos: MP4, MOV, AVI</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Análise automática do conteúdo</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Útil para situações em tempo real</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">💬 Registro pelo WhatsApp</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Use o aplicativo que você já conhece para enviar sua manifestação de qualquer forma.
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Texto, áudio, foto ou vídeo</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Conversa natural com a IZA+</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Atualizações automáticas</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-600" /> Familiar e acessível</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link to={createPageUrl('NovaManifestacao')}>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Registrar Manifestação Agora
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

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