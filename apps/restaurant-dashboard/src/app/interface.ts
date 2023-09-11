export interface ICrudService<T> {
  getAll: () => Promise<T[]>;
  getOne: (id: string) => Promise<T | null>;
  create: (data: T) => Promise<T>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
}
