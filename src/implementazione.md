# Cypherpunk 2140 — Stato dell'implementazione

Documento di riferimento tecnico per le chat di progetto. Descrive tutto ciò che è già costruito, le scelte fatte e i dettagli necessari per continuare coerentemente.

---

## Struttura della repository

```
cypherpunk-conference/
├── web/
│   ├── index.html           # Hub di navigazione (12 card)
│   ├── seed02/
│   │   └── index.html       # SIG-INT RX7 — Morse audio-visivo
│   └── seed05/
│       └── index.html       # C1PH3R-BOX — rotori + logica binaria
└── src/
    ├── instruction-manual.md  # Testi narrativi della cartellina (seed01–05)
    ├── scan.py                # Trova parole BIP-39 in un testo (tool)
    ├── twelfth.py             # Calcola la 12ª parola valida (tool)
    ├── bip39-english.txt      # Lista BIP-39 completa
    ├── whitepaper.md          # Whitepaper di Satoshi in markdown
    └── A Cupherpunk's Manifesto.txt  # Manifesto di Eric Hughes
```

---

## Estetica e stile visivo

Tutti i materiali digitali seguono un'estetica coerente:

- **Sfondo:** `#0a0a0a` (nero quasi puro)
- **Colore primario:** `#00ff41` (verde terminale), con varianti dim e dark
- **Colore secondario:** `#ffb000` (ambra) per etichette e label
- **Font:** JetBrains Mono, Share Tech Mono, VT323 (da Google Fonts)
- **Effetto CRT:** scanlines con `repeating-linear-gradient` semitrasparente
- **Mobile-first:** max-width 380–720px, touch-action ottimizzato

---

## Seed phrase

| # | Parola   | Indovinello | Posizione BIP-39 |
|---|----------|-------------|-----------------|
| 1 | decrease | 1           | da verificare   |
| 2 | remove   | 2           | da verificare   |
| 3 | secret   | 3           | da verificare   |
| 4 | satoshi  | 4           | ⚠️ verificare che sia in lista |
| 5 | proof    | 5           | **1379**        |
| 6 | dance    | 6           | da verificare   |
| 7 | food     | 7           | da verificare   |
| 8 | device   | 8           | da verificare   |
| 9 | code     | 9           | da verificare   |
|10 | exist    | 10          | da verificare   |
|11 | trust    | 11          | da verificare   |
|12 | —        | 12          | usare twelfth.py |

Per calcolare la 12ª parola: `cd src && python3 twelfth.py`

---

## Dettagli tecnici per ogni indovinello implementato

### Indovinello 1 — Cifrario di Cesare (seed01)

**Stato:** testo narrativo scritto, web app non necessaria (tutto su carta).

**Shift:** 12

**Flavor text in latino** (in `instruction-manual.md`, sezione seed01):
```
Tot verba secretum custodiunt,
tot labores heros peragit.
Menses numera: idem numerus.
Signa caeli numera: idem numerus.
Horae dimidium orbem conficiunt.
Semper idem numerus, semper eadem clavis.
Qui invenit, aperit — qui ignorat, errat.
```
Tutti gli indizi convergono su 12 (mesi, costellazioni zodiacali, ore per mezzo giro).

**Messaggio cifrato (Cesare +12):**
```
XM BDUYM BMDAXM PQXXM
EQQP BTDMEQ Q PQODQMEQ
```

**Soluzione:** «LA PRIMA PAROLA DELLA SEED PHRASE È DECREASE»

**Da produrre:** foglio stampabile con tabella alfabeto + istruzioni.

---

### Indovinello 2 — Codice Morse (seed02)

**Stato:** ✅ Web app completa — `web/seed02/index.html`

**Parola trasmessa:** REMOVE (hardcoded come `atob('UkVNT1ZF')`)

**Funzionamento della app:**
- Simula un ricevitore radio vintage (SIG-INT RX7)
- Lampadina che lampeggia + tono audio sinusoidale a 660 Hz
- 3 cicli di trasmissione, poi «Trasmissione conclusa»
- Controlli: velocità (30–250 ms per dot, moltiplicatore 0.3×–2.5×), volume (0–100%), toggle lampadina

**Narrativa nella cartellina** (sezione seed02): i gruppi sono informati che 0xC1PH3R usa canali analogici per eludere la sorveglianza digitale e che serve audio attivo al massimo.

**Da produrre:** tabella Morse stampata da includere nella cartellina.

---

### Indovinello 3 — Maschera su testo (seed03)

**Stato:** testo del Manifesto incluso in `instruction-manual.md`. Maschera fisica da produrre.

**Testo sorgente:** Cypherpunk's Manifesto di Eric Hughes (1993), versione completa in inglese inclusa nella sezione seed03 del manual.

**La parola da rivelare:** secret

**Da produrre:** foglio con la maschera (ritagli posizionati con precisione) che, sovrapposto al testo del Manifesto, lascia visibile la frase finale con «secret».

---

### Indovinello 4 — Cifrario Pigpen (seed04)

**Stato:** non ancora implementato. Solo testo narrativo di introduzione assente nel manual (sezione seed04 vuota).

