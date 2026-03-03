#!/usr/bin/env python3
"""
Dato un elenco di 11 parole BIP-39, calcola quale/i parole sono valide
come dodicesima (rispettando il checksum BIP-39).

Uso:
    python3 bip39_twelfth.py parola1 parola2 ... parola11

Oppure modifica la lista WORDS qui sotto e lancia lo script senza argomenti.
"""

import sys
import hashlib
from pathlib import Path

# --- Modifica qui se non usi argomenti da riga di comando ---
WORDS = [
    "decrease", "remove", "secret", "satoshi", "proof", "dance", "food", "device", "code", "exist", "trust"
    # "satoshi", "proof", "zero", "trust", "private",
    # "code", "reveal", "secret", "key", "digital", "cash",
]

BIP39_FILE = Path("./bip39-english.txt")


def load_wordlist(path: Path) -> list[str]:
    return [w.strip().lower() for w in path.read_text().splitlines() if w.strip()]


def words_to_bits(words: list[str], wordlist: list[str]) -> str:
    """Converte le parole in stringa di bit (11 bit per parola)."""
    bits = ""
    for w in words:
        idx = wordlist.index(w)
        bits += format(idx, "011b")
    return bits


def find_valid_twelfth(eleven: list[str], wordlist: list[str]) -> list[str]:
    # 11 parole × 11 bit = 121 bit
    # una mnemonica da 12 parole = 128 bit di entropia + 4 bit di checksum = 132 bit
    # i primi 128 bit sono l'entropia; gli ultimi 4 bit della 12ª parola sono il checksum
    # la 12ª parola contribuisce 11 bit: 7 bit di entropia + 4 bit di checksum
    
    bits_121 = words_to_bits(eleven, wordlist)
    
    valid = []
    for candidate in wordlist:
        idx = wordlist.index(candidate)
        bits_12 = format(idx, "011b")
        bits_132 = bits_121 + bits_12
        
        # Estrae i 128 bit di entropia e i 4 bit di checksum dichiarati
        entropy_bits = bits_132[:128]
        declared_checksum = bits_132[128:]  # 4 bit
        
        # Calcola il checksum reale: SHA-256 dell'entropia, prendi i primi 4 bit
        entropy_bytes = int(entropy_bits, 2).to_bytes(16, "big")
        digest = hashlib.sha256(entropy_bytes).digest()
        real_checksum = format(digest[0], "08b")[:4]
        
        if declared_checksum == real_checksum:
            valid.append(candidate)
            
    return valid


def main():
    wordlist = load_wordlist(BIP39_FILE)
    
    eleven = [w.lower() for w in sys.argv[1:]] if len(sys.argv) > 1 else WORDS
    
    if len(eleven) != 11:
        print(f"Errore: servono esattamente 11 parole, hai passato {len(eleven)}.")
        sys.exit(1)
        
    # Verifica che tutte le parole siano nella lista BIP-39
    for w in eleven:
        if w not in wordlist:
            print(f"Errore: «{w}» non è nella lista BIP-39.")
            sys.exit(1)
            
    print(f"\nParole inserite: {' · '.join(eleven)}\n")
    valid = find_valid_twelfth(eleven, wordlist)
    
    print(f"{len(valid)} parole valide come dodicesima:\n")
    for w in valid:
        pos = wordlist.index(w) + 1
        print(f"  #{pos:>4}  {w}")
        
        
if __name__ == "__main__":
    main()