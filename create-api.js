import createEntity from "./lib/entity";
import authService from "./lib/auth";

export default function createApi(http) {
  const request = (method, path, data = {}) =>
    http[method](path, data)
      .then(resp => resp.data)
      .catch(http.handleError);

  return Object.assign(
    {},
    {
      entity: createEntity(request),
      auth: authService(request),
    }
  );
}
