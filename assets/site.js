const tarianData = {
  navItems: [
    { id: "home", label: "Home", href: "index.html" },
    { id: "clube", label: "Clube", href: "clube.html" },
    { id: "elenco", label: "Elenco", href: "elenco.html" },
    { id: "jogos", label: "Jogos", href: "jogos.html" },
    { id: "noticias", label: "Notícias", href: "noticias.html" },
    { id: "contato", label: "Contato", href: "contato.html" }
  ],
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
    { number: 1, name: "Rafael Monteiro", position: "Goleiro", age: 27, matches: 18, goals: 0 },
    { number: 4, name: "Caio Ferreira", position: "Zagueiro", age: 25, matches: 21, goals: 2 },
    { number: 6, name: "Lucas Prado", position: "Lateral", age: 23, matches: 19, goals: 1 },
    { number: 8, name: "Thiago Nunes", position: "Volante", age: 28, matches: 22, goals: 4 },
    { number: 10, name: "Mateus Rocha", position: "Meia", age: 24, matches: 20, goals: 7 },
    { number: 11, name: "Bruno Sales", position: "Atacante", age: 22, matches: 21, goals: 12 },
    { number: 17, name: "Diego Almeida", position: "Ponta", age: 26, matches: 16, goals: 5 },
    { number: 23, name: "Vitor Lima", position: "Atacante", age: 20, matches: 14, goals: 6 }
  ],
  staff: [
    { role: "Treinador", name: "Marcos Tavares", text: "Comanda o modelo de jogo e o desenvolvimento do elenco principal." },
    { role: "Preparadora física", name: "Ana Ribeiro", text: "Responsável por performance, recuperação e prevenção de lesões." },
    { role: "Analista", name: "Pedro Martins", text: "Organiza dados, videos e relatorios de desempenho para cada partida." }
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
      title: "Comissao tecnica confirma planejamento para a sequencia",
      text: "Treinos integrados e análise de adversários fazem parte da preparação para os próximos desafios."
    },
    {
      tag: "Base",
      date: "10 Jun 2026",
      title: "Projeto de formacao abre observacao para jovens atletas",
      text: "A iniciativa busca aproximar o clube dos bairros e revelar jogadores identificados com o Tarian."
    },
    {
      tag: "Torcida",
      date: "06 Jun 2026",
      title: "Tarian Arena tera setor dedicado a socios e familias",
      text: "O clube prepara uma experiencia mais organizada para quem acompanha o time em casa."
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
      text: "Eventos com escolas e projetos locais reforcam o compromisso do Tarian F.C. fora de campo."
    }
  ],
  sponsors: ["Aurora Bank", "Vitta Sports", "Mercado Verde", "Nobre Energia"],
  timeline: [
    { year: "2019", title: "Inicio do projeto", text: "Um grupo de atletas e torcedores organiza o Tarian F.C. com foco em competir e representar a comunidade." },
    { year: "2021", title: "Primeira final", text: "O clube chega a uma decisao regional e consolida uma base competitiva para as temporadas seguintes." },
    { year: "2024", title: "Tarian Arena", text: "A equipe passa a mandar jogos em uma casa propria, aproximando torcida, atletas e patrocinadores." },
    { year: "2026", title: "Nova etapa", text: "Identidade renovada, elenco mais estruturado e um plano de crescimento para futebol, base e marca." }
  ]
};

const app = Vue.createApp({
  data() {
    return {
      ...tarianData,
      mobileOpen: false,
      toastVisible: false,
      toastText: "Mensagem enviada. O Tarian F.C. vai retornar em breve."
    };
  },
  computed: {
    currentPage() {
      return document.body.dataset.page || "home";
    },
    nextFixture() {
      return this.fixtures[0];
    },
    featuredNews() {
      return this.news.slice(0, 3);
    }
  },
  methods: {
    isActive(id) {
      return this.currentPage === id;
    },
    submitContact() {
      this.toastVisible = true;
      window.clearTimeout(this.toastTimer);
      this.toastTimer = window.setTimeout(() => {
        this.toastVisible = false;
      }, 4200);
    },
    refreshIcons() {
      this.$nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    }
  },
  mounted() {
    this.refreshIcons();
  },
  updated() {
    this.refreshIcons();
  }
});

app.mount("#app");
