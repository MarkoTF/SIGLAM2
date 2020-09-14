#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
//var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Teacher = require('./models/teacher');
var Category = require('./models/category');
var Lend = require('./models/lend');
var Student = require('./models/student');
var Tool = require('./models/tool');
var Worker = require('./models/worker');


//Conexión a la base de datos
var mongoose = require('mongoose');
var mongoDb = 'mongodb://localhost:27017/siglam';
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la Conexión a la base de datos:'));
db.once('open', function() {
  console.log('Conexión exitosa a la base de datos');
});

var teachers = [];
var categories = [];
var lends = [];
var students = [];
var tools = [];
var workers = [];

function teacherCreate(nombre, apellido, identificacion, carrera, horario, correo, contrasenia, cb) {
  teacherdetail = {nombre:nombre,
                  apellido: apellido,
                  identificacion: identificacion,
                  carrera: carrera,
                  horario: horario,
                  correo: correo,
                  contrasenia: contrasenia
                };
  
  var teacher = new Teacher(teacherdetail);
       
  teacher.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('Nuevo maestro: ' + teacher);
    teachers.push(teacher)
    cb(null, teacher)
  }  );
}

function categoryCreate(nombre, cb) {
  var category = new Category({ nombre: nombre });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Nueva categoría: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}


function studentCreate(nombre, apellido, numeroControl, carrera, horario, correo, contrasenia, cb) {
  studentdetail = {nombre:nombre,
                  apellido: apellido,
                  numeroControl: numeroControl,
                  carrera: carrera,
                  horario: horario,
                  correo: correo,
                  contrasenia: contrasenia
                };
  
  var student = new Student(studentdetail);
       
  student.save(function (err) {
    if (err) {
      cb(err, null);
      console.log('Error ' + err);
      return;
    }
    console.log('Nuevo alumno: ' + student);
    students.push(student);
    cb(null, student);
  }  );
}

function workerCreate(nombre, apellido, identificacion, horario, correo, contrasenia, cb) {
  workerdetail = {nombre:nombre,
                  apellido: apellido,
                  identificacion: identificacion,
                  horario: horario,
                  correo: correo,
                  contrasenia: contrasenia
                };
  
  var worker = new Worker(workerdetail);
       
  worker.save(function (err) {
    if (err) {
      cb(err, null)
      console.log('error ' + err);
      return
    }
    console.log('Nuevo trabajador: ' + worker);
    workers.push(worker)
    cb(null, worker)
  }  );
}


function toolCreate(nombre, modelo, descripcion, categoria, cantidad, cb) {
  tooldetail = {nombre:nombre,
                  modelo: modelo,
                  descripcion: descripcion,
                  categoria: categoria,
                  cantidad: cantidad,
                };
  
  var tool = new Tool(tooldetail);
       
  tool.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('Nueva herramienta: ' + tool);
    tools.push(tool)
    cb(null, tool)
  }  );
}


function lendCreate(estudiante, maestro, trabajador, herramientas, fecha, cb) {
  lendDetail = {estudiante: estudiante,
                maestro: maestro,
                trabajador:trabajador,
                herramientas: herramientas,
                fecha: fecha
              };

  var lend = new Lend(lendDetail);

  lend.save(function(err) {
    if(err) {
      cb(err, null)
      return
    }
    console.log('Nuevo prestamo' + lend);
    lends.push(lend);
    cb(null, lend);
  });

}


function createCategotyStudentTeacherWorker(cb) {
    async.series([
      function(callback) {
        studentCreate('David', 'Dzul', 12123456, 'ISC', 'vespertino', 'correo@ejemplo.com', '12345678', callback);
      },
      function(callback) {
        studentCreate('Alfonso', 'Tec', 12122556, 'ISC', 'matutino', 'correo@gmail.com', '12345678', callback);
      },
      function(callback) {
        studentCreate('Mirna', 'Tec', 67340986, 'IER', 'matutino', 'ejemplo@gmail.com', '12345678', callback);
      },
      function(callback) {
        workerCreate('Luis', 'Tec', 123456799, 'horario', 'Luis@gmail.com', 'contrasenia', callback);
      },
      function(callback) {
        categoryCreate('A10', callback);
      },
      function(callback) {
        categoryCreate('B90', callback);
      },
      function(callback) {
        teacherCreate('Sarai', 'apellido', 231213213, 'ISC', 'horario', 'Saraí@gmail.com', '876543221', callback);
      },

    ], 
    cb);
}


function createTool(cb) {
    async.series([
      function(callback) {
        toolCreate('Pico', 'sasda', 'Pico para hacer hueco', categories[0], 3, callback);
      },
      function(callback) {
        toolCreate('Cautín', '12sda', 'Cautín para soldar circuitos', categories[1], 1, callback);
      }
    ], cb);
}


function createlend(cb) {
  async.series([
    function(callback) {
      lendCreate(students[0], teachers[0], workers[0], tools[0], '27/10/2020', callback);
    },
    function(callback) {
      lendCreate(students[1], teachers[0], workers[0], tools[1], '27/10/2020', callback);
    }
  ], cb);
}



async.series([
    createCategotyStudentTeacherWorker,
    createTool,
    createlend
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Todo a salido bien');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


