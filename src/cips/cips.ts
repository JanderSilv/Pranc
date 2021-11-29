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
    description: '',
    path: 'CIP8',
    isActive: true,
  },
  {
    title: 'CIP-009',
    description: '',
    path: 'CIP9',
    isActive: true,
  },
  {
    title: 'CIP-010',
    description: '',
    path: 'CIP10',
    isActive: true,
  },
]

export const cipsLength = makeCIPS().filter(cips => cips.isActive).length
