//=============Thème===================//
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
}

applyTheme(); 
window.addEventListener('storage', applyTheme); 

//=============Préférences utilisateur================//
function enregistrer() {
    const theme = document.getElementById('theme').value;
    const format = document.querySelector('input[name="affichage"]:checked').value;
    localStorage.setItem('theme', theme);
    localStorage.setItem('affichage', format);
    alert('Préférences enregistrées !');
    appliquerPreferences();
}

function appliquerPreferences() {
     // Appliquer le thème
    const theme = localStorage.getItem('theme');
    if (theme) {
        const themeElement = document.getElementById('theme');
        if (themeElement) {
            themeElement.value = theme;
        }
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
    // Appliquer le format d'affichage
    const format = localStorage.getItem('affichage');
    if (format) {
        const affichage = document.getElementsByName('affichage');
        affichage.forEach(radio => {
            radio.checked = (radio.value === format);
        });
    }
}

//=============Gestion des apprenants================//
function chargerApprenants() {
    fetch('promo.json')
    .then(response => response.json())
    .then(data => {
        const format = localStorage.getItem('affichage') || 'liste';
        afficherApprenants(data.apprenants, format);
    })
    .catch(error => console.error('Erreur lors du chargement :', error));
}

function afficherApprenants(apprenants, format) {
    const listeContainer = document.getElementById('apprenants');
    const cartesContainer = document.getElementById('cartes');

    if (!listeContainer || !cartesContainer) return;
    
    if (format === 'liste') {
        listeContainer.classList.remove('cache');
        cartesContainer.classList.remove('actif');
        afficherListe(apprenants);
    } else if (format === 'cartes') {
        listeContainer.classList.add('cache');
        cartesContainer.classList.add('actif');
        afficherCartes(apprenants);
    }
}

function afficherListe(apprenants) {
    const container = document.getElementById('apprenants');
    container.innerHTML = ''; // Vider l'ancienne liste
    
    apprenants.forEach(apprenant => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${apprenant.nom} ${apprenant.prenom}</h3>
            <p>Ville : ${apprenant.ville}</p>
            <a href="">Détails</a>
        `;
        container.appendChild(li);
    });
}

function afficherCartes(apprenants) {
    const container = document.getElementById('cartes');
    container.innerHTML = ''; // Vider
    
    apprenants.forEach(apprenant => {
        const carte = document.createElement('div');
        carte.className = 'carte';
        carte.innerHTML = `
            <h3>${apprenant.nom} ${apprenant.prenom}</h3>
            <p>Ville : ${apprenant.ville}</p>
            <a href="">Détails</a>
        `;
        container.appendChild(carte);
    });
}

//=============Initialisation================//

function init() {
    appliquerPreferences();
    chargerApprenants();

    // Écouter les changements des radios
    document.querySelectorAll('input[name="affichage"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const format = e.target.value;
            localStorage.setItem('affichage', format); // Sauvegarder
            chargerApprenants(); // Rafraîchir l'affichage
        });
    });
}

window.addEventListener('DOMContentLoaded', init)








