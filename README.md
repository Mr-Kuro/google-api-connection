# Nome do Projeto

A integração com as APIs externas do google estão completas, faltando apenas algumas evoluções. O objetivo agora é conectar um BD postgress para guardar algumas informações dos retornos dessas APIs.

Vale ressaltar que o frontend ainda está em desenvolvimento, e que o foco atual e completar as demandas de evolução da API. Futuramente Teremos uma pasta para o nosso front.

Desta forma, os arquivos úteis para vocês estão em: [`./api`](./api), começando pelo [`index.js`](./api/index.js)
A conexão com o google photos fotos foi implementada, logo está pronta para ser utilizada.

Basicamente, a ideia do projeto é: ter um front, onde o usuário poderá fazer login e navegar pelas rotas. Esse front, claro, estará integrado a nossa API.

### Instalação

1. Clone o repositório: `git clone https://github.com/Mr-Kuro/album-maker-api.git`
2. Instale as dependências (caso vá desenvolver a api) com o `npm install` no diretorio [`./api`](./api)

### Uso da nossa API com o google
Normalmente está sendo executado sem precisar do FRONTEND.
1. Configure o arquivo: **[`credentials.json`](./api/google/credentials.json)**
2. Inicie o servidor: **`npm run dev`**
3. Acesse o aplicativo em **[`localhost:3000`](http://localhost:3000)**
4. **Rotas:** 
   - `/listPhotos`
   - `/listAlbums`
   - `/createAlbum`
   - `/updateAlbum`

### Uso do FRONTEND
Ainda está em desenvolvimento e sem data previa de coclusão, mas você pode chamá-la  seguindo os passos a baixo. Vale salientar que o mesma não está conenctado a API no momento

1. Utilize o `LiveServer`
2. Se não o tiver:
   - acesse a aba de `extensões` do seu vscode e digite `ritwickdey.LiveServer`
   - clique em instalar
   - reinicie o seu vscode
   - clique no ícone `Go Live` na barra inferior a direita

### Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Faça o commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
4. Faça o push para a sua branch: `git push origin minha-feature`
5. Abra um Pull Request

### Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](./LICENSE.md) para obter detalhes.