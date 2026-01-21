import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Shield, Search, Download, Filter, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const acaoLabels = {
  criacao: 'Criação',
  triagem_ia: 'Análise IA',
  triagem_humana: 'Triagem Humana',
  encaminhamento: 'Encaminhamento',
  resposta: 'Resposta',
  alteracao_status: 'Alteração de Status',
};

export default function Auditoria() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.LogAuditoria.list('-created_date', 200);
      setLogs(data);
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    }
    setIsLoading(false);
  };

  const filteredLogs = logs.filter(log =>
    log.protocolo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.acao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Data', 'Protocolo', 'Ação', 'Usuário', 'IA Aceita', 'Observação'];
    const rows = filteredLogs.map(log => [
      format(new Date(log.created_date), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      log.protocolo || '',
      acaoLabels[log.acao] || log.acao,
      log.usuario || '',
      log.aceito_ia ? 'Sim' : 'Não',
      log.observacao || ''
    ]);

    const csv = [headers, ...rows].map(row => row.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `auditoria_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#0B3D2E] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a5d8dd8af_iza-1.png" 
                  alt="IZA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-semibold">IZA+ Auditoria</span>
                <p className="text-xs text-emerald-200">Trilha de Decisões</p>
              </div>
            </div>
            <Link to={createPageUrl('Backoffice')}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            Trilha de Auditoria
          </h1>
          <p className="text-gray-600">
            Registro completo de todas as ações, decisões e divergências entre IA e humanos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por protocolo, usuário ou ação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadLogs}>
                <Filter className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total de Ações</p>
            <p className="text-2xl font-bold text-gray-900">{filteredLogs.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">IA Aceita</p>
            <p className="text-2xl font-bold text-emerald-600">
              {filteredLogs.filter(l => l.aceito_ia).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">IA Editada</p>
            <p className="text-2xl font-bold text-amber-600">
              {filteredLogs.filter(l => l.aceito_ia === false && l.acao === 'triagem_humana').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Encaminhamentos</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredLogs.filter(l => l.acao === 'encaminhamento').length}
            </p>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Data/Hora</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>IA Aceita</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    Nenhum log encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell className="text-sm">
                      {format(new Date(log.created_date), 'dd/MM/yy HH:mm', { locale: ptBR })}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.protocolo || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {acaoLabels[log.acao] || log.acao}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.usuario || '-'}</TableCell>
                    <TableCell>
                      {log.aceito_ia !== null && log.aceito_ia !== undefined && (
                        <Badge className={log.aceito_ia ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                          {log.aceito_ia ? 'Sim' : 'Não'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLog(log)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Log de Auditoria</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Protocolo</p>
                  <p className="font-mono font-medium">{selectedLog.protocolo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ação</p>
                  <Badge>{acaoLabels[selectedLog.acao] || selectedLog.acao}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Usuário</p>
                  <p className="font-medium">{selectedLog.usuario}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data/Hora</p>
                  <p className="font-medium">
                    {format(new Date(selectedLog.created_date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
                  </p>
                </div>
              </div>

              {selectedLog.sugestao_ia && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Sugestão da IA</p>
                  <pre className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedLog.sugestao_ia), null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.decisao_humana && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Decisão Humana</p>
                  <pre className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-xs overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedLog.decisao_humana), null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.observacao && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Observação</p>
                  <p className="bg-gray-50 border rounded-lg p-4 text-sm">
                    {selectedLog.observacao}
                  </p>
                </div>
              )}

              {selectedLog.aceito_ia !== null && selectedLog.aceito_ia !== undefined && (
                <div className="flex items-center gap-2">
                  <Shield className={`w-5 h-5 ${selectedLog.aceito_ia ? 'text-emerald-600' : 'text-amber-600'}`} />
                  <span className="font-medium">
                    {selectedLog.aceito_ia 
                      ? 'Sugestões da IA foram aceitas sem alterações' 
                      : 'Triador fez alterações nas sugestões da IA'}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}