// Middleware para verificar si el usuario está autenticado
const requireAuth = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }
  next();
};

// Middleware para verificar si el usuario es administrador
const requireAdmin = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }

  if (req.session.usuario.rol !== "administrador") {
    return res.status(403).render("formulario-error", {
      error: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }

  next();
};

// Middleware para verificar si el usuario es cliente
const requireCliente = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }

  if (req.session.usuario.rol !== "cliente") {
    return res.status(403).render("formulario-error", {
      error: "Acceso denegado. Esta función es solo para clientes.",
    });
  }

  next();
};

// Middleware para pasar información del usuario a las vistas
const addUserToViews = (req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.isAdmin =
    req.session.usuario && req.session.usuario.rol === "administrador";
  res.locals.isCliente =
    req.session.usuario && req.session.usuario.rol === "cliente";
  res.locals.isAuthenticated = !!req.session.usuario;
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  requireCliente,
  addUserToViews,
};
