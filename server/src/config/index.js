'use strict';

exports.config = {
  app: {
    title: "UCSD CSE 210 Project",
    version: "1.0.0",
    description: "UCSD CSE 210 Project Server Backend",
    url: "http://localhost:5000",
  },
  port: process.env.NODEJS_PORT || 5000,
  hostname: process.env.NODEJS_IP || 'localhost',
  api: {
    basePath: "/api/1"
  }
};
