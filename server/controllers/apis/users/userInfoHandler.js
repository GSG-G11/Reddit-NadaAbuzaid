const userInfoHandler = (req, res) => {
  res.json({
    id: req.userInformation.id,
    username: req.userInformation.username,
    email: req.userInformation.email,
  });
};

module.exports = userInfoHandler;
