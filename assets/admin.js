const adminApp = Vue.createApp({
  data() {
    return {
      tabs: [
        { id: "home", label: "Home", icon: "home" },
        { id: "clube", label: "Clube", icon: "shield" },
        { id: "elenco", label: "Elenco", icon: "users" },
        { id: "jogos", label: "Jogos", icon: "calendar-days" },
        { id: "noticias", label: "Notícias", icon: "newspaper" },
        { id: "contato", label: "Contato", icon: "mail" }
      ],
      activeTab: "home",
      editable: window.cloneTarianData(),
      user: null,
      auth: {
        email: "",
        password: ""
      },
      busy: false,
      message: ""
    };
  },
  computed: {
    currentTabLabel() {
      return this.tabs.find((tab) => tab.id === this.activeTab)?.label || "Editor";
    }
  },
  methods: {
    uid(prefix) {
      return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },
    async login() {
      await this.runAuth(() => window.TarianCMS.signIn(this.auth.email, this.auth.password), "Acesso confirmado.");
    },
    async register() {
      await this.runAuth(() => window.TarianCMS.signUp(this.auth.email, this.auth.password), "Acesso criado.");
    },
    async runAuth(action, successMessage) {
      this.busy = true;
      this.message = "";
      try {
        await action();
        this.message = successMessage;
      } catch (error) {
        this.message = this.friendlyError(error);
      } finally {
        this.busy = false;
      }
    },
    async logout() {
      await window.TarianCMS.signOut();
      this.user = null;
      this.message = "Você saiu do painel.";
    },
    async loadContent() {
      this.busy = true;
      try {
        const remoteData = await window.TarianCMS.load();
        this.editable = window.mergeTarianData(window.cloneTarianData(), remoteData);
      } catch (error) {
        this.message = this.friendlyError(error);
      } finally {
        this.busy = false;
        this.refreshIcons();
      }
    },
    async save() {
      this.busy = true;
      this.message = "";
      try {
        await window.TarianCMS.save(this.editable);
        this.message = "Alterações salvas.";
      } catch (error) {
        this.message = this.friendlyError(error);
      } finally {
        this.busy = false;
      }
    },
    addItem(type) {
      const items = {
        stats: { label: "Novo destaque", value: "Valor" },
        timeline: { year: "2026", title: "Novo marco", text: "Descrição do marco." },
        players: { id: this.uid("player"), number: "", name: "Novo jogador", position: "", photo: "", age: "", matches: "", goals: "" },
        fixtures: { date: "Data", time: "Hora", opponent: "Adversário", venue: "Local", competition: "Competição", status: "Casa" },
        news: { tag: "Clube", date: "Data", title: "Nova notícia", text: "Texto da notícia." },
        contacts: { icon: "circle", label: "Novo canal", value: "Informação", href: "" }
      };
      this.editable[type].push(items[type]);
      this.refreshIcons();
    },
    removeItem(list, index) {
      list.splice(index, 1);
      this.refreshIcons();
    },
    friendlyError(error) {
      const code = error?.code || "";
      if (code.includes("auth/unauthorized-domain")) {
        return "Domínio não autorizado no Firebase Auth.";
      }
      if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) {
        return "E-mail ou senha inválidos.";
      }
      if (code.includes("auth/email-already-in-use")) {
        return "Este e-mail já tem acesso.";
      }
      if (code.includes("permission-denied")) {
        return "Sem permissão para salvar no Firestore.";
      }
      return error?.message || "Não foi possível concluir a ação.";
    },
    refreshIcons() {
      this.$nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    }
  },
  async mounted() {
    this.refreshIcons();
    try {
      await window.TarianCMS.onAuth((user) => {
        this.user = user;
        if (user) {
          this.loadContent();
        }
      });
    } catch (error) {
      this.message = this.friendlyError(error);
    }
  },
  updated() {
    this.refreshIcons();
  }
});

adminApp.mount("#admin-app");
