/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')
    router.post('/register', '#controllers/auth_controller.register')
  })
  .prefix('/auth')

router
  .resource('threads', '#controllers/threads_controller')
  .apiOnly()
  .use(['store', 'update', 'destroy'], middleware.auth())

router
  .resource('threads.replies', '#controllers/replies_controller')
  .only(['store'])
  .use(['store'], middleware.auth())
