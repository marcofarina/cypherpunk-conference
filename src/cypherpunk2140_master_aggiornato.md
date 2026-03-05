# Cypherpunk 2140 — Escape Room: documento master

## Contesto generale

**Evento:** conferenza «Cypherpunk 2140» per studenti di scuola superiore, ospitata al Politecnico.
**Struttura della giornata:** una serie di speech tematici (il primo dedicato alla storia dei cypherpunk), seguiti dall'escape room come attività conclusiva.
**Durata dell'escape room:** 45 minuti circa.
**Partecipanti:** circa 150 studenti seduti in un'aula con banchi disposti in file.

---

## Struttura dei gruppi

I gruppi sono formati per fila o per coppia di file. Ogni gruppo lavora in parallelo e in modo indipendente: tutti gli indovinelli sono disponibili sin dall'inizio, salvo l'**indovinello 5** che richiede le prime quattro parole già trovate (vedi nota sotto).

La competizione è tra gruppi. Il primo gruppo che completa il recovery del wallet e invia i satoshi tramite una invoice Lightning vince i gadget. L'incentivo competitivo funge da anti-cheating naturale: non conviene condividere le soluzioni con le altre file.

---

## Narrativa

Un cypherpunk noto solo con l'handle **`0xC1PH3R`** ha annunciato di voler donare i suoi satoshi a «chi dimostrerà di meritarli», poi è sparito dalla rete. Ha disseminato gli indizi in luoghi diversi — documenti cartacei, tracce digitali, profili abbandonati — prima di svanire. La cartellina che ogni gruppo ha ricevuto è tutto ciò che resta di lui.

---

## Meccanica del wallet e sistema di premi

Il wallet è un **Lightning wallet** con una seed phrase BIP-39 da 12 parole. Il wallet può essere vuoto o contenere una quantità simbolica di satoshi — in ogni caso il premio sono gadget fisici.

**Prova di accesso:** il gruppo che completa il recovery deve inviare i satoshi a una invoice Lightning preparata dall'organizzatore (QR code proiettato o distribuito). La transazione completata è la prova incontestabile dell'accesso.

**Mercatino dei gadget:** i gadget sono «acquistabili» con i satoshi ottenuti dal wallet. L'esperienza completa copre recovery → accesso → transazione Lightning.

**Sistema di hint:** ogni 10 minuti viene rilasciato un hint pubblico visibile su uno schermo centrale, calibrato in tempo reale dall'organizzatore in base ai progressi della sala. Questo consente di regolare la difficoltà senza interrompere il gioco.

---

## Seed phrase

Le prime 11 parole della seed phrase sono state scelte. La dodicesima è calcolata con `twelfth.py`, che verifica il checksum BIP-39.

| # | Parola           | Indovinello              |
|---|------------------|--------------------------|
| 1 | decrease         | 1 — Cifrario di Cesare   |
| 2 | remove           | 2 — Codice Morse         |
| 3 | secret           | 3 — Maschera su testo    |
| 4 | satoshi          | 4 — Cifrario Pigpen      |
| 5 | proof            | 5 — C1PH3R-BOX           |
| 6 | dance            | 6 — Web app KTANE        |
| 7 | food             | 7 — Profilo social OSINT |
| 8 | device           | 8 — Shell Linux simulata |
| 9 | code             | 9 — Book cipher          |
|10 | exist            | 10 — Block explorer      |
|11 | trust            | 11 — Vigenère            |
|12 | (da finalizzare) | —                        |

**Nota:** verificare che tutte le parole (in particolare «satoshi») siano nella lista BIP-39 standard prima di finalizzare. Lo script `src/twelfth.py` calcola le candidate valide come dodicesima parola rispettando il checksum.

---

## Gestione del tempo e meccanismo variabile

**Il problema:** la stima realistica è che un gruppo mediamente coordinato risolva 8–10 indovinelli su 12 in 45 minuti lavorando in parallelo. Con studenti poco coordinati o con meno tempo a disposizione (presentazioni che vanno lunghe), il rischio che nessun gruppo finisca è concreto.

