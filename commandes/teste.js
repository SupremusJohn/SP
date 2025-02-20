const { zokou } = require('../framework/zokou');

// Configuration des packs et des taux de loot
const packs = {
  "🥉": { prix: 150, loot: { commun: 80, rare: 15, epique: 5 } },
  "🥈": { prix: 200, loot: { commun: 60, rare: 30, epique: 10 } },
  "🥇": { prix: 250, loot: { commun: 40, rare: 40, epique: 15, legendaire: 5 } },
  "🏅": { prix: 300, loot: { commun: 20, rare: 40, epique: 30, legendaire: 10 } }
};

// Génération de loot aléatoire
const genererLoot = (typePack) => {
  const lootTable = [];
  for (const [rarete, taux] of Object.entries(typePack.loot)) {
    lootTable.push(...Array(taux).fill(rarete));
  }
  return lootTable[Math.floor(Math.random() * lootTable.length)];
};

// 🛒 Commande /acheter
zokou(
  { nomCom: 'acheter', reaction: '🛒', categorie: 'TRANSACT' },
  async (origineMessage, zk, commandeOptions) => {
    const { auteurMessage, repondre } = commandeOptions;
    
    try {
      // Sélection du jeu
      await repondre("📌 *Choisissez le jeu :*\n1️⃣ ABM\n2️⃣ Speed Rush\n3️⃣ Yu-Gi-Oh\n4️⃣ Origamy World\n\nRépondez avec le numéro correspondant.");
      const reponseJeu = await zk.awaitForMessage({ sender: auteurMessage, chatJid: origineMessage, timeout: 60000 });

      if (!reponseJeu?.message?.conversation) return await repondre("❌ Temps écoulé ou réponse invalide.");

      const jeux = ["ABM", "Speed Rush", "Yu-Gi-Oh Speed Duel", "Origamy World"];
      const choixIndex = parseInt(reponseJeu.message.conversation.trim(), 10) - 1;
      if (isNaN(choixIndex) || choixIndex < 0 || choixIndex >= jeux.length) return await repondre("❌ Sélection invalide. Veuillez réessayer.");

      const choixJeu = jeux[choixIndex];

      // Sélection du pack
      await repondre("📦 *Choisissez votre pack :*\n🥉 (150🎫)\n🥈 (200🎫)\n🥇 (250🎫)\n🏅 (300🎫)\n\nRépondez avec l'emoji correspondant.");
      const reponsePack = await zk.awaitForMessage({ sender: auteurMessage, chatJid: origineMessage, timeout: 60000 });

      if (!reponsePack?.message?.conversation) return await repondre("❌ Temps écoulé ou réponse invalide.");

      const choixPack = Object.keys(packs).find(pack => pack === reponsePack.message.conversation.trim());
      if (!choixPack) return await repondre("❌ Pack invalide. Veuillez réessayer.");

      const packSelectionne = packs[choixPack];

      // Vérification du solde (simulation)
      const soldeCoupons = 500; // À remplacer par une récupération du vrai solde
      if (soldeCoupons < packSelectionne.prix) return await repondre(`❌ Fonds insuffisants. Il vous faut ${packSelectionne.prix}🎫.`);

      // Génération du loot
      const lootObtenu = Array.from({ length: 3 }, () => genererLoot(packSelectionne));

      // Confirmation
      await repondre(`✅ *Achat réussi !* 🎁\nVous avez acheté un pack *${choixPack}* pour *${choixJeu}*.\n\n📦 Contenu :\n- ${lootObtenu.join("\n- ")}`);
    } catch (error) {
      console.error("Erreur lors de l'achat :", error);
      await repondre("❌ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  }
);

// 💰 Commande /vendre
zokou(
  { nomCom: 'vendre', reaction: '💰', categorie: 'TRANSACT' },
  async (origineMessage, zk, commandeOptions) => {
    const { args, repondre } = commandeOptions;
    if (args.length < 2) return await repondre("❌ Usage : /vendre [objet] [quantité]");

    const [objet, quantiteStr] = args;
    const quantite = parseInt(quantiteStr, 10);
    if (isNaN(quantite) || quantite <= 0) return await repondre("❌ Quantité invalide.");

    const prixUnitaire = 50; // Simulation du prix
    const totalGain = prixUnitaire * quantite;

    await repondre(`✅ *Vente réussie !*\nVous avez vendu ${quantite}x *${objet}* pour ${totalGain}🪙.`);
  }
);

// 🔄 Commande /échanger
zokou(
  { nomCom: 'echanger', reaction: '🔄', categorie: 'TRANSACT' },
  async (origineMessage, zk, commandeOptions) => {
    const { args, repondre } = commandeOptions;
    if (args.length < 2) return await repondre("❌ Usage : /echanger [montant] [type]");

    const [montantStr, type] = args;
    const montant = parseInt(montantStr, 10);
    if (isNaN(montant) || montant <= 0) return await repondre("❌ Montant invalide.");

    const taux = 0.9;
    const montantFinal = Math.floor(montant * taux);

    await repondre(`✅ *Échange effectué !*\n${montant} ${type} → ${montantFinal} convertis après taxe.`);
  }
);

// 🎫 Commande /coupons
zokou(
  { nomCom: 'coupons', reaction: '🎫', categorie: 'TRANSACT' },
  async (origineMessage, zk, commandeOptions) => {
    const { args, repondre } = commandeOptions;
    if (args.length < 2) return await repondre("❌ Usage : /coupons [montant] [monnaie]");

    const [montantStr, monnaie] = args;
    const montant = parseInt(montantStr, 10);
    if (isNaN(montant) || montant <= 0) return await repondre("❌ Montant invalide.");

    const taux = monnaie === "🪙" ? 0.01 : 0.1;
    const couponsObtenus = montant * taux;

    await repondre(`✅ *Conversion réussie !*\n${montant}${monnaie} → ${couponsObtenus}🎫.`);
  }
);

// 🎰 Commande /casino
zokou(
  { nomCom: 'casino', reaction: '🎰', categorie: 'TRANSACT' },
  async (origineMessage, zk, commandeOptions) => {
    const { args, repondre } = commandeOptions;
    if (args.length < 2) return await repondre("❌ Usage : /casino [jeu] [mise]");

    const [jeu, miseStr] = args;
    const mise = parseInt(miseStr, 10);
    if (isNaN(mise) || mise <= 0) return await repondre("❌ Mise invalide.");

    const gain = Math.random() < 0.5 ? mise * 2 : 0;
    await repondre(`🎲 *Résultat du Casino (${jeu})*\nMise : ${mise}🪙\n${gain > 0 ? `Gagné : ${gain}🪙` : "Perdu !"}`);
  }
);