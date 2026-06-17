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
