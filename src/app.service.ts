import { Injectable } from '@nestjs/common';
import * as msql from 'mysql2/promise'
import type { BlockListEntry } from './types/BlockListEntry.js';

const pool = msql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pwd',
    database: 'test1'
});

export type BlockListEntryCreateInfo = Omit<BlockListEntry, 'id'>;

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getAllEntries() {
        const [rows] = await pool.execute('SELECT * FROM blocklist');
        return rows as BlockListEntry[];
    }

    async createEntry(info: BlockListEntryCreateInfo) {
        await pool.execute('INSERT INTO blocklist(priority,mac,enabled) VALUES (?, ?, ?)', [info.priority, info.mac, info.enabled])
    }
}
