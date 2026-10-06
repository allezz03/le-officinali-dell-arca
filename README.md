# Le Officinali dell'Arca — Web

Versione web statica del mockup e-commerce.

## Pubblicazione gratuita con GitHub Pages

1. Crea un repository pubblico su GitHub.
2. Carica tutti i file di questa cartella mantenendo le cartelle `css`, `js` e `assets`.
3. Vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona `main` e `/ (root)`.
6. Salva e attendi la pubblicazione.

Non serve un server Python: il progetto funziona come sito statico.

## Pagine aggiuntive
- `cart.html` — carrello completo con quantità, rimozione prodotti e calcolo spedizione.
- `checkout.html` — pagina checkout demo con dati di spedizione e riepilogo ordine.
- Il carrello usa `localStorage`, quindi i prodotti restano salvati anche passando tra le pagine.