**Parola:** satoshi ⚠️ — verificare presenza nella lista BIP-39 standard.

**Da costruire:** testo cifrato Pigpen, griglia nascosta, foglio stampabile.

---

### Indovinello 5 — C1PH3R-BOX (seed05)

**Stato:** ✅ Web app completa — `web/seed05/index.html`

**Parola:** proof (posizione BIP-39: **1379**)

**Registri hardcodati nella app:**
```javascript
const REGISTERS = [0b10100011110, 0b00011100101, 0b11011110001];
const TARGET = 1379;
const TARGET_WORD = "proof";
```

**Come si trova la configurazione corretta:**
La narrativa in `instruction-manual.md` (sezione seed05) spiega ai gruppi:
1. Prendere le prime 3 parole già trovate (decrease, remove, secret)
2. Trovare il loro indice BIP-39
3. Calcolare la radice digitale di ciascun indice (somma iterativa delle cifre fino a un numero singolo) → quello è lo shift del rotore corrispondente
4. Prendere l'indice BIP-39 della quarta parola (satoshi) → mod 3 → 0=AND, 1=OR, 2=XOR

**Dipendenza:** richiede che seed01–04 siano già stati risolti.

**Interazione nella app:**
- Tre righe di 11 bit (registri), ognuna ruotabile con pulsanti ◀ ▶ o swipe touch
- Indicatori pip animati sotto ogni rotore
- Tre pulsanti operazione: AND [0], OR [1], XOR [2]
- Output: 11 bit + valore decimale. Quando output = 1379, appare la parola in verde con effetto glow.

---

## Indice web (web/index.html)

Hub di navigazione con 12 card. Stato attuale:

| Card   | Nome copertura | Stato   | Link          |
|--------|----------------|---------|---------------|
| SEED 01 | GHOST-NET     | CLASSIFIED (locked) | — |
| SEED 02 | SIG-INT RX7   | ACTIVE  | `./seed02/`   |
| SEED 03 | ZERO-DAY      | CLASSIFIED (locked) | — |
| SEED 04 | PKI-VAULT     | CLASSIFIED (locked) | — |
| SEED 05 | C1PH3R-BOX    | ACTIVE  | `./seed05/`   |
| SEED 06 | HASH-MINE     | CLASSIFIED (locked) | — |
| SEED 07 | DARK-POOL     | CLASSIFIED (locked) | — |
| SEED 08 | ONION-ROUTE   | CLASSIFIED (locked) | — |
| SEED 09 | STEG-FRAME    | CLASSIFIED (locked) | — |
| SEED 10 | BLOCK-SYNC    | CLASSIFIED (locked) | — |
| SEED 11 | COLD-KEY      | CLASSIFIED (locked) | — |
| SEED 12 | GENESIS-BLK   | CLASSIFIED (locked) | — |

I nomi di copertura (GHOST-NET, HASH-MINE, ecc.) sono puramente narrativi/estetici e non necessariamente rispecchiano il meccanismo tecnico dell'indovinello sottostante.

La barra di avanzamento mostra «2 / 12 WORDS — 16.7%» (da aggiornare man mano che si aggiungono card attive).

---

## Script di supporto

### scan.py
Scansiona whitepaper e Manifesto cercando tutte le occorrenze di parole BIP-39. Utile per costruire le triplette del book cipher (indovinello 9) e per verificare quali parole sono presenti nei testi sorgente.

Uso: `cd src && python3 scan.py`

Output: elenco ordinato per posizione BIP-39 di tutte le parole trovate in ciascun documento, + parole in comune tra i due testi.

### twelfth.py
Dato un elenco di 11 parole BIP-39, calcola quali parole sono valide come dodicesima (rispettando il checksum SHA-256 di BIP-39).

Uso: `cd src && python3 twelfth.py` (usa la lista hardcoded) oppure `python3 twelfth.py parola1 ... parola11`

Lista hardcodata attuale:
```
decrease remove secret satoshi proof dance food device code exist trust
```

---

## Prossimi passi per le chat future

Le chat più urgenti da aprire:

1. **Chat: Finalizzare seed phrase** — eseguire `twelfth.py`, verificare che «satoshi» sia in lista BIP-39, scegliere la dodicesima parola con il migliore valore narrativo. Calcolare le posizioni BIP-39 di tutte le parole restanti.

2. **Chat: Indovinello 6 (KTANE)** — costruire la web app con i 3 mini-puzzle. Collegare la card SEED 06 nell'indice. Produrre il manuale cartaceo.

3. **Chat: Indovinello 8 (shell Linux)** — costruire la shell simulata in JS puro. Collegare la card SEED 08 nell'indice.

4. **Chat: Fogli guida e materiali stampabili** — produrre tutti i fogli guida mancanti, la maschera fisica per l'indovinello 3, il disco/tabella per il Cesare.

5. **Chat: Configurazioni di tempo** — decidere quali indovinelli attivare nelle diverse configurazioni (45 min / 30–40 min / meno di 30 min) e come presentare le parole pre-risolte narrativamente.