**Scelta sul formato:** si scarta l'idea di una pagina di validazione automatica del punteggio — aggiunge complessità logistica e distrae dal gioco. Si scarta anche l'opzione «non vince nessuno» come piano A — troppo frustrante per un evento scolastico.

**Soluzione adottata: parole pre-risolte variabili**

Alcune parole della seed phrase vengono date già risolte nella cartellina, presentate narrativamente come «frammenti già decifrati da `0xC1PH3R` prima di sparire». Il numero di parole pre-risolte è una leva che l'organizzatore decide e può improvvisare in base al tempo effettivamente disponibile:

- **45 minuti o più:** 3–4 parole pre-risolte, 8–9 indovinelli reali
- **30–40 minuti:** 5–6 parole pre-risolte, 6–7 indovinelli reali
- **meno di 30 minuti:** valutare se ridurre ulteriormente o semplificare gli indovinelli più lenti

Le parole pre-risolte devono corrispondere agli indovinelli più incerti o più lenti — candidati naturali: indovinello 10 (block explorer, da testare), indovinello 11 (Vigenère), indovinello 12 (strati). In questo modo gli indovinelli che rimangono sono quelli più solidi e meglio calibrati.

**Da definire in una chat dedicata:** la lista esatta degli indovinelli da attivare nelle diverse configurazioni di tempo, e come presentare narrativamente le parole già risolte nella cartellina senza rompere l'immersione.

---

## Materiali per ogni gruppo

- **Cartellina fisica** con tutti i fogli degli indovinelli, i fogli guida e gli strumenti stampati.
- **Lista BIP-39 completa** (2048 parole) stampata e inclusa nella cartellina. Ogni parola è identificabile univocamente dalle prime 4 lettere. Le parole sono numerate da 1 a 2048.
- **Copia del whitepaper di Bitcoin** (Satoshi Nakamoto, 2008) — usata come riferimento per l'indovinello 9.
- **QR code** per accedere alle risorse digitali (pagina web, immagini, block explorer).

**Logica comune a tutti gli indovinelli con output numerico:** il numero ottenuto è la posizione nella lista BIP-39 (1–2048), e la parola corrispondente è la parola della seed phrase.

---

## I 12 indovinelli

### Indovinello 1 — Cifrario di Cesare
**Difficoltà:** facile
**Parola:** decrease
**Meccanica:** nella cartellina c'è un testo in latino come flavor text. Il testo contiene indizi nascosti per trovare lo shift: «Menses numera: idem numerus» (mesi = 12), «Signa caeli numera: idem numerus» (costellazioni zodiacali = 12), «Horae dimidium orbem conficiunt» (ore per metà giro = 12). Lo shift del Cesare è quindi **12**. Il messaggio cifrato è:

```
XM BDUYM BMDAXM PQXXM
EQQP BTDMEQ Q PQODQMEQ
```

Decifrato: «LA PRIMA PAROLA DELLA SEED PHRASE È DECREASE».

**Foglio guida incluso:** tabella dell'alfabeto con le 26 posizioni numerate; istruzioni su come applicare uno shift.
**Note:** primo puzzle, deve dare soddisfazione rapida. Introduce il concetto di cifratura simmetrica. Il testo latino è stato scelto perché i numeri 12 ricorrono in più contesti indipendenti (mesi, costellazioni, ore), rendendo lo shift non ambiguo.

---

### Indovinello 2 — Codice Morse
**Difficoltà:** facile
**Parola:** remove
**Meccanica:** il QR code porta alla web app **SIG-INT RX7** (`web/seed02/`). La app simula un ricevitore radio vintage: una lampadina lampeggia in Morse, accompagnata da un segnale audio. Il messaggio viene trasmesso per 3 cicli consecutivi, poi il canale si chiude. La narrativa nella cartellina invita i gruppi ad accedere al ricevitore con audio attivo e a decodificare il segnale. La parola Morse trasmessa è «REMOVE» (hardcoded nella app come `atob('UkVNT1ZF')`).

