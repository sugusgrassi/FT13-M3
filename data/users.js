class Users {
  static _instance;

  constructor() {
    this.users = []
  }

  static getInstance() {
    if (!Users._instance) {
      Users._instance = new Users();
    }
    return Users._instance;
  }

  /**
   * Esta funcion se usa para listar usuarios
   */
  listUsers() {
    return this.users;
  }

  /**
   * Esta funcion se usa para obtener un usuario
   * @param {*} id 
   */
  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  /**
   * Esta función se usa para agregar usuarios a nuestra lista
   * @param {*} email 
   * @param {*} password 
   * @param {*} name 
   * @param {*} surname 
   */
  addUser(email, password, name, surname) {
    let user = this.users.find(user => user.id === email)
    if(user) {
      return undefined
    }
    user = {
      name,
      surname,
      password,
      id: email
    }
    this.users.push(user)
    return user
  }

  /**
   * Esta función sirve para editar un usuario
   * @param {*} id 
   * @param {*} password 
   * @param {*} name 
   * @param {*} surname 
   */
  updateUser(id, password, name, surname) {
    const user = this.users.find(user => user.id === id)
    if(user) {
      user.password = password
      user.name = name
      user.surname = surname
    }
    return user
  }

  /**
   * Esta función sirve para eliminar un usuario
   * @param {*} id 
   */
  deleteUser(id) {
    const user = this.users.find(user => user.id === id)
    if(user) {
      this.users = this.users.filter(user => user.id !== id)
    }
    return user
  }
}

module.exports = Users;
