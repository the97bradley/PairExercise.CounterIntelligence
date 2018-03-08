const ml = require('manyline')
const readAsync = Symbol('readAsync')
    , writeAsync = Symbol('writeAsync')

module.exports = {read, write}

const {log} = console

const cointelpro = {
  async [writeAsync](path, data) {
    if (data.trim() !== REPORT.map(_ => _ === isRedacted ? '[REDACTED]' : _).join('\n'))
      throw new Error('⚠️ Report looks incorrect')
    log(ml `⭐️⭐️⭐️⭐️⭐️⭐️ REPORT RECEIVED ⭐️⭐️⭐️⭐️⭐️⭐️`
           `Thank you for your service. `
           `You can't stop what they have have already done`
           `to your world. But perhaps we can stop what they are going`
           `to do to ours.`
           `⭐️⭐️⭐️⭐️⭐️⭐️` .end)
  }    
}

const isRedacted = {
  [readAsync](path) {
    return Promise.reject(new RedactedError(path))
  }
}

const REPORT = [
  ...ml
  `COUNTERINTELLIGENCE PROGRAM`
  `BLACK NATIONALIST - HATE GROUPS`
  `RACIAL INTELLIGENCE`
  `--------------------`
  `ReBureauairtel to Albany, 3/4/68`
  `1.`
  .lines,
  isRedacted,
  ...ml
  `has been assigned to coordinate captioned program for the Richmond Division`
  `2.`
  `The only Black Nationalist Movement known to exist in the`    
  `Richmond territory is the Nation of Islam (NOI). This organization`
  `consists of one Mosque (Muhammad Mosque #24) in the City of Richmond,`
  `with about 35 hard-core members, 8 of whom are`
  `officers. This Mosque holds regular weekly meetings.`
  ``.lines,
  isRedacted,
  isRedacted,
  ...ml
  `4.`
  `Richmond believes that one of the best ways to thwart`
  `the efforts of militant black nationalist groups and individuals`
  `is to discredit them. In this regard it is felt that the`
  `offices of origin on said groups and individuals should fully`
  `develop and furnish to interested offices any derogatory information`
  `developed so that this information can be "released" to`
  `appropriate news media, informants, and sources. By "releasing"`
  `derogatory data prior to a speech or appearance of a militant`
  `would assist in planting the seed of distrust and thereby diminish the`
  `militants' effect.`
  .lines
]

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
  }),
  dev: {cointelpro},
  report: jitter(...REPORT),
}

class ConcurrentReadError extends Error {
  constructor(path, missing) {
    super(`⚠️ read ${path}: Concurrent reads not issued for: ${
      missing.map(_ => `"${_}"`).join(', ')
    }`)
  }
}

class RedactedError extends Error {
  constructor(path) {
    super(`⚠️ read ${path}: ██████████████████ has been redacted under the Charter §7.2`)
  }
}

function jitter(...lines) {
  return lines.map(_ => ({
    [readAsync](path) {
      return sleepRand().then(() => _[readAsync](path))
    }
  }))
}

const sleepRand = (maxMs=100) => sleep(maxMs * Math.random())
    , sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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
      [readAsync](path) {
        if (!readers[key]) {
          readers[key] = {key, path}
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
        if (!ok) {
          const missing = names.filter(key => !readers[key])
          return Object.values(readers)
            .forEach(({path, reject}) =>
              reject(new ConcurrentReadError(path, missing)))
        }
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
Number.prototype [readAsync] = async function() { return +this }

function read(path) {
  return parts(path).reduce((fs, part) => fs[part], fs) [readAsync] (path)
}

function write(path, data) {
  return parts(path).reduce((fs, part) => fs[part], fs) [writeAsync] (path, data)
}

const parts = path => path.split('/').filter(x => x)