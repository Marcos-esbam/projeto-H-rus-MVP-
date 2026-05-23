# 🦅 App Hórus

> Uma aplicação social mobile para um projeto de exetensão com estética Black & Gold, desenvolvida com React Native e Expo.

![Badge React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Badge Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Badge TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📸 Screenshots


## � Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- MongoDB (local ou Atlas)
- Expo CLI (opcional, mas recomendado)

### 1. Instalar Dependências do Frontend
```bash
npm install
```

### 2. Configurar e Rodar o Backend
```bash
cd backend
npm install
# Configure o .env com sua MONGO_URI
npm start
```
O backend rodará em `http://localhost:5000`.

### 3. Rodar o Frontend
```bash
# Na raiz do projeto
npm start
```
Isso iniciará o Expo DevTools. Escolha a plataforma (iOS, Android ou web).

### Funcionalidades Implementadas
- ✅ Cadastro de usuário
- ✅ Login de usuário
- ✅ Criação de postagens
- ✅ Listagem de postagens na home

### Estrutura do Projeto
- `app/` - Páginas do frontend (usando Expo Router)
- `backend/` - Servidor Node.js com API REST
- `components/` - Componentes reutilizáveis
- `constants/` - Constantes do app (temas, etc.)

## 🎨 Design System

O visual do app foi cuidadosamente planejado:
* **Cores Primárias:** `#000000` (Dark BG) e `#D4AF37` (Gold).
* **Navegação:** Tab Bar customizada com botão central de ação flutuante.
* **Estilo:** Elementos curvos no topo (Header) e ícones minimalistas.

## 🚀 Funcionalidades Implementadas

* ✅ **Autenticação:** Telas de Login e Cadastro.
* ✅ **Navegação Avançada:** * Stack Navigation (Fluxo de entrada).
    * Tab Navigation (Abas principais).
    * Botão central customizado (Create Post).
* ✅ **Feed & Postagem:** Interface para criação de posts com opções de mídia.
* ✅ **Perfil de Usuário:**
    * Galeria de fotos em Grid responsivo.
    * Estatísticas (Seguidores/Seguindo).
    * Header com design curvo.
* ✅ **Central de Notificações:** Lista interativa com ícones dinâmicos baseados no tipo de interação (Like, Comentário, Follow).
* ✅ **Configurações:** Menu de ajustes gerais com Switches e Listas.

## 🛠 Tecnologias Utilizadas

* **React Native** (Framework principal)
* **Expo SDK** (Plataforma de desenvolvimento)
* **Expo Router** (Roteamento baseado em arquivos - File-based routing)
* **TypeScript** (Tipagem estática)
* **StyleSheet** (Estilização nativa)
* **Lucide Icons / Ionicons** (Ícones vetoriais)
## 📦 Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/rayramello/app-horus-new.git](https://github.com/rayramello/app-horus-new.git)
Instale as dependências

Bash

cd app-horus-new
npm install
Execute o projeto

Bash

npx expo start
Teste

Escaneie o QR Code com o app Expo Go (Android/iOS).

Ou pressione a para abrir no Emulador Android.

Ou pressione w para abrir na Web.

📂 Estrutura de Pastas
app-horus-new/
├── app/
│   ├── (tabs)/          # Telas da navegação inferior (Home, Profile, etc.)
│   │   ├── _layout.tsx  # Configuração da TabBar
│   │   └── ...
│   ├── _layout.tsx      # Configuração da Stack (Root)
│   ├── index.tsx        # Tela inicial
│   └── login.tsx        # Tela de Login
├── assets/              # Imagens e fontes
└── components/          # Componentes reutilizáveis
Desenvolvido por Rayra Mello.

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/rayramello/app-horus-new.git](https://github.com/rayramello/app-horus-new.git)
