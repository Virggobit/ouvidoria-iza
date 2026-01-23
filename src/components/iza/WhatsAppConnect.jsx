import React from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Check, Phone, Image, Mic, Video } from 'lucide-react';

export default function WhatsAppConnect() {
  const whatsappURL = base44.agents.getWhatsAppConnectURL('iza_whatsapp');

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">WhatsApp IZA+</CardTitle>
            <p className="text-sm text-gray-600">Registre manifestações pelo WhatsApp</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            Agora você pode registrar e acompanhar suas manifestações diretamente pelo WhatsApp! 
            Converse com a IZA+ de forma prática e rápida.
          </p>

          <div className="bg-white rounded-lg p-4 space-y-2 border border-gray-200">
            <p className="font-medium text-sm text-gray-900 mb-2">O que você pode fazer:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Registrar denúncias, reclamações, elogios e sugestões</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Enviar textos, áudios, fotos e vídeos</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Consultar o status de suas manifestações</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Fazer manifestações anônimas</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="font-medium text-sm text-green-900 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Canais suportados:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                <MessageCircle className="w-3 h-3" />
                Texto
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                <Mic className="w-3 h-3" />
                Áudio
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                <Image className="w-3 h-3" />
                Imagem
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                <Video className="w-3 h-3" />
                Vídeo
              </span>
            </div>
          </div>
        </div>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="block">
          <Button 
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Conectar WhatsApp com IZA+
          </Button>
        </a>

        <p className="text-xs text-gray-500 text-center">
          Você será redirecionado para configurar a conexão. Após conectar, 
          poderá conversar com a IZA+ diretamente no seu WhatsApp.
        </p>
      </CardContent>
    </Card>
  );
}