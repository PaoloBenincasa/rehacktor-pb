**Descrizione**

Rehacktor è un sito sviluppato con React, Supabase per autenticazione e backend e Bootstrap e Css per l'interfaccia grafica. Permette all'utente di cercare tra i giochi in base al genere, alla console e al developer, di creare una propria lista di preferiti e di lasciare commenti.

**API**

Ho utilizzato Rawg.io per il database dei videogiochi https://rawg.io/apidocs e Supabase per la parte backend.

**Stile**
Ho scelto di usare Bootstrap e CSS per la parte grafica per creare un'esperienza responsive e moderna per l'utente.

**Pagine:**
1. AppHome: Homepage con funzione ricerca per nome o per genere/console.
2. AppGame: con i dettagli del gioco e la possibilità di inserirlo tra i preferiti e commentarlo.
3. AppGenre: visualizza tutti i giochi del genere.
4. AppPlatform: visualizza tutti i giochi del console.
5. AppDeveloper: visualizza tutti i giochi dello sviluppatore.
6. AppSignUp e AppSignIn: per registrarsi o loggarsi.
7. AppProfile: con le info dell'utente registrato e la sua lista di giochi preferiti.
8. AppAccount: pagina in cui l'utente può modificare le proprie info.


**User Interactions:**

Utente non autenticato:
1. Può sfogliare la lista dei giochi più popolari del momento.
2. Può sfogliare i giochi per genere, console e developer.
3. Può usare la barra di ricerca per trovare un gioco specifico.
4. Può vedere i dettagli dei giochi.
5. Può registrarsi e accedere alla sito.

Utente autenticato:
1. Può aggiungere e rimuovere un gioco dai preferiti.
2. Può commentare i giochi.
3. Ha accesso alle pagine di profilo e modifica profilo.

**Context**
1. SessionContext: condivide lo stato della sessione tra i componenti per monitorare se l'utente sia loggato o meno.
2. GameContext: per passare i dati del gioco alle varie pagine.
3. FavContext: per passare i dati dei giochi preferiti alla pagina AppProfile.

**Deployment**
https://rehacktor-paolo-benincasa.vercel.app/