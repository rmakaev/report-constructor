import Dexie, { Table } from "dexie";
import { Doc } from "./Doc";

export class DocsDB extends Dexie {
  docs!: Table<any>;
  items!: Table<any>;
  constructor() {
    super("DocsDB");
    this.version(1).stores({
      docs: "++id, name",
      items: "++id, docId",
    });
  }

  deleteList(uuid: string) {
    return this.transaction("rw", this.items, this.docs, () => {
      this.items.where({ DocId: uuid }).delete();
      this.docs.delete(uuid);
    });
  }
}

export const db = new DocsDB();

export function resetDatabase() {
  return db.transaction("rw", db.docs, db.items, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}
