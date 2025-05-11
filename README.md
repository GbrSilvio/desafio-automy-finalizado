# Desafio Técnico — Integrações

## Objetivo

Este desafio envolve três principais etapas:

1. **Consumo de uma API via proxy server**
2. **Tratamento e filtragem de dados provenientes da API**
3. **Documentação da solução implementada**

## Contexto

A empresa está desenvolvendo uma funcionalidade essencial para o fluxo de comunicação com clientes de um kartódromo. O objetivo é retornar dados sobre baterias (corridas) previamente agendadas, a partir de um **email fornecido pelo cliente**.

A aplicação deverá construir de forma inteligente e dinâmica uma mensagem personalizada, informando:

- As **próximas baterias agendadas**;
- A opção de visualizar **baterias passadas**, caso o cliente solicite.

Será disponibilizado um **endpoint da API interna (Automy)**, acessado via **proxy server** com autenticação JWT, permitindo o envio de queries SQL ao banco de dados.

---
## Instruções sobre entrega

Clone este repositório para sua máquina e crie outro com os mesmos arquivos, a sua documentação deve estar em formato .md no arquivo Doc.md com seu nome, número, email e cpf, deixe o repositório público, após finalizar o desafio compartilhe o link do repositório via forms, segue abaixo o link do forms:

https://form.respondi.app/y88hNsAG

Ao fim da avaliação de todos os candidatos entraremos em contato.

psc: No ultimo dia antes do prazo de entrega entraremos em contato com aqueles que não compartilharam o repositório github para evitar que ocorra alguma desclassificação por erro no compartilhamento.
> Prazo - até dia 11/05 as 19:00.
> >O prazo pode ser prolongado em caso de erro na api, ou serviço fornecido pela empresa.



---

## Etapas do Desafio

1. **Autenticação**
    - Autentique-se na API seguindo a documentação.

2. **Requisição ao Endpoint**
    - Acesse o endpoint fornecido.
    - Envie uma **query MySQL personalizada**.

3. **Query**
    - Monte uma query MySQL utilizando o banco e a tabela definidos para buscar os dados relacionados ao cliente.

4. **Aplicação**
    - Desenvolva uma aplicação simples na linguagem de sua escolha para realizar as seguintes tarefas:
        - Autenticar-se no proxy server;
        - Enviar a query personalizada;
        - Receber e tratar os dados;
        - Construir mensagens de resposta dinâmicas.

5. **Mensagens**
    - As mensagens devem:
        - Separar claramente baterias **passadas** e **agendadas**;
        - Permitir ao cliente visualizar suas **baterias passadas**, caso deseje.

6. **Documentação**
    - Documente detalhadamente:
        - Como utilizar o app;
        - Funções disponíveis;
        - Processo de build e deploy.

---

## Informações da API

### Autenticação

- **Endpoint de Login**  
  `POST https://appsaccess.automy.com.br/login`

- **Headers**
```json
{
  "Content-Type": "application/json"
}
```

- **Body**
```json
{
  "username": "fldoaogopdege",
  "password": "ygalepsm"
}
```

- **Retorno**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ O token JWT **expira em 15 minutos**.  
> Reutilize-o se as requisições forem feitas em curto intervalo de tempo.

---

### Consulta de Dados

- **Endpoint para Queries**  
  `POST https://appsaccess.automy.com.br/api/api/desafio/custom/do/query`

- **Headers**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

- **Body**
```json
{
  "query": "SELECT * FROM desafio.cadastro_baterias_desafio",
  "db": "desafio"
}
```

- **Exemplo de Retorno**
```json
[
  {
    "data_agendamento": "20/04/2025",
    "datetime_formulario": "16/04/2025 19:03:19",
    "email": "john.doe@gmail.com",
    "horario_agendamento": "20h",
    "nome": "John Doe",
    "qtde_pessoas": "25",
    "telefone": "5531991234567"
  },
  {
    "data_agendamento": "20/04/2025",
    "datetime_formulario": "24/04/2025 17:59:01",
    "email": "john.doe@gmail.com",
    "horario_agendamento": "20h",
    "nome": "John Doe",
    "qtde_pessoas": "25",
    "telefone": "5531991234567"
  }
]
```

---

## Detalhes Técnicos

- **Tabela**: `desafio.cadastro_baterias_desafio`
- **Banco de Dados**: `desafio`
- **Email de consulta (usuário registrado)**: `john.doe@gmail.com`

> A consulta deve retornar apenas registros que correspondam ao email informado.  
> ⚠️ **Não utilize ponto e vírgula (`;`) ao final da query**, pois isso causará erro na API.
>> Não é permitido nenhum tipo de query diferente de SELECT, o acesso a qualquer outro endpoint da api ou banco de dados é bloqueado.

- Exclua os arquivos Dockerfile e docker-compose.yaml do projeto se não for fazer o build e deploy via Docker.
- O código do seu app deve estar sempre na pasta src/ exceto isto a estrutura de pastas é a gosto.
- Não mover para nenhuma pasta os arquivos e pastas que já estão no repositório, estes não devem ter sua estrutura modficada.
- Não há necessidade de manter este arquivo README.md no repositório do canditado.
- Se houver alteração na porta exposta do Docker, sempre deixar bem claro na documentação.
---

## Boas Práticas e Diferenciais (Opcionais, mas recomendados)

- Implementar **testes unitários** no processo de build.
- Utilizar **Docker** para build e execução da aplicação.
- Organizar o código com **funções escaláveis** e **nomes claros**.
- Demonstrar familiaridade com **JavaScript**, se possível.


## Desafio Opcional

Desenvolva um app frontend simples para integrar com toda sua solução, design compacto e minimalista, todas as mensagens direcionadas ao usuário devem ser mostradas dinamicamente neste frontend.
