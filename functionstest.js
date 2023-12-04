import http from 'k6/http'
import { Rate } from 'k6/metrics'

const myFailRate = new Rate('failed requests');

export const options = {
    vus: 50,
    discardResponseBodies: true,
    duration: '1800s',
    thresholds: {
        'failed requests': ['rate<0.05'],
    }
}

    
export default function () {
    const res = http.get(
        `http://64e3473bd7b969f90c6b.functions.preview14.appwrite.org/`
    );
    myFailRate.add(res.status !== 200);

    if(res.status !== 200) {
        console.log(res)
    }
}