'use strict'

const {read} = require('./secrets')
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

if (module === require.main) {
  (async () => {
    theMessage()
  })()
}

// function problemB () {
//   /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
//    *
//    * B. log poem one stanza two and three, in any order
//    *    (ignore errors)
//    *
//    */

//   // callback version
//   readFile('poem-one/stanza-02.txt', function (err, stanza2) {
//     console.log('-- B. callback version (stanza two) --');
//     blue(stanza2);
//   });
//   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
//     console.log('-- B. callback version (stanza three) --');
//     blue(stanza3);
//   });

//   // promise version
//   // ???

// }

// function problemC () {
//   /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
//    *
//    * C. read & log poem one stanza two and *then* read & log stanza three
//    *    log 'done' when both are done. Note that the specs are opinionated
//    *    and expect the exact word 'done' (all lowercase) to be logged in
//    *    order to pass.
//    *    (ignore errors)
//    *
//    */

//   // callback version
//   readFile('poem-one/stanza-02.txt', function (err, stanza2) {
//     console.log('-- C. callback version (stanza two) --');
//     blue(stanza2);
//     readFile('poem-one/stanza-03.txt', function (err, stanza3) {
//       console.log('-- C. callback version (stanza three) --');
//       blue(stanza3);
//       console.log('-- C. callback version done --');
//     });
//   });

//   // promise version (hint: don't need to nest `then` calls)
//   // ???

// }

// function problemD () {
//   /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
//    *
//    * D. log poem one stanza four or an error if it occurs
//    *
//    */

//   // callback version
//   readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
//     console.log('-- D. callback version (stanza four) --');
//     if (err) magenta(err);
//     else blue(stanza4);
//   });

//   // promise version
//   // ???

// }

// function problemE () {
//   /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
//    *
//    * E. read & log poem one stanza three and *then* read & log stanza four
//    *    or log an error if it occurs for either file read
//    *
//    */

//   // callback version
//   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
//     console.log('-- E. callback version (stanza three) --');
//     if (err) return magenta(err);
//     blue(stanza3);
//     readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
//       console.log('-- E. callback version (stanza four) --');
//       if (err2) return magenta(err2);
//       blue(stanza4);
//     });
//   });

//   // promise version
//   // ???

// }

// function problemF () {
//   /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
//    *
//    * F. read & log poem one stanza three and *then* read & log stanza four
//    *    or log an error if it occurs for either file read
//    *    always log 'done' (all lowercase) when everything is done
//    *
//    */

//   // callback version
//   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
//     console.log('-- F. callback version (stanza three) --');
//     if (err) {
//       magenta(err);
//       console.log('-- F. callback version done --');
//       return;
//     }
//     blue(stanza3);
//     readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
//       console.log('-- F. callback version (stanza four) --');
//       if (err2) magenta(err2);
//       else blue(stanza4);
//       console.log('-- F. callback version done --');
//     });
//   });

//   // promise version
//   // ???

// }
