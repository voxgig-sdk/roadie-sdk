

class RoadieError extends Error {

  isRoadieError = true

  sdk = 'Roadie'

  constructor(code, msg, ctx) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

module.exports = {
  RoadieError
}

