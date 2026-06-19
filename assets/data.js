const tarianDefaults = {
  "navItems": [
    {
      "href": "index.html",
      "label": "Home",
      "id": "home"
    },
    {
      "href": "clube.html",
      "label": "Clube",
      "id": "clube"
    },
    {
      "href": "elenco.html",
      "label": "Elenco",
      "id": "elenco"
    },
    {
      "href": "jogos.html",
      "label": "Jogos",
      "id": "jogos"
    },
    {
      "href": "noticias.html",
      "label": "Noticias",
      "id": "noticias"
    },
    {
      "href": "loja.html",
      "label": "Loja",
      "id": "loja"
    },
    {
      "href": "contato.html",
      "label": "Contato",
      "id": "contato"
    }
  ],
  "content": {
    "home": {
      "heroTitle": "A.E Tarian",
      "heroText": "Um clube feito para competir com intensidade, revelar talentos e aproximar a torcida de cada partida.",
      "aboutTitle": "Competir, formar e representar.",
      "aboutText": "O A.E Tarian nasceu com a ambicao de jogar um futebol organizado, intenso e conectado com sua comunidade. Cada treino, jogo e projeto de base reforca a ideia de um clube moderno sem perder suas raizes.",
      "ctaTitle": "Faca parte da proxima vitoria.",
      "ctaText": " O A.E Tarian esta aberto a parcerias com marcas, projetos sociais, imprensa e atletas que queiram crescer junto com o clube."
    },
    "clube": {
      "pageTitle": "Um clube criado para representar sua comunidade.",
      "pageText": "O A.E Tarian une futebol competitivo, formacao de atletas e uma marca esportiva pronta para crescer com responsabilidade.",
      "sectionTitle": "Verde e dourado dentro e fora de campo.",
      "sectionText": "Nossa cultura combina trabalho, intensidade e respeito. O clube valoriza quem treina com compromisso, joga pelo coletivo e entende que cada partida tambem constroi uma relacao com a torcida."
    },
    "elenco": {
      "pageTitle": "Catalogo de jogadores do A.E Tarian",
      "pageText": "Fotos, nomes e numeros de camisa do elenco principal em uma visualizacao simples para a torcida.",
      "sectionTitle": "Jogadores cadastrados.",
      "sectionText": "Mantenha o catalogo atualizado pelo painel admin sempre que entrar ou sair um atleta."
    },
    "jogos": {
      "pageTitle": "Jogos, resultados e proximos desafios.",
      "pageText": "Acompanhe os compromissos do A.E Tarian na temporada e os resultados recentes da equipe.",
      "sectionTitle": "Proxima partida em casa.",
      "sectionText": "O A.E Tarian recebe mais um jogo decisivo com entrada da torcida pelo portao principal e operacao especial para torcedores."
    },
    "noticias": {
      "pageTitle": "Informacao oficial para torcida, imprensa e parceiros.",
      "pageText": "Bastidores, comunicados, preparacao, resultados e projetos do A.E Tarian reunidos em um so lugar.",
      "sectionTitle": "Ultimas publicacoes."
    },
    "loja": {
      "pageTitle": "Loja oficial do A.E Tarian",
      "pageText": "Produtos do clube para torcida, treinos e dias de jogo.",
      "sectionTitle": "Catalogo oficial.",
      "sectionText": "Escolha uma categoria, confira os detalhes e fale com o clube para comprar."
    },
    "contato": {
      "pageTitle": "Vamos conversar sobre futebol, torcida e parcerias.",
      "pageText": "Use os canais oficiais para falar com o A.E Tarian sobre patrocinio, imprensa, jogos, atletas ou projetos da comunidade.",
      "sectionTitle": "O clube responde por aqui.",
      "sectionText": "Centralize o primeiro contato pelo formulario ou pelos canais abaixo."
    }
  },
  "stats": [
    {"label": "Fundado", "value": "07 / Julho / 2014"},
    {"label": "Categoria", "value": "Adulto"},
    {"label": "Base", "value": "A.E Tarian."},
    {"label": "Torcida", "value": "Verde & Azul."}
  ],
  "principles": [
    {"icon": "shield-check", "title": "Identidade forte", "text": "O A.E Tarian joga com disciplina, coragem e respeito pela comunidade que veste nossas cores."},
    {"icon": "activity", "title": "Futebol intenso", "text": "Pressao alta, transicoes rapidas e um elenco preparado para competir ate o ultimo minuto."},
    {"icon": "users", "title": "Formacao local", "text": "Valorizamos atletas da regiao e abrimos espaco para novos talentos crescerem dentro do clube."}
  ],
  "shopSections": [
    {"eyebrow": "Uniformes", "title": "Camisas e kits de jogo.", "text": "Pecas para vestir o A.E Tarian em treinos, arquibancada e dias de partida.", "category": "Uniformes"},
    {"eyebrow": "Treino", "title": "Linha de treino.", "text": "Produtos para rotina de atletas, comissao e torcedores que vivem futebol.", "category": "Treino"},
    {"eyebrow": "Acessorios", "title": "Detalhes para completar o kit.", "text": "Itens uteis para jogo, arquibancada e uso no dia a dia.", "category": "Acessorios"}
  ]
};

function cloneTarianData(data = tarianDefaults) {
  return JSON.parse(JSON.stringify(data));
}

function mergeTarianData(base, remote) {
  if (!remote || typeof remote !== "object") return base;
  const output = Array.isArray(base) ? [...base] : { ...base };
  Object.keys(remote).forEach((key) => {
    const value = remote[key];
    if (Array.isArray(value)) {
      if (key === "navItems" && Array.isArray(base[key])) {
        const byId = new Map(value.map((item) => [item.id, item]));
        output[key] = [...value];
        base[key].forEach((item) => { if (!byId.has(item.id)) output[key].push(item); });
      } else {
        output[key] = value;
      }
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
