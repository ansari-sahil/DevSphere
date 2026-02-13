import User from "../models/User.js";

export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const admins = await User.countDocuments({ role: "admin" });
    const verifiedUsers = await User.countDocuments({
      isEmailVerified: true,
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        admins,
        verifiedUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const toggleActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.user.id === user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate yourself",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: "User status updated",
    });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (req.user.id === user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: "Role updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.user.id === user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete yourself",
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
