
module.exports = async (_, args, context, _info) => {
  let backupDb = {};

  await Promise.all(Object.entries(context.schemas).map(async ([schemaName, Model]) => {
    backupDb[schemaName] = await Model.find({})
  }))

  return JSON.stringify(backupDb, null, 2);
}
