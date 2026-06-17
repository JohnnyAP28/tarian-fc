const publicSiteData = window.cloneTarianData();

const app = Vue.createApp({
  data() {
    return {
      ...publicSiteData,
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
      return this.currentPage === id;
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
        return;
      }
      const remoteData = await window.TarianCMS.load();
      if (remoteData) {
        this.applyData(remoteData);
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
