const createMoneyBundle = async (_, args, context, _info) => {
  const {MoneyBundle, Feed} = context.schemas;

  const doc = await MoneyBundle.create(args)
  Feed.create({ to: JSON.stringify(doc) })

  return doc;
};

const updateMoneyBundle = async (_, args, context, _info) => {
  const {id, ...fieldsToUpdate} = args;
  const {MoneyBundle, Feed} = context.schemas;

  const oldDoc = await MoneyBundle.findOneAndUpdate({ id }, {
    ...fieldsToUpdate,
    updatedAt: Date.now(),
  }, {new: true})

  const newDoc = await Character.findOne({ id });
  Feed.create({from: JSON.stringify(oldDoc), to: JSON.stringify(newDoc)})

  return newDoc;
};

module.exports = {
  createMoneyBundle,
  updateMoneyBundle,
};
