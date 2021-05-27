const { Router } = require("express")
const Users = require("../data/users")

const users = Users.getInstance();

const router = Router();

router.get('/users', (req, res) => {
  const { name, surname } = req.query
  let result = users.listUsers()

  if (name) {
    result = result.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
  }
  if (surname) {
    result = result.filter(user => user.surname.toLowerCase().includes(surname.toLowerCase()))
  }

  return res.json(result)
})

router.get('/users/test', (req, res) => {
  res.send('test')
})

router.get('/users/:id', (req, res) => {
  const { id } = req.params
  let result = users.getUser(id)

  if (!result) return res.sendStatus(404)

  // Ojo con esto porque trabajamos con la referencia del objeto
  // delete result.password

  // para usar ese metodo pero sin afectar al objeto original
  result = { ...result }
  delete result.password

  return res.json(result)
})


router.post('/users', (req, res) => {
  const { name, surname, email, password } = req.body;
  if (!name || name === "" || !surname || surname === "" || !email || email === "" || !password || password === "") {
    return res.status(400).json({ error: "campos incompletos" })
  }
  const user = users.addUser(email, password, name, surname)
  if (!user) {
    return res.status(400).json({ error: "el usuario ya existe" })
  }
  return res.status(201).json(user)
})

router.put('/users/:id', (req, res) => {
  const { name, surname, password } = req.body;
  const { id } = req.params
  if (!name || name === "" || !surname || surname === "" || !password || password === "") {
    return res.status(400).json({ error: "campos incompletos" })
  }
  const user = users.updateUser(id, password, name, surname)

  if (!user) return res.status(404).json({ error: "el usuario no existe" })

  return res.json(user)
})

router.delete('/users/:id', (req, res) => {
  const { id } = req.params

  const user = users.deleteUser(id)

  if (!user) return res.status(404).json({ error: "el usuario no existe" })

  return res.json(user)
})

module.exports = router;