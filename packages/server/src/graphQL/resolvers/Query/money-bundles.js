
module.exports = async (_, _args, context, _info) => {
  const {MoneyBundle} = context.schemas;
  const bundles = await MoneyBundle.find({deletedAt: 0});

  return bundles;
};
