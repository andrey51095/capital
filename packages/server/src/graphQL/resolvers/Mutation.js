const createMoneyBundle = async (_, args, context, _info) => {
  const {MoneyBundle, Feed} = context.schemas;

  const doc = await MoneyBundle.create(args)
  Feed.create({ to: JSON.stringify(doc) })

  return doc;
};

const updateMoneyBundle = async (_, args, context, _info) => {
  const {id, transfer, ...fieldsToUpdate} = args;
  const {MoneyBundle, Feed} = context.schemas;

  const oldDoc = await MoneyBundle.findOneAndUpdate({ id }, {
    ...fieldsToUpdate,
    updatedAt: Date.now(),
  })
  const newDoc = await MoneyBundle.findOne({ id });
  let newFeedItem = {from: JSON.stringify(oldDoc), to: JSON.stringify(newDoc)};

  if (transfer && Array.isArray(transfer) && transfer.length) {
    const transferredToItems = await Promise.all(transfer.map(async ({id, ...transferArgs}) => {
      if (id) {
        const docToUpdate = await MoneyBundle.findOne({ id });
        const amountToUpdate = transferArgs.amount + docToUpdate.amount;
        const updatedDoc = await MoneyBundle.updateOne({ id }, { amount: amountToUpdate, updatedAt: Date.now()}, { new: true });
        return {id, amount: amountToUpdate}
      }

      const createdMoneyTransfer = await createMoneyBundle(_, transferArgs, context, _info);
      return {id: createdMoneyTransfer.id, amount: createdMoneyTransfer.amount}
    }))
    newFeedItem.transferredTo = JSON.stringify(transferredToItems)
  }
  Feed.create(newFeedItem)

  return newDoc;
};

module.exports = {
  createMoneyBundle,
  updateMoneyBundle,
};
