'use strict'

const {read, write} = require('./secrets')

/**
 * i've left instructions for you in 'README'
 * read 'README' from informant server
 * then log it - no time to explain
 **/
async function theMessage() {
  // 1. call `read('/README')` 
  // 2. `console.log` it to the screen
  // (Don't forget to await)
}

async function theMarks() {
  // 1. `read` bios of resistance members A, B AND C from
  //    /dossier/A
  //    /dossier/B  and
  //    /dossier/C

  // 2. `console.log` them (in any order)

}

async function theInfiltrators() {
  // 1. `read` the identities of double agents A, B, and C from
  //    /spy/A
  //    /spy/B  and
  //    /spy/C

  // 2. you MUST issue reads for A, B, and C in PARALLEL
  //    if you do not, all reads will fail

  // 3. `console.log` them (in order)
}

async function theKey() {
  // You will need a secret key to send the report later.
  // Try to `read` /key 
  // We're having trouble keeping this service up - it may fail
  // I got an old key: "5hanover" - that should work
  //
  // 1. `read` the secret key from /key and return it
  // 2. In case it fails, return the old "5hanover" key.
  
}

async function theReport() {
  // A report is located in /report. It has come through in separate lines.
  // These lines are /report/0, /report/1, /report/2, etc.
  //
  // 1. `read` /report/length to find out how many lines there are.

  // 2. `read` each line.
  //    SOME LINES ARE REDACTED, AND READING THEM WILL FAIL
  //    There's nothing you can do about this. (Except for catching the error)
  //    Replace failed lines with "[REDACTED]" in the finished report.

  // 3. Concatenate the pieces together in the correct order and return
  //    the report.
  // 4. (You may also console.log it to sate your own curiosity.)
}

async function makeTheDrop() {
  // Send us the report.
  // Take the key and the report from above, 
  // and `write` it to /cointel
  //
}

(async () => {
  try {
    console.log('--- 1. the message ---')
    await theMessage()
    console.log('--- 2. the marks ---')
    await theMarks()
    console.log('--- 3. the infiltrators ---')
    await theInfiltrators()
    console.log('--- 4. the key ---')
    await theKey()
    console.log('--- 5. the report ---')
    await theReport()
    console.log('--- 6. make the drop ---')
    await makeTheDrop()
  } catch (err) { console.error(err) }
})()
