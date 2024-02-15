# Nodejs-desafio-clicksoft
## Sobre o projeto
- Gerenciar alunos e professores em alocações de sala de aula
### Informações sobre a execução deste projeto
- Framework - Adonis Versão 5 [Adonis-url]: https://v5-docs.adonisjs.com/guides/introduction
- API - Node Versão 18 [Node-url]: https://nodejs.org/en
- Banco de Dados - Relacional PostgresSQL [PostgreSQL-url]: https://www.postgresql.org/download/
- Teste de API - Insomnia [Insomnia-url]: https://insomnia.rest/download
- Outros métodos de execução - Docker,  Docker-compose (já pré configurado)

- Node.js instalado em sua máquina.

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/hubusca.git

   ```
2. Acesse o diretório do projeto:
   ```sh
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
## Utilização da API na prática para rota de Estudantes
- No presente código utilizamos a função Route.resource que no AdonisJS é usada para criar rotas RESTful para um controlador específico. Quando se utiliza Route.resource("/rota", "..Controller").apiOnly(), se está gerando automaticamente um conjunto de rotas padronizadas para operações CRUD (Create, Read, Update, Delete) associadas ao controlador, tornando o código mais limpo.
### RF01 - Permitir que aluno se cadastre na aplicação
* Método POST
Rota: /api/students <br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON" <br/>
________________________________________________________________________________________
model body: {<br/>
	"name": "Ronaldo", <br/>
	"email": "ronaldo.junior@gnail.com",<br/>
	"number_registration": "5555",<br/>
	"birth_date": "1999-12-04"  
}<br/>
_______________________________________________________________________________________
No preview deve mostrar a seguinte mensagem <br/>
_______________________________________________________________________________________
model body: {<br/>
	"message": "Studant created",<br/>
	"data": {<br/>
		"id": 2,<br/>
		"name": "Ronaldo",<br/>
		"email": "ronaldo.junior@gnail.com",<br/>
		"number_registration": "5555",<br/>
		"birth_date": "1999-12-04",<br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",<br/>
		"updated_at": "2024-01-31T15:25:48.231-04:00"<br/>
	}<br/>
}<br/>
_____________________________________________________________________________________
### RF02 - Permitir que aluno edite seus dados de cadastro
* Método PUT <br/>
Rota: /api/students/:registrationStudent<br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON"<br/>
/api/students/5555<br/>
_____________________________________________________________________________________
{
	"name": "eliana xavier",<br/>
	"email": "eliana@gnail.com",<br/>
	"number_registration": "2700",<br/>
	"birth_date": "1999-05-28" <br/>
}
_____________________________________________________________________________________
No preview deve mostrar a seguinte mensagem <br/>
_____________________________________________________________________________________
{
	"message": "Updated",<br/>
	"data": {<br/>
		"id": 2,<br/>
		"name": "eliana xavier",<br/>
		"email": "eliana@gnail.com",<br/>
		"number_registration": "2700",<br/>
		"birth_date": "1999-05-28",<br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",<br/>
		"updated_at": "2024-01-31T15:30:43.724-04:00"<br/>
	}<br/>
}<br/>
___________________________________________________________________________________
### RF04: Permitir que aluno consulte seus dados de cadastro
* Método GET
Rota: /api/students/:registrationStudent<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
/api/students/2700<br/>
No preview deve mostrar a seguinte mensagem<br/>
{<br/>
___________________________________________________________________________________
	"message": "Sucessful",
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com", 
		"number_registration": "2700", 
		"birth_date": "1999-05-28", <br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
___________________________________________________________________________________
}<br/>
### RF03 - Permitir que aluno exclua seus dados de cadastro
* Método DELETE
Rota: /api/students/:registrationStudent<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
/api/students/2700<br/>
No preview deve mostrar a seguinte mensagem<br/>
{<br/>
	"message": "Studant deleted successfully",<br/>
__________________________________________________________________________________
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com",
		"number_registration": "2700",
		"birth_date": "1999-05-28",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
__________________________________________________________________________________
}<br/>

===================================================================================
### RF05 - Permitir que professor se cadastre na aplicação
* Método POST
Rota: /api/professor <br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON" <br/>
________________________________________________________________________________________
model body: {<br/>
	"name": "Ronaldo", <br/>
	"email": "ronaldo.junior@gnail.com",<br/>
	"number_registration": "5555",<br/>
	"birth_date": "1999-12-04"  
}<br/>
_______________________________________________________________________________________
No preview deve mostrar a seguinte mensagem <br/>
_______________________________________________________________________________________
model body: {<br/>
	"message": "SProfessor created",<br/>
	"data": {<br/>
		"id": 2,<br/>
		"name": "Ronaldo",<br/>
		"email": "ronaldo.junior@gnail.com",<br/>
		"number_registration": "5555",<br/>
		"birth_date": "1999-12-04",<br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",<br/>
		"updated_at": "2024-01-31T15:25:48.231-04:00"<br/>
	}<br/>
}<br/>
_____________________________________________________________________________________
### RF06 - Permitir que professor edite seus dados de cadastro
* Método PUT <br/>
Rota: /api/professor/:registrationProfessor<br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON"<br/>
/api/professor/5555<br/>
_____________________________________________________________________________________
{
	"name": "eliana xavier",<br/>
	"email": "eliana@gnail.com",<br/>
	"number_registration": "2700",<br/>
	"birth_date": "1999-05-28" <br/>
}
_____________________________________________________________________________________
No preview deve mostrar a seguinte mensagem <br/>
_____________________________________________________________________________________
{
	"message": "Updated",<br/>
	"data": {<br/>
		"id": 2,<br/>
		"name": "eliana xavier",<br/>
		"email": "eliana@gnail.com",<br/>
		"number_registration": "2700",<br/>
		"birth_date": "1999-05-28",<br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",<br/>
		"updated_at": "2024-01-31T15:30:43.724-04:00"<br/>
	}<br/>
}<br/>
___________________________________________________________________________________
### RF08: Permitir que professor consulte seus dados de cadastro
* Método GET
Rota: /api/students/:registrationProfessor<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
/api/professor/2700<br/>
No preview deve mostrar a seguinte mensagem<br/>
{<br/>
___________________________________________________________________________________
	"message": "Sucessful",
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com", 
		"number_registration": "2700", 
		"birth_date": "1999-05-28", <br/>
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
___________________________________________________________________________________
}<br/>
### RF07 - Permitir que professor exclua seus dados de cadastro
* Método DELETE
Rota: /api/professor/:registrationProfessor<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
/api/professor/2700<br/>
No preview deve mostrar a seguinte mensagem<br/>
{<br/>
	"message": "Professor deleted successfully",<br/>
__________________________________________________________________________________
	"data": {
		"id": 2,
		"name": "eliana xavier",
		"email": "eliana@gnail.com",
		"number_registration": "2700",
		"birth_date": "1999-05-28",
		"created_at": "2024-01-31T15:25:48.230-04:00",
		"updated_at": "2024-01-31T15:30:43.724-04:00"
	}
__________________________________________________________________________________
}<br/>
==================================================================================

