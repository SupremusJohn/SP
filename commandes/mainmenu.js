const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "playermenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'Id-Player'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});

zokou({ nomCom: "Arenamenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'Arena'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});

zokou({ nomCom: "competmenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'Competition'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});

zokou({ nomCom: "crpsmenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'crps'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});

zokou({ nomCom: "origamymenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'Origamy-World'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});
                       
zokou({ nomCom: "transactmenu", categorie: "Mainmenu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭────✧${s.BOT}✧────◆*
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : Supremus Prod
*╰─────✧ SP BOT ✧─────◆* \n\n`;    

    // Spécifier la catégorie souhaitée
    const selectedCategory = 'Transact-Zone'; // Remplace 'General' par la catégorie que tu veux afficher

    let menuMsg = `
*List of commands in ${selectedCategory}:*
◇                             ◇
`;

    if (coms[selectedCategory]) {
        menuMsg += `*╭────❏ ${selectedCategory} ❏*`;
        for (const cmd of coms[selectedCategory]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`;
    } else {
        menuMsg += `
Aucune commande trouvée pour cette catégorie.`;
    }

    menuMsg += `
◇            ◇
     *[🪀 SUPREMUS PROD 🪀]*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++", gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});

