const requireAdminRole = (req, res, next) => {
  const { role } = req.params;

  if (role === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ error: "This action can only be performed by Admin" });
  }
};

module.exports = requireAdminRole;
