exports.getProfile = async (req, res) => {
    res.json({ message: "Profile fetched", userID: req.userID });
};

exports.updateProfile = async (req, res) => {
    res.json({ message: "Profile updated", userID: req.userID });
};
