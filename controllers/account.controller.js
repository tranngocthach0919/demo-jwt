const { admins } = require("../shared/shared");

class AccountsController {
    getAccounts(req, res) {
        res.json(admins);
    }
};

module.exports = new AccountsController;