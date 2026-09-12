# 🗺️ GUIA DE ARQUITETURA E ESTRUTURA DO PROJETO

Este documento descreve de maneira objetiva e direta como o projeto **ENZZO DA SUL — Plataforma Digital Oficial** está organizado, o papel de cada pasta e arquivo, e como os componentes se conectam.

---

## 🏗️ 1. VISÃO GERAL DA ARQUITETURA (EM CAMADAS)

O projeto segue uma **arquitetura desacoplada em 5 camadas principais**:

```text
[ CAMADA DE DESIGN SYSTEM ] ──► variables.css + globals.css + tailwind.config.js
                                        │
[ CAMADA DE DADOS & TIPOS ] ──► types/index.ts ◄──► data/mockData.ts
                                        │
[ CAMADA DE SERVIÇOS/APIS ] ──► services/*.ts (spotify, youtube, shows, etc.)
                                        │
[ CAMADA DE ESTADO GLOBAL ] ──► context/AudioContext.tsx + hooks/*.ts
                                        │
[ CAMADA DE INTERFACE (UI)] ──► pages/*.tsx ◄──► components/*/*.tsx
```

---

## 📁 2. DETALHAMENTO DE PASTAS E ARQUIVOS

### 🔹 `src/utils/` — Utilitários e Parser de Links
- `youtube.ts`: Função `extractYoutubeId(url)` que lê qualquer URL do YouTube (`watch?v=`, `youtu.be/`, `shorts/`, etc.) e extrai o ID do vídeo para gerar a capa (`img.youtube.com`) e o player embed.
- `formatters.ts`: Formatação de números (K, M), datas e minutagem de áudio.
- `cn.ts`: Junção condicional de classes CSS do Tailwind.

---

### 🔹 `src/services/` — Camada de Conexão e APIs
- `spotifyService.ts`: Fornece a discografia oficial vinculada ao Spotify do artista.
- `youtubeService.ts`: Gerencia o catálogo de vídeos e a **adição dinâmica de novos vídeos por link** salvos de forma persistente.
- `showsService.ts`: Gerencia as datas e eventos oficiais da agenda.
- `locationsService.ts`: Fornece a lista de cidades e coordenadas do mapa de carreira.
- `artistsService.ts`: Fornece a lista de artistas e conexões da rede.
- `instagramService.ts`: Gerencia as postagens do feed.
- `bookingService.ts`: Processa envios de solicitação de shows.

---

### 🔹 `src/components/videos/WatchSection.tsx` — Adição Dinâmica de Vídeos
- Possui o formulário **`+ Adicionar Vídeo por Link`**.
- O usuário cola qualquer link do YouTube (do canal oficial `@enzzodasul` ou de terceiros).
- O sistema processa o link usando `youtube.ts`, gera a capa e adiciona o card interativo imediatamente à grade.

---

### 🔹 `src/components/music/MusicSection.tsx` — Player Embutido do Spotify
- Contém o widget oficial embutido (`iframe`) do perfil verificado do **Spotify de Enzzo da Sul** (`artist/2bl0nc1YVl0cxi5m68pMEH`).

---

### 🔹 `src/context/` — Estado Global de Áudio
- `AudioContext.tsx`: Gerencia a reprodução de áudio contínua (faixa atual, play/pause, progresso, volume e waveform). **Permite que a música continue tocando ininterruptamente enquanto o visitante navega entre as páginas.**

---

## ⚡ 3. RESUMO DOS MECANISMOS-CHAVE

1. **Adicionar Vídeos de Terceiros:** Basta colar a URL do vídeo na área Watch. O card é criado dinamicamente com capa e player pop-up.
2. **Player Oficial do Spotify:** Tocador verificado diretamente na seção Music.
3. **Redes Oficiais Integradas:** Links reais para Spotify, Apple Music, YouTube e Instagram `@enzzodasul`.
