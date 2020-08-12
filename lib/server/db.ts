import mongoose from 'mongoose'

const connectDB = async function():Promise<void> {
	try {
		await mongoose.connect(<string>process.env.SERVER_DB_URL,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}	
		)
		console.log('DB connected!')
	} catch (err) {
		console.log('DB connection failed')
		process.exit(1)
	}
}

export default connectDB