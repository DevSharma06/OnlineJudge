const requireModRole = (req, res, next) => {
  const { role } = req.params;

  if (role === "Mod" || role === "Admin") {
    next();
  } else {
    return res.status(401).json({ error: "Only Mods can perform this action" });
  }
};

module.exports = requireModRole;
