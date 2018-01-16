const ml = require('manyline')
const readAsync = Symbol('readAsync')

module.exports = {read}

const fs = {
  README: ml `I STOLE THESE FROM THE FBI WHO STOLE THEM FROM`
             `"DANGEROUS" PEOPLE`
             ``
             `DON'T HAVE TIME TO DECRYPT NOW. PLEASE HELP.` .end,
  dossier: {
    A: `Look up COINTELPRO on Malcom X`,
    B: `Look up COINTELPRO on MLK`,
  },
  spy: concurrentReadGroup({
    A: `Spy A`,
    B: `Spy B`,
    C: `Spy C`
  })
}

function concurrentReadGroup(files) {
  let timer = null
    , readers = {}
    , names = Object.keys(files)

  return Object.assign(
    ...names.map(key => ({
      [key]: reader(key, files[key])
    }))
  )

  function reader(key, content) {
    return {
      [readAsync]() {
        if (!readers[key]) {
          readers[key] = {}
          readers[key].promise = new Promise((resolve, reject) => {
            Object.assign(readers[key], {resolve, reject, content})
            startTimer()
          })
        }
        return readers[key].promise
      }
    }
  }

  function startTimer() {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      const ok = all(names.map(key => readers[key]))
      try {
        if (!ok)
          return Object.values(readers)
            .forEach(({reject}) =>
              reject(new Error('Concurrent read required')))          
        let i = ok.length; while (--i >= 0) {
          ok[i].resolve(ok[i].content)
        }
      } finally {
        readers = {}
      }      
    }, 13)
  }
}

function all(ary) {
  let i = ary.length; while (--i >= 0) {
    if (!ary[i]) return ary[i]
  }
  return ary
}

String.prototype [readAsync] = async function() { return this.toString() }

function read(path) {
  return parts(path).reduce((fs, part) => fs[part], fs) [readAsync] ()
}

const parts = path => path.split('/').filter(x => x)