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
    },
    primaryCoach() {
      if (!Array.isArray(this.editable.staff)) {
        this.editable.staff = [];
      }
      let coach = this.editable.staff.find((person) => (person.role || "").toLowerCase().includes("treinador"));
      if (!coach) {
        coach = { role: "Treinador", name: "Treinador", text: "", photo: "" };
        this.editable.staff.unshift(coach);
      }
      if (coach.photo === undefined) {
        coach.photo = "";
      }
      return coach;
    }
  },
  methods: {
    uid(prefix) {
      return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },
    async login() {
      if (!this.validateAuth()) {
        return;
      }
      await this.runAuth(() => window.TarianCMS.signIn(this.auth.email.trim(), this.auth.password), "Acesso confirmado.");
    },
    async register() {
      if (!this.validateAuth()) {
        return;
      }
      await this.runAuth(() => window.TarianCMS.signUp(this.auth.email.trim(), this.auth.password), "Acesso criado.");
    },
    validateAuth() {
      const email = this.auth.email.trim();
      const password = this.auth.password;
      const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!emailLooksValid) {
        this.message = "Digite um e-mail válido para criar ou entrar.";
        this.$nextTick(() => document.querySelector("#email")?.focus());
        return false;
      }

      if (!password || password.length < 6) {
        this.message = "A senha precisa ter pelo menos 6 caracteres.";
        this.$nextTick(() => document.querySelector("#password")?.focus());
        return false;
      }

      return true;
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
        this.normalizeEditable();
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
        this.normalizeEditable();
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
        fixtures: { date: "Data", time: "Hora", opponent: "Adversário", venue: "Local", competition: "Competição", round: "Rodada", status: "Casa", teamLogo: "assets/tarian-logo.png", opponentLogo: "", ticketStatus: "Em definição" },
        news: { tag: "Clube", date: "Data", title: "Nova notícia", text: "Texto da notícia." },
        contacts: { icon: "circle", label: "Novo canal", value: "Informação", href: "" }
      };
      this.editable[type].push(items[type]);
      this.refreshIcons();
    },
    normalizeEditable() {
      if (!Array.isArray(this.editable.fixtures)) {
        this.editable.fixtures = [];
      }
      this.editable.fixtures = this.editable.fixtures.map((match) => ({
        teamLogo: "assets/tarian-logo.png",
        opponentLogo: "",
        round: "",
        ticketStatus: "Em definição",
        ...match
      }));
    },
    removeItem(list, index) {
      list.splice(index, 1);
      this.refreshIcons();
    },
    friendlyError(error) {
      const code = error?.code || "";
      if (code.includes("auth/unauthorized-domain")) {
        return "Domínio da Vercel não autorizado no Firebase Auth. Adicione tarian-fc.vercel.app nos domínios autorizados.";
      }
      if (code.includes("auth/invalid-email")) {
        return "Digite um e-mail válido para criar ou entrar.";
      }
      if (code.includes("auth/weak-password")) {
        return "A senha precisa ter pelo menos 6 caracteres.";
      }
      if (code.includes("auth/operation-not-allowed")) {
        return "Ative o login por e-mail e senha no Firebase Authentication.";
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