**Controlli utente nella app:** velocità di trasmissione (0.3×–2.5×), volume, toggle lampadina on/off.
**Foglio guida incluso:** tabella Morse completa, presentata come «intercettazione radio».
**Note:** la web app è già costruita e funzionante (`web/seed02/index.html`). Nessun backend necessario.

---

### Indovinello 3 — Maschera su testo (paper on paper)
**Difficoltà:** facile
**Parola:** secret
**Meccanica:** la cartellina contiene due fogli. Il primo è una pagina densa di testo — un estratto autentico del *Cypherpunk's Manifesto* di Eric Hughes (1993), già incluso in `src/instruction-manual.md`. Il secondo è una maschera con ritagli posizionati con precisione: sovrapposta al testo, lascia visibili solo alcune parole che formano una frase. L'ultima parola della frase è la parola BIP-39.
**Foglio guida:** nessuno — trovare come usare i due fogli fa parte del puzzle.
**Note:** effetto scenografico garantito. Il testo autentico del Manifesto rinforza la narrativa della giornata ed è coerente con il primo speech. **La maschera fisica è ancora da produrre.**

---

### Indovinello 4 — Cifrario Pigpen
**Difficoltà:** facile/media
**Parola:** satoshi
**Meccanica:** un foglio con simboli geometrici apparentemente casuali — presentati come scarabocchi di `0xC1PH3R` nel suo taccuino. La griglia di decodifica Pigpen è nascosta sul retro di un altro foglio della cartellina, non etichettata. Trovata la griglia, il messaggio decodificato è un numero a 3–4 cifre → posizione BIP-39.
**Foglio guida:** nessuno — trovare la griglia è parte del puzzle.
**Note:** introduce la ricerca degli strumenti all'interno della cartellina stessa. Visivamente insolito per i ragazzi. **Parametri (messaggio cifrato e posizione BIP-39) ancora da definire.** Verificare che «satoshi» sia nella lista BIP-39 standard.

---

### Indovinello 5 — C1PH3R-BOX (rotori + operazione logica)
**Difficoltà:** media
**Parola:** proof (posizione BIP-39: 1379)
**Meccanica:** il QR code porta alla web app **C1PH3R-BOX** (`web/seed05/`). La app mostra tre registri da 11 bit ciascuno e un selettore di operazione logica (AND / OR / XOR). Il gruppo deve:

1. Determinare lo scorrimento (shift) di ciascun rotore usando le prime tre parole già recuperate: si prende l'indice BIP-39 della parola, si sommano le cifre iterativamente fino a ottenere un numero singolo (radice digitale). Quello è lo shift del rotore corrispondente.
2. Determinare l'operazione logica usando l'indice BIP-39 della quarta parola mod 3 (0 = AND, 1 = OR, 2 = XOR).
3. Applicare la configurazione: quando l'output decimale raggiunge 1379, la app rivela la parola «proof».

**Registri hardcodati nella app:**
- R1: `10100011110`
- R2: `00011100101`
- R3: `11011110001`

**Dipendenza sequenziale:** questo indovinello richiede che i gruppi abbiano già trovato le parole 1–4. È l'unica eccezione alla regola «tutti gli indovinelli sono indipendenti».

**Foglio guida:** la narrativa nella cartellina (`src/instruction-manual.md`, sezione seed05) guida i gruppi step by step verso la configurazione corretta senza spoilerare la soluzione.
**Note:** la web app è già costruita e funzionante (`web/seed05/index.html`). Supporta swipe touch per ruotare i registri. Nessun backend necessario.

---

