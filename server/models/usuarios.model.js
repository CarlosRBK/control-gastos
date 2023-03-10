const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "el nombre es requerido"]
    },
    agencia: {
      type: String,
      required: [true, "introduce tu agencia"]
    },
    email: {
      type: String,
      required: [true, "Email es requerido"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Porfavor, introduce un e-mail valido"
      }
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida"],
      minlength: [8, "La contraseña debe tener minimo 8 caracteres"]
    }
  }, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  module.exports.Usuario = mongoose.model('Usuario', UserSchema)

