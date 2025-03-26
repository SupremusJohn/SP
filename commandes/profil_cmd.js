const { zokou } = require('../framework/zokou');
const { getVerdictByKeyword, updateVerdict } = require('../bdd/profil_bdd');

zokou(
    {
        nomCom: 'profil',
        categorie: 'CENTRAL'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser } = commandeOptions;

        const emojimap = {
    'Player1': 'Player1', 
    'Player2': 'Player2',    
    'Player3': 'Player3',    
    'Player4': 'Player4',    
    'Player5': 'Player5',    
    'Player6': 'Player6',   
    'Player7': 'Player7',    
    'Player8': 'Player8',   
    'Player9': 'Player9',   
    'Player10': 'Player10'
            // Ajouter d'autres joueurs et identifiant ici
        };

        try {
            const message = arg.join(' ');

            // Cherche si le message contient un identifiant
            let found = false;
            for (const [emoji, motCle] of Object.entries(emojimap)) {
                if (message.includes(emoji)) {
                    found = true;

                    // Récupérer la fiche pour cet identifiant 
                    const verdictData = await getVerdictByKeyword(motCle);
                    if (verdictData) {
                        const { verdict, image_url } = verdictData;
                        if (image_url) {
                            await zk.sendMessage(dest, { image: { url: image_url }, caption: verdict }, { quoted: ms });
                        } else {
                            repondre(verdict);
                        }
                    } else {
                        repondre(`*🛃 Aucun profile trouvée pour ce joueur.*`);
                    }
                    break;
                }
            }

            if (!found) {
                repondre("Profile *${motCle}* gelé où en cour d'actualisation.");
            }
        } catch (error) {
            console.log("Erreur lors du traitement de la commande verdict : " + error);
            repondre("Une erreur est survenue. Veuillez réessayer.");
        }
    }
);


zokou(
    {
        nomCom: 'update',
        categorie: 'CENTRAL',
    }, async (dest, zk, commandeOptions) => {
        const { arg, repondre, superUser } = commandeOptions;

        if (!superUser) {
            return repondre("Commande réservée aux *⚖️SPEED MASTER🪀*.");
        }

        try {
            const [motCle, verdict, imageUrl, etat] = arg.join(' ').split(';');

            if (motCle && verdict && etat) {
                await updateVerdict(motCle, verdict, imageUrl, etat);
                repondre(`Verdict pour '${motCle}' mis à jour avec succès.`);
            } else {
                repondre("Format incorrect. Utilisez: -${nomCom} motCle;verdict;imageUrl;normal");
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour du verdict : " + error);
            repondre("Une erreur est survenue. Veuillez réessayer.");
        }
    }
);