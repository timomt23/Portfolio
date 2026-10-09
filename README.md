# Sites de candidature — Timo Marguerat-Trichard

Un modèle commun, un portfolio général et un site par entreprise.

```
assets/        modèle commun (ne change presque jamais)
  site.css       le design
  site.js        la mise en page et le fonctionnement (navigation, code d'accès, FR/EN…)
  textes.js      les textes communs : parcours, expériences, diplômes, langues
index.html     portfolio général  → https://timomt23.github.io/Portfolio/
contenu.js     ses textes (pas de code d'accès, pas d'entreprise)
hokta/         site HOKTA         → https://timomt23.github.io/Portfolio/hokta/
loopstr/       site Loopstr       → https://timomt23.github.io/Portfolio/loopstr/
```

## Créer un site pour une nouvelle entreprise

1. Copier le dossier `hokta/` sous un nouveau nom (minuscules, sans espace), par exemple `acme/`.
2. Dans `acme/contenu.js`, changer :
   - `company` : le nom affiché de l'entreprise ;
   - `accessCode` : le code d'accès (et l'indice `access_note`) ;
   - `posteCards` : le nombre de cartes de la page « Pour le poste » (une par mission de l'annonce) ;
   - les textes `fr` et `en` : accroche (`landing_*`), page « Pour le poste » (`poste_*`), page entreprise (`co_*`), destinataire dans `co_letter_title`.
3. Remplacer le CV du dossier si besoin (même nom de fichier).
4. Envoyer au recruteur le lien `https://timomt23.github.io/Portfolio/acme/`.

Ne pas ajouter de lien vers les sites d'entreprise depuis le portfolio général.

## Modifier les textes sans toucher au code

Ouvrir un site avec `?edit` à la fin de l'adresse (avant le `#`), cliquer sur un texte pour le modifier,
puis « Enregistrer contenu.js » et remplacer le fichier `contenu.js` du dossier.

## Bon à savoir

- Une modification dans `assets/` change tous les sites, y compris ceux déjà envoyés.
  Pour figer un site envoyé, copier `assets/` dans son dossier et remplacer `../assets/` par `assets/` dans son `index.html`.
- Le code d'accès est lisible dans le code de la page : c'est un filtre, pas une protection.
