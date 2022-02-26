class NextjsExpressRouter {
  constructor(express, next) {
    this.express = express
    this.next = next
  }

  async init() {
    this.initSkillsRoutes()
    this.initUserRoutes()
    this.initErrors()
  }
  
  initSkillsRoutes() {
    return (new (require("./routes/skillsRoutes.ts"))(this.express)).init()
  }

  initUserRoutes() {
    return (new (require("./routes/userRoutes.ts"))(this.express)).init()
  }

  initErrors() {
    // catch 404 and forward to error handler
    this.express.use((req, res, next) => {
      const err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    this.express.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.locals.error = err
      res.locals.errorDescription = err.message
      this.next.render(req, res, "/_error", {  })
    })
  }
}

module.exports = NextjsExpressRouter
