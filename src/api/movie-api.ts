
import httpClient from './http-api';

export async function getMovies(param: string | null): Promise<any> {
    if(param != null){ 
        return new Promise((resolve, reject) => {
            httpClient.get('/search/shows?q='.concat(param)).then(r => {
                resolve(r.data.map((res: any) => res.show))
            }).catch((e) => {
                console.log("ERROR: ", e);
                reject(e)
            })
        });
    }
    return new Promise((resolve, reject) => {
        httpClient.get('/shows').then(r => {
            resolve(r.data)
        }).catch((e) => {
            console.log("ERROR: ", e);
            reject(e)
        })
    });}
