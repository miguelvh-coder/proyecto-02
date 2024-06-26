const User = require("./user.model");
const { respondWithError, throwCustomError } = require("../../utils/function");

async function getUserById(id) {
  const user = await User.findById(id);
  
  if(!user){
    return throwCustomError( 404, "Usuario no existe" );
  }
  if(user.eliminado){
    return throwCustomError( 404, "Usuario no existe" );
  }
  return user;
}

const getAllUsers = async () => {
  const users = await User.find({ eliminado: false });
  return users;
};



async function createUser(data) {
  const newUser = await User.create(data);

  return newUser;
}

async function userUpdate(id, data) {
  const userUpdated = await User.findByIdAndUpdate(id, data);
  return userUpdated;
}

async function deleteUser(id) {
  const userDeleted = await userUpdate(id, { eliminado: true });
  return userDeleted;
}

async function putOrderInUser(userId, orderId, type) {
  const user = await getUserById(userId);
  type === 0
    ? user.libros_comprados.push(orderId)
    : user.libros_vendidos.push(orderId);
  await user.save();
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  userUpdate,
  deleteUser,
  putOrderInUser,
};