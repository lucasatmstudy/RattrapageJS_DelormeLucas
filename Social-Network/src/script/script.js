//FONCTIONS

//Création d'une fonction asynchrone permetant de créer un tableau (array) utilisable en JS depuis le fichier json contenu dans le dossier script
async function fetchJSON() {
    const url = "./src/script/profils.json"; //chemin d'accès
    try {                                    //vérification d'erreur
        const reponse = await fetch(url);   //await attend d'avoir la réponse pour continuer la lecture du code
        if (!reponse.ok) {                  //vérifie si la réponse N'est PAS ok
            throw new Error(`Statut de réponse : ${reponse.status}`); //stop la fonction et envoie une erreur N'est PAS ok est vrai
        }
        const resultat = await reponse.json(); //tout va bien, création de la constante, un tableau conprensible en JS du fichier json
        return resultat  // retouner le resultat pour pouvoir l'utiliser en dehors de la fonction et met fin à la fonction
    } catch (erreur) {  //il y a un erreur, catch s'active si il y a une erreur au moment du try
            console.error(erreur.message); // affiche l'erreur dans la console
    }
}

// Cette fonction créer une balise HTML de type article en y ajouter une class pour un profil humain
// Elle créer également des balises enfants à article
// Cette fonction est dépendante d'autre fonction
// Notament de la fonction fetchJSON() pour lire les objets du tableau créer
// si l'objet "type" corresponds à "humain" elle sera appelée par la fonction profil() dans la fonction launch()
function cardHuman (profil) {
    const articleTemplate = document.createElement('article'); // création d'une balise <article>
    const nameTemplate = document.createElement('h2'); // création d'une balise <h2>
    nameTemplate.innerText = profil.name; //récupération de l'objet name pour la constante précedente
    const imgTemplate = document.createElement('img'); // création d'une balise <img>
    imgTemplate.src = profil.avatar; //récupération de l'objet avatar, lien vers les images dans src/img pour la constante précedente
    imgTemplate.alt = `Portrait de : ${profil.name}`; //ajout de l'attribut alt pour l'accessibilité pour la constante précedente
    const ageEmailTemplate = document.createElement('p'); // création d'une balise <p>
    ageEmailTemplate.innerText = `${profil.age} ans -  ${profil.email}`; //récupération de plusieurs objets grace à une chaine de carractère pour la constante précedente
    articleTemplate.appendChild(nameTemplate); //ajout des éléments dans articleTemplate (balise <article>) dans cette ordre precis
    articleTemplate.appendChild(imgTemplate); //ajout des éléments dans cette ordre precis
    articleTemplate.appendChild(ageEmailTemplate); //ajout des éléments dans cette ordre precis
    articleTemplate.classList.add('card') // ajout de la class=card à la constante articleTemplate (balise <article>)
    return articleTemplate; // retouner le resultat pour pouvoir utiliser en dehors de la fonction et met fin à la fonction
}

// Cette fonction suit la même logique que la fonction cardHuman mais pour un profil Pet (animal de compagnie)
function cardPet (profil) {
    const articleTemplate = document.createElement('article');
    const nameTemplate = document.createElement('h2');
    nameTemplate.innerText = profil.name;
    const imgTemplate = document.createElement('img');
    imgTemplate.src = profil.avatar;
    imgTemplate.alt = `Portrait de : ${profil.name}`;
    const ageEspeceTemplate = document.createElement('p');
    ageEspeceTemplate.innerText = `${profil.age} ans -  ${profil.espece} - Propriétaire : ${profil.propriétaire}`;
    articleTemplate.appendChild(nameTemplate);
    articleTemplate.appendChild(imgTemplate);
    articleTemplate.appendChild(ageEspeceTemplate);
    articleTemplate.classList.add('card')
    return articleTemplate;
}

// Cette fonction suit la même logique que la fonction cardHuman mais pour un profil Xeno
function cardXeno (profil) {
    const articleTemplate = document.createElement('article');
    const nameTemplate = document.createElement('h2');
    nameTemplate.innerText = profil.name;
    const imgTemplate = document.createElement('img');
    imgTemplate.src = profil.avatar;
    imgTemplate.alt = `Portrait de : ${profil.name}`;
    const ageMenaceTemplate = document.createElement('p');
    ageMenaceTemplate.innerText = `${profil.age} ans - ${profil.espece} - Menace : ${profil.menace}`;
    articleTemplate.appendChild(nameTemplate);
    articleTemplate.appendChild(imgTemplate);
    articleTemplate.appendChild(ageMenaceTemplate);
    articleTemplate.classList.add('card')
    return articleTemplate;
}

