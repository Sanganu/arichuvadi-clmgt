// Single source of truth for auth/role getting.

const getUser = (req) => req.session?.user || null;

export const requireAuth = () => (req, res, next) => {
  if (!getUser(req)) return res.status(401).json({ error: "Not authenticated" });
  next();
};

export const requireRole = (roles) => {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    const user = getUser(req);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    if (!allowed.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}; 