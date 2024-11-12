export interface Repository<T = unknown, C = T, U = T> {
  create(data: C): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined | null>;
  update(id: string, data: U): Promise<T | undefined | null>;
  delete(id: string): Promise<T | undefined | null>;
}
