module.exports = async (_, { input }) => {
    const {User} = context.schemas;

    const existingUser = await User.findOne({ username: input.username });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const user = new User(input);
    await user.save();
    return { id: user.id, username: user.username };
  };