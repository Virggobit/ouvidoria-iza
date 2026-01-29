import React, { useEffect } from 'react';

export default function VLibrasWidget() {
  useEffect(() => {
    // Carregar script VLibras oficial
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div vw className="enabled">
      <div vw-access-button className="active"></div>
      <div vw-plugin-wrapper>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}