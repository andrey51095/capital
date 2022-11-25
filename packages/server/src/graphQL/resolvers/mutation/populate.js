
module.exports = async (_, args, context, _info) => {
  const data = JSON.parse(args.data);
  await Promise.all(Object.entries(context.schemas).map(async ([schemaName, Model]) => {
    await Model.deleteMany({});
    await Model.insertMany(data[schemaName])
  }))

  return true;
}
