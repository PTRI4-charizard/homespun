import express from 'express';
const next = require('next')
const NextjsExpressRouter = require("./nextjs_express_router")
const Middleware = require("./middleware")
import connectDB from './elephantsql';

const httpServer = (express: any) => {
  return require('http').createServer(express)
}

const httpsServer = (express: any) => {
  const fs = require('fs')
  const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8'),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8')
  }
  return require('https').createServer(options, express)
}

class Server {
  port: number;
  express: any;
  next: any;
  middleware: any;
  router: any;
  constructor(port: number) {
    this.port = port
    this.express = express()
    this.next = next({ dev: process.env.NODE_ENV !== 'production' })
    this.middleware = new Middleware(this.express)
    this.router = new NextjsExpressRouter(this.express, this.next)
  }

  async start() {
    await this.next.prepare()
    this.express.use(express.json());
    await this.middleware.init()
    await this.router.init()
    const server = httpServer(this.express)
    connectDB().then(() => {
      server.listen(process.env.EXPRESS_PORT)
    });
    
  }
}

module.exports = Server
