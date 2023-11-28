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

### ☑️ 패키지 설치

#### - 패키지 모듈 설치

`$npm i`

#### - 개발 서버 열기

`$npm run dev`

### ☑️ 기능

- [x] 구글계정을 이용한 회원가입/로그인 기능
- [x] 검색어 입력 시 자동완성기능 (해당 알파벳을 포함하고 있는 포켓몬 리스트)
- [x] 다크 모드 / 라이트 모드 지원

### ☑️ 시현 영상

#### ■ 로그인 \_ 구글계정을 이용

![login](https://github.com/hyemin12/react-pokemon-app/assets/66300732/354f3b49-c553-4fc3-afc4-bc520cf89fc0)

#### ■ 다크모드/라이트모드

![toggleTheme](https://github.com/hyemin12/react-pokemon-app/assets/66300732/280993a1-42ce-4500-9216-b515cfeae3f6)

#### ■ 메인페이지 \_ 더보기 버튼 클릭 시 데이터 더 가져오기

![mainpage](https://github.com/hyemin12/react-pokemon-app/assets/66300732/a1738a1f-a0be-4b62-9a16-af551d02cbfd)

#### ■ 메인페이지 \_ 검색 기능 + 자동완성

![search](https://github.com/hyemin12/react-pokemon-app/assets/66300732/ba7044a0-6091-4c30-85af-a42d7d9c44da)

#### ■ 포켓몬 클릭하여 포켓몬 상세페이지로 이동하기

![moveTodetailPage](https://github.com/hyemin12/react-pokemon-app/assets/66300732/6fb550fa-362a-4209-8a64-22755e8edd6d)

#### ■ 디테일 페이지 \_ 이전,다음 포켓몬 데이터 가져오기

![detailpage](https://github.com/hyemin12/react-pokemon-app/assets/66300732/690656b5-52f8-4c79-b6a4-e54040292656)

#### ■ 디테일 페이지 \_ 데미지 모달창 열고 닫기

![de_modal](https://github.com/hyemin12/react-pokemon-app/assets/66300732/60efe1cc-b0bb-4a43-9b0c-49f271063de5)

### ❗️타입 빠르게 변환하기

타입을 빠르게 변환해주는 사이트를 이용해서 받아온 포켓몬 데이터의 타입을 선언하였다.  
[https://app.quicktype.io/](https://app.quicktype.io/)

![quicktype 사용한 이미지](https://github.com/hyemin12/react-pokemon-app/assets/66300732/3fc214f9-8fe5-4912-8dab-20a8974d4e4a)
