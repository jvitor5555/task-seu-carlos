const sequelize = require('../config/config')

const User = require('../models/user');
const Task = require('../models/task');

User.hasMany(Task, { foreignKey: 'userId' }); // 1 user, várias tasks
Task.belongsTo(User, { foreignKey: 'userId' }); // 1 task, um user

module.exports = {
    sequelize,
    User,
    Task
};
  
// Estamos usando esse arquivo para associar corretamente as tabelas e evitar erros de dependência circular o que dá erro underfind

// importar isso antes de sequelize.sync() para criar as tabelas corretamente