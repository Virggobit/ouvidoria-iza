import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { format, subDays } from 'date-fns';
import { toast } from 'sonner';

export default function ExportarRelatorio() {
  const [isOpen, setIsOpen] = useState(false);
  const [periodo, setPeriodo] = useState('30');
  const [formato, setFormato] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const exportarDados = async () => {
    setIsExporting(true);
    try {
      const dataInicio = subDays(new Date(), parseInt(periodo));
      const manifestacoes = await base44.entities.Manifestacao.filter({
        created_date: { $gte: dataInicio.toISOString() }
      });

      const logs = await base44.entities.LogAuditoria.filter({
        created_date: { $gte: dataInicio.toISOString() }
      });

      if (formato === 'csv') {
        // CSV Manifestações
        const headers = [
          'Protocolo', 'Título', 'Tipo', 'Status', 'Canal', 'Prioridade IA', 'Prioridade Final',
          'Tema IA', 'Tema Final', 'Encaminhamento', 'Anônimo', 'Data Criação', 'Data Triagem',
          'Tempo Resposta (h)', 'Confiança IA', 'Resumo IA'
        ];
        
        const rows = manifestacoes.map(m => [
          m.protocolo,
          m.titulo || '',
          m.tipo,
          m.status,
          m.canal || '',
          m.ia_prioridade || '',
          m.prioridade_final || '',
          m.ia_tema_sugerido || '',
          m.tema_final || '',
          m.encaminhamento_final || '',
          m.anonimo ? 'Sim' : 'Não',
          format(new Date(m.created_date), 'dd/MM/yyyy HH:mm'),
          m.data_triagem ? format(new Date(m.data_triagem), 'dd/MM/yyyy HH:mm') : '',
          m.tempo_resposta_horas || '',
          m.ia_confianca || '',
          `"${(m.ia_resumo || '').replace(/"/g, '""')}"`,
        ]);

        const csv = [headers, ...rows].map(row => row.join(';')).join('\n');
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_manifestacoes_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        link.click();

        // CSV Logs
        const logsHeaders = [
          'Data', 'Protocolo', 'Ação', 'Usuário', 'IA Aceita', 'Observação'
        ];
        const logsRows = logs.map(l => [
          format(new Date(l.created_date), 'dd/MM/yyyy HH:mm'),
          l.protocolo || '',
          l.acao,
          l.usuario || '',
          l.aceito_ia ? 'Sim' : 'Não',
          `"${(l.observacao || '').replace(/"/g, '""')}"`,
        ]);

        const csvLogs = [logsHeaders, ...logsRows].map(row => row.join(';')).join('\n');
        const blobLogs = new Blob(['\ufeff' + csvLogs], { type: 'text/csv;charset=utf-8;' });
        const linkLogs = document.createElement('a');
        linkLogs.href = URL.createObjectURL(blobLogs);
        linkLogs.download = `relatorio_auditoria_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        linkLogs.click();
      }

      toast.success('Relatórios exportados com sucesso!');
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast.error('Erro ao exportar relatórios');
    }
    setIsExporting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatórios
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Relatórios</DialogTitle>
          <DialogDescription>
            Gere relatórios completos de manifestações e logs de auditoria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="periodo">Período</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger id="periodo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="15">Últimos 15 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="60">Últimos 60 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="formato">Formato</Label>
            <Select value={formato} onValueChange={setFormato}>
              <SelectTrigger id="formato">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    CSV (Excel)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Serão gerados 2 arquivos:
            </p>
            <ul className="text-xs text-blue-700 mt-2 space-y-1 ml-4">
              <li>• Relatório de manifestações (dados completos)</li>
              <li>• Relatório de auditoria (trilha de decisões)</li>
            </ul>
          </div>

          <Button
            onClick={exportarDados}
            disabled={isExporting}
            className="w-full bg-[#0E6B4E] hover:bg-[#0B3D2E]"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatórios
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}