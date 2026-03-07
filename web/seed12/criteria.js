/**
 * Cypherpunk 2140 — Indovinello 12: Turing Machine
 * Logica di valutazione dei 40 criteri.
 *
 * Ogni criterio è una funzione (n) → 'a' | 'b' | 'c'
 * dove n è un intero in [1, 2048].
 */

"use strict";

const Criteria = (() => {

  /* ── Utilità ── */

  /** Cifre posizionali: [migliaia, centinaia, decine, unità] */
  function pos(n) {
    return [
      Math.floor(n / 1000) % 10,
      Math.floor(n / 100) % 10,
      Math.floor(n / 10) % 10,
      n % 10
    ];
  }

  /** Cifre come scritte (senza zeri iniziali) */
  function dig(n) {
    return String(n).split("").map(Number);
  }

  /* ── Blocco 1: il numero intero ── */

  function c01(n) {
    if (n <= 682) return "a";
    if (n <= 1365) return "b";
    return "c";
  }

  function c02(n) {
    if (n < 500) return "a";
    if (n <= 999) return "b";
    return "c";
  }

  function c03(n) { return n % 2 === 0 ? "a" : "b"; }

  function c04(n) { return n % 3 === 0 ? "a" : "b"; }

  function c05(n) { return n % 5 === 0 ? "a" : "b"; }

  function c06(n) {
    if (n % 2 !== 0) return "c";
    return n % 4 === 0 ? "a" : "b";
  }

  /* ── Blocco 2: cifre singole ── */

  function c07(n) {
    const u = pos(n)[3];
    if (u < 4) return "a";
    if (u <= 6) return "b";
    return "c";
  }

  function c08(n) { return pos(n)[3] % 2 === 0 ? "a" : "b"; }

  function c09(n) {
    const d = pos(n)[2];
    if (d < 4) return "a";
    if (d <= 6) return "b";
    return "c";
  }

  function c10(n) { return pos(n)[2] % 2 === 0 ? "a" : "b"; }

  function c11(n) {
    const c = pos(n)[1];
    if (c < 4) return "a";
    if (c <= 6) return "b";
    return "c";
  }

  function c12(n) { return pos(n)[1] % 2 === 0 ? "a" : "b"; }

  /* ── Blocco 3: confronti tra cifre ── */

  function c13(n) {
    const p = pos(n);
    const u = p[3], d = p[2];
    if (u > d) return "a";
    if (u === d) return "b";
    return "c";
  }

  function c14(n) {
    const p = pos(n);
    const c = p[1], u = p[3];
    if (c > u) return "a";
    if (c === u) return "b";
    return "c";
  }

  function c15(n) {
    const p = pos(n);
    const c = p[1], d = p[2];
    if (c > d) return "a";
    if (c === d) return "b";
    return "c";
  }

  function c16(n) {
    const m = Math.max(...dig(n));
    if (m <= 4) return "a";
    if (m <= 6) return "b";
    return "c";
  }

  /* ── Blocco 4: somma delle cifre ── */

  function c17(n) {
    const s = dig(n).reduce((a, b) => a + b, 0);
    if (s <= 10) return "a";
    if (s <= 20) return "b";
    return "c";
  }

  function c18(n) {
    return dig(n).reduce((a, b) => a + b, 0) % 2 === 0 ? "a" : "b";
  }

  function c19(n) {
    return dig(n).reduce((a, b) => a + b, 0) % 3 === 0 ? "a" : "b";
  }

  function c20(n) {
    const p = pos(n);
    const s = p[3] + p[2];
    if (s <= 5) return "a";
    if (s <= 10) return "b";
    return "c";
  }

  /* ── Blocco 5: conteggi e struttura ── */

  function c21(n) {
    const d = dig(n);
    const even = d.filter(x => x % 2 === 0).length;
    const odd = d.length - even;
    if (even > odd) return "a";
    if (even === odd) return "b";
    return "c";
  }

  function c22(n) {
    const d = dig(n);
    return new Set(d).size === d.length ? "a" : "b";
  }

  function c23(n) { return String(n).includes("0") ? "a" : "b"; }

  function c24(n) {
    const m = Math.min(...dig(n));
    if (m === 0) return "a";
    if (m <= 2) return "b";
    return "c";
  }

  function c25(n) {
    const len = String(n).length;
    if (len <= 2) return "a";
    if (len === 3) return "b";
    return "c";
  }

  /* ── Blocco 6: intervalli specifici per cifra ── */

  function c26(n) {
    const u = pos(n)[3];
    if (u <= 2) return "a";
    if (u <= 5) return "b";
    return "c";
  }

  function c27(n) {
    const d = pos(n)[2];
    if (d <= 2) return "a";
    if (d <= 5) return "b";
    return "c";
  }

  function c28(n) {
    const c = pos(n)[1];
    if (c <= 2) return "a";
    if (c <= 5) return "b";
    return "c";
  }

  /* ── Blocco 7: proprietà aritmetiche ── */

  function c29(n) {
    const r = n % 7;
    if (r === 0) return "a";
    if (r <= 3) return "b";
    return "c";
  }

  function c30(n) {
    const r = n % 8;
    if (r <= 2) return "a";
    if (r <= 5) return "b";
    return "c";
  }

  function c31(n) {
    const p = pos(n);
    const d = Math.abs(p[1] - p[3]);
    if (d <= 1) return "a";
    if (d <= 4) return "b";
    return "c";
  }

  function c32(n) {
    const p = pos(n);
    const s = p[1] + p[3];
    if (s <= 4) return "a";
    if (s <= 9) return "b";
    return "c";
  }

  function c33(n) {
    const p = pos(n);
    const s = p[1] + p[2];
    if (s <= 3) return "a";
    if (s <= 8) return "b";
    return "c";
  }

  function c34(n) {
    const p = dig(n).reduce((a, b) => a * b, 1);
    if (p === 0) return "a";
    if (p <= 20) return "b";
    return "c";
  }

  function c35(n) {
    const r = n % 11;
    if (r === 0) return "a";
    if (r <= 5) return "b";
    return "c";
  }

  function c36(n) {
    const r = dig(n).reduce((a, b) => a + b, 0) % 4;
    if (r === 0) return "a";
    if (r === 1) return "b";
    return "c";
  }

  function c37(n) {
    const d = dig(n);
    if (d.every((v, i) => i === 0 || v > d[i - 1])) return "a";
    if (d.every((v, i) => i === 0 || v < d[i - 1])) return "b";
    return "c";
  }

  function c38(n) { return String(n).includes("5") ? "a" : "b"; }

  function c39(n) { return String(n).includes("3") ? "a" : "b"; }

  function c40(n) {
    const r = pos(n)[3] % 3;
    if (r === 0) return "a";
    if (r === 1) return "b";
    return "c";
  }

  /* ── Registro ── */

  const FN = {
     1: c01,  2: c02,  3: c03,  4: c04,  5: c05,
     6: c06,  7: c07,  8: c08,  9: c09, 10: c10,
    11: c11, 12: c12, 13: c13, 14: c14, 15: c15,
    16: c16, 17: c17, 18: c18, 19: c19, 20: c20,
    21: c21, 22: c22, 23: c23, 24: c24, 25: c25,
    26: c26, 27: c27, 28: c28, 29: c29, 30: c30,
    31: c31, 32: c32, 33: c33, 34: c34, 35: c35,
    36: c36, 37: c37, 38: c38, 39: c39, 40: c40,
  };

  /**
   * Valuta un criterio su un numero.
   * @param {number} id — ID del criterio (1–40)
   * @param {number} n  — il numero da testare (1–2048)
   * @returns {'a'|'b'|'c'} l'opzione attiva
   */
  function evaluate(id, n) {
    const fn = FN[id];
    if (!fn) throw new Error(`Criterio sconosciuto: ${id}`);
    return fn(n);
  }

  return { evaluate, pos, dig };

})();
