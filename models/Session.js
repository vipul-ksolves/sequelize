
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('session', {
        session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        jwt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Session
}