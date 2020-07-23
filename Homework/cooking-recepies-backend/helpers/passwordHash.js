'use strict'
import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (e) {
        throw e.stack;
    }
}

export async function comparePasswords(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (e) {
        throw e.stack;
    }
}