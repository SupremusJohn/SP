const { zokou } = require('../framework/zokou');
const { characters } = require('../commandes/catalogue');
const { writeFileSync, readFileSync, unlinkSync } = require('fs');
const { randomInt } = require('crypto');

/**
 * Fonction pour envoyer l'image et les informations d'un personnage spécifique.
 */
async function envoyerCarte(dest, zk, ms, personnage) {
    let personnageTrouve = false;
    const personnageUpper = personnage.toUpperCase();

    for (const [rang, univers] of Object.entries(characters)) {
        for (const [verse, personnages] of Object.entries(univers)) {
            if (personnages[personnageUpper]) {
                personnageTrouve = true;
                const { lien } = personnages[personnageUpper];

                zk.sendMessage(dest, { 
                    image: { url: lien }, 
                    caption: `*${personnageUpper} | ${verse} | RANG ${rang}*` 
                }, { quoted: ms });

                return;
            }
        }
    }

    if (!personnageTrouve) {
        zk.sendMessage(dest, { text: `*❌ Personnage ${personnage} indisponible.*` }, { quoted: ms });
    }
}

/**
 * Fonction pour envoyer la liste complète des personnages disponibles en document HTML.
 */
async function envoyerListe(dest, zk, ms) {
    let html = `
   <html>
     <head>
      <meta charset="UTF-8">
        <title>Catalogue ABM - SRPN</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Bebas Neue', Arial, sans-serif;
      background: url('https://i.ibb.co/ycJLcFn6/Image-2025-03-17-00-21-51-2.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #f1f1f1;
      padding: 10px;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    }
    h1, h2, h3, h4 {
  text-align: center;
   }
    h5, ul, li {
  text-align: left;
   }
    h1 {
      font-size: 36px;
      color: #f39c12;
      margin: 20px 0;
    }
    h2 {
      font-size: 28px;
      color: #3498db;
      border-bottom: 2px solid #f39c12;
      padding-bottom: 5px;
      margin-top: 30px;
    }
    h3 {
      font-size: 24px;
      color: #e74c3c;
      margin-top: 20px;
    }
    h4 {
      font-size: 22px;
      color: #1abc9c;
      margin-top: 20px;
    }
    h5 {
      font-size: 20px;
      color: #9b59b6;
      margin-top: 10px;
    }
    ul {
      list-style: none;
      padding-left: 0;
      text-align: center;
    }
    li {
      margin-bottom: 6px;
      font-size: 16px;
      line-height: 1.4;
      position: relative;
    }
    li::before {
      content: "- ";
      color: #f1c40f;
      font-size: 14px;
    }
        </style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    </head>
  <body>
  <h1>🆚 CATALOGUE ABM 🆚</h1>
    `;

    for (const [rang, univers] of Object.entries(characters)) {
        html += `<h4>🏅 RANG ${rang} 🏅</h4>`;
        for (const [verse, personnages] of Object.entries(univers)) {
            html += `<h5>🌐 ${verse}</h5><ul>`;
            for (const nom of Object.keys(personnages)) {
                html += `<li>${nom}</li>`;
            }
            html += `</ul>`;
        }
    }

    html += `</body></html>`;

    const filename = `catalogue_${randomInt(10000)}.html`;
    writeFileSync(filename, html);

    await zk.sendMessage(dest, {
        document: readFileSync(filename),
        mimetype: 'text/html',
        filename: 'catalogue.html',
        caption: '*🆚 ABM : CATALOGUE DES HÉROS 🆚*'
    }, { quoted: ms });

    unlinkSync(filename);
}

/**
 * Fonction pour sélectionner un personnage aléatoire.
 */
async function personnageAleatoire(dest, zk, ms, rang = null, verse = null) {
    let personnagesFiltres = [];

    for (const [r, univers] of Object.entries(characters)) {
        if (rang && r !== rang.toUpperCase()) continue;
        for (const [v, personnages] of Object.entries(univers)) {
            if (verse && v !== verse.toUpperCase()) continue;
            for (const [nom, data] of Object.entries(personnages)) {
                personnagesFiltres.push({ nom, verse: v, rang: r, lien: data.lien });
            }
        }
    }

    if (personnagesFiltres.length === 0) {
        zk.sendMessage(dest, { text: 'Aucun personnage trouvé avec ces critères.' }, { quoted: ms });
        return;
    }

    const randomPerso = personnagesFiltres[Math.floor(Math.random() * personnagesFiltres.length)];

    zk.sendMessage(dest, { 
        image: { url: randomPerso.lien }, 
        caption: `*${randomPerso.nom} | ${randomPerso.verse} | RANG ${randomPerso.rang}*` 
    }, { quoted: ms });
}

// Commande principale
zokou(
    {
        nomCom: 'heroes',
        categorie: 'ABM'
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            await envoyerListe(dest, zk, ms);
        } else if (arg[0].toUpperCase() === 'RANDOM') {
            const rang = arg[1] ? arg[1].toUpperCase() : null;
            const verse = arg[2] ? arg[2].toUpperCase() : null;
            await personnageAleatoire(dest, zk, ms, rang, verse);
        } else {
            await envoyerCarte(dest, zk, ms, arg[0]);
        }
    }
);
