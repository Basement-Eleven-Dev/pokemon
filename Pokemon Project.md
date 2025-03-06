## **Istruzioni generali**

1. **Clona o fork** la repository che ti forniremo.
2. **Crea un branch** per ogni task (feature):
   - `feature/show-pokemon-image`
   - `feature/pokemon-details-and-types`
   - `feature/pokemon-evolution-chain`
3. **Utilizza Node.js** (o la tecnologia concordata) per il tuo back-end; puoi includere un front-end creato con React, Vue, Angular o anche in HTML/CSS/JS puro. Utilizza il backend per strutturare i dati di ritorno dall’API con solo i dati necessari per ciascuna feature.
4. **Organizza il codice** e i file in modo chiaro. Sentiti libero/a di creare cartelle come `server/` e `client/`, o di utilizzare un’unica directory se preferisci.
5. **Documenta**: aggiorna il README (o un file di documentazione) per spiegare come installare ed eseguire il tuo progetto, i requisiti per l’ambiente (versione di Node, dipendenze, ecc.) e ogni informazione utile per testare la tua soluzione.
6. **Consegna**: alla fine, inviaci il link del tuo repository (o la pull request/fork) in cui possiamo vedere i tuoi branch e il codice sviluppato all’indirizzo ***sviluppo@basement11.com***

---

## **Task 1: Visualizzare immagine del Pokémon**

**Branch**: `feature/show-pokemon-image`

- **Obiettivo**: Creare una funzionalità che permetta all’utente di inserire il _nome_ di un Pokémon e visualizzarne l’immagine.
- **Requisiti**:
  - Mostrare un semplice form (campo di testo \+ pulsante) per inserire il nome di un Pokémon (ad es. `pikachu`).
  - Effettuare una chiamata HTTP a `GET https://pokeapi.co/api/v2/pokemon/<nome>` per recuperare i dati del Pokémon.
  - Visualizzare almeno l’immagine frontale (`sprites.front_default` o `sprites.other["official-artwork"].front_default`).
  - Gestire eventuali errori (es. se l’utente inserisce un nome errato, mostrare un messaggio significativo).
- **Spunti**:
  - Puoi usare **fetch** per la chiamata.
  - Concentrati sulla semplicità, basta una pagina web con un form e un’area di visualizzazione dell’immagine.
  - **Se preferisci, puoi impostare un micro-server Node.js che funga da “proxy” o restituire la pagina statica direttamente.**

---

## **Task 2: Dettagli aggiuntivi e tipi del Pokémon**

**Branch**: `feature/pokemon-details-and-types`

- **Obiettivo**: Arricchire l’app con ulteriori informazioni e permettere la navigazione per tipo.
- **Requisiti**:
  - Dato il Pokémon cercato (come nel Task 1), mostra a schermo:
    - **Nome** e **ID** del Pokémon.
    - **Tipi** (ad es. `electric`, `grass`, `poison`). Se ce ne sono più di uno, elencali tutti.
    - **Statistiche** (almeno HP, Attack, Defense) o altre a scelta.
  - Quando l’utente **clicca su un tipo** (es. “electric”), l’app effettua una chiamata a `GET https://pokeapi.co/api/v2/type/<tipo>` per ottenere la lista dei Pokémon di quel tipo.
  - Visualizzare almeno i primi 5-10 Pokémon di quel tipo in un elenco, magari mostrando nome e una mini-icona.
  - Curare una minima UI (anche con CSS o framework a piacere).
- **Spunti**:
  - La chiave `types` nell’oggetto Pokémon fornisce un array di tipi.
  - Da un endpoint come `https://pokeapi.co/api/v2/type/grass` si ottiene un array di Pokémon. Scegli tu come mostrarli (nome, immagine, link).

---

## **Task 3: Catena evolutiva del Pokémon**

**Branch**: `feature/pokemon-evolution-chain`

- **Obiettivo**: Approfondire l’interazione con la PokéAPI, mostrando la **catena evolutiva**.
- **Requisiti**:
  - Una volta ottenuto il Pokémon (come nei task precedenti), eseguire una chiamata alla **species** di quel Pokémon:
    - `GET https://pokeapi.co/api/v2/pokemon-species/<nome>`
  - Dalla risposta, ricavare la proprietà `evolution_chain.url` e fare una seconda chiamata a quell’URL.
  - Da `/evolution-chain/<id>` estrarre i nomi di tutti i Pokémon che compongono la catena evolutiva (base, 1° evoluzione, 2° evoluzione, ecc.).
  - Visualizzare i Pokémon della catena in modo sequenziale (anche solo i loro nomi o, se vuoi, le immagini).
  - Se il Pokémon non ha evoluzioni o è allo stadio finale, mostra un messaggio tipo “Nessuna evoluzione trovata”.
- **Spunti**:
  - Alcune catene evolutive sono più complesse (es. Eevee), quindi tieni d’occhio la struttura annidata (`chain` → `evolves_to` → `evolves_to`).
  - Potresti rappresentare la catena con un piccolo diagramma o con blocchi in verticale/orizzontale.

---

## **Bonus facoltativi**

- **Caching**: se vuoi, puoi salvare i dati già richiesti per evitare troppe chiamate ripetute, utilizzando un array in memoria o un piccolo database locale.
- **Stile e Responsività**: personalizza l’interfaccia con CSS (base o framework a tua scelta) e assicurati che sia utilizzabile anche da mobile.

---

## **Consegna Finale**

1. Assicurati di aver creato i branch separati per ogni Task (1, 2, 3).
2. Documenta nel README come installare ed eseguire l’app, specificando la versione di Node o eventuali dipendenze.
3. Inviaci il link al tuo repository (o la PR/fork) dove possiamo visionare il tuo codice.
