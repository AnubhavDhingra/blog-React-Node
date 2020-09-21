const express = require('express');
const bodyParser = require('body-parser'); 
const request = require('axios');
const cors = require('cors');

const { default: Axios } = require('axios');
const server = express();

server.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
server.use(bodyParser.json());

server.use(cors());
// server.post('/', (req, res) => {
//     let body = req.params;
//     let url = body.url || 'https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/';
//     let method = body.method || 'get';
//     let queryParams = body.queryParams;

//     Promise.resolve()
//     .then((r) => {
//         if (method === 'post') {
//             return Axios.post(url, queryParams)
//         } 
//         return Axios.get(url)
//     })
//     .then((r) => {
//         res.end(JSON.stringify(r.data));
//     })
// });

server.post('/getPosts', (req, res) => {
    let params = {
        number: 25,
        page: req.body.page || 0,
        tag: req.body.tag || '',
        category: req.body.category || '' 
    }
    Axios.get('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/', {params})
    .then(r => {
        res.end(JSON.stringify(r.data));
    })
})

getSinglePost = (id) => {
    return Axios.get('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/'+id)
}

server.post('/getSinglePost',(req,res) => {
    getSinglePost(req.body.id).then((r) => {
        res.end(JSON.stringify(r.data));
    })
})

server.post('/getRelatedPosts', (req, res) => {
    console.log(req.body);
    let data = {
        size: 3
    }
    Axios.post('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/'+ req.body.id +'/related',data)
    .then(r => {
        let promiseArr = []
        r.data.hits.map(el => {
           promiseArr.push(getSinglePost(el.fields['post_id']))
        })
        return Promise.all(promiseArr)
    })
    .then(r => {
        r = r.map(elem => elem.data)
        res.end(JSON.stringify(r));
    })

})

server.get('/getCategories', (req, res) => {
    Axios.get('https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories/',{
        params: {
            order: 'DESC',
            order_by: 'count'
        }
    })
    .then(r => {
        res.end(JSON.stringify(r.data));
        })
})

server.get('/getTags', (req, res) => {
    Axios.get('https://public-api.wordpress.com/rest/v1.1/sites/107403796/tags/',{
        params: {
            order: 'DESC',
            order_by: 'count'
        }
    })
        .then(r => {
            res.end(JSON.stringify(r.data));
        })
})

server.listen(3001, () => console.log('Server up and running!'));
