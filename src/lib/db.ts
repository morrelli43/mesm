import { Pool } from 'pg';
import { Kysely, PostgresDialect, Generated } from 'kysely';

interface PageContentTable {
  id: Generated<number>;
  page: string;
  section: string;
  content: string;
}

interface Database {
  page_content: PageContentTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  })
});

export const db = new Kysely<Database>({
  dialect,
});
