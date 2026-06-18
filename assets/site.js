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
    featuredProducts() {
      return this.products.filter((product) => product.available !== false).slice(0, 6);
    },
    selectedProductSlug() {
      const params = new URLSearchParams(window.location.search);
      return params.get("produto") || params.get("slug") || "";
    },
    selectedProduct() {
      if (this.currentPage !== "produto") {
        return null;
      }
      return this.products.find((product) => this.productSlug(product) === this.selectedProductSlug) || null;
    },
    relatedProducts() {
      if (!this.selectedProduct) {
        return this.products.filter((product) => product.available !== false).slice(0, 6);
      }
      return this.products
        .filter((product) => product.available !== false)
        .filter((product) => this.productSlug(product) !== this.productSlug(this.selectedProduct))
        .slice(0, 6);
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
      if (id === "loja" && this.currentPage === "produto") {
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
      return this.optimizedImage(match.status === "Fora" ? match.opponentLogo || "" : match.teamLogo || "assets/tarian-logo.webp");
    },
    matchAwayLogo(match) {
      return this.optimizedImage(match.status === "Fora" ? match.teamLogo || "assets/tarian-logo.webp" : match.opponentLogo || "");
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
      return this.optimizedImage(item.image || "assets/tarian-hero.webp");
    },
    productImage(product) {
      return this.optimizedImage(product.image || "assets/tarian-hero.webp");
    },
    productLink(product) {
      return `produto.html?produto=${encodeURIComponent(this.productSlug(product))}`;
    },
    productTarget(product) {
      return null;
    },
    productRel(product) {
      return null;
    },
    productSlug(product) {
      return this.slugify(product.slug || product.name || product.category || "produto");
    },
    productId(product) {
      return product.productId || product.sku || this.productSlug(product).toUpperCase();
    },
    productWhatsAppNumber(product) {
      const direct = product.whatsapp || "";
      const contact = this.contacts.find((item) => (item.href || "").startsWith("tel:")) || this.contacts.find((item) => /\d/.test(item.value || ""));
      const fallback = contact?.href || contact?.value || "";
      return (direct || fallback).replace(/\D/g, "");
    },
    productWhatsAppLink(product) {
      const number = this.productWhatsAppNumber(product);
      if (!number) {
        return "contato.html";
      }
      const productId = this.productId(product);
      let message = product.whatsappMessage || `Olá, tenho interesse no produto ${product.name} do Tarian F.C.`;
      if (productId && !message.toLowerCase().includes(productId.toLowerCase())) {
        message = `${message}\nID do Produto: ${productId}`;
      }
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    },
    productWhatsAppTarget(product) {
      return this.productWhatsAppNumber(product) ? "_blank" : null;
    },
    productWhatsAppRel(product) {
      return this.productWhatsAppNumber(product) ? "noopener noreferrer" : null;
    },
    productSpecs(product) {
      return [
        { label: "Categoria", value: product.category },
        { label: "Preço", value: product.price || "Sob consulta" },
        { label: "ID do Produto", value: this.productId(product) },
        { label: "Tamanhos", value: product.sizes },
        { label: "Cores", value: product.colors },
        { label: "Material", value: product.material },
        { label: "Disponibilidade", value: product.available === false ? "Indisponível" : "Disponível" }
      ].filter((item) => item.value);
    },
    productDetailParagraphs(product) {
      const text = product?.details || product?.description || "";
      return text
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    },
    optimizedImage(src) {
      if (src === "assets/tarian-hero.png") {
        return "assets/tarian-hero.webp";
      }
      if (src === "assets/tarian-logo.png") {
        return "assets/tarian-logo.webp";
      }
      return src;
    },
    sectionProducts(section) {
      const category = (section.category || "").trim().toLowerCase();
      return this.products
        .filter((product) => product.available !== false)
        .filter((product) => !category || (product.category || "").trim().toLowerCase() === category);
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
      if (event.target.src.includes("assets/tarian-hero.webp")) {
        event.target.src = "assets/tarian-hero.png";
        return;
      }
      if (event.target.src.includes("assets/tarian-hero.png")) {
        return;
      }
      event.target.src = "assets/tarian-hero.webp";
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
