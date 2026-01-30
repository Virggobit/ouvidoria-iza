import React, { useEffect, useState } from 'react';
import { Plus, Minus, Eye, BookOpen, AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BarraAcessibilidade() {
  const [tamanhoFonte, setTamanhoFonte] = useState(16);
  const [altoContraste, setAltoContraste] = useState(false);
  const [modoLeitura, setModoLeitura] = useState(false);
  const [espacamentoLinha, setEspacamentoLinha] = useState('normal');

  useEffect(() => {
    // Aplicar tamanho da fonte
    document.body.style.fontSize = `${tamanhoFonte}px`;
  }, [tamanhoFonte]);

  useEffect(() => {
    // Aplicar modo de leitura
    if (modoLeitura) {
      document.body.classList.add('modo-leitura');
      // Aumentar contraste de texto
      document.body.style.filter = 'contrast(1.2)';
      // Remover animações e distrações
      const style = document.createElement('style');
      style.id = 'modo-leitura-style';
      style.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
        img:not([alt]), video, iframe {
          opacity: 0.3 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('modo-leitura');
      document.body.style.filter = '';
      const style = document.getElementById('modo-leitura-style');
      if (style) style.remove();
    }
  }, [modoLeitura]);

  useEffect(() => {
    // Aplicar espaçamento entre linhas
    const espacamentos = {
      'normal': '1.5',
      '1.5': '1.75',
      'duplo': '2'
    };
    document.body.style.lineHeight = espacamentos[espacamentoLinha];
  }, [espacamentoLinha]);

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
    if (tamanhoFonte < 36) {
      setTamanhoFonte(prev => prev + 10);
    }
  };

  const diminuirFonte = () => {
    if (tamanhoFonte > 10) {
      setTamanhoFonte(prev => prev - 10);
    }
  };

  const toggleContraste = () => {
    setAltoContraste(prev => !prev);
  };

  const toggleModoLeitura = () => {
    setModoLeitura(prev => !prev);
  };

  const ajustarEspacamento = () => {
    const espacamentos = ['normal', '1.5', 'duplo'];
    const indiceAtual = espacamentos.indexOf(espacamentoLinha);
    const proximoIndice = (indiceAtual + 1) % espacamentos.length;
    setEspacamentoLinha(espacamentos[proximoIndice]);
  };

  return (
    <div className="bg-gray-900 text-white py-2 px-4 flex items-center justify-end gap-4 flex-wrap" role="region" aria-label="Barra de ferramentas de acessibilidade">
      <span className="font-bold text-sm" id="accessibility-label">Acessibilidade:</span>
      
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

      <Button
        onClick={toggleModoLeitura}
        size="sm"
        variant="secondary"
        className={`h-8 px-3 ${modoLeitura ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
        aria-label="Modo de leitura"
        title="Ativar/desativar modo de leitura"
      >
        <BookOpen className="w-4 h-4 mr-1" />
        Leitura
      </Button>

      <Button
        onClick={ajustarEspacamento}
        size="sm"
        variant="secondary"
        className="h-8 px-3"
        aria-label={`Espaçamento entre linhas: ${espacamentoLinha}`}
        title={`Espaçamento: ${espacamentoLinha}`}
      >
        <AlignJustify className="w-4 h-4 mr-1" />
        {espacamentoLinha === 'normal' ? '1x' : espacamentoLinha === '1.5' ? '1.5x' : '2x'}
      </Button>
    </div>
  );
}