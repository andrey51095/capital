
module.exports = async (_, args, context, _info) => {
  const { page, perPage } = args;
  const { Feed } = context.schemas;

  const feeds = await Feed.find().limit(perPage).skip(page * perPage).sort({
    createdAt: 'asc'
});

  return { page, feeds }
}
