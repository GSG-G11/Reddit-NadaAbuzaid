const logoutController = (req, res) => {
  res
    .status(205)
    .clearCookie('access_token')
    .json({ message: 'Logout successfully', status: 205 });
};

module.exports = logoutController;
