import mongoose from 'mongoose'

export interface IUrl extends mongoose.Document {
	code:string
	url:string
}

const urlSchema = new mongoose.Schema({
	code:String,
	url:String
})

export default mongoose.model<IUrl>('Url', urlSchema, 'url')