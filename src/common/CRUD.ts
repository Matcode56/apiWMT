export class CRUD {
  getAll: (limit: number, page: number) => Promise<any>
  getById: (id: number) => Promise<any>
  getByEmail: (email: string) => Promise<any>
  create: (resource: any) => Promise<any>
  putById?: (id: number, ressource: any) => Promise<string>
  patchById: (id: number, ressource: any) => Promise<any>
  deleteById: (id: number) => Promise<string>
}
