const rolePermissions = {
  admin: ['createUser', 'updateUser', 'deleteUser', 'listUsers'],
  super_admin: ['createUser', 'updateUser', 'deleteUser', 'listUsers'],
  doctor: ['listUsers'],
  pharmacist: ['listUsers'],
  health_assistant: ['listUsers'],
  lab_technician: ['listUsers'], 
};

// const authorizeRole = (action) => {
//   return (req, res, next) => {
//     const userRoles = req.user.roles || [];
    
//     const hasPermission = userRoles.some(role => rolePermissions[role]?.includes(action));
    
//     if (hasPermission) {
//       next();  // User has the required permission
//     } else {
//       return res.status(403).json({ message: 'Forbidden: Access Denied' });
//     }
//   };
// };

// const authorizeRole = (roles) => {
//   return (req, res, next) => {
//     console.log('Decoded user info:', req.user)
//     const userRoles = req.user.roles || [];
    
//     if (roles.some(role => userRoles.includes(role))) {
//       next();  // User has the required role
//     } else {
//       return res.status(403).json({ message: 'Forbidden: Access Denied' });
//     }
//   };
// };

const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];
    
    console.log('Decoded user info:', req.user)
    console.log('User roles:', userRoles);

    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
  };
}

module.exports = authorizeRole;
