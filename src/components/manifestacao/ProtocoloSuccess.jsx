import React from 'react';
import { CheckCircle, Copy, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProtocoloSuccess({ protocolo }) {
  const copyProtocolo = () => {
    navigator.clipboard.writeText(protocolo);
    toast.success('Protocolo copiado!');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto p-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Manifestação registrada com sucesso!
        </h1>

        <p className="text-gray-600 mb-8">
          Sua manifestação foi recebida e será analisada pela equipe da Ouvidoria. 
          Guarde o número do protocolo para acompanhar o andamento.
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-blue-600 font-medium mb-2">Número do Protocolo</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-bold text-blue-900 font-mono tracking-wider">
              {protocolo}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={copyProtocolo}
              className="h-10 w-10"
              aria-label="Copiar protocolo"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Link to={createPageUrl('ConsultarProtocolo') + `?protocolo=${protocolo}`}>
            <Button className="w-full h-12 bg-[#0E6B4E] hover:bg-[#0B3D2E]">
              Acompanhar manifestação
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <Link to={createPageUrl('Home')}>
            <Button variant="outline" className="w-full h-12">
              Voltar ao início
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Você também pode acompanhar pelo telefone 162 informando o número do protocolo.
        </p>
      </div>
    </div>
  );
}