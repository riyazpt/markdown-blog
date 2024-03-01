const express = require('express')
const Article = require('./models/article')
const app = express()
const methodOverride = require('method-override');
const mongoose = require('mongoose')
require("dotenv").config();

try {
    mongoose.connect(
        process.env.MONGODB_URI,

    )
}
catch (e) {
    console.log(e)

}

const appRouter = require('./routes/routes')
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }))
app.use('/articles', appRouter)
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdDate: 'desc' })


    res.render('index', { articles: articles })

})
app.listen(3000)