### Indovinello 6 — Web app KTANE (modulo unico con 3 mini-puzzle)
**Difficoltà:** media
**Parola:** dance
**Meccanica:** il QR code nella cartellina porta a una web app mobile-first ospitata sul sito della scuola. La app contiene tre mini-puzzle ispirati a *Keep Talking and Nobody Explodes*. Il «manuale» per risolvere i puzzle è un foglio stampato nella cartellina. Completati i tre mini-puzzle, la app rivela la parola BIP-39.

I parametri della app si randomizzano ad ogni tentativo, quindi non è possibile copiare la soluzione da un altro gruppo.

**Mini-puzzle 1 — Il pulsante**
La app mostra un pulsante con un colore e una parola scritta sopra. Il manuale cartaceo contiene le regole condizionali: in base al colore e alla parola, il gruppo deve decidere se premere e rilasciare subito, oppure tenere premuto e rilasciare quando compare un certo numero sul display. Output: una lettera o un simbolo.

**Mini-puzzle 2 — Complex Wires**
La app mostra una serie di cavi, ciascuno con 4 attributi visivi (colore del cavo, presenza di stella, LED acceso/spento, colore del connettore). Il manuale cartaceo contiene il diagramma di Venn a 4 insiemi del gioco originale, con semantica adattata alla narrativa cypherpunk. Il diagramma indica per ogni combinazione di attributi cosa fare con il cavo. L'output è una sequenza che sblocca il mini-puzzle 3.

**Mini-puzzle 3 — Password**
La app mostra un display con 5 slot di lettere, ciascuno ciclabile su e giù. Il manuale cartaceo contiene una tabella di parole a 5 lettere (sottoinsieme tematico della lista BIP-39). Una sola combinazione delle lettere disponibili forma una parola presente nella tabella — quella è la parola BIP-39 dell'indovinello.

**Note tecniche:** la app deve essere mobile-first, funzionare senza installazioni, girare su browser. **Da costruire con Claude in una chat dedicata del progetto.**

---

### Indovinello 7 — Profilo social fittizio (OSINT)
**Difficoltà:** media
**Parola:** food
**Meccanica:** la cartellina contiene solo un handle: `@0xC1PH3R_ghost`. È un profilo reale su una piattaforma pubblica, oppure una pagina statica che lo simula (più robusto tecnicamente). La soluzione è nascosta in un dettaglio del profilo — per esempio la data dell'unico post pubblicato è `03/01/2009` (il giorno del blocco Genesis). Quella data, convertita in un formato indicato da un indizio nel profilo stesso, dà il numero → posizione BIP-39.
**Foglio guida:** nessuno — trovare il profilo e interpretare il dettaglio fa parte del puzzle.
**Note:** da testare prima dell'evento. Verificare che la piattaforma scelta non richieda login per vedere il profilo. In alternativa, usare una pagina statica sul sito della scuola che simula un profilo social. **Parametri da definire.**

---

### Indovinello 8 — Shell Linux simulata
**Difficoltà:** media/alta
**Parola:** device
**Meccanica:** il QR code porta a una pagina web che simula un terminale Linux abbandonato di `0xC1PH3R`. Il filesystem virtuale è navigabile con comandi reali: `ls`, `ls -la`, `cd`, `cat`, `chmod`, `pwd`. La parola BIP-39 si trova in un file con permessi `000` (Permission denied) dentro una cartella nascosta (nome con punto iniziale, visibile solo con `ls -la`). Il gruppo deve: trovare la cartella nascosta, navigarci dentro, tentare di leggere il file, capire il problema di permessi, eseguire `chmod +r nomefile` o `chmod 644 nomefile`, rileggere il file.
Il filesystem contiene anche file-esca con contenuto fuorviante — da definire nella chat dedicata.
**Foglio guida incluso:** lista dei comandi disponibili con sintassi essenziale, presentata come «manuale di sopravvivenza del terminale».
**Note:** richiede conoscenze che gli studenti di quinta informatica devono già avere. È narrativamente fortissimo — un terminale abbandonato è l'immagine cypherpunk per eccellenza. Da costruire in JavaScript puro (filesystem virtuale come oggetto JS), mobile-first, nessun backend. **Da costruire in una chat dedicata.**

