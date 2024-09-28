const { zokou } = require('../framework/zokou');
const { getVerdictByKeyword, updateVerdict } = require('../bdd/origamystory');

zokou(
    {
        nomCom: 'control_astoria',
        categorie: 'ORIGAMY'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser } = commandeOptions;

        const emojimap = {
            '⛩️': 'Porte Principale',
            '🛞': 'Transport Public',
            '🪦': 'Cimetière',
            '🌲': 'Bois Sacrés',
            '🏟️': 'Colisée d\'Aurelius',
            '🕳️': 'Arène Souterraine',
            '🏛️': 'Centre de Commandement',
            '🏹': 'Camp d\'Entraînement',
            '🎓': 'Académie d\'Arcana',
            '🏢': 'Caserne de la Garde',
            '🚧': 'Entrée Restreinte',
            '🛍️': 'Marché Central',
            '🍻': 'Luxury Taverne',
            '1️⃣': 'Chambre 1',
            '2️⃣': 'Chambre 2',
            '3️⃣': 'Chambre 3',
            '🥖': 'Baguette Dorée',
            '⚒️': 'Forge d\'Edward',
            '🎎': 'Grand Bazar',
            '🏤': 'Bureau des Missions',
            '🏦': 'Salle des Trésors',
            '🫧': 'Bains Public',
            '🏬': 'Galerie des Arts',
            '📚': 'Grande Bibliothèque',
            '🏥': 'Centre Médical',
            '⚗️': 'Laboratoire d\'Oris',
            '🏘️': 'Quartier Résidentiel',
            '🎮': 'Salle des Jeux',
            '🛀': 'Bains Royaux',
            '🏡': 'Résidences Nobles',
            '🚪': 'Entrée Privée',
            '🧵': 'Nobles Couture',
            '⛲': 'Cour d\'Honneur',
            '🏰': 'Palais Royal',
            '🪴': 'Jardins Privés',
            '🏯': 'Hall des Gardiens',
            '⚱️': 'Oubliettes',
            '🐎': 'Écuries Royales',
            '🔭': 'Tour Astral',
            '🗡️': 'Arsenal Royaux',
            '🗺️': 'Carte Astoria'
            // Ajouter d'autres émojis et mots-clés ici si nécessaire
        };

        try {
            const message = arg.join(' ');

            // Cherche si le message contient un emoji
            let found = false;
            for (const [emoji, lieu] of Object.entries(emojimap)) {
                if (message.includes(emoji)) {
                    found = true;

                    // Récupérer le verdict pour ce lieu
                    const verdictData = await getVerdictByKeyword(lieu);
                    if (verdictData) {
                        const { verdict, image_url } = verdictData;
                        if (image_url) {
                            await zk.sendMessage(dest, { image: { url: image_url }, caption: verdict }, { quoted: ms });
                        } else {
                            repondre(verdict);
                        }
                    } else {
                        repondre(`*♼ Chargement...*\nAucun verdict trouver pour *${lieu}*`);
                    }
                    break;
                }
            }

            if (!found) {
                repondre("♼ *Next...*");
            }
        } catch (error) {
            console.log("Erreur lors du traitement de la commande : " + error);
            repondre("Une erreur est survenue. Veuillez réessayer.");
        }
    }
);

zokou(
    {
        nomCom: 'astoria_master',
        categorie: 'DRPN',
    }, async (dest, zk, commandeOptions) => {
        const { arg, repondre, superUser } = commandeOptions;

        if (!superUser) {
            return repondre("Commande réservée aux *🌐STORY MASTER🎭*.");
        }

        try {
            const [motCle, verdict, imageUrl, etat] = arg.join(' ').split(';');

            if (motCle && verdict && etat) {
                await updateVerdict(motCle, verdict, imageUrl, etat);
                repondre(`Verdict pour '${motCle}' mis à jour avec succès.`);
            } else {
                repondre("*Format incorrect.*\n*Utilisez:*  -astoria_master motCle;verdict;imageUrl;normal");
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour du verdict : " + error);
            repondre("Une erreur est survenue. Veuillez réessayer.");
        }
    }
);