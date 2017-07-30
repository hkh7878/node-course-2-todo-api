var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// 스키마 정의
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// JSON으로 변환하는 함수를 오버라이드 한다
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// 인스턴스 메서드 정의
UserSchema.methods.generateAuthToken = function () {
  var user   = this;
  var access = 'auth';
  var token  = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  // 토큰에 값 입력
  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

// 모델 메서드를 선언한다 => statics
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();  
      });
    });
  } else {
    next();
  }
});

// 모델생성
var User = mongoose.model('User', UserSchema);

module.exports = {User};
