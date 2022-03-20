import Dexie, { Table } from "dexie";
import { Doc } from "./Doc";

export class DocsDB extends Dexie {
  docs!: Table<Doc, number>;
  items!: Table<any>;
  constructor() {
    super("DocsDB");
    this.version(1).stores({
      docs: "++id",
      items: "++uuid,docId",
    });
  }

  deleteList(DocId: number) {
    return this.transaction("rw", this.items, this.docs, () => {
      this.items.where({ DocId }).delete();
      this.docs.delete(DocId);
    });
  }
}

export const db = new DocsDB();

export function resetDatabase() {
  return db.transaction("rw", db.docs, db.items, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}
