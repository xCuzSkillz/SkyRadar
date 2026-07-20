const isAdmin = async (req, res, next) => {
    console.log(req.session.user)
    if(req.session.user.isAdmin) return next()

    res.redirect("/")
}

module.exports = isAdmin;