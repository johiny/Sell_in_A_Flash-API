import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  const SFBD = getDB();
  console.log('query');
  await SFBD.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  const SFBD = getDB();
  await SFBD.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const SFBD = getDB();
  await SFBD.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
  console.log('Estoy llegando a crear usuario');
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);


  const SFBD = getDB();
  await SFBD.collection('usuario').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      callback(err, response);
    } else {
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'sin rol';
      user.estado = 'pendiente';
      await crearUsuario(user, (err, respuesta) => callback(err, user));
    }
  });
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const SFBD = getDB();
  await SFBD
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const SFBD = getDB();
  await SFBD.collection('usuario').deleteOne(filtroUsuario, callback);
};

export {
  queryAllUsers,
  crearUsuario,
  consultarUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarOCrearUsuario,
};
