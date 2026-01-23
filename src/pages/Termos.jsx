import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Shield, Lock, Eye, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VLibrasWidget from '@/components/iza/VLibrasWidget';

export default function Termos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#0B3D2E] text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
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
            <Link to={createPageUrl('Home')} className="text-sm hover:text-emerald-300 transition-colors flex items-center gap-1">
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
            Termos de Uso e Privacidade
          </h1>
          <p className="text-gray-600">
            Informações sobre o uso da plataforma IZA+ e proteção de dados pessoais
          </p>
        </div>

        {/* Aviso MVP */}
        <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Ambiente de Protótipo (MVP)
              </h3>
              <p className="text-sm text-amber-800">
                Este é um protótipo demonstrativo desenvolvido para o Desafio Participa DF. 
                Recomendamos <strong>não inserir dados pessoais sensíveis</strong> neste ambiente. 
                Para manifestações oficiais, utilize os canais oficiais do Participa DF.
              </p>
            </div>
          </div>
        </div>

        {/* Termos de Uso */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Termos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>1. Aceitação dos Termos</h3>
            <p>
              Ao utilizar a plataforma IZA+, você concorda com estes termos de uso. 
              Caso não concorde, pedimos que não utilize o sistema.
            </p>

            <h3>2. Finalidade da Plataforma</h3>
            <p>
              O IZA+ é uma plataforma de ouvidoria digital que permite o registro, 
              acompanhamento e gestão de manifestações de cidadãos. A plataforma utiliza 
              inteligência artificial para auxiliar na classificação e encaminhamento das demandas.
            </p>

            <h3>3. Responsabilidade do Usuário</h3>
            <p>
              O usuário se compromete a:
            </p>
            <ul>
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Não utilizar o sistema para fins ilícitos ou abusivos</li>
              <li>Não registrar manifestações falsas ou caluniosas</li>
              <li>Respeitar outros usuários e servidores públicos</li>
            </ul>

            <h3>4. Manifestações Anônimas</h3>
            <p>
              O sistema permite manifestações anônimas. Nesses casos, não será possível 
              fornecer retorno personalizado ou solicitar informações adicionais.
            </p>

            <h3>5. Declaração de Veracidade</h3>
            <p>
              Ao enviar uma manifestação, você declara que as informações são verdadeiras. 
              Declarações falsas podem configurar crime previsto no Código Penal Brasileiro 
              (Art. 299 - Falsidade ideológica).
            </p>
          </CardContent>
        </Card>

        {/* Privacidade e LGPD */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Privacidade e Proteção de Dados (LGPD)
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>1. Coleta de Dados</h3>
            <p>
              Coletamos apenas os dados necessários para o processamento de sua manifestação:
            </p>
            <ul>
              <li>Dados de identificação (se não anônimo): nome, e-mail, telefone</li>
              <li>Conteúdo da manifestação: texto, áudio, imagens, vídeos</li>
              <li>Dados técnicos: data/hora de registro, protocolo, status</li>
            </ul>

            <h3>2. Finalidade do Tratamento</h3>
            <p>
              Os dados são tratados exclusivamente para:
            </p>
            <ul>
              <li>Processamento e resposta à sua manifestação</li>
              <li>Encaminhamento ao órgão competente</li>
              <li>Comunicação sobre o andamento</li>
              <li>Geração de estatísticas agregadas (sem identificação pessoal)</li>
            </ul>

            <h3>3. Base Legal</h3>
            <p>
              O tratamento de dados pessoais é realizado com base na Lei nº 13.709/2018 (LGPD), 
              fundamentado no exercício regular de direitos (Art. 7º, VI) e no cumprimento de 
              obrigação legal (Art. 7º, II).
            </p>

            <h3>4. Compartilhamento de Dados</h3>
            <p>
              Seus dados podem ser compartilhados com:
            </p>
            <ul>
              <li>Órgãos públicos competentes para tratar sua demanda</li>
              <li>Autoridades públicas, quando requisitado legalmente</li>
              <li>Não compartilhamos dados com terceiros privados</li>
            </ul>

            <h3>5. Segurança da Informação</h3>
            <p>
              Implementamos medidas técnicas e organizacionais para proteger seus dados:
            </p>
            <ul>
              <li>Criptografia de dados em trânsito (HTTPS)</li>
              <li>Controle de acesso restrito ao backoffice</li>
              <li>Logs de auditoria de todas as ações</li>
              <li>Backups regulares e seguros</li>
            </ul>

            <h3>6. Retenção de Dados</h3>
            <p>
              Os dados são mantidos pelo período necessário para:
            </p>
            <ul>
              <li>Atendimento da manifestação</li>
              <li>Cumprimento de obrigações legais</li>
              <li>Exercício de direitos em processos judiciais</li>
            </ul>

            <h3>7. Seus Direitos (LGPD)</h3>
            <p>
              Você tem direito a:
            </p>
            <ul>
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
              <li>Obter informações sobre compartilhamento</li>
              <li>Revogar consentimento (quando aplicável)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Uso de IA */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              Uso de Inteligência Artificial
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>1. IZA+ (Camada Inteligente)</h3>
            <p>
              A plataforma utiliza inteligência artificial para:
            </p>
            <ul>
              <li>Classificar automaticamente o tipo de manifestação</li>
              <li>Sugerir temas e áreas responsáveis</li>
              <li>Gerar resumos executivos</li>
              <li>Priorizar demandas urgentes</li>
            </ul>

            <h3>2. Human-in-the-Loop</h3>
            <p>
              Todas as sugestões da IA são revisadas por um servidor humano antes do 
              encaminhamento final. A decisão humana sempre prevalece sobre a sugestão 
              automatizada.
            </p>

            <h3>3. Transparência</h3>
            <p>
              O sistema registra em logs de auditoria:
            </p>
            <ul>
              <li>Sugestões geradas pela IA</li>
              <li>Decisões tomadas pelo triador humano</li>
              <li>Divergências entre IA e humano</li>
              <li>Nível de confiança das classificações</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              Encarregado de Dados e Contato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Para exercer seus direitos previstos na LGPD, esclarecer dúvidas ou reportar 
              incidentes de segurança, entre em contato:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Ouvidoria-Geral do Distrito Federal</strong></p>
              <p>Central 162 (ligação gratuita)</p>
              <p>E-mail: ouvidoria@df.gov.br</p>
              <p>Site oficial: www.participa.df.gov.br</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Última atualização: Janeiro de 2025</p>
        </div>
      </main>
      <VLibrasWidget />
    </div>
  );
}