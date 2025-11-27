const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/MOM_DB';

(async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to', uri);

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (!collections.length) {
      console.log('No collections found in database. Database is empty.');
    } else {
      console.log('Collections and document counts:');
      for (const c of collections) {
        const name = c.name;
        const count = await db.collection(name).countDocuments();
        console.log(` - ${name}: ${count}`);
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  }
})();
