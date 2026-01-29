import React, { useEffect } from 'react';

export default function VLibrasWidget() {
  useEffect(() => {
    // Script VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    return () => {
      // Cleanup se necessário
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <div vw className="enabled">
        <div vw-access-button className="active"></div>
        <div vw-plugin-wrapper>
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      
      <style>{`
        [vw-access-button] {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 9999 !important;
          width: 64px !important;
          height: 64px !important;
          border-radius: 50% !important;
          background: linear-gradient(135deg, #0066B3, #004A8C) !important;
          box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          border: 3px solid white !important;
        }
        
        [vw-access-button]:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 16px rgba(0, 102, 179, 0.4) !important;
        }
        
        [vw-access-button]::before {
          content: '' !important;
          width: 48px !important;
          height: 48px !important;
          background-image: url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970f0a295b3af0e258e7858/a98a79e1f_RoboIZAATUALIZADO.png') !important;
          background-size: cover !important;
          background-position: center !important;
          border-radius: 50% !important;
        }
        
        .vw-plugin-wrapper {
          position: fixed !important;
          bottom: 100px !important;
          right: 20px !important;
          z-index: 9998 !important;
        }
      `}</style>
    </>
  );
}