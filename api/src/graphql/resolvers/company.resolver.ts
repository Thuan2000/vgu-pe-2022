/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

// TODO: handle the company registration (mutation companySignup). (See codes below from: https://www.apollographql.com/docs/apollo-server/data/file-uploads/)

// async (parent, { file }) => {
//     const { createReadStream, filename, mimetype, encoding } = await file;
//     // Invoking the `createReadStream` will return a Readable Stream.
//     // See https://nodejs.org/api/stream.html#stream_readable_streams
//     const stream = createReadStream();
//     // This is purely for demonstration purposes and will overwrite the
//     // local-file-output.txt in the current working directory on EACH upload.
//     const out = require('fs').createWriteStream('local-file-output.txt');
//     stream.pipe(out);
//     await finished(out);
//     return { filename, mimetype, encoding };
//   },