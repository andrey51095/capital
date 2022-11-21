
module.exports = async (_, args, context, _info) => {
  const {MoneyBundle, Feed} = context.schemas;

  const doc = await MoneyBundle.create(args)
  Feed.create({ to: JSON.stringify(doc) })

  return doc;
}
