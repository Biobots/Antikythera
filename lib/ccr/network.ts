import Axios, { AxiosResponse } from 'axios'

export async function getUrls(urls:string[]): Promise<AxiosResponse<string>[]> {
	const promises:Array<Promise<AxiosResponse<string>>>=[]
	urls.forEach(url => promises.push(Axios.get(url)))
	return await Promise.all(promises)
}