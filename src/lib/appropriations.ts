import { sql } from '@vercel/postgres';

export interface Appropriation {
  id: string;
  year: number;
  agency: string;
  subunit: string;
  subcommittee: string;
  account: string;
  budget_number: string;
  budget_function: string;
  recipient: string;
  amount: number;
  location: string;
  member: string;
}

export class AppropriationsService {
  async searchAppropriations(query: string, filters: any = {}): Promise<Appropriation[]> {
    try {
      let sqlQuery = `
        SELECT *
        FROM appropriations
        WHERE 
          agency ILIKE $1 OR
          recipient ILIKE $1 OR
          location ILIKE $1 OR
          member ILIKE $1 OR
          subcommittee ILIKE $1
      `;

      const searchPattern = `%${query}%`;
      
      if (filters.year) {
        sqlQuery += ` AND year = ${filters.year}`;
      }

      sqlQuery += ' ORDER BY year DESC, amount DESC LIMIT 50';

      const result = await sql.query(sqlQuery, [searchPattern]);
      return result.rows;
    } catch (error) {
      console.error('Database search error:', error);
      throw error;
    }
  }

  async getStatistics(): Promise<any> {
    try {
      const stats = await sql.query(`
        SELECT 
          COUNT(*) as total_records,
          SUM(amount) as total_amount,
          AVG(amount) as avg_amount,
          COUNT(DISTINCT agency) as unique_agencies,
          COUNT(DISTINCT member) as unique_members
        FROM appropriations
      `);
      return stats.rows[0];
    } catch (error) {
      console.error('Database statistics error:', error);
      throw error;
    }
  }
} 