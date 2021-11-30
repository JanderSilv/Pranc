export const makeCIPS = () => [
  {
    title: 'CIP-002',
    description:
      'O objetivo fundamental do NERC CIP-002 é identificar e categorizar os sistemas cibernéticos do BES, que são definidos como um conjunto agrupado de ativos cibernéticos críticos - os ativos cibernéticos do BES. Ativos cibernéticos são ainda definidos como os dispositivos eletrônicos programáveis e os dados mantidos dentro desses mesmos dispositivos. Parte do processo de categorização envolve a classificação dos vários Sistemas Cibernéticos do BES com base no impacto de qualquer interrupção do fornecimento confiável de energia elétrica. A causa da interrupção não é o fator chave, mas sim o tempo que dura a interrupção do fornecimento; qualquer interrupção com mais de 15 minutos é um problema.',
    path: 'CIP2',
    isActive: true,
  },
  {
    title: 'CIP-003',
    description:
      'O objetivo principal do NERC CIP-003 é estabelecer uma responsabilidade clara pela proteção dos Sistemas Cibernéticos BES da América do Norte por meio da delegação de autoridade e da identificação de um gerente sênior responsável pelo desenvolvimento de políticas de controles de gestão de segurança consistentes e sustentáveis.',
    path: 'CIP3',
    isActive: true,
  },
  {
    title: 'CIP-004',
    description:
      'Nos padrões NERC CIP, um dos aspectos mais importantes é o treinamento de funcionários e contratados. Este é o foco do NERC CIP-004: Pessoal e Treinamento. O objetivo aqui é reduzir a exposição do BES a riscos cibernéticos de pessoal e contratados com acesso físico direto ou acesso cibernético permitido por meio de triagem e treinamento adequados desse pessoal.',
    path: 'CIP4',
    isActive: true,
  },
  {
    title: 'CIP-008',
    description: 'A recuperação de um incidente de segurança cibernética que afetou o funcionamento confiável do BES Cyber ​​Systems requer um planejamento de recuperação.  Os requisitos do NERC CIP em apoio à fase de recuperação de um incidente de segurança cibernética são semelhantes aos do gerenciamento de incidentes - especificações, implementação e teste e revisão, atualização e comunicação.',
    path: 'CIP8',
    isActive: true,
  },
  {
    title: 'CIP-009',
    description: 'Ao trabalhar para proteger sistemas cibernéticos, é óbvio que a prevenção é a melhor, e o padrão NERC CIP 010-2 especifica os requisitos para a prevenção e detecção de quaisquer alterações não autorizadas.',
    path: 'CIP9',
    isActive: true,
  },
  {
    title: 'CIP-010',
    description: 'Esta norma NERC CIP especifica os requisitos para a identificação de tipos específicos de informações que podem, se mal utilizadas, afetar o funcionamento confiável do BES. Para evitar o acesso não autorizado ao ciber-sistema do BES é importante que o pessoal consiga identificar as informações que podem ser utilizadas de forma maliciosa; para obter acesso não autorizado ou para comprometer os Sistemas Cibernéticos do BES. ',
    path: 'CIP10',
    isActive: true,
  },
  {
    title: 'CIP-011',
    description:
      'A norma NERC CIP-011 especifica os requisitos para a identificação de tipos específicos de informações que podem, se mal utilizadas, afetar o funcionamento confiável do BES. Para evitar o acesso não autorizado ao ciber-sistema do BES é importante que o pessoal consiga identificar as informações que podem ser utilizadas de forma maliciosa; informações que possam ser utilizadas para obter acesso não autorizado ou para comprometer os Sistemas Cibernéticos do BES.',
    path: 'CIP12',
    isActive: true,
  },
  {
    title: 'CIP-012',
    description:
      'A norma NERC CIP-012 trata sobre a comunicação entre os centros de controle existentes no sistema BES, a Entidade Responsável deve implementar, exceto sob circunstâncias excepcionais CIP, um ou mais plano(s) documentado(s) para mitigar os riscos representados pela divulgação não autorizada e modificação não autorizada da avaliação em tempo real e dados de monitoramento em tempo real enquanto são transmitidos entre quaisquer Centros de Controle aplicáveis',
    path: 'CIP12',
    isActive: true,
  },
  {
    title: 'CIP-013',
    description:
      'O objetivo central da norma NERC CIP-013 é avaliar a gestão da cadeia de riscos de segurança cibernética dentro dos sistemas BES no que tange ao relacionamento com fornecedores. Isso inclui processos de comunicação e controle de acessos de fornecedores; aquisição e instalação de equipamentos e software de fornecedores; transições de um(s) fornecedor(es) para outro(s) fornecedor(es). Além de processo de verificação da integridade e autenticidade do software de todos os softwares e patches fornecidos pelo(s) fornecedor(es) para uso no BES Cyber System.',
    path: 'CIP13',
    isActive: true,
  },
  {
    title: 'CIP-014',
    description:
      'O foco da norma NERC CIP-014 está em avaliar o risco inicial e os riscos subsequentes das estações de transmissão e subestações de transmissão, ela determina o passo a passo dessa avaliação, bem como, processo de verificação por um terceiro não filiado ou associado a Entidade Responsável. A NERC CIP-014 também determina que cada proprietário da transmissão que identificou uma estação de transmissão, subestação de transmissão ou um centro de controle primário com risco inicial e/ou riscos subsequentes, após verificação por terceiro imparcial deve comunicar cada Operador de Transmissão em um prazo de até sete dias corridos para condução de uma avaliação das ameaças potenciais e vulnerabilidades de um ataque físico a cada uma de suas respectivas estações de transmissão, subestações de transmissão e centros de controle primários identificados.',
    path: 'CIP14',
    isActive: true,
  },
]

export const cipsLength = makeCIPS().filter(cips => cips.isActive).length
