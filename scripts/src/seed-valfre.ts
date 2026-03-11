import { db, productsTable, categoriesTable } from "@workspace/db";

const categories = [
  {
    id: "ferramentas-manuais",
    name: "Ferramentas Manuais",
    slug: "ferramentas-manuais",
    icon: "🔨",
    productCount: 0,
    subcategories: [
      { id: "martelos", name: "Martelos", slug: "martelos" },
      { id: "alicates", name: "Alicates", slug: "alicates" },
      { id: "chaves", name: "Chaves de Fenda e Phillips", slug: "chaves" },
      { id: "serrotes", name: "Serrotes e Arcos de Serra", slug: "serrotes" },
      { id: "desempenadeiras", name: "Desempenadeiras", slug: "desempenadeiras" },
      { id: "medicao", name: "Medição e Nivelamento", slug: "medicao" },
      { id: "organizacao", name: "Organização de Ferramentas", slug: "organizacao" },
    ],
  },
  {
    id: "ferramentas-eletricas",
    name: "Ferramentas Elétricas",
    slug: "ferramentas-eletricas",
    icon: "⚡",
    productCount: 0,
    subcategories: [
      { id: "furadeiras", name: "Furadeiras", slug: "furadeiras" },
      { id: "parafusadeiras", name: "Parafusadeiras", slug: "parafusadeiras" },
      { id: "esmerilhadeiras", name: "Esmerilhadeiras", slug: "esmerilhadeiras" },
      { id: "serras-eletricas", name: "Serras Elétricas", slug: "serras-eletricas" },
      { id: "lixadeiras", name: "Lixadeiras", slug: "lixadeiras" },
    ],
  },
  {
    id: "acessorios",
    name: "Acessórios e Peças",
    slug: "acessorios",
    icon: "🔩",
    productCount: 0,
    subcategories: [
      { id: "laminas", name: "Lâminas", slug: "laminas" },
      { id: "discos", name: "Discos de Corte", slug: "discos" },
      { id: "brocas", name: "Brocas", slug: "brocas" },
      { id: "mandris", name: "Mandris e Adaptadores", slug: "mandris" },
    ],
  },
  {
    id: "construcao",
    name: "Construção e Obra",
    slug: "construcao",
    icon: "🏗️",
    productCount: 0,
    subcategories: [
      { id: "pedreiro", name: "Ferramentas de Pedreiro", slug: "pedreiro" },
      { id: "pintura", name: "Ferramentas de Pintura", slug: "pintura" },
      { id: "soldagem", name: "Soldagem", slug: "soldagem" },
    ],
  },
  {
    id: "eletrica",
    name: "Elétrica",
    slug: "eletrica",
    icon: "💡",
    productCount: 0,
    subcategories: [
      { id: "iluminacao", name: "Iluminação e Lâmpadas", slug: "iluminacao" },
      { id: "disjuntores", name: "Disjuntores e Quadros", slug: "disjuntores" },
      { id: "extensoes", name: "Extensões e Benjamins", slug: "extensoes" },
    ],
  },
  {
    id: "climatizacao",
    name: "Climatização",
    slug: "climatizacao",
    icon: "❄️",
    productCount: 0,
    subcategories: [
      { id: "ventiladores", name: "Ventiladores", slug: "ventiladores" },
      { id: "aquecedores", name: "Aquecedores", slug: "aquecedores" },
    ],
  },
  {
    id: "casa",
    name: "Casa e Organização",
    slug: "casa",
    icon: "🏠",
    productCount: 0,
    subcategories: [
      { id: "organizadores", name: "Organizadores", slug: "organizadores" },
      { id: "cozinha", name: "Utensílios de Cozinha", slug: "cozinha" },
    ],
  },
  {
    id: "automotivo",
    name: "Automotivo",
    slug: "automotivo",
    icon: "🚗",
    productCount: 0,
    subcategories: [
      { id: "lubrificantes", name: "Lubrificantes e Aditivos", slug: "lubrificantes" },
      { id: "manutencao-auto", name: "Manutenção", slug: "manutencao-auto" },
    ],
  },
];

const PLACEHOLDER_IMAGES = {
  "ferramentas-manuais": [
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  ],
  "ferramentas-eletricas": [
    "https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=400&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400&q=80",
  ],
  "acessorios": [
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
  ],
  "construcao": [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80",
  ],
  "eletrica": [
    "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80",
  ],
  "climatizacao": [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
  ],
  "casa": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  ],
  "automotivo": [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  ],
};

