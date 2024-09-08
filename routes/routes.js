const express = require('express')

const appRouter = express.Router()
const Article = require('../models/article')
appRouter.get('/', (req, res) => {
    res.send('This is areticles')
})
appRouter.get('/new', (req, res) => {
    res.render('./articles/new-article', { article: new Article() }
    )
})
appRouter.get('/edit/:id', async (req, res) => {

    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})
appRouter.put('/:id', async (req, res, next) => {

    req.article = await Article.findById(req.params.id)

    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e)
        res.render(`articles/${path}`, { article: article })
    }
    next()
})
appRouter.get('/:slug', async (req, res) => {

    const article = await Article.findOne({ slug: req.params.slug })
    res.render('articles/show', { article: article })

})
appRouter.post('/', async (req, res) => {

    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        const savedArticle = await article.save()
        res.redirect(`/articles/${savedArticle.slug}`)
    } catch (error) {
        console.log(error)
        res.render(`/articles/new`, { article: article })

    }

})
appRouter.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect(`/`)
})


module.exports = appRouter;