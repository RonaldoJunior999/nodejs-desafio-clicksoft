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
* Método POST
Rota: /api/students <br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON"
{
	"name": "Ronaldo",
	"email": "ronaldo.junior@gnail.com",
	"number_registration": "5555",
	"birth_date": "1999-12-04"  
}
No preview deve mostrar a seguinte mensagem
{
	"message": "Studant created",
	"data": {
		"id": 2,
		"name": "Ronaldo",
		"email": "ronaldo.junior@gnail.com",
		"number_registration": "5555",
		"birth_date": "1999-12-04",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:25:48.231-04:00"
	}
}

### RF02 - Permitir que aluno edite seus dados de cadastro
- Método PUT
Rota: /api/students/:registrationStudent
Exemplo: no insomnia, mude a requisição de "Body" para "JSON"
/api/students/5555
{
	"name": "eliana xavier",
	"email": "eliana@gnail.com",
	"number_registration": "2700",
	"birth_date": "1999-05-28" 
}
No preview deve mostrar a seguinte mensagem
{
	"message": "Updated",
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com",
		"number_registration": "2700",
		"birth_date": "1999-05-28",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
}

### RF04: Permitir que aluno consulte seus dados de cadastro
- Método GET
Rota: /api/students/:registrationStudent
Exemplo: no insomnia, mantenha a requisição no "Body"
/api/students/2700
No preview deve mostrar a seguinte mensagem
{
	"message": "Sucessful",
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com",
		"number_registration": "2700",
		"birth_date": "1999-05-28",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
}

### RF03 - Permitir que aluno exclua seus dados de cadastro
- Método DELETE
Rota: /api/students/:registrationStudent
Exemplo: no insomnia, mantenha a requisição no "Body"
/api/students/2700
No preview deve mostrar a seguinte mensagem
{
	"message": "Studant deleted successfully",
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com",
		"number_registration": "2700",
		"birth_date": "1999-05-28",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
}



