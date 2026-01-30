import React, { useEffect, useState } from 'react';
import { Plus, Minus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BarraAcessibilidade() {
  const [tamanhoFonte, setTamanhoFonte] = useState(16);
  const [altoContraste, setAltoContraste] = useState(false);

  useEffect(() => {
    // Aplicar tamanho da fonte
    document.body.style.fontSize = `${tamanhoFonte}px`;
  }, [tamanhoFonte]);

  useEffect(() => {
    // Aplicar ou remover alto contraste
    if (altoContraste) {
      document.body.classList.add('alto-contraste');
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'yellow';
      
      const elementos = document.getElementsByTagName('*');
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = 'black';
        elementos[i].style.color = 'yellow';
      }
    } else {
      document.body.classList.remove('alto-contraste');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      
      const elementos = document.getElementsByTagName('*');
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = '';
        elementos[i].style.color = '';
      }
    }
  }, [altoContraste]);

  useEffect(() => {
    // Atalho de teclado Alt + C
    const handleKeyDown = (event) => {
      if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault();
        setAltoContraste(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const aumentarFonte = () => {
    if (tamanhoFonte < 34) {
      setTamanhoFonte(prev => prev + 6);
    }
  };

  const diminuirFonte = () => {
    if (tamanhoFonte > 10) {
      setTamanhoFonte(prev => prev - 6);
    }
  };

  const toggleContraste = () => {
    setAltoContraste(prev => !prev);
  };

  return (
    <div className="bg-gray-800 text-white py-2 px-4 flex items-center justify-end gap-4 flex-wrap">
      <span className="font-bold text-sm">Acessibilidade:</span>
      
      <Button
        onClick={aumentarFonte}
        size="sm"
        variant="secondary"
        className="h-8 px-3"
        aria-label="A+ Aumentar tamanho da fonte"
        title="Aumentar fonte (A+)"
      >
        <Plus className="w-4 h-4 mr-1" />
        A+
      </Button>
      
      <Button
        onClick={diminuirFonte}
        size="sm"
        variant="secondary"
        className="h-8 px-3"
        aria-label="A- Diminuir tamanho da fonte"
        title="Diminuir fonte (A-)"
      >
        <Minus className="w-4 h-4 mr-1" />
        A-
      </Button>
      
      <Button
        onClick={toggleContraste}
        size="sm"
        variant="secondary"
        className="h-8 px-3"
        aria-label="Alternar alto contraste"
        title="Alto Contraste (Alt+C)"
      >
        <Eye className="w-4 h-4 mr-1" />
        Alto Contraste
      </Button>
    </div>
  );
}