# Nodejs-desafio-clicksoft
## Objetivo
- Gerenciar alunos e professores em alocações de sala de aula
### Informações sobre a execução deste projeto
- Framework - Adonis Versão 5
- API - Node Versão 18
- Banco de Dados - Relacional PostgresSQL
- Teste de API - Insomnia
- Outros métodos de execução - Docker,  Docker-compose (já pré configurado)
## Utilização da API na prática para rota de Estudantes
- No presente código utilizamos a função Route.resource que no AdonisJS é usada para criar rotas RESTful para um controlador específico. Quando se utiliza Route.resource("/rota", "..Controller").apiOnly(), se está gerando automaticamente um conjunto de rotas padronizadas para operações CRUD (Create, Read, Update, Delete) associadas ao controlador, tornando o código mais limpo.
### RF01 - Permitir que aluno se cadastre na aplicação

