import React from 'react';
import { FileText, Mic, Image as ImageIcon, Video, ListChecks } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const canaisConfig = {
  text: { label: 'Texto', icon: FileText, color: 'bg-blue-100 text-blue-800' },
  audio: { label: 'Áudio', icon: Mic, color: 'bg-purple-100 text-purple-800' },
  image: { label: 'Imagem', icon: ImageIcon, color: 'bg-emerald-100 text-emerald-800' },
  video: { label: 'Vídeo', icon: Video, color: 'bg-red-100 text-red-800' },
  mixed: { label: 'Múltiplos', icon: ListChecks, color: 'bg-indigo-100 text-indigo-800' },
};

export default function CanaisManifestacao({ canal }) {
  const config = canaisConfig[canal] || canaisConfig.text;
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} flex items-center gap-1 w-fit`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}