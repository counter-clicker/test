// Dit script wordt uitgevoerd zodra de pagina geladen is.
console.log("Hallo Wereld! De website is geladen.");

// Een voorbeeld van interactiviteit: een begroeting op basis van het tijdstip.
function geefBegroeting() {
    const now = new Date();
    const hour = now.getHours();
    let begroeting;

    if (hour < 12) {
        begroeting = "Goedemorgen!";
    } else if (hour < 18) {
        begroeting = "Goedemiddag!";
    } else {
        begroeting = "Goedenavond!";
    }

    // Voeg de begroeting toe aan de header (optioneel)
    const header = document.querySelector('header p');
    if(header) {
        header.innerHTML = begroeting + ' ' + header.innerHTML;
    }
}

// Roep de functie aan
geefBegroeting();
