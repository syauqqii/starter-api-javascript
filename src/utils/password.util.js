const bcrypt = require('bcrypt');

class PasswordUtil {
    static async HashPassword(PLAIN_TEXT_PASSWORD, SALT_ROUNDS = 10) {
        const hash = await bcrypt.hash(PLAIN_TEXT_PASSWORD, SALT_ROUNDS);

        return hash;
    }

    static async ComparePasswords(PLAIN_TEXT_PASSWORD, HASHED_PASSWORD) {
        const compare = await bcrypt.compare(PLAIN_TEXT_PASSWORD, HASHED_PASSWORD);

        return compare;
    }
}

module.exports = PasswordUtil;