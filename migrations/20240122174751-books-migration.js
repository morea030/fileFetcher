module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.createCollection('books');
    await db.createCollection('users');
    await db.createCollection('authors');
    await db.collection('users').c  
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const passwordHash = await bcrypt.hash('admin-password', 10);
    await db.collection('users').insertOne({
      username: 'admin',
      password: passwordHash,
      role: 'admin',
    });
  },

  async down(db, client) {
    await db.collection('users').drop();
    await db.collection('authors').drop();
    await db.collection('books').drop();
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
