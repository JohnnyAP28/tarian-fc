const publicSiteData = window.cloneTarianData();

const app = Vue.createApp({
  data() {
    return {
      ...publicSiteData,
      mobileOpen: false,
      contentReady: false,
      toastVisible: false,
      toastText: "Mensagem enviada. O Tarian F.C. vai retornar em breve."
    };
  },
  computed: {
    currentPage() {
      return document.body.dataset.page || "home";
    },
    selectedNewsSlug() {
      const params = new URLSearchParams(window.location.search);
      return params.get("noticia") || params.get("slug") || "";
    },
    selectedNews() {
      if (this.currentPage !== "noticia") {
        return null;
      }
      return this.news.find((item) => this.newsSlug(item) === this.selectedNewsSlug) || null;
    },
    selectedNewsParagraphs() {
      if (!this.selectedNews) {
        return [];
      }
      const body = this.selectedNews.text || this.selectedNews.excerpt || "";
      return body
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    },
    relatedNews() {
      if (!this.selectedNews) {
        return this.news.slice(0, 3);
      }
      return this.news.filter((item) => this.newsSlug(item) !== this.newsSlug(this.selectedNews)).slice(0, 3);
    },
    nextFixture() {
      return this.fixtures[0] || {
        date: "Em breve",
        time: "",
        opponent: "A definir",
        venue: "Tarian Arena",
        competition: "Calendário",
        status: "Casa"
      };
    },
    featuredNews() {
      return this.news.slice(0, 3);
    },
    coachCatalogCard() {
      const coach = this.staff.find((person) => (person.role || "").toLowerCase().includes("treinador")) || this.staff[0] || {};
      return {
        id: "coach-card",
        number: "T",
        name: coach.name || "Treinador",
        position: coach.role || "Treinador",
        photo: coach.photo || "",
        isCoach: true
      };
    },
    catalogPlayers() {
      const roster = this.players.slice(0, 19).map((player, index) => ({
        id: player.id || `player-${index}`,
        ...player
      }));
      const players = [this.coachCatalogCard, ...roster];
      while (players.length < 20) {
        players.push({
          id: `empty-${players.length}`,
          number: "",
          name: "Disponível",
          position: "Elenco",
          photo: "",
          empty: true
        });
      }
      return players;
    }
  },
  methods: {
    isActive(id) {
      if (id === "noticias" && this.currentPage === "noticia") {
        return true;
      }
      return this.currentPage === id;
    },
    matchHomeName(match) {
      return match.status === "Fora" ? match.opponent || "Adversário" : "Tarian F.C.";
    },
    matchAwayName(match) {
      return match.status === "Fora" ? "Tarian F.C." : match.opponent || "Adversário";
    },
    matchHomeLogo(match) {
      return match.status === "Fora" ? match.opponentLogo || "" : match.teamLogo || "assets/tarian-logo.png";
    },
    matchAwayLogo(match) {
      return match.status === "Fora" ? match.teamLogo || "assets/tarian-logo.png" : match.opponentLogo || "";
    },
    teamInitials(name) {
      return (name || "FC")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    },
    newsImage(item) {
      return item.image || "assets/tarian-hero.png";
    },
    slugify(value) {
      return (value || "noticia")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "noticia";
    },
    newsSlug(item) {
      return this.slugify(item.slug || item.title || item.date || "noticia");
    },
    newsExcerpt(item) {
      const text = item.excerpt || item.text || "";
      return text.length > 150 ? `${text.slice(0, 147).trim()}...` : text;
    },
    newsLink(item) {
      return `noticia.html?noticia=${encodeURIComponent(this.newsSlug(item))}`;
    },
    newsTarget(item) {
      return null;
    },
    newsRel(item) {
      return null;
    },
    articleExtraLink(item) {
      const href = item.href || "";
      if (!href || href === "noticias.html" || href.startsWith("noticia.html")) {
        return "";
      }
      return href;
    },
    articleExtraTarget(item) {
      return /^https?:\/\//.test(this.articleExtraLink(item)) ? "_blank" : null;
    },
    articleExtraRel(item) {
      return this.articleExtraTarget(item) ? "noopener noreferrer" : null;
    },
    fallbackNewsImage(event) {
      if (event.target.src.includes("assets/tarian-hero.png")) {
        return;
      }
      event.target.src = "assets/tarian-hero.png";
    },
    playerInitials(name) {
      return (name || "TFC")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    },
    applyData(remoteData) {
      const merged = window.mergeTarianData(window.cloneTarianData(), remoteData);
      Object.keys(merged).forEach((key) => {
        this[key] = merged[key];
      });
    },
    async loadContent() {
      if (!window.TarianCMS) {
        this.contentReady = true;
        return;
      }
      try {
        const remoteData = await window.TarianCMS.load();
        if (remoteData) {
          this.applyData(remoteData);
        }
      } finally {
        this.contentReady = true;
      }
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
    this.loadContent();
    this.refreshIcons();
  },
  updated() {
    this.refreshIcons();
  }
});

app.mount("#app");
