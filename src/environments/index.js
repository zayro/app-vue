import { CONSTANT as prodConstant } from './env.prod.js'
import { CONSTANT as devConstant } from './env.dev.js'

let CONSTANT

if (import.meta.env.VITE_NODE_ENV === 'production') {
  CONSTANT = prodConstant
} else {
  CONSTANT = devConstant
}

export { CONSTANT }
