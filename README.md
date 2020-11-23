# LinkAPI App

## Solução

A solução consiste em uma aplicação API Rest, utilizando Node.js + TypeScript + Nest.js, MongoDB e Redis.

A aplicação consiste em dois Jobs. Um para chamar a API do Pipedrive, trazendo todas as deals com status ganho e com seus respectivos produtos. E o outro job é para inserir todos esses ganhos na plataforma Bling.

Há um endpoint (`/v1/sales`) para listar todas as vendas agrupadas pela data de criação com o status `ganho`. Neste endpoint, foi utilizado Redis para cachear a resposta, otimizando o tempo da query de agregação do MongoDB.

## Rodando a aplicação

Esta solução inclui o uso do Docker. Para fins de uso local, foi adicionado um arquivo `docker-compose` para a criação dos containers do banco, redis e aplicação. Também há um Dockerfile para buildar a imagem da aplicação.

Primeiramente, instale todos os pacotes necessário, executando

```bash
yarn install
```

Faça uma cópia do arquivo `.env.example` para `.env` e popule as variáveis de ambiente.

Construa a aplicação, rodando

```bash
yarn build
```

Construa a imagem docker da aplicação, rodando

```bash
make dkbuild
```

Suba os containers, rodando

```bash
make dkup
```
A aplicação estará rodando na porta `3000` por padrão, ou se preferir, altere no arquivo `.env`.

**Obs**: foi criado um script shell para criar um usuário no MongoDB somente para a aplicação.

### Rodando os testes

```bash
make test
```

### Rodando cobertura de testes

```bash
make test/cov
```

## Rotas

No projeto, foi adicionado [Swagger](https://swagger.io/) para fins de documentação. Basta acessar a rota `/api-docs` da aplicação. Ex: http://localhost:3000/api-docs.

## Integração continua

Os arquivos de workflow se encontram na pasta `.github/workflows`. Foi criado alguns jobs para rodar os testes unitários.
