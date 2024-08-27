const { zokou } = require('../framework/zokou');

const generateRandomNumbers = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
};

const generateRewards = () => {
  const rewards = ['1.000💎', '10.000🧭', '10💳', '1🎭', '1🎁', null, null, null, null, null];
  return rewards.sort(() => 0.5 - Math.random());
};

// Suivi des parties en cours pour chaque joueur
const ongoingGames = {};

zokou(
  {
    nomCom: 'roue',
    reaction: '🎰',
    categorie: 'SRPC_GAMES🎰'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage, auteurMsgRepondu, msgRepondu, arg } = commandeOptions;
    try {
      if (ongoingGames[auteurMessage]) {
        await zk.sendMessage(origineMessage, { text: 'Votre précédente partie a été annulée.' });
        delete ongoingGames[auteurMessage];
      }

      ongoingGames[auteurMessage] = { status: 'started' };

      let numbers = generateRandomNumbers(0, 50, 10);
      let rewards = generateRewards();
      let liena = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
      let msga = `*🎰𝗧𝗘𝗡𝗧𝗘𝗭 𝗩𝗢𝗧𝗥𝗘 𝗖𝗛𝗔𝗡𝗖𝗘🥳 !!*
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉
jouez à la roulette des chiffres et obtenez une récompense pour le bon numéro que vous choisissez parmi les *🔟*. *⚠️vous n'avez que 2 chances et pour jouer:  2🔶 où 2🔷*
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊▔▔🎊▔🎊▔🎊▔🎊▔🎊▔▔
${numbers.join(', ')}
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊▔▔🎊▔🎊▔🎊▔🎊▔🎊▔▔
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉

*🎊Voulez vous tenter votre chance ?*
✅: \`Oui\`
❌: \`Non\``;

      await zk.sendMessage(origineMessage, { image: { url: liena }, caption: msga }, { quoted: ms });

      const getConfirmation = async () => {
        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let response;
        try {
          response = rep.message.extendedTextMessage.text;
        } catch {
          response = rep.message.conversation;
        }

        if (response.toLowerCase() === 'oui') {
          return true;
        } else if (response.toLowerCase() === 'non') {
          return false;
        } else {
          await repondre('Veuillez répondre par Oui ou Non.');
          return await getConfirmation();
        }
      };

      if (!(await getConfirmation())) {
        delete ongoingGames[auteurMessage];
        return repondre('Jeu annulé. À la prochaine !');
      }

      const getChosenNumber = async () => {
        let msgb = '🎊😃: *Choisissez un numéro vous avez 1min⚠️*(Répondre à ce message)';
        let lienb = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
        await zk.sendMessage(origineMessage, { image: { url: lienb }, caption: msgb }, { quoted: ms });

        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let chosenNumber;
        try {
          chosenNumber = rep.message.extendedTextMessage.text;
        } catch {
          chosenNumber = rep.message.conversation;
        }

        chosenNumber = parseInt(chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
          await repondre('Veuillez choisir un des numéros proposés.');
          return await getChosenNumber();
        }

        return chosenNumber;
      };

      const getChosenNumberchance = async () => {
        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let chosenNumber;
        try {
          chosenNumber = rep.message.extendedTextMessage.text;
        } catch {
          chosenNumber = rep.message.conversation;
        }

        chosenNumber = parseInt(chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
          await repondre('Veuillez choisir un des numéros proposés.');
          return await getChosenNumber();
        }

        return chosenNumber;
      };

      let chosenNumber = await getChosenNumber();
      let reward = rewards[numbers.indexOf(chosenNumber)];

      if (reward) {
        let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
        let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg';
        await zk.sendMessage(origineMessage, { image: { url: lienc }, caption: msgc }, { quoted: ms });
      } else {
        delete ongoingGames[auteurMessage];
        await repondre('Vous avez une deuxième chance ! Choisissez un autre numéro.');
        chosenNumber = await getChosenNumberchance();
        reward = rewards[numbers.indexOf(chosenNumber)];

        if (reward) {
          let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
          let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg';
          await zk.sendMessage(origineMessage, { image: { url: lienc }, caption: msgc }, { quoted: ms });
        } else {
          let msgd = `😫😖💔 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬❌NON ! C'était le mauvais numéro ! Dommage tu y étais presque💔▭▬▭▬▭▬▭▬▭▬▭▬▭▬😫😖💔`;
          let liend = 'https://telegra.ph/file/222cefbcd18ba50012d05.jpg';
          await zk.sendMessage(origineMessage, { image: { url: liend }, caption: msgd }, { quoted: ms });
        }
      }

      delete ongoingGames[auteurMessage]; // Fin de la partie
    } catch (error) {
      console.error("Erreur lors du jeu de roulette:", error);
      repondre('Une erreur est survenue. Veuillez réessayer.');
    }
  }
);