---

### Indovinello 9 — Book cipher sul whitepaper
**Difficoltà:** alta
**Parola:** code
**Meccanica:** la cartellina contiene una sequenza di triplette numeriche: `2-3-4 | 6-1-7 | 4-2-1 | …`. Il formato è `pagina-riga-parola`. Usando la copia del whitepaper di Satoshi inclusa nei materiali, i gruppi estraggono le parole corrispondenti. Le parole estratte formano una frase; l'ultima parola della frase è la parola BIP-39.
**Foglio guida incluso:** spiegazione del formato pagina-riga-parola con un esempio risolto su una pagina diversa dal whitepaper; mappa delle pagine del whitepaper (il PDF standard è di 9 pagine).
**Note:** questo puzzle costringe a leggere frammenti del whitepaper. È il puzzle più narrativamente ricco. Ogni gruppo può avere triplette diverse che portano a parole diverse — facile da variare mantenendo la stessa meccanica. **Triplette da costruire a ritroso partendo dalla parola «code».** Lo script `src/scan.py` può aiutare a trovare le occorrenze di «code» nel whitepaper.

---

### Indovinello 10 — Block explorer
**Difficoltà:** alta
**Parola:** exist
**Meccanica:** il QR code nella cartellina porta direttamente alla pagina del blocco Genesis su mempool.space — nessuna digitazione dell'hash. Il gruppo deve leggere un campo specifico del blocco e applicare una trasformazione semplice per ottenere il numero BIP-39. Il campo esatto e la trasformazione sono da definire e testare (candidati: timestamp unix, nonce, valore della coinbase transaction). Criterio di scelta: il risultato della trasformazione deve cadere nell'intervallo 1–2048.
**Foglio guida incluso:** screenshot annotato della pagina mempool.space con il campo target evidenziato; descrizione della trasformazione da applicare.
**Note:** il QR code elimina il problema della digitazione dell'hash. Il blocco Genesis è un oggetto mitologico della cultura cypherpunk — il timestamp contiene il titolo del Times («Chancellor on brink of second bailout for banks»), dettaglio che può essere menzionato nella narrativa. **Da testare prima di finalizzare campo e trasformazione.**

---

### Indovinello 11 — Cifrario di Vigenère con chiave tematica
**Difficoltà:** alta
**Parola:** trust
**Meccanica:** la cartellina contiene un testo cifrato e l'indicazione che la chiave «è il nome con cui tutto è iniziato». La chiave è `SATOSHI`. Decodificato con la tavola di Vigenère, il testo rivela un numero → posizione BIP-39. Trovare la chiave richiede di aver seguito lo speech iniziale sui cypherpunk.
**Foglio guida incluso:** tavola di Vigenère completa (26×26) con istruzioni su come usarla riga per riga.
**Note:** opzionalmente, si può costruire una pagina web con un tool di cifratura/decifratura Vigenère come supporto. **Testo cifrato da costruire a ritroso a partire dalla posizione BIP-39 di «trust».**

---

### Indovinello 12 — Enigma a strati (boss finale)
**Difficoltà:** molto alta
**Parola:** (dodicesima parola, da finalizzare)
**Meccanica:** la cartellina contiene una stringa apparentemente casuale. L'unico indizio è: «strato per strato, come ogni buon segreto». Gli strati da applicare in ordine (da dedurre): la stringa è in Base64 → decodificata dà una stringa hex → convertita in decimale dà un numero → il numero è la posizione BIP-39. Il foglio guida fornisce i tre strumenti separati ma non dice in quale ordine usarli.
**Foglio guida incluso:** tre sezioni separate — «Base64 decoder» (tabella o QR a tool online), «Hex → decimale» (tavola di conversione), «Decimale → posizione BIP-39» (rimando alla lista). Senza numerazione né indicazione dell'ordine.
**Note:** chiude il cerchio tematico — la crittografia a strati è il cuore della cultura cypherpunk. Richiede di sintetizzare competenze introdotte dai puzzle precedenti. **La stringa da inserire nella cartellina si calcola a ritroso dalla posizione BIP-39 della dodicesima parola.**

