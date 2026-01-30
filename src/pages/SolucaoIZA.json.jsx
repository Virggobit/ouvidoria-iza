{
  "projeto": {
    "nome": "IZA+ - Ouvidoria Inteligente",
    "descricao": "Plataforma digital de ouvidoria com inteligência artificial para o Governo do Distrito Federal",
    "versao": "1.0.0",
    "tipo": "MVP - Protótipo Demonstrativo",
    "desafio": "Participa DF",
    "data_atualizacao": "2026-01-30"
  },
  "objetivos": [
    "Facilitar o registro de manifestações cidadãs através de múltiplos canais (texto, áudio, imagem, vídeo)",
    "Utilizar IA para triagem automática e classificação de manifestações",
    "Garantir acessibilidade completa segundo diretrizes WCAG 2.1 AA",
    "Permitir acompanhamento em tempo real do status das manifestações",
    "Proteger o anonimato quando solicitado pelo cidadão",
    "Integrar com WhatsApp para facilitar o acesso",
    "Fornecer interface de backoffice para gestores e triadores",
    "Gerar métricas e relatórios para análise de desempenho"
  ],
  "funcionalidades_principais": {
    "cidadao": [
      {
        "funcionalidade": "Registro de Manifestação Multicanal",
        "descricao": "Permite registrar manifestações por texto, áudio, imagem ou vídeo",
        "canais": ["texto", "audio", "imagem", "video", "misto"],
        "tipos": ["denuncia", "reclamacao", "elogio", "sugestao", "solicitacao", "informacao"]
      },
      {
        "funcionalidade": "Registro Anônimo",
        "descricao": "Permite denúncias anônimas com proteção total de identidade",
        "base_legal": "Lei 12.527/2011, Art. 10, §2º"
      },
      {
        "funcionalidade": "Consulta de Protocolo",
        "descricao": "Acompanhamento em tempo real do status da manifestação",
        "informacoes": ["status", "histórico", "respostas", "tempo de resposta"]
      },
      {
        "funcionalidade": "Notificações em Tempo Real",
        "descricao": "Recebe alertas sobre mudanças de status e respostas",
        "tipos_notificacao": ["nova_resposta", "mudanca_status", "encaminhamento", "triagem_concluida"]
      },
      {
        "funcionalidade": "WhatsApp Integration",
        "descricao": "Registra e acompanha manifestações via WhatsApp",
        "agente": "iza_whatsapp"
      },
      {
        "funcionalidade": "Chatbot Assistente",
        "descricao": "Assistente virtual para tirar dúvidas e auxiliar no registro"
      },
      {
        "funcionalidade": "FAQ Inteligente",
        "descricao": "Perguntas frequentes com geração automática por IA baseada em manifestações recorrentes"
      }
    ],
    "backoffice": [
      {
        "funcionalidade": "Fila de Triagem Inteligente",
        "descricao": "Visualização de manifestações aguardando triagem com sugestões da IA",
        "ordenacao": ["prioridade", "data", "tipo"]
      },
      {
        "funcionalidade": "Triagem Assistida por IA",
        "descricao": "IA sugere tipo, tema, prioridade e encaminhamento - triador valida",
        "campos_ia": ["tipo_sugerido", "tema_sugerido", "prioridade", "encaminhamento_sugerido", "resumo", "confianca"]
      },
      {
        "funcionalidade": "Dashboard de Métricas",
        "descricao": "Visualização de KPIs e métricas de desempenho",
        "metricas": [
          "total_manifestacoes",
          "por_tipo",
          "por_status",
          "tempo_medio_resposta",
          "taxa_resolucao",
          "satisfacao_cidadao"
        ]
      },
      {
        "funcionalidade": "Gestão de Respostas",
        "descricao": "Interface para responder manifestações e atualizar status"
      },
      {
        "funcionalidade": "Auditoria Completa",
        "descricao": "Rastreamento de todas as ações realizadas no sistema",
        "logs": ["criacao", "triagem_ia", "triagem_humana", "encaminhamento", "resposta", "alteracao_status"]
      },
      {
        "funcionalidade": "Exportação de Relatórios",
        "descricao": "Geração de relatórios em PDF com filtros personalizados"
      }
    ],
    "acessibilidade": [
      {
        "funcionalidade": "Conformidade WCAG 2.1 AA",
        "descricao": "Plena conformidade com diretrizes de acessibilidade web"
      },
      {
        "funcionalidade": "VLibras Integration",
        "descricao": "Widget para tradução em Libras"
      },
      {
        "funcionalidade": "Barra de Acessibilidade",
        "descricao": "Controles para ajustar fonte, contraste, espaçamento e modo de leitura",
        "controles": ["aumentar_fonte", "diminuir_fonte", "alto_contraste", "modo_leitura", "espacamento_linhas"]
      },
      {
        "funcionalidade": "Navegação por Teclado",
        "descricao": "Navegação completa via teclado com indicadores visuais claros"
      },
      {
        "funcionalidade": "ARIA Labels Completos",
        "descricao": "Descrições semânticas para leitores de tela"
      },
      {
        "funcionalidade": "Skip Links",
        "descricao": "Links para pular para conteúdo principal"
      }
    ]
  },
  "entidades": {
    "Manifestacao": {
      "descricao": "Registro central de manifestações dos cidadãos",
      "campos_principais": [
        "protocolo",
        "tipo",
        "titulo",
        "relato",
        "canal",
        "status",
        "anonimo",
        "dados_cidadao",
        "sugestoes_ia",
        "decisao_triador",
        "resposta",
        "metricas"
      ],
      "status_possiveis": ["recebido", "em_triagem", "encaminhado", "em_andamento", "respondido", "arquivado"]
    },
    "User": {
      "descricao": "Entidade built-in para usuários do sistema",
      "roles": ["admin", "user"],
      "funcionalidades": ["triador", "gestor", "backoffice"]
    },
    "Notificacao": {
      "descricao": "Sistema de notificações em tempo real",
      "tipos": ["nova_resposta", "mudanca_status", "encaminhamento", "triagem_concluida"]
    },
    "PreferenciasNotificacao": {
      "descricao": "Configurações personalizadas de notificações por usuário"
    },
    "FAQ": {
      "descricao": "Perguntas frequentes com geração automática por IA",
      "categorias": ["registro", "acompanhamento", "anonimato", "prazos", "canais", "geral"],
      "votacao": true
    },
    "VotoFAQ": {
      "descricao": "Sistema de votação de utilidade das FAQs"
    },
    "LogAuditoria": {
      "descricao": "Registro completo de auditoria de todas as ações",
      "rastreabilidade": "completa"
    },
    "SugestaoMelhoria": {
      "descricao": "Feedback dos usuários para melhorias na plataforma",
      "tipos": ["ux", "acessibilidade", "bug", "melhoria_triagem", "integracao_iza"]
    }
  },
  "paginas": {
    "publicas": [
      {
        "nome": "Home",
        "rota": "/",
        "descricao": "Página inicial com apresentação da plataforma e CTAs principais",
        "funcionalidades": ["hero_section", "tipos_manifestacao", "beneficios", "whatsapp_connect"]
      },
      {
        "nome": "NovaManifestacao",
        "rota": "/nova-manifestacao",
        "descricao": "Formulário multi-step para registro de manifestações",
        "steps": [
          "Tipo e Título",
          "Relato (texto/áudio/vídeo)",
          "Anexos (imagens/vídeos)",
          "Identificação",
          "Revisão e Confirmação"
        ],
        "features": ["auto_save", "multicanal", "anonimato"]
      },
      {
        "nome": "ConsultarProtocolo",
        "rota": "/consultar-protocolo",
        "descricao": "Consulta pública de status de manifestações por protocolo",
        "informacoes": ["status_atual", "historico_completo", "respostas"]
      },
      {
        "nome": "FAQ",
        "rota": "/faq",
        "descricao": "Perguntas frequentes com busca e categorização",
        "features": ["busca", "filtro_categoria", "votacao", "geracao_ia"]
      },
      {
        "nome": "Acessibilidade",
        "rota": "/acessibilidade",
        "descricao": "Página dedicada a recursos de acessibilidade",
        "conformidade": ["WCAG_2.1_AA", "e-MAG", "LBI"]
      },
      {
        "nome": "Termos",
        "rota": "/termos",
        "descricao": "Termos de uso, privacidade e LGPD"
      },
      {
        "nome": "Artefatos",
        "rota": "/artefatos",
        "descricao": "Documentação técnica e artefatos do projeto"
      }
    ],
    "privadas": [
      {
        "nome": "Backoffice",
        "rota": "/backoffice",
        "descricao": "Dashboard principal do backoffice",
        "acesso": "autenticado",
        "funcionalidades": ["metricas", "fila_triagem", "pesquisa"]
      },
      {
        "nome": "Notificacoes",
        "rota": "/notificacoes",
        "descricao": "Central de notificações do usuário"
      },
      {
        "nome": "ConfiguracoesNotificacoes",
        "rota": "/configuracoes-notificacoes",
        "descricao": "Configurações personalizadas de notificações"
      },
      {
        "nome": "Auditoria",
        "rota": "/auditoria",
        "descricao": "Logs de auditoria do sistema",
        "acesso": "admin"
      },
      {
        "nome": "AcessoBackoffice",
        "rota": "/acesso-backoffice",
        "descricao": "Página de login para backoffice"
      }
    ]
  },
  "componentes_principais": {
    "manifestacao": [
      "StepIndicator",
      "TipoStep",
      "RelatoStep",
      "AnexosStep",
      "IdentificacaoStep",
      "RevisaoStep",
      "ProtocoloSuccess",
      "TimelineStatus",
      "AutoSaveDraft",
      "FormValidation"
    ],
    "backoffice": [
      "DashboardMetricas",
      "FilaTriagem",
      "DetalheManifestacao",
      "ExportarRelatorio"
    ],
    "notificacoes": [
      "NotificacaoButton",
      "NotificationPermissionPrompt",
      "useNotificationMonitor",
      "NotificationService"
    ],
    "acessibilidade": [
      "BarraAcessibilidade",
      "VLibrasWidget"
    ],
    "navegacao": [
      "BarraNavegacaoInferior",
      "Layout"
    ],
    "iza": [
      "ChatbotAssistente",
      "WhatsAppConnect"
    ],
    "pwa": [
      "InstallPrompt"
    ]
  },
  "integracao_ia": {
    "provider": "Core.InvokeLLM",
    "casos_de_uso": [
      {
        "funcionalidade": "Triagem Automática",
        "descricao": "Análise de manifestação para sugerir tipo, tema, prioridade e encaminhamento",
        "confianca": "score de 0 a 1",
        "campos_gerados": ["tipo", "tema", "prioridade", "encaminhamento", "resumo"]
      },
      {
        "funcionalidade": "Geração de FAQs",
        "descricao": "Análise de manifestações recorrentes para gerar FAQs automaticamente"
      },
      {
        "funcionalidade": "Chatbot Assistente",
        "descricao": "Assistente virtual para tirar dúvidas dos cidadãos"
      },
      {
        "funcionalidade": "WhatsApp Bot",
        "descricao": "Agente IZA para WhatsApp com contexto e ferramentas"
      }
    ]
  },
  "agentes": {
    "iza_whatsapp": {
      "nome": "IZA WhatsApp Agent",
      "descricao": "Agente de IA integrado ao WhatsApp para registro e consulta de manifestações",
      "ferramentas": [
        {
          "tipo": "entity_tools",
          "entidades": ["Manifestacao", "FAQ"],
          "operacoes": ["create", "read", "update"]
        },
        {
          "tipo": "web_search",
          "descricao": "Busca na web para informações adicionais"
        }
      ],
      "canais": ["texto", "audio", "imagem", "video"],
      "saudacao_whatsapp": "configurada"
    }
  },
  "integracoes": {
    "Core": {
      "InvokeLLM": "Chamadas para modelos de linguagem com contexto da internet",
      "UploadFile": "Upload de arquivos (áudio, imagem, vídeo)",
      "SendEmail": "Envio de notificações por email",
      "GenerateImage": "Geração de imagens por IA",
      "ExtractDataFromUploadedFile": "Extração de dados de arquivos"
    },
    "WhatsApp": {
      "provider": "Base44 Agents",
      "funcionalidades": ["registro_manifestacao", "consulta_protocolo", "multimidia"]
    },
    "VLibras": {
      "descricao": "Widget de tradução para Libras",
      "versao": "3.0"
    }
  },
  "tecnologias": {
    "frontend": {
      "framework": "React 18.2.0",
      "routing": "react-router-dom 6.26.0",
      "styling": "Tailwind CSS + shadcn/ui",
      "state_management": "@tanstack/react-query 5.84.1",
      "forms": "react-hook-form 7.54.2",
      "animations": "framer-motion 11.16.4",
      "icons": "lucide-react 0.475.0",
      "notifications": "sonner 2.0.1"
    },
    "backend": {
      "platform": "Base44 BaaS",
      "database": "Supabase (PostgreSQL)",
      "file_storage": "Supabase Storage",
      "authentication": "Base44 Auth",
      "api": "Base44 SDK 0.8.3"
    },
    "ia": {
      "llm_provider": "Base44 Core Integration",
      "modelos": "GPT-4, Claude (via Base44)",
      "capabilities": ["text_generation", "vision", "audio_transcription", "web_search"]
    }
  },
  "acessibilidade_conformidade": {
    "diretrizes": "WCAG 2.1 Nível AA",
    "normas_brasileiras": ["e-MAG 3.1", "LBI - Lei Brasileira de Inclusão"],
    "recursos": [
      "Navegação por teclado completa",
      "ARIA labels e roles semânticos",
      "Contraste de cores adequado (mínimo 4.5:1)",
      "Textos alternativos em imagens",
      "Skip links para conteúdo principal",
      "Indicadores de foco visíveis",
      "Suporte a leitores de tela",
      "VLibras integrado",
      "Controles de acessibilidade (fonte, contraste, espaçamento)",
      "Modo de leitura",
      "Responsive design para diferentes dispositivos",
      "Formulários com validação acessível"
    ],
    "testes": [
      "NVDA",
      "JAWS",
      "VoiceOver",
      "Keyboard navigation",
      "Color contrast analyzer"
    ]
  },
  "metricas_monitoradas": {
    "performance": [
      "Tempo de carregamento",
      "First Contentful Paint",
      "Time to Interactive",
      "Lighthouse Score"
    ],
    "negocio": [
      "Total de manifestações registradas",
      "Manifestações por tipo",
      "Manifestações por canal",
      "Tempo médio de resposta",
      "Taxa de resolução",
      "Satisfação do cidadão",
      "Uso de registro anônimo",
      "Precisão da IA na triagem",
      "Taxa de aceitação das sugestões da IA"
    ],
    "acessibilidade": [
      "Uso de ferramentas de acessibilidade",
      "Navegação por teclado",
      "Uso do VLibras",
      "Feedback sobre acessibilidade"
    ]
  },
  "seguranca_privacidade": {
    "lgpd": {
      "conformidade": true,
      "base_legal": "Lei 13.709/2018",
      "medidas": [
        "Consentimento explícito",
        "Minimização de dados",
        "Anonimização quando solicitado",
        "Direito ao esquecimento",
        "Portabilidade de dados",
        "Logs de auditoria completos"
      ]
    },
    "seguranca": [
      "Autenticação via Base44",
      "HTTPS obrigatório",
      "Sanitização de inputs",
      "Rate limiting",
      "Proteção contra XSS",
      "Proteção contra CSRF",
      "Armazenamento seguro de arquivos"
    ]
  },
  "pwa_progressive_web_app": {
    "installable": true,
    "offline_support": "Página offline customizada",
    "manifest": {
      "name": "IZA+ Ouvidoria",
      "short_name": "IZA+",
      "theme_color": "#004A8C",
      "background_color": "#ffffff",
      "display": "standalone"
    },
    "service_worker": true,
    "notifications_push": true
  },
  "roadmap_futuro": {
    "fase_2": [
      "Integração com sistemas legados do GDF",
      "API pública documentada",
      "Dashboard de transparência pública",
      "Sistema de priorização dinâmica por IA",
      "Análise de sentimento em manifestações",
      "Detecção automática de padrões e surtos",
      "Chatbot com processamento de linguagem natural avançado",
      "Integração com mais redes sociais"
    ],
    "fase_3": [
      "Machine Learning para predição de demandas",
      "Sistema de recomendação de ações",
      "Gamificação para engajamento cidadão",
      "App mobile nativo (iOS/Android)",
      "Integração com sistemas de geolocalização",
      "Marketplace de soluções para manifestações"
    ]
  },
  "equipe_desenvolvimento": {
    "contexto": "MVP desenvolvido para o Desafio Participa DF",
    "demonstracao": "Protótipo funcional com IA integrada",
    "objetivo": "Demonstrar viabilidade técnica e valor da solução IZA+"
  }
}