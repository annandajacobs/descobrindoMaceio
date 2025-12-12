# 🌴 Descobrindo Maceió

Aplicação web explorar os melhores destinos turísticos de Maceió, construída com React, Vite e Tailwind CSS.

## Tecnologias Front

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool super rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **LocalStorage** - Persistência de favoritos

## Tecnologias Back

  - **Node.js**
  - **Express**
  - **Banco de dados - MongoDB**
  - **Mongoose**
  - **JWT Auth**

## Instalação e Configuração

### Passo 1: Criar o projeto

```bash
# Criar projeto com Vite
npm create vite@latest descobrindo-maceio -- --template react

# Entrar na pasta
cd descobrindo-maceio
```

### Passo 2: Instalar dependências

```bash
# Instalar dependências base
npm install

# Instalar Tailwind CSS
npm install tailwindcss@4.1.17
npx tailwindcss init -p

# Instalar Lucide Icons
npm install lucide-react
```

### Passo 3: Rodar o projeto como dev

```bash
# Rodar o Back:

# 1. Entre na pasta
cd backend

# 2. Rode o projeto
npm run dev


# Rodar o front

# 1. Entre na pasta
cd frontend_web
cd descobrindo-maceio

# 2. Rode o projeto
npm run dev

```

### Passo 3: Rodar projeto com o Docker (Inicia Front e Back ao mesmo tempo)

```bash
docker compose up --build -d
```

## Páginas

1. **Home** - Lista de destinos por categoria
2. **Favoritos** - Destinos salvos pelo usuário
3. **Mapa** - Visualização geográfica (placeholder)
4. **Perfil** - Informações do usuário
5. **Detalhes** - Informações completas do destino

---

Desenvolvido com ☕ em Maceió
