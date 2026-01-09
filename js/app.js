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
        Array.from(affichage).forEach(radio => {
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
    const listeContainer = document.getElementById('liste-container');
    const cartesContainer = document.getElementById('cartes-container');

    if (!listeContainer || !cartesContainer) return;
    
    if (format === 'liste') {
        listeContainer.classList.remove('d-none');
        cartesContainer.classList.add('d-none');
        afficherListe(apprenants);
    } else if (format === 'cartes') {
        listeContainer.classList.add('d-none');
        cartesContainer.classList.remove('d-none');
        afficherCartes(apprenants);
    }
}

function afficherListe(apprenants) {
    const tbody = document.getElementById('apprenants-table');
    tbody.innerHTML = '';

    apprenants.forEach(apprenant => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.ville}</td>
        <td><a href="#" class="btn btn-details btn-sm btn-outline-primary">Détail</a></td>
        `;
        tbody.appendChild(tr);
    });
}


function afficherCartes(apprenants) {
    const container = document.getElementById('cartes-container');
    container.innerHTML = ''; 
    
    apprenants.forEach(apprenant => {
        const carte = document.createElement('div');
        carte.className = 'carte';
        carte.innerHTML = `
            <h3>${apprenant.nom} ${apprenant.prenom}</h3>
            <p>Ville : ${apprenant.ville}</p>
            <a href="#" class="btn btn-details btn-sm btn-outline-primary">Détail</a>
        `;
        container.appendChild(carte);
    });
}

//=============Initialisation================//

function init() {
    appliquerPreferences();
    if (document.getElementById('apprenants-table')) {
    chargerApprenants();
    }

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


//=============Modal===================//







