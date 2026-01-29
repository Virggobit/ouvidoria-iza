import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Code, Key, Book, Copy, CheckCircle, ExternalLink, Shield, Zap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Código copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
};

const EndpointCard = ({ method, endpoint, description, parameters, response }) => {
  const methodColors = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-green-100 text-green-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-bold ${methodColors[method]}`}>
            {method}
          </span>
          <code className="text-sm font-mono text-gray-700">{endpoint}</code>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      {(parameters || response) && (
        <CardContent className="space-y-4">
          {parameters && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Parâmetros:</h4>
              <div className="space-y-2">
                {parameters.map((param, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <code className="bg-gray-100 px-2 py-0.5 rounded">{param.name}</code>
                    <span className="text-gray-600">({param.type})</span>
                    <span className="text-gray-500">- {param.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {response && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Resposta de exemplo:</h4>
              <CodeBlock code={JSON.stringify(response, null, 2)} />
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default function APIDocumentacao() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#004A8C] text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">API - Documentação para Desenvolvedores</h1>
              <p className="text-xs text-blue-200">Integre sua aplicação com o IZA+</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Introdução */}
        <Card className="mb-6 border-2 border-[#0E6B4E]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0E6B4E] rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">API REST do IZA+</CardTitle>
                <CardDescription>Integração programática com a Ouvidoria Inteligente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              A API do IZA+ permite que sistemas externos integrem-se com a plataforma de ouvidoria, 
              possibilitando o registro, consulta e acompanhamento de manifestações de forma automatizada.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">API RESTful</h4>
                  <p className="text-xs text-gray-600">Padrão REST com JSON</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Autenticação OAuth</h4>
                  <p className="text-xs text-gray-600">Segurança com tokens</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Database className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Dados em tempo real</h4>
                  <p className="text-xs text-gray-600">WebSocket para updates</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="quickstart" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quickstart">
              <Book className="w-4 h-4 mr-2" />
              Início Rápido
            </TabsTrigger>
            <TabsTrigger value="auth">
              <Key className="w-4 h-4 mr-2" />
              Autenticação
            </TabsTrigger>
            <TabsTrigger value="endpoints">
              <Code className="w-4 h-4 mr-2" />
              Endpoints
            </TabsTrigger>
            <TabsTrigger value="examples">
              <ExternalLink className="w-4 h-4 mr-2" />
              Exemplos
            </TabsTrigger>
          </TabsList>

          {/* Início Rápido */}
          <TabsContent value="quickstart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuração Inicial</CardTitle>
                <CardDescription>Primeiros passos para integrar com a API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Base URL</h4>
                  <CodeBlock code="https://api.iza.df.gov.br/v1" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Instalar biblioteca (opcional)</h4>
                  <CodeBlock code="npm install @iza-plus/sdk" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Fazer primeira requisição</h4>
                  <CodeBlock code={`const response = await fetch('https://api.iza.df.gov.br/v1/manifestacoes', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer SEU_TOKEN_AQUI',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Autenticação */}
          <TabsContent value="auth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Autenticação OAuth 2.0</CardTitle>
                <CardDescription>Como obter e usar tokens de acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Atenção:</strong> Para obter credenciais de API, entre em contato com a 
                    Ouvidoria-Geral através do e-mail: <strong>api@ouvidoria.df.gov.br</strong>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Obtendo Token de Acesso</h4>
                  <CodeBlock code={`POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=SEU_CLIENT_ID
&client_secret=SEU_CLIENT_SECRET`} />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Resposta</h4>
                  <CodeBlock code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`} />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Usando o Token</h4>
                  <CodeBlock code={`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endpoints */}
          <TabsContent value="endpoints" className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Manifestações</h3>

            <EndpointCard
              method="POST"
              endpoint="/manifestacoes"
              description="Cria uma nova manifestação"
              parameters={[
                { name: 'tipo', type: 'string', description: 'denuncia, reclamacao, sugestao, elogio, solicitacao, informacao' },
                { name: 'titulo', type: 'string', description: 'Título da manifestação (5-100 caracteres)' },
                { name: 'relato', type: 'string', description: 'Descrição detalhada' },
                { name: 'anonimo', type: 'boolean', description: 'Se é anônima (opcional)' },
                { name: 'nome_cidadao', type: 'string', description: 'Nome do cidadão (obrigatório se não anônimo)' },
                { name: 'email_cidadao', type: 'string', description: 'Email do cidadão (obrigatório se não anônimo)' },
              ]}
              response={{
                id: '550e8400-e29b-41d4-a716-446655440000',
                protocolo: '2026-123456',
                status: 'recebido',
                created_date: '2026-01-29T10:30:00Z'
              }}
            />

            <EndpointCard
              method="GET"
              endpoint="/manifestacoes"
              description="Lista todas as manifestações"
              parameters={[
                { name: 'limit', type: 'number', description: 'Quantidade de resultados (padrão: 50)' },
                { name: 'offset', type: 'number', description: 'Paginação (padrão: 0)' },
                { name: 'status', type: 'string', description: 'Filtrar por status' },
                { name: 'tipo', type: 'string', description: 'Filtrar por tipo' },
              ]}
              response={{
                data: [
                  {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    protocolo: '2026-123456',
                    tipo: 'denuncia',
                    titulo: 'Exemplo de manifestação',
                    status: 'recebido'
                  }
                ],
                total: 1,
                limit: 50,
                offset: 0
              }}
            />

            <EndpointCard
              method="GET"
              endpoint="/manifestacoes/:protocolo"
              description="Consulta uma manifestação específica pelo protocolo"
              response={{
                id: '550e8400-e29b-41d4-a716-446655440000',
                protocolo: '2026-123456',
                tipo: 'denuncia',
                titulo: 'Exemplo de manifestação',
                relato: 'Descrição detalhada...',
                status: 'em_andamento',
                created_date: '2026-01-29T10:30:00Z',
                updated_date: '2026-01-29T15:45:00Z'
              }}
            />

            <EndpointCard
              method="PUT"
              endpoint="/manifestacoes/:id/status"
              description="Atualiza o status de uma manifestação (requer permissões administrativas)"
              parameters={[
                { name: 'status', type: 'string', description: 'recebido, em_triagem, encaminhado, em_andamento, respondido, arquivado' },
                { name: 'mensagem_status_cidadao', type: 'string', description: 'Mensagem visível ao cidadão' },
              ]}
            />

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Notificações</h3>
              
              <EndpointCard
                method="GET"
                endpoint="/notificacoes"
                description="Lista notificações do usuário autenticado"
                parameters={[
                  { name: 'lida', type: 'boolean', description: 'Filtrar por lidas/não lidas' },
                  { name: 'limit', type: 'number', description: 'Quantidade de resultados' },
                ]}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">WebSocket (Tempo Real)</h3>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subscrever a atualizações</CardTitle>
                  <CardDescription>Receba updates em tempo real via WebSocket</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`const ws = new WebSocket('wss://api.iza.df.gov.br/v1/ws');

ws.onopen = () => {
  // Autenticar
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'SEU_TOKEN_AQUI'
  }));
  
  // Subscrever a manifestação específica
  ws.send(JSON.stringify({
    type: 'subscribe',
    resource: 'manifestacao',
    id: 'protocolo-123456'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Update:', data);
};`} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exemplos */}
          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exemplo: Criar Manifestação</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`// JavaScript / Node.js
const criarManifestacao = async () => {
  const response = await fetch('https://api.iza.df.gov.br/v1/manifestacoes', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer SEU_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tipo: 'denuncia',
      titulo: 'Irregularidade no atendimento',
      relato: 'Descrição detalhada do problema...',
      anonimo: false,
      nome_cidadao: 'João Silva',
      email_cidadao: 'joao@example.com',
      telefone_cidadao: '(61) 99999-9999'
    })
  });
  
  const data = await response.json();
  console.log('Protocolo:', data.protocolo);
  return data;
};`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exemplo: Consultar Status</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`// Python
import requests

def consultar_manifestacao(protocolo):
    url = f'https://api.iza.df.gov.br/v1/manifestacoes/{protocolo}'
    headers = {
        'Authorization': 'Bearer SEU_TOKEN'
    }
    
    response = requests.get(url, headers=headers)
    data = response.json()
    
    print(f"Status: {data['status']}")
    print(f"Última atualização: {data['updated_date']}")
    
    return data

# Uso
consultar_manifestacao('2026-123456')`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exemplo: Listar com Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`// PHP
<?php
$token = 'SEU_TOKEN';
$url = 'https://api.iza.df.gov.br/v1/manifestacoes?status=em_andamento&limit=10';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);

foreach ($data['data'] as $manifestacao) {
    echo "Protocolo: " . $manifestacao['protocolo'] . "\\n";
    echo "Status: " . $manifestacao['status'] . "\\n\\n";
}

curl_close($ch);
?>`} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recursos Adicionais */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recursos Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="mailto:api@ouvidoria.df.gov.br"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-8 h-8 text-[#0E6B4E]" />
                <div>
                  <h4 className="font-semibold">Suporte Técnico</h4>
                  <p className="text-sm text-gray-600">api@ouvidoria.df.gov.br</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/ouvidoria-df/iza-api-examples"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-8 h-8 text-[#0E6B4E]" />
                <div>
                  <h4 className="font-semibold">Exemplos no GitHub</h4>
                  <p className="text-sm text-gray-600">Código de exemplo completo</p>
                </div>
              </a>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Limites de Taxa (Rate Limits)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 100 requisições por minuto por token</li>
                <li>• 1000 requisições por hora por token</li>
                <li>• Headers de resposta incluem <code>X-RateLimit-Limit</code> e <code>X-RateLimit-Remaining</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <VLibrasWidget />
    </div>
  );
}