---

## Indovinelli alternativi

Da usare in sostituzione di uno dei 12 principali se in fase di test qualcosa non funziona, se la difficoltà risulta mal calibrata, o semplicemente per varietà in edizioni future.

### Alt-A — Cifrario Polybius (alternativa a indovinello 1 o 4)
Una griglia 5×5 con le lettere dell'alfabeto (I e J condivise). Ogni lettera è rappresentata da una coppia di coordinate riga-colonna. La sequenza di coppie decodificata forma un numero → posizione BIP-39. Buona alternativa visiva al Pigpen, leggermente più matematica.

### Alt-B — ASCII decimale (alternativa a indovinello 5)
Una sequenza di numeri decimali da convertire in lettere ASCII (65=A, 66=B…). Le lettere formate sono una parola BIP-39. Foglio guida con tabella ASCII incluso. Meno tematico dello XOR ma più immediato come meccanica.

### Alt-C — Timeline cypherpunk (alternativa a indovinello 7 o 10)
Una serie di eventi storici del movimento cypherpunk (DigiCash di Chaum, B-Money di Wei Dai, HashCash di Adam Back, whitepaper di Satoshi) con date parzialmente nascoste. I gruppi ricostruiscono la cronologia corretta e le cifre mancanti compongono il numero BIP-39. Alto valore didattico, nessuno strumento digitale necessario.

### Alt-D — Messaggio OP_RETURN su block explorer (alternativa a indovinello 10)
Invece del blocco Genesis, si fornisce un TXID di una transazione reale che contiene un messaggio nel campo OP_RETURN. I gruppi cercano la transazione su un block explorer e leggono il campo OP_RETURN, che contiene la parola BIP-39 in chiaro o un numero. Più narrativo e meno tecnico del nonce.

### Alt-E — Proof-of-Work simulato (alternativa a indovinello 12)
I gruppi devono trovare un nonce che, sommato a una stringa data e passato attraverso un algoritmo semplificato (es. somma delle cifre del risultato), produca un valore con una caratteristica specifica (es. divisibile per 7, oppure che inizia per zero). Il nonce corretto è la posizione BIP-39. Simula concettualmente il mining.

### Alt-H — Alternative esplorate per indovinello 11 (Vigenère confermato per ora)

Le seguenti alternative sono state valutate e documentate per eventuali sostituzioni future: Scytale cipher (Alt-H1), One-time pad simulato (Alt-H2), Polybius (Alt-H3), Rail fence cipher (Alt-H4), Semaforo a bandiere (Alt-H5), Griglia di numeri primi (Alt-H6), Book cipher sul Manifesto (Alt-H7), Frequenze audio/spettrogramma (Alt-H8), Sequenza di halving (Alt-H9), Indirizzo OP_RETURN (Alt-H10).

### Alt-G — Griglia «conta gli oggetti» (alternativa a indovinello 4)
Un'immagine stampata piena di simboli tematici (chiavi crittografiche, loghi Bitcoin, blocchi, lucchetti) da contare in categorie specifiche. I conteggi combinati secondo una formula indicata nella cartellina producono un numero → posizione BIP-39.

---

## Stato di implementazione (aggiornato marzo 2026)

### Materiali digitali costruiti

