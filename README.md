# Nome do Projeto

A parte das APIs ainda não estão completas, mas a ideia é conectar um bd postgress para guardar algumas informações dos albuns.

Deste forma, os arquivos úteis para vocês são: [`index.html`](./index.html), [`index.js`](./index.js) e as [`APIs`](./api)
A continuação, que é a conexão com o google photos ainda não descobri como proceder.

Basicamente, esse projeto tem um front onde ousuário poderá fazer login.

### Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Instale as dependências (caso vá desenvolver a api): `npm install` em no diretorio `./api`

### Uso da API com o google
Normalmente está sendo executado sem precisar do FRONTEND e da API de suport ao front

1. Configure o arquivo: [`credentials.json`](./api/google/credentials.json)
2. Inicie o servidor: `npm run google`

### Uso da API de suporte
Normalmente está sendo usada junto ao frontend

2. Inicie o servidor: `npm start`
3. Acesse o aplicativo em `http://localhost:3333`

### Uso do FRONTEND
Normalmente está sendo sem a api de suport

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