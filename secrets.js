const ml = require('manyline')
const readAsync = Symbol('readAsync')

module.exports = {read}

const fs = {
  README: ml `I STOLE THESE FROM THE FBI WHO STOLE THEM FROM`
             `"DANGEROUS" PEOPLE`
             ``
             `DON'T HAVE TIME TO DECRYPT NOW. PLEASE HELP.` .end
}

String.prototype [readAsync] = async function() { return this.toString() }

function read(path) {
  return parts(path).reduce((fs, part) => fs[part], fs) [readAsync] ()
}

const parts = path => path.split('/').filter(x => x)