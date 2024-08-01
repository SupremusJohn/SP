const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/elysiumfiche');
const s = require("../set");

const dbUrl = s.SPDB;

zokou(
  {
    nomCom: 'tempest',
    categorie: 'Update'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('1');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `*💠Ξ𝗟𝗬𝗦𝗜𝗨𝗠𝟮𝟭𝟲𝟮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⬕ *🎮Pseudo*: TEMPEST🥉
⬕ *👤User*: ${data.e1}
⬕ *🌐Cyber capacité*: ${data.e2}
⬕ *💠Ξcoins*: ${data.e3}💠
⬕ *🌟SP*: ${data.e4}
⬕ *🎮Game Pass*: ${data.e5} *EP*
═══════════
         *◢❮❮❮ 🌐𝗦𝗞𝗜𝗟𝗟𝗦🌐 ❯❯❯❯◣*
 *⬕🌍Exploration🥉*: ${data.e6}    *⚙️Crafting🥉*: ${data.e7}
 *👊🏼Combat🥉*: ${data.e8}       *🛞Conduite🥉*: ${data.e9}

          *◢❮❮❮ 🌐𝗦𝗧𝗔𝗧𝗦🌐 ❯❯❯❯◣*
🙂: ${data.e10}%  ❤️: ${data.e11}% 💠: ${data.e12}% 🫀: ${data.e13}%
═══════════
*🎒𝗜𝗻𝘃𝗲𝗻𝘁𝗮𝗶𝗿𝗲:(7Max)*
▪${data.e14}

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     *⏧⎔𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗜𝗻 𝗣𝗿𝗼𝗰𝗲𝘀𝘀♻️...*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/b1ce60fe6773ead61d34d.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
        //const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
         switch (joueur) {
    case "Tempest":
      colonnesJoueur = {
        user: "e1",
        capacité: "e2",
        ecoins: "e3",
        sp: "e4",
        game_pass: "e5",
        exploration: "e6",
        crafting: "e7",
        combat: "e8",
        conduite: "e9",
        moral: "e10",
        life: "e11",
        voïd: "e12",
        sta: "e13",
        inventaire: "e14",
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE elysiumfiche SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 1`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE elysiumfiche
            SET ${colonneObjet} = $1
            WHERE id = 1
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'white',
    categorie: 'Update'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('2');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `*💠Ξ𝗟𝗬𝗦𝗜𝗨𝗠𝟮𝟭𝟲𝟮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⬕ *🎮Pseudo*: Black SHADOW🥉
⬕ *👤User*: ${data.e1}
⬕ *🌐Cyber capacité*: ${data.e2}
⬕ *💠Ξcoins*: ${data.e3}💠
⬕ *🌟SP*: ${data.e4}
⬕ *🎮Game Pass*: ${data.e5} *EP*
═══════════
         *◢❮❮❮ 🌐𝗦𝗞𝗜𝗟𝗟𝗦🌐 ❯❯❯❯◣*
 *⬕🌍Exploration🥉*: ${data.e6}    *⚙️Crafting🥉*: ${data.e7}
 *👊🏼Combat🥉*: ${data.e8}       *🛞Conduite🥉*: ${data.e9}

          *◢❮❮❮ 🌐𝗦𝗧𝗔𝗧𝗦🌐 ❯❯❯❯◣*
🙂: ${data.e10}%  ❤️: ${data.e11}% 💠: ${data.e12}% 🫀: ${data.e13}%
═══════════
*🎒𝗜𝗻𝘃𝗲𝗻𝘁𝗮𝗶𝗿𝗲:(7Max)*
▪${data.e14}

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     *⏧⎔𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗜𝗻 𝗣𝗿𝗼𝗰𝗲𝘀𝘀♻️...*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/cb41309bdc49965c72c0f.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
        //const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
         switch (joueur) {
    case "White":
      colonnesJoueur = {
        user: "e1",
        capacité: "e2",
        ecoins: "e3",
        sp: "e4",
        game_pass: "e5",
        exploration: "e6",
        crafting: "e7",
        combat: "e8",
        conduite: "e9",
        moral: "e10",
        life: "e11",
        voïd: "e12",
        sta: "e13",
        inventaire: "e14",
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE elysiumfiche SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 2`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE elysiumfiche
            SET ${colonneObjet} = $1
            WHERE id = 2
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'covid',
    categorie: 'Update'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('3');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `*💠Ξ𝗟𝗬𝗦𝗜𝗨𝗠𝟮𝟭𝟲𝟮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⬕ *🎮Pseudo*: Baxcon JONES🥉
⬕ *👤User*: ${data.e1}
⬕ *🌐Cyber capacité*: ${data.e2}
⬕ *💠Ξcoins*: ${data.e3}💠
⬕ *🌟SP*: ${data.e4}
⬕ *🎮Game Pass*: ${data.e5} *EP*
═══════════
         *◢❮❮❮ 🌐𝗦𝗞𝗜𝗟𝗟𝗦🌐 ❯❯❯❯◣*
 *⬕🌍Exploration🥉*: ${data.e6}    *⚙️Crafting🥉*: ${data.e7}
 *👊🏼Combat🥉*: ${data.e8}       *🛞Conduite🥉*: ${data.e9}

          *◢❮❮❮ 🌐𝗦𝗧𝗔𝗧𝗦🌐 ❯❯❯❯◣*
🙂: ${data.e10}%  ❤️: ${data.e11}% 💠: ${data.e12}% 🫀: ${data.e13}%
═══════════
*🎒𝗜𝗻𝘃𝗲𝗻𝘁𝗮𝗶𝗿𝗲:(7Max)*
▪${data.e14}

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     *⏧⎔𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗜𝗻 𝗣𝗿𝗼𝗰𝗲𝘀𝘀♻️...*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/a2d21055fdc74f1886882.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
      //  const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
         switch (joueur) {
    case "Covid":
      colonnesJoueur = {
        user: "e1",
        capacité: "e2",
        ecoins: "e3",
        sp: "e4",
        game_pass: "e5",
        exploration: "e6",
        crafting: "e7",
        combat: "e8",
        conduite: "e9",
        moral: "e10",
        life: "e11",
        voïd: "e12",
        sta: "e13",
        inventaire: "e14",
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE elysiumfiche SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 3`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE elysiumfiche
            SET ${colonneObjet} = $1
            WHERE id = 3
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'ainz',
    categorie: 'Update'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('4');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `*💠Ξ𝗟𝗬𝗦𝗜𝗨𝗠𝟮𝟭𝟲𝟮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⬕ *🎮Pseudo*: John AINZ🥉
⬕ *👤User*: ${data.e1}
⬕ *🌐Cyber capacité*: ${data.e2}
⬕ *💠Ξcoins*: ${data.e3}💠
⬕ *🌟SP*: ${data.e4}
⬕ *🎮Game Pass*: ${data.e5} *EP*
═══════════
         *◢❮❮❮ 🌐𝗦𝗞𝗜𝗟𝗟𝗦🌐 ❯❯❯❯◣*
 *⬕🌍Exploration🥉*: ${data.e6}    *⚙️Crafting🥉*: ${data.e7}
 *👊🏼Combat🥉*: ${data.e8}       *🛞Conduite🥉*: ${data.e9}

          *◢❮❮❮ 🌐𝗦𝗧𝗔𝗧𝗦🌐 ❯❯❯❯◣*
🙂: ${data.e10}%  ❤️: ${data.e11}% 💠: ${data.e12}% 🫀: ${data.e13}%
═══════════
*🎒𝗜𝗻𝘃𝗲𝗻𝘁𝗮𝗶𝗿𝗲:(7Max)*
▪${data.e14}

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     *⏧⎔𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗜𝗻 𝗣𝗿𝗼𝗰𝗲𝘀𝘀♻️...*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/5ce67173e0c6d7eed8673.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
      //  const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
         switch (joueur) {
    case "Ainz":
      colonnesJoueur = {
        user: "e1",
        capacité: "e2",
        ecoins: "e3",
        sp: "e4",
        game_pass: "e5",
        exploration: "e6",
        crafting: "e7",
        combat: "e8",
        conduite: "e9",
        moral: "e10",
        life: "e11",
        voïd: "e12",
        sta: "e13",
        inventaire: "e14",
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE elysiumfiche SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 4`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE elysiumfiche
            SET ${colonneObjet} = $1
            WHERE id = 4
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });
