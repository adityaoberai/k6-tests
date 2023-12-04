import http from 'k6/http'
import { Rate } from 'k6/metrics'

const config = {
    headers: {
        'X-Appwrite-Key': '5d6b115213b67425cc34a8ee50c054d53846f05e86cf86688e91a0693fa901cf6bf4dbfc90b2122dd23f959776cedefa0d50265e843a8609b4ef40e411c01a1f52173c15944350bf6aa9c7e3a07268bbd6d41bf946c6c7834ece12c1309e71231314bf2803182b7adb17d5516546dd0feff778595ddfc63e06d0f2db46e1c62c',
        'X-Appwrite-Project': 'migration',
        'X-Appwrite-Response-Format': '1.0.0',
        'Content-Type': 'application/json'
    }
};

var count = 0;

const myFailRate = new Rate('failed requests');

export const options = {
    vus: 100,
    discardResponseBodies: true,
    duration: '1200s',
    thresholds: {
        'failed requests': ['rate<0.05'],
    }
}

    
export default function () {

    var body = {
        "documentId": "unique()",
        "data": {
            "name": `Name ${++count}`,
            "number": parseInt((Math.random() * 100).toString(), 10)
        }
    }

    const res = http.post(
        `https://appwrite.oberai.dev/v1/databases/testdb/collections/testcollection/documents`,
        JSON.stringify(body),
        config
    );

    myFailRate.add(res.status !== 201);
}