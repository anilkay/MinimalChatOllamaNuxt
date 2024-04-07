# Nuxt 3 Based Basic Ollama Chat UI



## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production


Build the application for production:
### Classical Nuxt way
```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

### Docker
```bash
docker build -t minimal_chat_ollama_run -f DockerFile .
docker container run -p "3000:3000" minimal_chat_ollama_run
#İf you want to change ollama base url
docker container run -e "NUXT_PUBLIC_API_BASE_URL=https://localhost:8080"  -p "3000:3000" minimal_chat_ollama_run
```




