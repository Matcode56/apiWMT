export class movieCRUD {
  getAll: (limit: number, page: number) => Promise<any>
  getById: (id: number) => Promise<any>
  create: (resource: any) => Promise<boolean>
  patchById: (id: number, ressource: any) => Promise<boolean>
  deleteById: (id: number) => Promise<boolean>
}
