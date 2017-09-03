import allMedia from './all'

var data = {
    level_1: {
        endlevel: {
            noErrors: {
                image: allMedia[103],
                text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
                buttonText: "Aller au niveau 2",
            },
            fewErrors: {
                image: allMedia[129],
                text: "Pas mal, tu as fait %%n%%",
                buttonText: "Aller au niveau 2",
            },
            lotErrors: {
                image: allMedia[127],
                text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
                buttonText: "Recommencer",
            }
        },
        words: ['Lune', 'Citron', 'Ananas', 'Tomate', 'Banane', 'Dé', 'Balle', 'Moto', 'Île', 'Souris', 'Vache', 'Tortue', 'Coq'],
        media: [
            allMedia[3],
            allMedia[13],
            allMedia[18],
            allMedia[19],
            allMedia[34],
            allMedia[46],
            allMedia[47],
            allMedia[68],
            allMedia[80],
            allMedia[51],
        ]
    },
    level_2: {
        endlevel: {

            noErrors: {
                image:  allMedia[103],
                text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
                buttonText: "Commencer le niveau 3",
            },
            fewErrors: {
                image: allMedia[129],
                text: "Pas mal, tu as fait %%n%%.",
                buttonText: "Commencer le niveau 3",
            },
            lotErrors: {
                image: allMedia[127],
                text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
                buttonText: "Recommencer",
            }
        },
        words: ['Volcan', 'Parapluie', 'Ver de terre', 'Lion', 'Chat', 'Girafe', 'Zèbre', 'Grenouille', 'Papillon', 'Cheval', 'Terre', 'Soleil', 'Cactus', 'Piment', 'Citron', 'Pomme', 'Poire', 'Chocolat', 'Bonbon', 'Café'],
        media: [
            allMedia[0],
            allMedia[1],
            allMedia[2],
            allMedia[4],
            allMedia[6],
            allMedia[7],
            allMedia[17],
            allMedia[20],
            allMedia[21],
            allMedia[25],
            allMedia[26],
            allMedia[139],
        ]
    },
    level_3: {
        endlevel: {

            noErrors: {
                image:  allMedia[103],
                text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
                buttonText: "Commencer le niveau 4",
            },
            fewErrors: {
                image: allMedia[129],
                text: "Pas mal, tu as fait %%n%%.",
                buttonText: "Recommencer",
            },
            lotErrors: {
                image: allMedia[127],
                text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
                buttonText: "Recommencer",
            }
        },
        words: ['Fleur', 'Feuille', 'Feutre', 'Lion', 'Chat', 'Girafe', 'Zèbre', 'Grenouille', 'Papillon', 'Cheval', 'Terre', 'Soleil', 'Cactus', 'Piment', 'Citron', 'Serpent', 'Vache', 'Biberon', 'Bonbon', 'Abeille', 'Chien', 'Chameau', 'Ancre', 'Avion'],
        media: [
            allMedia[9],
            allMedia[11],
            allMedia[17],
            allMedia[23],
            allMedia[26],
            allMedia[27],
            allMedia[40],
            allMedia[65],
            allMedia[67],
            allMedia[76],
            allMedia[84],
            allMedia[85],
            allMedia[137],
            allMedia[139],
        ]
    },
    level_4: {
        endlevel: {

            noErrors: {
                image:  allMedia[103],
                text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
                buttonText: "Commencer le niveau 4",
            },
            fewErrors: {
                image: allMedia[129],
                text: "Pas mal, tu as fait %%n%%.",
                buttonText: "Recommencer",
            },
            lotErrors: {
                image: allMedia[127],
                text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
                buttonText: "Recommencer",
            }
        },
        words: ['Fleur', 'Feuille', 'Feutre', 'Lion', 'Chat', 'Girafe', 'Zèbre', 'Grenouille', 'Papillon', 'Cheval', 'Terre', 'Soleil', 'Cactus', 'Piment', 'Citron', 'Serpent', 'Vache', 'Biberon', 'Bonbon', 'Abeille', 'Chien', 'Chameau', 'Ancre', 'Avion'],
        media: [
            allMedia[133],
            allMedia[134],
            allMedia[136],
            allMedia[139],
            allMedia[132],
            allMedia[130],
            allMedia[125],
            allMedia[124],
            allMedia[123],
            allMedia[122],
        ]
    },
    endgame: {
        noErrors: {
            image: allMedia[103],
            text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
        },
        fewErrors: {
            image: allMedia[129],
            text: "Pas mal, tu as fait %%n%%",
        },
        lotErrors: {
            image: allMedia[127],
            text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
        },

    }
}

export default data;