const products = [
  {
    id: "p001", sku: "MAR-001", name: "Martelo de Unha 25mm Tramontina", slug: "martelo-unha-25mm-tramontina",
    price: "47.90", originalPrice: "59.90", discountPercent: 20,
    category: "Ferramentas Manuais", categorySlug: "ferramentas-manuais",
    brand: "Tramontina", images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80"],
    stock: 45, inStock: true, rating: "4.7", reviewCount: 234,
    isBestSeller: true, isNew: false, isOnSale: true, weight: "0.850", unit: "un",
    description: "Martelo de unha profissional com cabo de madeira tratada e cabeça de aço forjado.",
    specifications: [{ label: "Peso", value: "850g" }, { label: "Material cabeça", value: "Aço forjado" }, { label: "Cabo", value: "Madeira eucalipto" }],
  },
  {
    id: "p002", sku: "FUR-001", name: "Furadeira de Impacto 3/8\" 650W Bosch", slug: "furadeira-impacto-bosch-650w",
    price: "289.90", originalPrice: "349.90", discountPercent: 17,
    category: "Ferramentas Elétricas", categorySlug: "ferramentas-eletricas",
    brand: "Bosch", images: ["https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=400&q=80"],
    stock: 23, inStock: true, rating: "4.8", reviewCount: 512,
    isBestSeller: true, isNew: false, isOnSale: true, weight: "1.500", unit: "un",
    description: "Furadeira de impacto com 650W de potência, ideal para trabalhos em madeira, concreto e metal.",
    specifications: [{ label: "Potência", value: "650W" }, { label: "Velocidade", value: "2.800 RPM" }, { label: "Tensão", value: "220V" }],
  },
  {
    id: "p003", sku: "ALI-001", name: "Alicate Universal 8\" Stanley", slug: "alicate-universal-8-stanley",
    price: "39.90", originalPrice: "0", discountPercent: 0,
    category: "Ferramentas Manuais", categorySlug: "ferramentas-manuais",
    brand: "Stanley", images: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80"],
    stock: 87, inStock: true, rating: "4.5", reviewCount: 156,
    isBestSeller: false, isNew: false, isOnSale: false, weight: "0.320", unit: "un",
    description: "Alicate universal com mandíbulas de aço cromo-vanádio e cabo com empunhadura emborrachada.",
    specifications: [{ label: "Comprimento", value: "8 polegadas (200mm)" }, { label: "Material", value: "Aço cromo-vanádio" }],
  },
  {
    id: "p004", sku: "ESM-001", name: "Esmerilhadeira Angular 4.1/2\" 850W DeWalt", slug: "esmerilhadeira-angular-dewalt-850w",
    price: "379.90", originalPrice: "429.90", discountPercent: 12,
    category: "Ferramentas Elétricas", categorySlug: "ferramentas-eletricas",
    brand: "DeWalt", images: ["https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400&q=80"],

    stock: 18, inStock: true, rating: "4.9", reviewCount: 287,
    isBestSeller: true, isNew: false, isOnSale: true, weight: "2.100", unit: "un",
    description: "Esmerilhadeira angular com motor de 850W e proteção anti-restart.",
    specifications: [{ label: "Potência", value: "850W" }, { label: "Disco", value: "4.1/2\" (115mm)" }, { label: "RPM", value: "11.000" }],
  },
  {
    id: "p005", sku: "NIV-001", name: "Nível de Bolha 60cm Vonder", slug: "nivel-bolha-60cm-vonder",
    price: "28.90", originalPrice: "0", discountPercent: 0,
    category: "Ferramentas Manuais", categorySlug: "ferramentas-manuais",
    brand: "Vonder", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"],
    stock: 120, inStock: true, rating: "4.3", reviewCount: 98,
    isBestSeller: false, isNew: true, isOnSale: false, weight: "0.450", unit: "un",
    description: "Nível de bolha em alumínio com 3 ampolas de medição e escala em mm.",
    specifications: [{ label: "Comprimento", value: "60cm" }, { label: "Material", value: "Alumínio" }],
  },
  {
    id: "p006", sku: "PAR-001", name: "Parafusadeira/Furadeira a Bateria 12V Makita", slug: "parafusadeira-furadeira-bateria-12v-makita",
    price: "499.90", originalPrice: "599.90", discountPercent: 17,
    category: "Ferramentas Elétricas", categorySlug: "ferramentas-eletricas",
    brand: "Makita", images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80"],
    stock: 31, inStock: true, rating: "4.9", reviewCount: 673,
    isBestSeller: true, isNew: false, isOnSale: true, weight: "1.200", unit: "un",
    description: "Parafusadeira/furadeira a bateria com 30Nm de torque e carregador incluído.",
    specifications: [{ label: "Voltagem", value: "12V" }, { label: "Torque máx", value: "30Nm" }, { label: "Bateria", value: "Li-Ion 2.0Ah" }],
  },
  {
    id: "p007", sku: "DIS-001", name: "Disco de Corte 4.1/2\" Inox Flap 40G", slug: "disco-corte-inox-flap-40g",
    price: "12.90", originalPrice: "0", discountPercent: 0,
    category: "Acessórios e Peças", categorySlug: "acessorios",
    brand: "Norton", images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80"],
    stock: 500, inStock: true, rating: "4.6", reviewCount: 445,
    isBestSeller: false, isNew: false, isOnSale: false, weight: "0.080", unit: "un",
    description: "Disco de desbaste flap para esmerilhadeira, grão 40, ideal para inox e aço.",
    specifications: [{ label: "Diâmetro", value: "4.1/2\" (115mm)" }, { label: "Grão", value: "40" }, { label: "Material", value: "Óxido de alumínio" }],
  },
  {
    id: "p008", sku: "LMP-001", name: "Luminária LED Slim 36W Branco Frio Elgin", slug: "luminaria-led-slim-36w-branco-frio",
    price: "79.90", originalPrice: "99.90", discountPercent: 20,
    category: "Elétrica", categorySlug: "eletrica",
    brand: "Elgin", images: ["https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80"],
    stock: 65, inStock: true, rating: "4.4", reviewCount: 189,
    isBestSeller: false, isNew: true, isOnSale: true, weight: "0.850", unit: "un",
    description: "Luminária de embutir LED com 36W e temperatura de cor 6.500K.",
    specifications: [{ label: "Potência", value: "36W" }, { label: "Temperatura", value: "6.500K (Branco Frio)" }, { label: "Fluxo luminoso", value: "3.600 lm" }],
  },
  {
    id: "p009", sku: "VEN-001", name: "Ventilador de Coluna 50cm Turbo Arno", slug: "ventilador-coluna-50cm-turbo-arno",
    price: "249.90", originalPrice: "299.90", discountPercent: 17,
    category: "Climatização", categorySlug: "climatizacao",
    brand: "Arno", images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"],
    stock: 28, inStock: true, rating: "4.5", reviewCount: 134,
    isBestSeller: false, isNew: false, isOnSale: true, weight: "4.500", unit: "un",
    description: "Ventilador de coluna com 3 velocidades, temporizador e controle remoto.",
    specifications: [{ label: "Hélice", value: "50cm" }, { label: "Velocidades", value: "3" }, { label: "Potência", value: "130W" }],
  },
  {
    id: "p010", sku: "TAR-001", name: "Furadeira de Impacto 1/2\" 800W Black+Decker", slug: "furadeira-impacto-half-inch-800w",
    price: "219.90", originalPrice: "0", discountPercent: 0,
    category: "Ferramentas Elétricas", categorySlug: "ferramentas-eletricas",
    brand: "Black+Decker", images: ["https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=400&q=80"],
    stock: 42, inStock: true, rating: "4.4", reviewCount: 302,
    isBestSeller: false, isNew: true, isOnSale: false, weight: "1.800", unit: "un",
    description: "Furadeira de impacto com 800W, ideal para uso doméstico e profissional.",
    specifications: [{ label: "Potência", value: "800W" }, { label: "Mandril", value: "1/2\" (13mm)" }, { label: "Tensão", value: "127V" }],
  },
  {
    id: "p011", sku: "CHV-001", name: "Jogo de Chaves Combinadas 8-24mm 8 Peças Gedore", slug: "jogo-chaves-combinadas-gedore-8pcs",
    price: "156.90", originalPrice: "189.90", discountPercent: 17,
    category: "Ferramentas Manuais", categorySlug: "ferramentas-manuais",
    brand: "Gedore", images: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80"],
    stock: 56, inStock: true, rating: "4.8", reviewCount: 423,
    isBestSeller: true, isNew: false, isOnSale: true, weight: "1.200", unit: "jg",
    description: "Jogo com 8 chaves combinadas em aço cromo-vanádio com acabamento espelhado.",
    specifications: [{ label: "Tamanhos", value: "8, 10, 12, 14, 17, 19, 22, 24mm" }, { label: "Material", value: "Cromo-Vanádio" }, { label: "Peças", value: "8" }],
  },
  {
    id: "p012", sku: "ORG-001", name: "Caixa de Ferramentas Plástica 22\" Tramontina", slug: "caixa-ferramentas-22-tramontina",
    price: "89.90", originalPrice: "0", discountPercent: 0,
    category: "Ferramentas Manuais", categorySlug: "ferramentas-manuais",
    brand: "Tramontina", images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80"],
    stock: 95, inStock: true, rating: "4.2", reviewCount: 167,
    isBestSeller: false, isNew: false, isOnSale: false, weight: "1.100", unit: "un",
    description: "Caixa de ferramentas em polipropileno com bandeja superior removível.",
    specifications: [{ label: "Tamanho", value: "22\" (55cm)" }, { label: "Material", value: "Polipropileno" }, { label: "Capacidade", value: "Média" }],
  },
];

async function seed() {
  console.log("🌱 Seeding Ferramentas Valfre database...");

  await db.delete(productsTable);
  await db.delete(categoriesTable);

  await db.insert(categoriesTable).values(categories);
  console.log(`✅ ${categories.length} categories inserted`);

  // Fix ESM syntax issue in p004
  const cleanProducts = products.map(p => ({
    ...p,
    originalPrice: p.originalPrice === "0" ? null : p.originalPrice,
    discountPercent: p.discountPercent || 0,
  }));

  await db.insert(productsTable).values(cleanProducts as any);
  console.log(`✅ ${cleanProducts.length} products inserted`);

  const counts: Record<string, number> = {};
  for (const p of cleanProducts) {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  }

  for (const [slug, count] of Object.entries(counts)) {
    await db.update(categoriesTable)
      .set({ productCount: count })
      .where((await import("drizzle-orm")).eq(categoriesTable.slug, slug));
  }

  console.log("✅ Category counts updated");
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
