module.exports = {
    flashMiddleware: (req, res, next) => {
        // if there's a flash message, transfer
        // it to the context, then clear it
        res.locals.flash = req.session.flash
        delete req.session.flash
        next()
    }
}

const getNewsData = () => [
    {
        heading: 'New features !',
        body: "It was bad, now it is still bad but better than before, the website now have a new banner and is better designed. Just a bit. And now you can post things, amazing.",
        Auther: 'Hector Colin'
    },
    {
      heading: 'The website is finished',
      body: "Actually no. But there is everything that is required and that my lazyness can provide without dying. This is a big news right ?",
      Auther: 'Hector Colin'
    },
    {
      heading: 'The website is finished',
      body: "Actually no. But there is everything that is required and that my lazyness can provide without dying. This is a big news right ?",
      Auther: 'Hector Colin'
    },
    {
        heading: 'Contest miss Kitty',
        body: "Miss Kitty Ukraine has been elected as Miss Universal Kitty. Her cuteness will bring end to war in a pur.",
        Auther: 'Hector Colin'
    },
    {
        heading: 'The crow',
        body: "Have you seen my crow ? Just in a word, he disapeared, I don't know where he flew. He must be hiding somewhere.",
        Auther: 'Hector Colin'
    }
]

const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}
