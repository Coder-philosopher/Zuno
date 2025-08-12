const { upsertPdfVectors } = require('./pinecone');
require('dotenv').config();

upsertPdfVectors('../samples/sample1.pdf')
  .then(count => console.log(`Inserted ${count} chunks.`))
  .catch(console.error);
