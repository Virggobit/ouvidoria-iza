import React, { useRef } from 'react';
import { Upload, Image, Video, X, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AnexosStep({ data, onChange }) {
  const fileInputRef = useRef(null);
  const anexos = data.anexos || [];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAnexos = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      type: file.type,
      name: file.name,
      size: file.size,
    }));
    onChange({ ...data, anexos: [...anexos, ...newAnexos] });
    e.target.value = '';
  };

  const removeAnexo = (index) => {
    const newAnexos = anexos.filter((_, i) => i !== index);
    onChange({ ...data, anexos: newAnexos });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    return FileIcon;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Anexar arquivos (opcional)
        </h2>
        <p className="text-gray-600">
          Adicione fotos, vídeos ou documentos que ajudem a comprovar sua manifestação.
        </p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          const newAnexos = files.map(file => ({
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            type: file.type,
            name: file.name,
            size: file.size,
          }));
          onChange({ ...data, anexos: [...anexos, ...newAnexos] });
        }}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-300"
        role="button"
        tabIndex={0}
        aria-label="Clique ou arraste arquivos para anexar"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="sr-only"
          aria-label="Selecionar arquivos"
        />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700">
          Clique ou arraste arquivos aqui
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Imagens, vídeos ou documentos (máx. 10MB cada)
        </p>
      </div>

      {anexos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Arquivos anexados ({anexos.length})
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anexos.map((anexo, index) => {
              const Icon = getFileIcon(anexo.type);
              return (
                <div
                  key={index}
                  className="relative bg-white border border-gray-200 rounded-lg overflow-hidden group"
                >
                  {anexo.preview ? (
                    <img
                      src={anexo.preview}
                      alt={anexo.name}
                      className="w-full h-32 object-cover"
                    />
                  ) : anexo.type.startsWith('video/') ? (
                    <video
                      src={URL.createObjectURL(anexo.file)}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {anexo.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(anexo.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAnexo(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label={`Remover ${anexo.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}