// Hook desabilitado temporariamente - admin-api não está em uso
export function useAdminApi() {
  return {
    health: async () => ({ status: "disabled" }),
  };
}
