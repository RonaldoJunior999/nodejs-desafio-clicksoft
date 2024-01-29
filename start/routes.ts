/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  Route.get('/', async () => {
    return { hello: 'world teste' }
  })
  Route.get('/health', async ({response}) => {
    const report = await HealthCheck.getReport()
    return report.healthy
      ? response.ok(report)
      : response.badRequest(report)
  })
  Route.resource("/students", "StudantsController").apiOnly()
  Route.resource("/professor", "ProfessorController").apiOnly()
  Route.post("/classroom/:registration/professor", "ClassroomController.store")
  Route.put("/classroom/:registration/professor/:classroomNumber", "ClassroomController.update")
  Route.delete("/classroom/:registration/professor/:classroomNumber", "ClassroomController.destroy")
  Route.get("/classroom/:registration/professor/:classroomNumber", "ClassroomController.show")

  Route.get("/allotment/professor/:registration/classroom/:classroom", "AllotmentController.index")
  Route.resource("/allotment/professor/", "AllotmentController").apiOnly()
  Route.delete("/allotment/professor/:registration/student/:idStudent/classroom/:number_classroom", "AllotmentController.destroy")
  Route.get('/students/:registration/allotment', 'StudantsController.showAllotment');




  
}).prefix('/api')
