import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Search, 
  Sparkles, 
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

const categorias = [
  { id: 'todos', nome: 'Todos', icon: '📚' },
  { id: 'registro', nome: 'Como Registrar', icon: '✍️' },
  { id: 'acompanhamento', nome: 'Acompanhamento', icon: '📊' },
  { id: 'anonimato', nome: 'Anonimato', icon: '🔒' },
  { id: 'prazos', nome: 'Prazos', icon: '⏱️' },
  { id: 'canais', nome: 'Canais', icon: '📱' },
  { id: 'geral', nome: 'Geral', icon: '💡' },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gerandoFAQs, setGerandoFAQs] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState({});
  const [votosUsuario, setVotosUsuario] = useState({});

  useEffect(() => {
    carregarFAQs();
  }, []);

  const carregarFAQs = async () => {
    try {
      const faqsData = await base44.entities.FAQ.filter({ ativa: true }, '-votos_util');
      setFaqs(faqsData);
    } catch (error) {
      console.error('Erro ao carregar FAQs:', error);
    }
    setLoading(false);
  };

  const gerarFAQsComIA = async () => {
    setGerandoFAQs(true);
    try {
      // Buscar manifestações para análise
      const manifestacoes = await base44.entities.Manifestacao.list('-created_date', 100);
      
      const prompt = `Analise as seguintes manifestações da ouvidoria e gere 5 perguntas frequentes (FAQ) com respostas claras e objetivas.

Tipos de manifestações recebidas: ${manifestacoes.map(m => `${m.tipo}: ${m.titulo || m.relato?.substring(0, 100)}`).join('\n')}

Para cada FAQ, forneça:
1. Uma pergunta clara
2. Uma resposta completa e útil (2-3 parágrafos)
3. Uma categoria (registro, acompanhamento, anonimato, prazos, canais, ou geral)

Retorne no formato JSON especificado.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            faqs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  pergunta: { type: "string" },
                  resposta: { type: "string" },
                  categoria: { type: "string" }
                }
              }
            }
          }
        }
      });

      // Criar FAQs no banco
      for (const faq of response.faqs) {
        await base44.entities.FAQ.create({
          pergunta: faq.pergunta,
          resposta: faq.resposta,
          categoria: faq.categoria,
          gerada_por_ia: true,
          votos_util: 0,
          votos_nao_util: 0,
          ativa: true
        });
      }

      await carregarFAQs();
    } catch (error) {
      console.error('Erro ao gerar FAQs:', error);
    }
    setGerandoFAQs(false);
  };

  const votar = async (faqId, util) => {
    try {
      // Verificar se já votou
      if (votosUsuario[faqId]) return;

      // Registrar voto
      await base44.entities.VotoFAQ.create({
        faq_id: faqId,
        util: util,
        ip_hash: `user_${Date.now()}`
      });

      // Atualizar contadores
      const faq = faqs.find(f => f.id === faqId);
      if (faq) {
        await base44.entities.FAQ.update(faqId, {
          votos_util: util ? faq.votos_util + 1 : faq.votos_util,
          votos_nao_util: !util ? faq.votos_nao_util + 1 : faq.votos_nao_util
        });
        
        setVotosUsuario(prev => ({ ...prev, [faqId]: util }));
        await carregarFAQs();
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  const toggleExpandir = (faqId) => {
    setExpandido(prev => ({ ...prev, [faqId]: !prev[faqId] }));
  };

  const faqsFiltrados = faqs.filter(faq => {
    const matchCategoria = categoriaAtiva === 'todos' || faq.categoria === categoriaAtiva;
    const matchBusca = !busca || 
      faq.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Perguntas Frequentes</h1>
                <p className="text-sm text-blue-200">Central de ajuda e dúvidas comuns</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Botão FAQ Oficial */}
        <div className="mb-8">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    FAQ Oficial da Ouvidoria
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Acesse o FAQ completo do Participa DF com todas as informações oficiais sobre ouvidoria.
                  </p>
                  <a 
                    href="https://www.participa.df.gov.br/static/faq-ouvidoria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar FAQ Oficial
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gerar FAQs com IA */}
        {faqs.length === 0 && !loading && (
          <div className="text-center mb-8">
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardContent className="p-8">
                <Sparkles className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gerar FAQs Inteligentes</h3>
                <p className="text-gray-600 mb-6">
                  Use inteligência artificial para analisar as manifestações mais comuns e gerar FAQs automaticamente
                </p>
                <Button 
                  onClick={gerarFAQsComIA}
                  disabled={gerandoFAQs}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  {gerandoFAQs ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Gerando FAQs...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Gerar FAQs com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Busca */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar perguntas..."
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                categoriaAtiva === cat.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              )}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Lista de FAQs */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-gray-600 mt-4">Carregando perguntas...</p>
          </div>
        ) : faqsFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma pergunta encontrada.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqsFiltrados.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleExpandir(faq.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {categorias.find(c => c.id === faq.categoria)?.icon} {categorias.find(c => c.id === faq.categoria)?.nome}
                        </Badge>
                        {faq.gerada_por_ia && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{faq.pergunta}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandido[faq.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {expandido[faq.id] && (
                  <CardContent>
                    <div className="prose prose-sm max-w-none mb-6">
                      <p className="text-gray-700 whitespace-pre-wrap">{faq.resposta}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Esta resposta foi útil?
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={votosUsuario[faq.id] === true ? "default" : "outline"}
                          onClick={() => votar(faq.id, true)}
                          disabled={votosUsuario[faq.id] !== undefined}
                          className={cn(
                            votosUsuario[faq.id] === true && "bg-green-600 hover:bg-green-700"
                          )}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {faq.votos_util || 0}
                        </Button>
                        <Button
                          size="sm"
                          variant={votosUsuario[faq.id] === false ? "default" : "outline"}
                          onClick={() => votar(faq.id, false)}
                          disabled={votosUsuario[faq.id] !== undefined}
                          className={cn(
                            votosUsuario[faq.id] === false && "bg-red-600 hover:bg-red-700"
                          )}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {faq.votos_nao_util || 0}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <VLibrasWidget />
    </div>
  );
}