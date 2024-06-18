const role = (requiredRole) => (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = { role };
  