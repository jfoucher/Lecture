import allMedia from './allMedia';

const words = [
    'Lune', 'Citron', 'Ananas', 'Tomate', 'Banane', 'Dé', 'Balle', 'Moto', 'Île', 'Souris', 'Vache', 'Tortue', 'Coq', 'Volcan', 'Parapluie', 'Ver de terre', 'Lion', 'Chat', 'Girafe', 'Zèbre', 'Grenouille', 'Papillon', 'Cheval', 'Terre', 'Cactus', 'Piment', 'Citron', 'Pomme', 'Poire', 'Chocolat', 'Bonbon', 'Café','Fleur', 'Feuille', 'Feutre', 'Lion', 'Chat', 'Girafe', 'Zèbre', 'Grenouille', 'Papillon', 'Cheval', 'Terre', 'Soleil', 'Cactus', 'Piment', 'Citron', 'Serpent', 'Vache', 'Biberon', 'Bonbon', 'Abeille', 'Chien', 'Chameau', 'Ancre', 'Avion'
];

const media = allMedia.map((el) => {
    if(typeof el.difficulty !== undefined) {
        words.push(el.correctWord);
    }
    el.priority = Math.round(Math.abs(Math.random() * 200)) /100;
    el.errors = 0;
    return el;
});

var data = {
    words : words.filter((w, i, self) => {
        return self.indexOf(w) === i;
    }),
    media,
    endlevel: {
        noErrors: {
            image: allMedia[103],
            text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
            buttonText: "Aller au niveau 2",
        },
        fewErrors: {
            image: allMedia[119],
            text: "Pas mal, tu as fait %%n%%",
            buttonText: "Aller au niveau 2",
        },
        lotErrors: {
            image: allMedia[118],
            text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
            buttonText: "Recommencer",
        }
    },
    
    endgame: {
        noErrors: {
            image: allMedia[103],
            text: "Bravo, tu as fait un sans-faute !! Je suis impressionné !",
        },
        fewErrors: {
            image: allMedia[119],
            text: "Pas mal, tu as fait %%n%%",
        },
        lotErrors: {
            image: allMedia[118],
            text: "Dommage, tu as fait %%n%%. Réessaie si tu veux",
        },

    }
}

export default data;