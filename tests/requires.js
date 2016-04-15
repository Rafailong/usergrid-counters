
global.should = require('should');
global.request = require('supertest');
global.sinon = require('sinon');

var r = require('request');
global.fetch = r.get;
global.post = r.post;

global.user = {"usermail":"iortega+staging1@nearbpo.com","password":"Isortegah12"};


process.env.A127_ENV = 'test';