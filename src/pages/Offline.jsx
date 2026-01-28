import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Offline() {
  const recarregar = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Você está offline
          </h1>
          <p className="text-gray-600">
            Parece que você perdeu a conexão com a internet. 
            Algumas funcionalidades podem estar limitadas.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Quando você recuperar a conexão, 
            clique no botão abaixo para recarregar o app.
          </p>
        </div>

        <Button
          onClick={recarregar}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Tentar novamente
        </Button>

        <div className="mt-8 pt-8 border-t">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png" 
              alt="IZA"
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="font-bold text-lg text-gray-900">IZA+</p>
              <p className="text-xs text-gray-500">Ouvidoria Inteligente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}