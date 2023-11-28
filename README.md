## 타입스크립트기반의 포켓몬 도감

[사이트](https://my-pokemon-app-d036d.firebaseapp.com/)로 이동하기

### ☑️ package

- React
- Vite
- Typescript
- redux, redux-toolkit
- tailwindcss
- firebase (auth/hosting)

### 📂 디렉토리 구조

<details>
<summary>
디렉토리 구조 전체보기
</summary>

```bash
├── 📁api
│   ├── const.ts
│   └── Login.ts
├── 📁assets
│   │   ├── 📁fonts
│   │   ├── 📁image
│   │   │   ├── not-found.png
│   │   │   └── pokemonAnimation.json
│   │   ├── 📁icons
│   │   ├── ArrowLeft.tsx
│   │   ├── Balance.tsx
│   │   ├── GreaterThan.tsx
│   │   ├── LessThan.tsx
│   │   ├── Loading.tsx
│   │   ├── Pokeball.tsx
│   │   └── Vector.tsx
├── 📁components
│   ├── 📁autocomplete
│   │   ├── AutoComplete.tsx
│   │   └── SearchBox.tsx
│   ├── 📁damage-modal
│   │   ├── DamageModal.tsx
│   │   └── DamageRelations.tsx
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── GeneralLayout.tsx
│   ├── LazyImg.tsx
│   ├── LightDarkModeButton.tsx
│   ├── LoaderPokeball.tsx
│   ├── Logo.tsx
│   └── NavBar.tsx
├── 📁pages
│   ├──📁DetailPage
│   │   └── index.tsx
│   ├──📁LoginPage
│   │   └── index.tsx
│   ├──📁MainPage
│   │   ├── PokeCard.tsx
│   │   └── index.tsx
│   ├──📁NotFoundPage
│   │   └── index.tsx
├── 📁hooks
│   ├── redux.ts
│   └── useOnClickOutSide.ts
├── 📁store
│   ├── 📁pokemons
│   │   ├── pokemon.slice.ts
│   │   └── pokemons.slice.ts
│   ├── 📁theme
│   │   └── theme.slice.ts
│   ├── 📁user
│   │   └── user.slice.ts
│   └── index.ts
├── 📁types
│   ├── classNameProps.ts
│   ├── DamageRelationOfPokemonTypes.ts
│   ├── FormattedPokemonData.ts
│   ├── PokemonDescription.ts
│   ├── PokemonDetail.ts
│   └── SeparateDamageRelations.ts
├── App.tsx
├── App.css
├── firebase.ts
├── main.css
└── main.tsx
```

</details>

### ☑️ 기능

- [x] 구글계정을 이용한 회원가입/로그인 기능
- [x] 검색어 입력 시 자동완성기능 (해당 알파벳을 포함하고 있는 포켓몬 리스트)
- [x] 다크 모드 / 라이트 모드 지원

### ☑️ 패키지 설치

#### - 패키지 모듈 설치

`$npm i`

#### - 개발 서버 열기

`$npm run dev`

### ❗️타입 빠르게 변환하기

타입을 빠르게 변환해주는 사이트를 이용해서 받아온 포켓몬 데이터의 타입을 선언하였다.  
[https://app.quicktype.io/](https://app.quicktype.io/)

![quicktype 사용한 이미지](https://github.com/hyemin12/react-pokemon-app/assets/66300732/3fc214f9-8fe5-4912-8dab-20a8974d4e4a)
