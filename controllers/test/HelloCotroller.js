const HelloController = (app) => {
    app.get('/hello', (req, res) => {res.send('Life is good!')})
    app.get('/', (req, res) => {res.send('Welcome to Full cs5610 team21 backend test')})
}

export default HelloController