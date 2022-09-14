
module.exports = async (_, args, context, _info) => {
  const { id } = args;
  const {MoneyBundle, Feed} = context.schemas;


  const oldDoc = await MoneyBundle.findOne({ id })

  if (oldDoc.deletedAt) {
    throw new Error('Already deleted')
  }
  const newDoc = await findOneAndUpdate({ id }, {deletedAt: Date.now()}, {
    new: true
  });

  let newFeedItem = { from: JSON.stringify(oldDoc), to: JSON.stringify(newDoc) };

  Feed.create(newFeedItem)
  return newDoc;
}
