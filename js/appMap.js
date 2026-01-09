var map = L.map('map').setView([47.5, -0.8], 8); /*coordonnées de départ et niveau de zoom*/

/*Ajout des tuiles OpenStreetMap*/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 3. Charge JSON et ajoute TOUS les marqueurs
fetch('promo.json') 
    .then(response => response.json())
    .then(data => {
        data.apprenants.forEach(apprenant => {
            const lat = apprenant.latitude;
            const lng = apprenant.longitude;
            
            // Marqueur + popup personnalisé
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`
                    <b>${apprenant.nom} ${apprenant.prenom}</b><br>
                    📍 ${apprenant.ville}<br>
                    <small>${apprenant.anecdotes.join(', ')}</small>
                `);
        });
    })

    .catch(error => console.error('Erreur JSON:', error));

