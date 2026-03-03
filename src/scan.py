#!/usr/bin/env python3
"""
Scansiona il whitepaper di Bitcoin e il Cypherpunk Manifesto
e individua tutte le occorrenze di parole BIP-39 in ciascun documento.
"""

import re
from pathlib import Path
from collections import defaultdict

# --- Percorsi ---
BASE = Path("./")
BIP39_FILE   = BASE / "bip39-english.txt"
WHITEPAPER   = BASE / "bitcoin-whitepaper.md"
MANIFESTO    = BASE / "cypherpunk-manifesto.txt"


def load_bip39(path: Path) -> dict[str, int]:
    """Restituisce {parola: posizione_1indexed}."""
    words = {}
    for i, line in enumerate(path.read_text().splitlines(), start=1):
        w = line.strip().lower()
        if w:
            words[w] = i
    return words


def tokenize(text: str) -> list[str]:
    """Estrae solo sequenze di lettere, tutto in minuscolo."""
    return re.findall(r"[a-zA-Z]+", text.lower())


def scan_document(text: str, bip39: dict[str, int]) -> dict[str, dict]:
    """
    Per ogni parola BIP-39 trovata nel documento restituisce:
      - posizione BIP-39 (1–2048)
      - numero di occorrenze
      - lista delle posizioni nel testo (indice parola, 0-based)
    """
    tokens = tokenize(text)
    hits: dict[str, dict] = {}

    for idx, token in enumerate(tokens):
        if token in bip39:
            if token not in hits:
                hits[token] = {
                    "bip39_pos": bip39[token],
                    "count": 0,
                    "token_positions": [],
                }
            hits[token]["count"] += 1
            hits[token]["token_positions"].append(idx)

    return hits


def print_report(label: str, hits: dict[str, dict]) -> None:
    sorted_hits = sorted(hits.items(), key=lambda x: x[1]["bip39_pos"])
    print(f"\n{'='*60}")
    print(f"  {label}")
    print(f"  {len(hits)} parole BIP-39 trovate")
    print(f"{'='*60}")
    print(f"{'#BIP39':>7}  {'parola':<14}  {'n.occ':>6}")
    print(f"{'-'*7}  {'-'*14}  {'-'*6}")
    for word, info in sorted_hits:
        print(f"{info['bip39_pos']:>7}  {word:<14}  {info['count']:>6}")


def main():
    bip39 = load_bip39(BIP39_FILE)
    print(f"Parole BIP-39 caricate: {len(bip39)}")

    docs = {
        "Whitepaper Bitcoin (Satoshi Nakamoto, 2008)": WHITEPAPER,
        "Cypherpunk Manifesto (Eric Hughes, 1993)":    MANIFESTO,
    }

    all_results = {}
    for label, path in docs.items():
        text = path.read_text()
        hits = scan_document(text, bip39)
        all_results[label] = hits
        print_report(label, hits)

    # --- Parole in comune tra i due documenti ---
    sets = [set(h.keys()) for h in all_results.values()]
    common = sets[0] & sets[1]
    labels = list(all_results.keys())

    print(f"\n{'='*60}")
    print(f"  Parole BIP-39 presenti in entrambi i documenti")
    print(f"  {len(common)} parole in comune")
    print(f"{'='*60}")
    print(f"{'#BIP39':>7}  {'parola':<14}  {'occ WP':>7}  {'occ MF':>7}")
    print(f"{'-'*7}  {'-'*14}  {'-'*7}  {'-'*7}")
    for word in sorted(common, key=lambda w: bip39[w]):
        pos  = bip39[word]
        occ0 = all_results[labels[0]][word]["count"]
        occ1 = all_results[labels[1]][word]["count"]
        print(f"{pos:>7}  {word:<14}  {occ0:>7}  {occ1:>7}")


if __name__ == "__main__":
    main()