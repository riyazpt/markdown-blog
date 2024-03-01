const mongoose = require('mongoose');
const slugify = require('slugify')

const { marked } = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    markdown: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    santizedMarkDown: {
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})
articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown) {
        this.santizedMarkDown = dompurify.sanitize(marked.parse(this.markdown))
    }
    next()
})
module.exports = new mongoose.model("Article", articleSchema)
