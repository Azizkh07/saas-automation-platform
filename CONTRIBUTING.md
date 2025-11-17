# 📝 Guide de Contribution

## 🔒 Règles de la branche `main`

- **JAMAIS de push direct sur `main`**
- Toutes les modifications passent par des Pull Requests
- Aziz (Azizkh07) doit approuver toutes les PR avant merge

## 🌿 Workflow Git

### 1. Créer votre branche de travail
```bash
git checkout -b feature/your-name/feature-description
```

### 2. Travailler sur votre branche
```bash
# Faire vos modifications
git add .
git commit -m "✨ Description de vos changements"
```

### 3. Pousser votre branche
```bash
git push origin feature/your-name/feature-description
```

### 4. Créer une Pull Request sur GitHub
- Aller sur GitHub
- Cliquer sur "Compare & pull request"
- Décrire vos changements
- Assigner Aziz comme reviewer

### 5. Mettre à jour votre branche avec main
```bash
git checkout main
git pull origin main
git checkout votre-branche
git merge main
# Résoudre les conflits si nécessaire
git push origin votre-branche
```

## 👥 Branches par membre

- `feature/aziz/*` - Aziz (Azizkh07)
- `feature/sarah/*` - Sarah
- `feature/nawres/*` - Nawres
- `feature/nourhen/*` - Nourhen
- `feature/azhar/*` - Azhar

## 📋 Commits Messages

- ✨ `:sparkles:` - Nouvelle fonctionnalité
- 🐛 `:bug:` - Correction de bug
- 💄 `:lipstick:` - UI/Style
- ♻️ `:recycle:` - Refactoring
- 📝 `:memo:` - Documentation
- 🚀 `:rocket:` - Performance