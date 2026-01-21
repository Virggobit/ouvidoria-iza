import React, { useMemo } from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Download,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

const tipoLabels = {
  denuncia: 'Denúncia',
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão',
  solicitacao: 'Solicitação',
};

const statusLabels = {
  recebido: 'Recebido',
  em_triagem: 'Em Triagem',
  encaminhado: 'Encaminhado',
  em_andamento: 'Em Andamento',
  respondido: 'Respondido',
  arquivado: 'Arquivado',
};

export default function DashboardMetricas({ manifestacoes }) {
  const stats = useMemo(() => {
    const total = manifestacoes.length;
    const porStatus = {};
    const porTipo = {};
    const porTema = {};
    const porPrioridade = { alta: 0, media: 0, baixa: 0 };
    let tempoTriagemTotal = 0;
    let triagemCount = 0;
    let iaAceita = 0;
    let iaTotal = 0;

    manifestacoes.forEach(m => {
      // Por status
      porStatus[m.status] = (porStatus[m.status] || 0) + 1;
      
      // Por tipo
      porTipo[m.tipo] = (porTipo[m.tipo] || 0) + 1;
      
      // Por tema
      const tema = m.tema_final || m.ia_tema_sugerido || 'outros';
      porTema[tema] = (porTema[tema] || 0) + 1;
      
      // Por prioridade
      const prioridade = m.prioridade_final || m.ia_prioridade || 'media';
      porPrioridade[prioridade]++;
      
      // Tempo de triagem
      if (m.data_triagem && m.created_date) {
        const diff = new Date(m.data_triagem) - new Date(m.created_date);
        tempoTriagemTotal += diff;
        triagemCount++;
      }
      
      // IA stats
      if (m.ia_tipo_sugerido) {
        iaTotal++;
        if (m.tipo_final === m.ia_tipo_sugerido && 
            m.tema_final === m.ia_tema_sugerido) {
          iaAceita++;
        }
      }
    });

    const tempoMedioTriagem = triagemCount > 0 
      ? Math.round(tempoTriagemTotal / triagemCount / (1000 * 60 * 60)) 
      : 0;

    const taxaAceitacaoIA = iaTotal > 0 ? Math.round((iaAceita / iaTotal) * 100) : 0;

    return {
      total,
      porStatus,
      porTipo,
      porTema,
      porPrioridade,
      tempoMedioTriagem,
      taxaAceitacaoIA,
      pendentes: (porStatus.recebido || 0) + (porStatus.em_triagem || 0),
      encaminhados: porStatus.encaminhado || 0,
      respondidos: porStatus.respondido || 0,
    };
  }, [manifestacoes]);

  const tipoData = Object.entries(stats.porTipo).map(([key, value]) => ({
    name: tipoLabels[key] || key,
    value
  }));

  const temaData = Object.entries(stats.porTema)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
      value
    }));

  const statusData = Object.entries(stats.porStatus).map(([key, value]) => ({
    name: statusLabels[key] || key,
    value
  }));

  const exportCSV = () => {
    const headers = ['Protocolo', 'Tipo', 'Status', 'Prioridade', 'Tema', 'Data Criação', 'Data Triagem', 'Encaminhamento'];
    const rows = manifestacoes.map(m => [
      m.protocolo,
      tipoLabels[m.tipo] || m.tipo,
      statusLabels[m.status] || m.status,
      m.prioridade_final || m.ia_prioridade || '',
      m.tema_final || m.ia_tema_sugerido || '',
      new Date(m.created_date).toLocaleString('pt-BR'),
      m.data_triagem ? new Date(m.data_triagem).toLocaleString('pt-BR') : '',
      m.encaminhamento_final || ''
    ]);

    const csv = [headers, ...rows].map(row => row.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `manifestacoes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard de Métricas</h2>
        <Button onClick={exportCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Encaminhados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.encaminhados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">IA Aceita</p>
                <p className="text-2xl font-bold text-gray-900">{stats.taxaAceitacaoIA}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manifestações por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tipoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {tipoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Temas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top 5 Temas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={temaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Por Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Prioridade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Alta</span>
                  <span className="text-sm text-gray-500">{stats.porPrioridade.alta}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${stats.total > 0 ? (stats.porPrioridade.alta / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Média</span>
                  <span className="text-sm text-gray-500">{stats.porPrioridade.media}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${stats.total > 0 ? (stats.porPrioridade.media / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Baixa</span>
                  <span className="text-sm text-gray-500">{stats.porPrioridade.baixa}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${stats.total > 0 ? (stats.porPrioridade.baixa / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Tempo médio de triagem</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stats.tempoMedioTriagem > 0 ? `${stats.tempoMedioTriagem}h` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}