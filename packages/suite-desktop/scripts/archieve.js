const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const OutputDir = '../build-electron';
const archive = archiver("zip", {
  gzip: true,
  zlib: { level: 9 } // Sets the compression level.
});

archive.on('error', function(err) {
  throw err;
});

let dirCont = fs.readdirSync( OutputDir );
let file = dirCont.filter( t => t.match(/.*\.exe/ig))[0];

if (!file) throw Error("File not found");

// pipe archive data to the output file
const output = fs.createWriteStream(path.join(OutputDir, file + '.zip'));
archive.pipe(output);

// append files
archive.file(path.join(OutputDir, file), {name: file});
archive.file('./zadig-2.5.exe', {name: 'zadig-2.5.exe'});

//
archive.finalize();
