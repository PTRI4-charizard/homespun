import pg from 'pg';

var conString = process.env.DATABASE;

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
