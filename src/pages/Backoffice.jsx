import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  LogOut,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import FilaTriagem from '@/components/backoffice/FilaTriagem';
import DetalheManifestacao from '@/components/backoffice/DetalheManifestacao';
import DashboardMetricas from '@/components/backoffice/DashboardMetricas';

export default function Backoffice() {
  const [activeTab, setActiveTab] = useState('fila');
  const [manifestacoes, setManifestacoes] = useState([]);
  const [selectedManifestacao, setSelectedManifestacao] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPrioridade, setFilterPrioridade] = useState('todos');

  useEffect(() => {
    loadManifestacoes();
  }, []);

  const loadManifestacoes = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.Manifestacao.list('-created_date', 100);
      setManifestacoes(data);
    } catch (error) {
      console.error('Erro ao carregar manifestações:', error);
    }
    setIsLoading(false);
  };

  const handleSelectManifestacao = (manifestacao) => {
    setSelectedManifestacao(manifestacao);
    setActiveTab('detalhe');
  };

  const handleBack = () => {
    setSelectedManifestacao(null);
    setActiveTab('fila');
    loadManifestacoes();
  };

  const filteredManifestacoes = manifestacoes.filter(m => {
    const matchesSearch = m.protocolo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.relato?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || m.status === filterStatus;
    const matchesPrioridade = filterPrioridade === 'todos' || 
                             m.ia_prioridade === filterPrioridade ||
                             m.prioridade_final === filterPrioridade;
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-[#1e3a5f] font-bold text-sm">IZA</span>
                </div>
                <div>
                  <span className="font-semibold">IZA+ Backoffice</span>
                  <p className="text-xs text-blue-200">Triagem de Manifestações</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => { setActiveTab('fila'); setSelectedManifestacao(null); }}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'fila' || activeTab === 'detalhe'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <ClipboardList className="w-4 h-4 inline mr-2" />
              Fila de Triagem
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard / Métricas
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {(activeTab === 'fila' || activeTab === 'detalhe') && !selectedManifestacao && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por protocolo ou conteúdo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="todos">Todos os status</option>
                    <option value="recebido">Recebido</option>
                    <option value="em_triagem">Em Triagem</option>
                    <option value="encaminhado">Encaminhado</option>
                    <option value="respondido">Respondido</option>
                  </select>
                  <select
                    value={filterPrioridade}
                    onChange={(e) => setFilterPrioridade(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="todos">Todas prioridades</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                  <Button variant="outline" onClick={loadManifestacoes}>
                    <Filter className="w-4 h-4 mr-2" />
                    Atualizar
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <FilaTriagem 
                manifestacoes={filteredManifestacoes} 
                onSelect={handleSelectManifestacao}
              />
            )}
          </>
        )}

        {activeTab === 'detalhe' && selectedManifestacao && (
          <DetalheManifestacao 
            manifestacao={selectedManifestacao}
            onBack={handleBack}
            onUpdate={loadManifestacoes}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardMetricas manifestacoes={manifestacoes} />
        )}
      </main>
    </div>
  );
}