### 💻 Como executar

Clonar o repositório

```bash
git clone git@github.com:guilhermecarmona/connvert-dividas.git

cd connvert-dividas
```

Build container web

```bash
docker build -t connvert-web ./web
```

Build container backend

```bash
docker build -t connvert-backend ./backend
```

Executar docker-compose

```bash
docker-compose up
```

Acessar o frontend no endereço abaixo:
http://localhost:3000


##### Testes

```bash
docker run connvert-backend sh -c "yarn test"
```
