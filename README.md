# TechStreetArt

Et juleprojekt hvor hele klassen samarbejder om at skabe en interaktiv guide til Aalborgs Streetart. Gennem denne app vil brugere kunne gå på opdagelse i Aalborgs to mest farverige og sprudlende street art lokationer. De vil også kunne finde vej dertil, samt læse om de to lokationer, hvilke kunstnere de vil kunne opleve og

# Projektet indeholder

### Forside:

- TechCollege Aalborg Streetart Logo
- Velkomst tekst og kort teaser
- Link til hovedsiden

### Hovedside:

- Oversigt over destinationer
- Tekst i sektioner der beskriver hver destination
- Link til Find lokation funktionalitet med AR destinations markers
- Link til “Levende streetart“ (kunst i kunsten med kreativ kodning)
- Link til galleri siden

### Footer:

- Teknologier benyttet,
- Kreditering
- TechCollege logo + adresse
- Link til webudvikler uddannelsens side

### Galleri side:

- Et billede galleri med streetart opdelt på de to lokationer
- Mulighed for at skifte mellem forskellige billeder i en slider
- Mulighed for at vælge destination som loader to forskellige billed-sæt
- Thumbnail system I et grid under galleri med de 9 næste billeder.
- Responsivt og virker både på mobil og desktop

### Find lokation side:

- Forklaring af funktionaliteten (geolocation og kamera brug)
- User accept knap der starter kamera
- Responsivt, men virker ikke på desktop

### Levende streetart side:

- Denne side består af kunstværker som gennem programmering er transformeret og nytænkt
- Galleri med før og efter
- Forklaring af det nyfortolkede værk

# Teknologier

Projektet er bygget af følgende teknologier:

- HTML
- SCSS
- TypeScript
- AR.js
- p5.js
- Geolocation API

# Mappe struktur

Vi arbejder med **folder based pages**. Det vil sige at hver side i projektet har sin egen mappe hvor alle tilhørende filer ligger. HTML, SCSS og TS filer samt de kompilerede CSS og JS filer.
Alle filer der skal deles mellem de forskellige pages eks. SCSS variabler, mixins eller helper functions der bruges i flere sider, skal ligge i mappen **shared**.
