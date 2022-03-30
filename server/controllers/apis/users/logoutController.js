const logoutController = (req, res) => {
  res
    .status(205)
    .clearCookie('token')
    .json({ message: 'Logout successfully', status: 205 });
};

module.exports = logoutController;