| File | Contenuto | Stato |
|------|-----------|-------|
| `web/index.html` | Hub di navigazione con 12 card seed | ✅ Completo |
| `web/seed02/index.html` | SIG-INT RX7 — Morse audio-visivo (ind. 2) | ✅ Completo |
| `web/seed05/index.html` | C1PH3R-BOX — rotori + logica binaria (ind. 5) | ✅ Completo |
| `src/instruction-manual.md` | Testo narrativo per seed01–05 | ✅ Completo |
| `src/scan.py` | Trova parole BIP-39 in whitepaper e manifesto | ✅ Tool di supporto |
| `src/twelfth.py` | Calcola la dodicesima parola valida (checksum) | ✅ Tool di supporto |

### Da costruire

- Web app KTANE (indovinello 6) — chat dedicata
- Shell Linux simulata (indovinello 8) — chat dedicata
- Profilo social fittizio o pagina statica (indovinello 7)
- Fogli guida per indovinelli 3 (maschera fisica), 4 (Pigpen), 9 (book cipher), 10 (block explorer), 11 (Vigenère), 12 (strati)
- Disco/tabella per il Cesare (indovinello 1) — foglio stampabile
- Tabella Morse (indovinello 2) — foglio stampabile
- Manuale cartaceo per web app KTANE (indovinello 6)

---

## Note tecniche generali

**Anti-cheating:** la competizione con premi fisici crea un incentivo naturale a non condividere le soluzioni (teoria dei giochi). Le web app (seed02, seed05) hanno la soluzione offuscata nel codice sorgente (`atob()`). Per gli altri indovinelli, se si vuole introdurre varianti per fila, basta cambiare un parametro (shift del Cesare, bit dei registri, triplette del whitepaper) mantenendo la stessa meccanica.

**Strumenti necessari per ogni gruppo:** carta, penna, smartphone con fotocamera e browser. Nessuna app da installare.

**Pagine web da costruire:** indovinello 6 (KTANE), indovinello 7 (profilo opzionale), indovinello 8 (shell Linux). Tutte ospitate sul sito della scuola. Mobile-first, nessun backend.

**Verifica finale:** il recovery del wallet con le 12 parole corrette è auto-verificante — una seed phrase BIP-39 ha un checksum incorporato, quindi il wallet si apre solo se tutte le 12 parole sono corrette e nell'ordine giusto.

**Dipendenza sequenziale indovinello 5:** richiede le parole 1–4 già risolte per calcolare gli shift dei rotori e l'operazione logica. Da tenere presente nella gestione degli hint e nella configurazione con parole pre-risolte.

---

## Prossimi passi

- [x] Scegliere le prime 11 parole BIP-39 della seed phrase
- [x] Progettare e costruire la web app Morse SIG-INT RX7 (indovinello 2)
- [x] Progettare e costruire la web app C1PH3R-BOX (indovinello 5)
- [x] Costruire l'indice web con le 12 card
- [x] Scrivere il testo narrativo per seed01–05 (instruction-manual.md)
- [ ] Finalizzare la 12ª parola (eseguire `twelfth.py` e scegliere la candidata più adatta narrativamente)
- [ ] Verificare che tutte le 11 parole siano nella lista BIP-39 standard (in particolare «satoshi»)
- [ ] Progettare e costruire la web app KTANE (indovinello 6) — chat dedicata
- [ ] Progettare e costruire la shell Linux simulata (indovinello 8) — chat dedicata
- [ ] Testare indovinello 10 (block explorer): individuare campo e trasformazione che producano un numero 1–2048
- [ ] Definire i parametri degli indovinelli 4, 7, 9, 10, 11, 12 (a ritroso dalle parole scelte)
- [ ] Produrre la maschera fisica per indovinello 3
- [ ] Produrre i fogli guida stampabili per tutti gli indovinelli
- [ ] Preparare il manuale cartaceo per la web app KTANE (indovinello 6)
- [ ] Testare il flusso completo di Phoenix wallet: creazione → annotazione seed → recovery
- [ ] Decidere il contenuto del wallet e preparare la invoice Lightning per la finale
- [ ] Definire le configurazioni di tempo (45 min / 30–40 min / meno di 30 min) — chat dedicata
