const tarianDefaults = {
  navItems: [
    { id: "home", label: "Home", href: "index.html" },
    { id: "clube", label: "Clube", href: "clube.html" },
    { id: "elenco", label: "Elenco", href: "elenco.html" },
    { id: "jogos", label: "Jogos", href: "jogos.html" },
    { id: "noticias", label: "Notícias", href: "noticias.html" },
    { id: "contato", label: "Contato", href: "contato.html" }
  ],
  content: {
    home: {
      heroTitle: "Tarian F.C.",
      heroText: "Um clube feito para competir com intensidade, revelar talentos e aproximar a torcida de cada partida.",
      aboutTitle: "Competir, formar e representar.",
      aboutText: "O Tarian F.C. nasceu com a ambição de jogar um futebol organizado, intenso e conectado com sua comunidade. Cada treino, jogo e projeto de base reforça a ideia de um clube moderno sem perder suas raízes.",
      ctaTitle: "Faça parte da próxima vitória.",
      ctaText: "O Tarian F.C. está aberto a parcerias com marcas, projetos sociais, imprensa e atletas que queiram crescer junto com o clube."
    },
    clube: {
      pageTitle: "Um clube criado para representar sua comunidade.",
      pageText: "O Tarian F.C. une futebol competitivo, formação de atletas e uma marca esportiva pronta para crescer com responsabilidade.",
      sectionTitle: "Verde e dourado dentro e fora de campo.",
      sectionText: "Nossa cultura combina trabalho, intensidade e respeito. O clube valoriza quem treina com compromisso, joga pelo coletivo e entende que cada partida também constrói uma relação com a torcida."
    },
    elenco: {
      pageTitle: "Catálogo de jogadores do Tarian F.C.",
      pageText: "Fotos, nomes e números de camisa do elenco principal em uma visualização simples para a torcida.",
      sectionTitle: "Jogadores cadastrados.",
      sectionText: "Mantenha o catálogo atualizado pelo painel admin sempre que entrar ou sair um atleta."
    },
    jogos: {
      pageTitle: "Jogos, resultados e próximos desafios.",
      pageText: "Acompanhe os compromissos do Tarian F.C. na temporada e os resultados recentes da equipe.",
      sectionTitle: "Próxima partida em casa.",
      sectionText: "A Tarian Arena recebe mais um jogo decisivo da Liga Regional, com entrada da torcida pelo portão principal e operação especial para famílias."
    },
    noticias: {
      pageTitle: "Informação oficial para torcida, imprensa e parceiros.",
      pageText: "Bastidores, comunicados, preparação, resultados e projetos do Tarian F.C. reunidos em um só lugar.",
      sectionTitle: "Últimas publicações."
    },
    contato: {
      pageTitle: "Vamos conversar sobre futebol, torcida e parcerias.",
      pageText: "Use os canais oficiais para falar com o Tarian F.C. sobre patrocínio, imprensa, jogos, atletas ou projetos da comunidade.",
      sectionTitle: "O clube responde por aqui.",
      sectionText: "Centralize o primeiro contato pelo formulário ou pelos canais abaixo. Os dados são exemplos e podem ser substituídos pelos contatos oficiais do clube."
    }
  },
  stats: [
    { label: "Fundado", value: "2019" },
    { label: "Categoria", value: "Adulto" },
    { label: "Base", value: "Tarian Arena" },
    { label: "Torcida", value: "Raiz Verde" }
  ],
  principles: [
    {
      icon: "shield-check",
      title: "Identidade forte",
      text: "O Tarian F.C. joga com disciplina, coragem e respeito pela comunidade que veste nossas cores."
    },
    {
      icon: "activity",
      title: "Futebol intenso",
      text: "Pressão alta, transições rápidas e um elenco preparado para competir até o último minuto."
    },
    {
      icon: "users",
      title: "Formação local",
      text: "Valorizamos atletas da região e abrimos espaço para novos talentos crescerem dentro do clube."
    }
  ],
  players: [
    { id: "p1", number: 1, name: "Rafael Monteiro", position: "Goleiro", photo: "", age: 27, matches: 18, goals: 0 },
    { id: "p2", number: 4, name: "Caio Ferreira", position: "Zagueiro", photo: "", age: 25, matches: 21, goals: 2 },
    { id: "p3", number: 6, name: "Lucas Prado", position: "Lateral", photo: "", age: 23, matches: 19, goals: 1 },
    { id: "p4", number: 8, name: "Thiago Nunes", position: "Volante", photo: "", age: 28, matches: 22, goals: 4 },
    { id: "p5", number: 10, name: "Mateus Rocha", position: "Meia", photo: "", age: 24, matches: 20, goals: 7 },
    { id: "p6", number: 11, name: "Bruno Sales", position: "Atacante", photo: "", age: 22, matches: 21, goals: 12 },
    { id: "p7", number: 17, name: "Diego Almeida", position: "Ponta", photo: "", age: 26, matches: 16, goals: 5 },
    { id: "p8", number: 23, name: "Vitor Lima", position: "Atacante", photo: "", age: 20, matches: 14, goals: 6 },
    { id: "p9", number: 2, name: "Henrique Alves", position: "Lateral", photo: "", age: 21, matches: 12, goals: 0 },
    { id: "p10", number: 3, name: "Samuel Costa", position: "Zagueiro", photo: "", age: 29, matches: 17, goals: 1 },
    { id: "p11", number: 5, name: "André Campos", position: "Volante", photo: "", age: 26, matches: 18, goals: 2 },
    { id: "p12", number: 7, name: "Felipe Araujo", position: "Ponta", photo: "", age: 24, matches: 15, goals: 4 },
    { id: "p13", number: 9, name: "João Pedro", position: "Centroavante", photo: "", age: 27, matches: 19, goals: 10 },
    { id: "p14", number: 12, name: "Murilo Santos", position: "Goleiro", photo: "", age: 22, matches: 7, goals: 0 },
    { id: "p15", number: 14, name: "Gustavo Leal", position: "Meia", photo: "", age: 23, matches: 13, goals: 3 },
    { id: "p16", number: 15, name: "Renan Dias", position: "Zagueiro", photo: "", age: 25, matches: 11, goals: 1 },
    { id: "p17", number: 18, name: "Igor Martins", position: "Atacante", photo: "", age: 20, matches: 9, goals: 3 },
    { id: "p18", number: 19, name: "Daniel Vieira", position: "Volante", photo: "", age: 28, matches: 16, goals: 1 },
    { id: "p19", number: 21, name: "Nicolas Freitas", position: "Lateral", photo: "", age: 19, matches: 8, goals: 0 },
    { id: "p20", number: 30, name: "Eduardo Ramos", position: "Meia", photo: "", age: 24, matches: 10, goals: 2 }
  ],
  staff: [
    { role: "Treinador", name: "Marcos Tavares", text: "Comanda o modelo de jogo e o desenvolvimento do elenco principal." },
    { role: "Preparadora física", name: "Ana Ribeiro", text: "Responsável por performance, recuperação e prevenção de lesões." },
    { role: "Analista", name: "Pedro Martins", text: "Organiza dados, vídeos e relatórios de desempenho para cada partida." }
  ],
  fixtures: [
    { date: "22 JUN", time: "16:00", opponent: "Atlético Vale", venue: "Tarian Arena", competition: "Liga Regional", status: "Casa" },
    { date: "29 JUN", time: "10:30", opponent: "União Central", venue: "Campo Municipal", competition: "Liga Regional", status: "Fora" },
    { date: "06 JUL", time: "15:00", opponent: "Esporte Norte", venue: "Tarian Arena", competition: "Copa da Cidade", status: "Casa" },
    { date: "13 JUL", time: "17:00", opponent: "Real Jardim", venue: "Estádio Jardim", competition: "Liga Regional", status: "Fora" }
  ],
  results: [
    { date: "15 JUN", opponent: "Vila Nova", score: "3 x 1", venue: "Tarian Arena", note: "Vitória" },
    { date: "08 JUN", opponent: "Santa Luz", score: "2 x 2", venue: "Campo Santa Luz", note: "Empate" },
    { date: "01 JUN", opponent: "Porto FC", score: "2 x 0", venue: "Tarian Arena", note: "Vitória" },
    { date: "25 MAI", opponent: "Estrela Azul", score: "1 x 0", venue: "Estádio Azul", note: "Vitória" }
  ],
  news: [
    {
      tag: "Clube",
      date: "16 Jun 2026",
      title: "Tarian F.C. apresenta nova identidade para a temporada",
      text: "O verde e dourado marcam uma fase de crescimento, com foco em desempenho, torcida e estrutura."
    },
    {
      tag: "Elenco",
      date: "14 Jun 2026",
      title: "Comissão técnica confirma planejamento para a sequência",
      text: "Treinos integrados e análise de adversários fazem parte da preparação para os próximos desafios."
    },
    {
      tag: "Base",
      date: "10 Jun 2026",
      title: "Projeto de formação abre observação para jovens atletas",
      text: "A iniciativa busca aproximar o clube dos bairros e revelar jogadores identificados com o Tarian."
    },
    {
      tag: "Torcida",
      date: "06 Jun 2026",
      title: "Tarian Arena terá setor dedicado a sócios e famílias",
      text: "O clube prepara uma experiência mais organizada para quem acompanha o time em casa."
    },
    {
      tag: "Performance",
      date: "02 Jun 2026",
      title: "Dados de jogo orientam ajustes para manter intensidade",
      text: "A equipe usa indicadores simples para evoluir posse, finalizações e retomada de bola."
    },
    {
      tag: "Comunidade",
      date: "28 Mai 2026",
      title: "Clube anuncia calendário de ações sociais no bairro",
      text: "Eventos com escolas e projetos locais reforçam o compromisso do Tarian F.C. fora de campo."
    }
  ],
  sponsors: ["Aurora Bank", "Vitta Sports", "Mercado Verde", "Nobre Energia"],
  contacts: [
    { icon: "mail", label: "E-mail", value: "contato@tarianfc.com.br", href: "mailto:contato@tarianfc.com.br" },
    { icon: "phone", label: "Telefone", value: "(00) 00000-0000", href: "tel:+5500000000000" },
    { icon: "map-pin", label: "Endereço", value: "Tarian Arena, setor administrativo", href: "" },
    { icon: "clock", label: "Atendimento", value: "Segunda a sexta, 9h às 18h", href: "" }
  ],
  timeline: [
    { year: "2019", title: "Início do projeto", text: "Um grupo de atletas e torcedores organiza o Tarian F.C. com foco em competir e representar a comunidade." },
    { year: "2021", title: "Primeira final", text: "O clube chega a uma decisão regional e consolida uma base competitiva para as temporadas seguintes." },
    { year: "2024", title: "Tarian Arena", text: "A equipe passa a mandar jogos em uma casa própria, aproximando torcida, atletas e patrocinadores." },
    { year: "2026", title: "Nova etapa", text: "Identidade renovada, elenco mais estruturado e um plano de crescimento para futebol, base e marca." }
  ]
};

function cloneTarianData(data = tarianDefaults) {
  return JSON.parse(JSON.stringify(data));
}

function mergeTarianData(base, remote) {
  if (!remote || typeof remote !== "object") {
    return base;
  }

  const output = Array.isArray(base) ? [...base] : { ...base };
  Object.keys(remote).forEach((key) => {
    const value = remote[key];
    if (Array.isArray(value)) {
      output[key] = value;
    } else if (value && typeof value === "object" && base[key] && typeof base[key] === "object" && !Array.isArray(base[key])) {
      output[key] = mergeTarianData(base[key], value);
    } else if (value !== undefined) {
      output[key] = value;
    }
  });
  return output;
}

window.tarianDefaults = tarianDefaults;
window.cloneTarianData = cloneTarianData;
window.mergeTarianData = mergeTarianData;