### RF09 - Permitir que professor cadastre nova sala
* Método POST
Rota: /api/classroom/:registration/professor <br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON" <br/>
________________________________________________________________________________________
    {
	  "number_classroom": "25",
	  "capacity": 7,
	  "avaliation": true
	}
_______________________________________________________________________________________
No preview deve mostrar a seguinte mensagem <br/>
_______________________________________________________________________________________
{
	"message": "classroom created",
_______________________________________________________________________________________
	"data": {
		"number_classroom": "25",
		"capacity": 7,
		"avaliation": true,
		"professor_id": 4,
		"created_at": "2024-01-29T17:12:33.436-04:00",
		"updated_at": "2024-01-29T17:12:33.436-04:00",
		"id": 2
	}
_____________________________________________________________________________________
}
_____________________________________________________________________________________

### RF10 - Permitir que professor edite os dados de uma sala
* Método PUT <br/>
Rota: /api/classroom/:registration/professor/:classroomNumber<br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON"<br/>
/api/classroom/937/professor/25<br/>
_____________________________________________________________________________________
body: 
{<br/>
	  "number_classroom": "02",<br/>
	  "capacity": 6,<br/>
	  "avaliation": false<br/>
	}<br/>
No preview deve mostrar a seguinte mensagem <br/>
_____________________________________________________________________________________
{
	"message": "updated",
_____________________________________________________________________________________
	"data": {
		"id": 1,
		"capacity": 6,
		"avaliation": false,
		"professor_id": 4,
		"created_at": "2024-01-29T15:04:54.362-04:00",
		"updated_at": "2024-01-29T16:05:57.379-04:00"
	}
____________________________________________________________________________________
}

### RF011 - Permitir que professor exclua os dados de uma sala
* Método DELETE
Rota: /api/classroom/:registration/professor/:classroomNumber<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
/api/classroom/937/professor/25<br/>
_________________________________________________________________________________
{<br/>
	  "number_classroom": "02",<br/>
	  "capacity": 6,<br/>
	  "avaliation": false<br/>
	}<br/>
__________________________________________________________________________________
No preview deve mostrar a seguinte mensagem<br/>
{<br/>
	"message": "room deleted successfully",<br/>
__________________________________________________________________________________
	"data": {
		"id": 1,
		"number_classroom": "25",
		"capacity": 6,
		"avaliation": false,
		"professor_id": 4,
		"created_at": "2024-01-29T15:04:54.362-04:00",
		"updated_at": "2024-01-29T16:05:57.379-04:00"
	}
___________________________________________________________________________________
}<br/>

### RF12: Permitir que professor consulte os dados de uma sala
* Método GET
Rota: /api/classroom/:registration/professor/:classroomNumber<br/>
Exemplo: no insomnia<br/>
GET /api/classroom/937/professor/25<br/>
===================================================================================

### RF13 - Permitir que professor aloque um aluno em uma sala
* Método POST
Rota: /api/allotment/professor/ <br/>
Exemplo: no insomnia, mude a requisição de "Body" para "JSON" <br/>
________________________________________________________________________________________
   {
	  "number_classroom": "25",<br/>
	  "registration_professor": "937",<br/>
	  "email_student": "rr@gnail.com"<br/>
	}
_______________________________________________________________________________________

### RF014 - Permitir que professor remova o aluno de uma sala
* Método DELETE
Rota: /api/allotment/professor/:registration/student/:idStudent/classroom/:number_classroom<br/>
Exemplo: no insomnia, mantenha a requisição no "Body"<br/>
DELETE /api/allotment/professor/937/student/2700/classroom/25<br/>
______________________________________________________________________________________

### RF15: Permitir que professor consulte todos os alunos de uma sala
* Método GET
Rota: /api/allotment/professor/:registration/classroom/:classroom<br/>
Exemplo: no insomnia<br/>
GET api/allotment/professor/937/classroom/25<br/>
______________________________________________________________________________________

### RF16: Permitir que aluno consulte todas as salas que deverá comparecer
* Método GET
Rota: /students/:registration/allotment<br/>
Exemplo: no insomnia<br/>
GET api/students/555/allotment<br/>
_____________________________________________________________________________________
## Autor

Ronaldo Júnior - [Linkedin](https://www.linkedin.com/in/ronaldo-junior-5015rj/) - ron.junior1705@gmail.com

Meu GitHub: [Github](https://github.com/RonaldoJunior999)