//Fonction qui créer un tableau et utilisant les fonctions précédentes selon la valeur d'un objet 
function profil(tableauProfil) {
    const cardList = []; //création d'une constante de type tableau
        tableauProfil.forEach(element => { //création d'une boucle pour lire chaque elements du tableau
            if (element.type === "humain") { //Appel d'une fonction spécifique si la condition element.type === "humain" est rempli
                cardList.push(cardHuman(element));//Ajoute le résultat de la fonction dans la constant tableau cardList
            }
            else if (element.type === "animal de compagnie") { //Appel d'une fonction spécifique si la condition element.type === "animal de compagnie" est rempli
                cardList.push(cardPet(element));//Ajoute le résultat de la fonction dans la constant tableau cardList
            }
            else if (element.type === "Xeno") { //Appel d'une fonction spécifique si la condition element.type === "Xeno" est rempli
                cardList.push(cardXeno(element));//Ajoute le résultat de la fonction dans la constant tableau cardList
            }
            else { //Gesiton d'erreur si aucune des conditions précédentes n'est rempli 
            console.log("Type de Profil non Existant") //Afficher dans la console un message si aucune des conditions précédentes n'est rempli
            }
            });
    return cardList; // retouner le resultat pour pouvoir l'utiliser en dehors de la fonction et met fin à la fonction
}

//Fonction qui ajoute les card dans la balise ayant la class=profils
function profilAll(tousProfils) {
    const profils = document.querySelector(".profils"); //Création d'une constante pour cibler la balise avec la class=profils
    const cardList = profil(tousProfils); //création d'une constante pour utiliser le resultat de la fonction profil
    cardList.forEach (card => { //Boucle qui ajoute chaque element de la constant cardList(le tableau) à la constante profils (la balise)
        profils.appendChild(card);
    });
    return profils; // retouner le resultat pour pouvoir l'utiliser en dehors de la fonction et met fin à la fonction
}

//FONCTION LAUNCH()
async function launch (map) { //Fonction asynchrone général qui lance toutes les fonctionne précédent
    try {
        const tabData = await fetchJSON(); //constante pour récupérer le tableau json et attente de la réponse
        if (!tabData) { //vérifie l'existance de tabData
            throw new Error(`Données de profil absente`); //Si tabData n'existe pas, stop la fonction et envoie une erreur
        }
        profilAll(tabData);     //appel de la fonction profilAll
        tabData.forEach(element => { //fonction boucle qui créer les marqueur
            const ICON = L.icon ({ //création de l'icon du marker avec ses options
                iconUrl: element.icon, //option d'image de l'icon
                iconSize: [50, 83], //option de taille de l'icon
                iconAnchor: [25, 83] //option de position de l'icon
            })
            const marker = L.marker ([element.latitude, element.longitude], {icon: ICON}).addTo(map); //création du marker et ajout des option
        })
    } catch (erreur) { //il y a un erreur, catch s'active si il y a une erreur au moment du try
            console.error(erreur.message); // affiche l'erreur dans la console
    }
}

//LEAFLET
const map = L.map('map').setView([43.604429, 1.443812], 14); //initialisation de la carte avec ses coordonées et son zoom 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { //ajout des tuiles depuis l'url openstreetmap
    maxZoom: 19, //niveau de zoom max
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' //mention legal - lien vers openstreetmap
}).addTo(map); //ajout de L.titelayer à la const map


//LE GRAND FINAL, appel de la fonction et ça fonctionne, GG !!!!
launch (map);

// J'ai beaucoup aimé l'exercice, mais cela ma pris du temps, je comprends la logique mais j'ai du mal à me souvenir des syntaxes.
// J'ai besoin d'en faire encore et encore pour que cela devienne automatique.
// Si vous avez d'autres évaluations ou exercices du même style, j'aimerais bien les avoir pour m'entraîner.