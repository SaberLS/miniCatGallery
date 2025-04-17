# React + Vite

## Wymagania

1. zobaczyć siatkę z 6 losowymi zdjęciami kotów
2. kliknąć dowolne zdjęcie, aby otworzyć je w powiększeniu (modale)
3. odświeżyć galerię przyciskiem „Refresh cats”

API ze zdjęciami kotów:
https://api.thecatapi.com/v1/images/search?limit=6

### Wymagania techniczne:

- [x] Vue 3 / React
- [x] Plik CatService.js do obsługi API
- [ ] Główny komponent + podkomponenty (galeria i modal)
- [ ] Prosty, estetyczny design
- [ ] Nie używaj bibliotek UI, takich jak Vuetify
- [ ] Udostępnij projekt na GitHub

### Dodatkowe atuty (opcjonalne):

- [ ] Loader podczas ładowania
- [ ] Animacje przy wczytywaniu zdjęć
- [ ] Responsywny układ

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
