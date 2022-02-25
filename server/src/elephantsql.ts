import pg from 'pg';

var conString =
  'postgres://fmwvoash:vsSGlYHz_P3ubXAFOkf0KeOJW_jmQR1j@jelani.db.elephantsql.com/fmwvoash';

export var client = new pg.Client(conString);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to DB');
  } catch (error) {
    console.error('could not connect to postgres', error);
  }
};
export default connectDB;
