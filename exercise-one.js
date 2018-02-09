'use strict'

const {read, write} = require('./secrets')
const {log} = console

/**
 * i've left instructions for you in 'README'
 * read 'README' then print it
 * no time to explain
 **/

async function theMessage() {
  // 1. `read` README  
  // 2. `log` it to the screen
  log(await read('README'))
}

async function theMarks() {
  // 1. `read` bios of resistance members A and B from
  //    /dossier/A
  //      and
  //    /dossier/B
  // 2. `log` them in any order
  log(await read('/dossier/A'))
  log(await read('/dossier/B'))
}

async function theInfiltrators() {
  // 1. `read` the identities of double agents A, B, and C from
  //    /spy/A
  //    /spy/B  and
  //    /spy/C
  //
  // 2. you MUST issue reads for A, B, and C CONCURRENTLY
  //    if you do not, all reads will fail
  const A = read('/spy/A')
      , B = read('/spy/B')
      , C = read('/spy/C')
  log(await A)
  log(await B)
  log(await C)
}

async function theReport() {
  // A report is located in /report. It has come through in separate lines.
  // These lines are /report/0, /report/1, /report/2, etc.
  //
  // 1. `read` /report/length to find out how many lines there are.
  const length = await read('/report/length')  
  const report = (await Promise.all(
    new Array(length)
      .fill('[REDACTED]')
      .map((_, i) => read(`/report/${i}`).catch(() => _))
  )).join('\n')
  return report

  // 2. `read` each line.
  //    SOME LINES ARE REDACTED, AND READING THEM WILL FAIL
  //    There's nothing you can do about this. Replace them with "[REDACTED]"
  //    in the finished report.
  // 3. Concatenate the pieces together in the correct order and return
  //    the report.
  // 4. (You may also print it to sate your own curiosity.)
}

async function openTheChannel() {
  // You need to open a channel to us, so you can tell us
  // what you know.
  //
  // 1. To open the channel, `write` this string:
  //
  //   HELLO FROM THE FUTURE
  //
  // To this path:
  //
  //   /dev/past
  //
  // Make sure you wait for the write to complete before returning.
  await write('/dev/past', 'HELLO FROM THE FUTURE')  
}

async function makeTheDrop() {
  // Send us the report.
  // Take the report from above, and `write` it to:
  //  
  //    /dev/cointelpro
  //  
  write('/dev/cointelpro', await theReport())
}


if (module === require.main) {
  (async () => {
    log('--- 1. the message ---')
    await theMessage()
    log('--- 2. the marks ---')
    await theMarks()
    log('--- 3. the infiltrators ---')
    await theInfiltrators()        
    log('--- 4. the report ---')
    await theReport()
    log('--- 5. open the channel ---')
    await openTheChannel()
    log('--- 6. make the drop ---')
    await makeTheDrop()
  })().catch(console.error)
}
