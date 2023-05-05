const checkLogin = (req, res, next) => {
	if (!req.session.users) return res.redirect("/");
	next();
  }
  
  const checkLogged = (req, res, next) => {
	if (req.session.users) return res.redirect("/home");
	next();
  }
  
  export { checkLogged, checkLogin };