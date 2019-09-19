const createEntity = (request) => (entity, opt = {}) => {
  const basePath = (opt.prefix ? opt.prefix + "/" : "") + entity;
  const single = id =>
    Object.assign(
      {},
      {
        get: () => request("get", `${basePath}/${id}`),
        entity: nested => createEntity(nested, { prefix: `${entity}/${id}` }),
      }
    );

  const all = () => request("get", `${basePath}`);
  const create = data => request("post", `${basePath}`, data);
  const update = data => request("put", `${basePath}`, data);
  const del = data => request("delete", `${basePath}`, data);

  return Object.assign(
    {},
    {
      all,
      single,
      create,
      update,
      del,
    }
  );
};

export default createEntity;