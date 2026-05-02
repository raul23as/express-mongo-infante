import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Role from '../models/Role.js';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;

export default async function seedUsers() {
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
        console.warn('⚠️  Rol admin no encontrado. Ejecuta seedRoles primero.');
        return;
    }

    const adminExists = await User.findOne({ roles: adminRole._id });
    if (adminExists) {
        console.log('ℹ️  Usuario admin ya existe — saltando seed.');
        return;
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPwd = await bcrypt.hash('Admin#1234', saltRounds);

    await User.create({
        name: 'Admin',
        lastName: 'System',
        email: 'admin@system.com',
        password: hashedPwd,
        phoneNumber: '+10000000000',
        birthdate: new Date('1990-01-01'),
        roles: [adminRole._id],
    });

    console.log('🌱 Admin creado → admin@system.com / Admin#1234');
}
