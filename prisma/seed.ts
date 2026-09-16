import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Ember & Oak database seed...");

  // Clean existing data
  await prisma.reservation.deleteMany();
  await prisma.table.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // 1. Seed Tables
  const tablesData = [
    // Ember Hearth Counter (Seats 1-2, front row view of the open wood fire hearth)
    { tableNumber: 1, name: "Hearth Counter 1", area: "HEARTH_COUNTER", capacityMin: 1, capacityMax: 2 },
    { tableNumber: 2, name: "Hearth Counter 2", area: "HEARTH_COUNTER", capacityMin: 1, capacityMax: 2 },
    { tableNumber: 3, name: "Hearth Counter 3", area: "HEARTH_COUNTER", capacityMin: 1, capacityMax: 2 },
    { tableNumber: 4, name: "Hearth Counter 4", area: "HEARTH_COUNTER", capacityMin: 1, capacityMax: 2 },

    // Main Dining Room (Intimate dark oak tables, ambient candlelight)
    { tableNumber: 5, name: "Banquette 1", area: "MAIN_DINING", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 6, name: "Banquette 2", area: "MAIN_DINING", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 7, name: "Center Oak Table", area: "MAIN_DINING", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 8, name: "Corner Alcove", area: "MAIN_DINING", capacityMin: 4, capacityMax: 6 },
    { tableNumber: 9, name: "Grand Round Table", area: "MAIN_DINING", capacityMin: 6, capacityMax: 8 },

    // Wine Vault (Semi-private sommelier room)
    { tableNumber: 10, name: "Wine Vault Table A", area: "WINE_VAULT", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 11, name: "Sommelier Reserve Table", area: "WINE_VAULT", capacityMin: 4, capacityMax: 8 },

    // Covered Heated Terrace (Atmospheric garden courtyard)
    { tableNumber: 12, name: "Terrace Garden 1", area: "TERRACE", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 13, name: "Terrace Garden 2", area: "TERRACE", capacityMin: 2, capacityMax: 4 },
    { tableNumber: 14, name: "Terrace Fire Pit", area: "TERRACE", capacityMin: 4, capacityMax: 6 },
  ];

  for (const t of tablesData) {
    await prisma.table.create({ data: t });
  }
  console.log(`✓ Seeded ${tablesData.length} dining tables across 4 distinct seating areas`);

  // 2. Seed Menu Items
  const menuItems = [
    // STARTERS
    {
      slug: "charred-spanish-octopus",
      name: "Charred Spanish Octopus",
      category: "STARTERS",
      price: 26,
      description: "Charcoal grilled tender octopus tentacle, smoked paprika romesco, crispy caper berries, crushed fingerling potatoes with confit garlic oil.",
      dietaryTags: "GF,DF,CHEF_FAVORITE",
      pairing: "2021 Albariño, Bodegas Zárate, Rías Baixas",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      slug: "wood-fired-bone-marrow",
      name: "Wood-Fired Bone Marrow",
      category: "STARTERS",
      price: 24,
      description: "Split beef marrow roasted over white oak embers, charred shallot chimichurri, pickled mustard seeds, toasted artisan sourdough.",
      dietaryTags: "CHEF_FAVORITE",
      pairing: "2019 Syrah, Saint-Joseph, Domaine Coursodon",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      slug: "heirloom-beet-burrata",
      name: "Heirloom Beet & Burrata",
      category: "STARTERS",
      price: 21,
      description: "Ember-roasted golden and red beets, Puglia burrata, smoked pistachio crumble, 25-year balsamic reduction, micro red sorrel.",
      dietaryTags: "GF,VG",
      pairing: "2022 Sancerre, Domaine Vacheron, Loire Valley",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 3,
    },
    {
      slug: "oak-smoked-wagyu-tartare",
      name: "Oak-Smoked Wagyu Tartare",
      category: "STARTERS",
      price: 28,
      description: "Hand-cut A5 Miyazaki beef, cured hen egg yolk, smoked shallot aioli, cornichon relish, crispy tendon crackling.",
      dietaryTags: "DF",
      pairing: "2018 Nebbiolo d'Alba, Bruno Giacosa, Piedmont",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 4,
    },

    // MAINS
    {
      slug: "dry-aged-rohan-duck",
      name: "Dry-Aged Rohan Duck Breast",
      category: "MAINS",
      price: 48,
      description: "14-day dry-aged duck breast glazed with lavender blossom honey, silky parsnip mousseline, Rainier cherry and black cardamom jus, charred rainbow chard.",
      dietaryTags: "GF",
      pairing: "2019 Pinot Noir, Domaine Dujac, Morey-Saint-Denis",
      image: "https://images.unsplash.com/photo-1514944298352-78d193d5089c?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 5,
    },
    {
      slug: "pan-roasted-pacific-halibut",
      name: "Pan-Roasted Pacific Halibut",
      category: "MAINS",
      price: 52,
      description: "Cast-iron seared halibut loin, brown butter dashi reduction, charred leek fondue, maitake mushrooms, sea asparagus crisps.",
      dietaryTags: "GF",
      pairing: "2020 Meursault, Domaine des Comtes Lafon, Burgundy",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 6,
    },
    {
      slug: "slow-braised-beef-short-rib",
      name: "Slow-Braised Beef Short Rib",
      category: "MAINS",
      price: 54,
      description: "Twelve-hour braised prime short rib, black truffle stone-ground polenta, glazed baby heirloom carrots, reduced marrow demi-glace.",
      dietaryTags: "GF",
      pairing: "2017 Cabernet Sauvignon, Stag's Leap Wine Cellars, Napa",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 7,
    },
    {
      slug: "ember-roasted-romanesco-steak",
      name: "Ember-Roasted Romanesco Steak",
      category: "MAINS",
      price: 36,
      description: "Whole romesco cauliflower roasted over hardwood embers, toasted Marcona almond crema, golden sultana agrodolce, pomegranate arils, fresh herbs.",
      dietaryTags: "GF,VG,V",
      pairing: "2021 Chenin Blanc, Domaine Huet, Vouvray",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 8,
    },

    // WOOD_FIRED (The Signature Hearth)
    {
      slug: "prime-bone-in-ribeye-45-day",
      name: "45-Day Dry-Aged Prime Ribeye (18oz)",
      category: "WOOD_FIRED",
      price: 92,
      description: "Hand-cut Creekstone Farms prime ribeye seared over white oak and applewood embers. Finished with smoked Maldon salt crystals, blistered garlic bulb, and bone marrow butter.",
      dietaryTags: "GF,CHEF_FAVORITE",
      pairing: "2016 Brunello di Montalcino, Biondi-Santi, Tuscany",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 9,
    },
    {
      slug: "berkshire-pork-chop-charred-peach",
      name: "Berkshire Pork Chop & Charred Peach",
      category: "WOOD_FIRED",
      price: 46,
      description: "Thick-cut heritage Berkshire chop seared on cast iron over open coals, bourbon-smoked peach chutney, braised collard ribbons, natural pork reduction.",
      dietaryTags: "GF",
      pairing: "2018 Grenache Blend, Châteauneuf-du-Pape, Château de Beaucastel",
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 10,
    },
    {
      slug: "whole-wood-roasted-branzino",
      name: "Whole Wood-Roasted Mediterranean Branzino",
      category: "WOOD_FIRED",
      price: 78,
      description: "Butterflied and wood-roasted with preserved Meyer lemon slices, wild oregano, fennel pollen crust, and cold-pressed Sicilian olive oil salsa verde. Serves 1-2.",
      dietaryTags: "GF,DF,CHEF_FAVORITE",
      pairing: "2021 Etna Bianco, Benanti, Mount Etna, Sicily",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 11,
    },

    // DESSERTS
    {
      slug: "smoked-valrhona-chocolate-tarte",
      name: "Smoked Valrhona Chocolate Tarte",
      category: "DESSERTS",
      price: 18,
      description: "72% dark chocolate ganache cold-smoked over cherrywood, cocoa sable crust, smoked sea salt flakes, and house-spun Madagascar bourbon vanilla bean gelato.",
      dietaryTags: "VG,CHEF_FAVORITE",
      pairing: "20-Year Tawny Port, Taylor Fladgate, Douro Valley",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 12,
    },
    {
      slug: "caramelized-apple-galette",
      name: "Wood-Oven Caramelized Apple Galette",
      category: "DESSERTS",
      price: 16,
      description: "Honeycrisp apple ribbons baked in flaky browned-butter pastry, warm salted Calvados caramel drizzle, whipped crème fraîche.",
      dietaryTags: "VG",
      pairing: "2017 Château d'Yquem, Sauternes, Bordeaux",
      image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 13,
    },
    {
      slug: "charred-fig-mascarpone-crema",
      name: "Charred Fig & Mascarpone Crema",
      category: "DESSERTS",
      price: 17,
      description: "Black mission figs blistered over embers, whipped citrus mascarpone, toasted Piedmont hazelnuts, crisp rosemary honey tuile.",
      dietaryTags: "GF,VG",
      pairing: "Vin Santo del Chianti Classico, Badia a Coltibuono",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 14,
    },

    // COCKTAILS_WINE
    {
      slug: "the-ember-and-oak-old-fashioned",
      name: "The Ember & Oak Old Fashioned",
      category: "COCKTAILS_WINE",
      price: 22,
      description: "Small batch bourbon washed with browned butter, roasted pecan demerara syrup, smoked Angostura & black walnut bitters, flamed orange peel.",
      dietaryTags: "CHEF_FAVORITE",
      pairing: "Served over a hand-carved crystal ice sphere",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      sortOrder: 15,
    },
    {
      slug: "velvet-smoke-mezcal-negroni",
      name: "Velvet Smoke Negroni",
      category: "COCKTAILS_WINE",
      price: 21,
      description: "Artisanal Oaxaca Espadín mezcal, Italian bitter liqueur, Carpano Antica Formula vermouth, flamed fresh rosemary smoke.",
      dietaryTags: "",
      pairing: "Aromatic cold smoking under glass cloche",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 16,
    },
    {
      slug: "golden-hearth-spritz",
      name: "Golden Hearth Spritz",
      category: "COCKTAILS_WINE",
      price: 19,
      description: "Italicus Rosolio di Bergamotto, charred Meyer lemon shrub, Valdobbiadene Prosecco Superiore, edible 24k gold leaf mist.",
      dietaryTags: "VG",
      pairing: "Effervescent & refreshing palate opener",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      sortOrder: 17,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`✓ Seeded ${menuItems.length} culinary menu offerings`);

  // 3. Seed Sample Upcoming Reservations (today + next 2 days)
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const tableHearth1 = await prisma.table.findFirst({ where: { tableNumber: 1 } });
  const tableDining5 = await prisma.table.findFirst({ where: { tableNumber: 5 } });
  const tableVault10 = await prisma.table.findFirst({ where: { tableNumber: 10 } });

  const sampleReservations = [
    {
      reference: "EO-81920",
      guestName: "Lord Julian Hastings",
      guestEmail: "julian.hastings@example.com",
      guestPhone: "+1 (555) 234-8901",
      partySize: 2,
      date: today,
      timeSlot: "19:00",
      seatingArea: "HEARTH_COUNTER",
      occasion: "Anniversary",
      dietaryNotes: "No shellfish for guest 2",
      specialRequests: "Front row counter seats by the rotisserie grill please.",
      status: "CONFIRMED",
      tableId: tableHearth1?.id,
    },
    {
      reference: "EO-81921",
      guestName: "Dr. Evelyn Vance",
      guestEmail: "evelyn.vance@example.com",
      guestPhone: "+1 (555) 456-7890",
      partySize: 4,
      date: today,
      timeSlot: "19:30",
      seatingArea: "MAIN_DINING",
      occasion: "Celebration",
      dietaryNotes: "One guest is gluten-free",
      specialRequests: "Celebrating a medical fellowship appointment.",
      status: "CONFIRMED",
      tableId: tableDining5?.id,
    },
    {
      reference: "EO-81922",
      guestName: "Marcello Rossi",
      guestEmail: "marcello.rossi@example.com",
      guestPhone: "+1 (555) 890-1234",
      partySize: 6,
      date: tomorrow,
      timeSlot: "20:00",
      seatingArea: "WINE_VAULT",
      occasion: "Business",
      dietaryNotes: "None",
      specialRequests: "Wine vault reservation with sommelier pairing flight.",
      status: "CONFIRMED",
      tableId: tableVault10?.id,
    },
  ];

  for (const res of sampleReservations) {
    await prisma.reservation.create({ data: res });
  }
  console.log(`✓ Seeded sample bookings for testing`);

  // 4. Seed Newsletter Subscribers
  const subscribers = [
    { email: "epicurean.traveler@gastronomy.com" },
    { email: "sommelier.notes@grandcru.org" },
    { email: "foodie.curator@nyceats.com" },
  ];
  for (const s of subscribers) {
    await prisma.newsletterSubscriber.create({ data: s });
  }
  console.log(`✓ Seeded ${subscribers.length} newsletter subscribers`);

  console.log("✨ Ember & Oak database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
