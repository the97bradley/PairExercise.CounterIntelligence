const ml = require('manyline')
const readAsync = Symbol('readAsync')
    , writeAsync = Symbol('writeAsync')

module.exports = {read, write}

const {log} = console

const keys = {
  '5hanover': 'leaked',
  'AlwaysBeCoding': 'safe'
}

const validateReport = (data) => {
  if (data.trim() !== REPORT.map(_ => _ === isRedacted ? '[REDACTED]' : _).join('\n'))
      throw new Error('⚠️ Report looks incorrect')
}

const cointel = {
  async [writeAsync](path, key, data) {
    validateReport(data)
    if(keys[key] && keys[key] === "leaked")
      log(ml `⭐️⭐️⭐️⭐️⭐️⭐️ REPORT RECEIVED ⭐️⭐️⭐️⭐️⭐️⭐️`
            `Thank you for your service.`
            `-------------------------------------------`
            `              ⚠️  ATTENTION ⚠️`
            `The key you used was too old and reportedly`
            `leaked - You might have been exposed.`
            `Extra-Credit assignment: Make sure your code`
            `keeps retrying to read "/key" until it gets`
            `a valid response.`
            `⭐️⭐️⭐️⭐️⭐️⭐️` .end)
    else if(keys[key] && keys[key] === "safe")
      log(ml `⭐️⭐️⭐️ REPORT SAFELY RECEIVED ⭐️⭐️⭐️`
            `Thank you for your service, great job!`
            `----------------------------------------`
            `You have proved yourself worthy and were`
            `assigned a new challenge: Open 'bonus-`
            `exercise.js'`
            `⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐` .end)
    else
      throw new Error('⚠️ Incorrect Key')
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
  `STOP PROMISES`
  `INSTRUCTIONAL INTELLIGENCE`
  `--------------------`
  `Re: Bureau to NY, 3/4/07`
  `1.`
  .lines,
  isRedacted,
  ...ml
  `has been assigned to coordinate captioned program for the JS Division`
  `2.`
  `We've detected an user movement in the "FullStack Academy of Code"` 
  `using promises in JavaScript. This organization consists of team of`
  `FullStack instructors, with about 12 hard-core members, 2 of whom are`
  `are officers. This organization holds regular weekly meetings.`
  ``.lines,
  isRedacted,
  isRedacted,
  ...ml
  `4.`
  `The JavaScript Division believes that one of the best ways to thwart`
  `the efforts of user groups and individuals using promises in JS is to`
  `discredit them. In this regard it is felt that the offices of origin`
  `on said individuals should fully develop and furnish to interested`
  `offices any derogatory information developed so that this information`
  `can be posted online using callbacks.`
  .lines
]
const fs = {
  README: ml `I STOLE THESE FROM "DANGEROUS" PEOPLE`
             ``
             `DON'T HAVE TIME TO CONTINUE NOW. PLEASE HELP.`
             ``
             `YOU NEED TO FIND WHO THEY ARE TARGETING (THE MARKS)`
             `WHO ARE THE SPIES AND THE REPORT.`
             `FINALLY, SEND THE REPORT SAFELLY TO THE HEADQURTERS`
            .end,
  dossier: {
    A: `Look up COINTEL on Cassiozen`,
    B: `Look up COINTEL on TmKelly`,
    C: `Look up COINTEL on Ashi`,
  },
  spy: concurrentReadGroup({
    A: `Spy A - Codename Oddie`,
    B: `Spy B - Codename Cody`,
    C: `Spy C - Codename Ribs`
  }),
  cointel,
  schedule: {
    'TmV4dCB': `{
      "data": "TmV4dCBNZWV0aW5nczoNCj09PT09PT09PT09PT09DQoNCjAyLzI3Oi",
      "next": "BOWSBCd"
    }`,
    'BOWSBCd': `{
      "data": "BOWSBCdXJlYXUgT2ZmaWNlDQowNC8xMDogVGh1bmRlcidzIGhpZGVv",
      "next": "dXQNCjA"
    }`,
    'dXQNCjA': failingResponse(`{
      "data": "dXQNCjA3LzIxOiBSb3NlbGFuZCBzYWZlIGhvdXNlDQoNClNlY3JldC",
      "next": "BLbm9ja"
    }`),
    'BLbm9ja': `{
      "data": "BLbm9jayBDb2RlOg0KPT09PT09PT09PT09PT09PT09DQoNCmtub2N",
      "next": "rIHwgcG"
    }`,
    'rIHwgcG': failingResponse(`{
      "data": "rIHwgcGF1c2UgfCBrbm9jayBrbm9jayB8IHBhdXNlIHwga25vY2sg",
      "next": null
    }`)
  },
  key: failingResponse(`AlwaysBeCoding`),
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

class Server503Error extends Error {
  constructor() {
    super(`⚠️ 503 - Server was Unavailable. Please try again.`)
    this.status = 503
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

function failingResponse(data) {
  let timer = null
    , failing = true

  function startTimer() {
    if (timer) return
    failing = false;
    timer = setTimeout(() => {
      failing = true;
      timer = null;
    }, 10)
  }
  
  return {
    [readAsync]() { 
      if(failing) {
        return new Promise((resolve, reject) => {
          startTimer();
          reject(new Server503Error())
        })
      }
      else {
        return Promise.resolve(data)
      }
        
    }
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

function write(path, key, data) {
  return parts(path).reduce((fs, part) => fs[part], fs) [writeAsync] (path, key, data)
}

const parts = path => path.split('/').filter(x => x)