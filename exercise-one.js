'use strict'

const {read, write} = require('./secrets')

/**
 * i've left instructions for you in 'README'
 * read 'README' then print it
 * no time to explain
 **/

async function theMessage() {
  // 1. `read` README  
  // 2. `console.log` it to the screen
  const readme = await read('README');
  console.log(readme)
}

async function theMarks() {
  // 1. `read` bios of resistance members A and B from
  //    /dossier/A
  //      and
  //    /dossier/B
  // 2. `console.log` them in any order)
  console.log(await read('/dossier/A'));
  console.log(await read('/dossier/B'));
}

async function theInfiltrators() {
  // 1. `read` the identities of double agents A, B, and C from
  //    /spy/A
  //    /spy/B  and
  //    /spy/C
  //
  // 2. you MUST issue reads for A, B, and C CONCURRENTLY
  //    if you do not, all reads will fail
  const A = read('/spy/A');
  const B = read('/spy/B');
  const C = read('/spy/C');

  const [spyA, spyB, spyC] = await Promise.all([A, B, C]);
  console.log(spyA, spyB, spyC);
}

async function theReport() {
  // A report is located in /report. It has come through in separate lines.
  // These lines are /report/0, /report/1, /report/2, etc.
  //
  // 1. `read` /report/length to find out how many lines there are.
  const length = await read('/report/length')
  // 2. `read` each line.
  //    SOME LINES ARE REDACTED, AND READING THEM WILL FAIL
  //    There's nothing you can do about this. Replace them with "[REDACTED]"
  //    in the finished report.
  let report = "";
  for (let i = 0; i < length; i++) {
    try {
      report += await read(`/report/${i}`)
    } catch (error) {
      report += '[REDACTED]'
    }
    report += '\n';
  }

  console.log(report);
  return(report);
  // 3. Concatenate the pieces together in the correct order and return
  //    the report.
  // 4. (You may also print it to sate your own curiosity.)
}

async function makeTheDrop() {
  const report = await theReport();
  await write('/dev/cointelpro', report)
  // Send us the report.
  // Take the report from above, and `write` it to:
  //  
  //    /dev/cointelpro
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
    console.log('--- 4. the report ---')
    await theReport()
    console.log('--- 5. make the drop ---')
    await makeTheDrop()
  } catch (err) { console.error(err) }
})()