
import { Context } from './Context'


class RoadieError extends Error {

  isRoadieError = true

  sdk = 'Roadie'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RoadieError
}

