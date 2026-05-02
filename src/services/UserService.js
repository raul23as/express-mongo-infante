import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';

class UserService {

    async getAll() {
        const users = await userRepository.getAll();
        return users.map(user => ({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            address: user.address,
            url_profile: user.url_profile,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt,
            age: user.age
        }));
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            address: user.address,
            url_profile: user.url_profile,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt,
            age: user.age
        };
    }

    async updateMe(id, data) {
        const updateData = { ...data };
        if (data.password) {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
            updateData.password = await bcrypt.hash(data.password, saltRounds);
        }
        const user = await userRepository.updateById(id, updateData);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            address: user.address,
            url_profile: user.url_profile,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt,
            age: user.age
        };
    }
}

export default new UserService();
