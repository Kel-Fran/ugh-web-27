import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { BlockListEntry } from './types/BlockListEntry.js';

type BlockListEntryDTO = { [k in keyof BlockListEntry]?: string }

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('index')
    async getHello() {
        return {
            entries: (await this.appService.getAllEntries()).toSorted((a, b) => a.priority - b.priority)
        }
    }

    @Post()
    @Render('index')
    async postHello(@Body() body: BlockListEntryDTO) {
        if (body.priority && body.mac && /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(body.mac)) await this.appService.createEntry({
            priority: +body.priority,
            mac: body.mac,
            enabled: body.enabled === 'on' ? 1 : 0
        })
        return {
            entries: (await this.appService.getAllEntries()).toSorted((a, b) => a.priority - b.priority)
        }
    }
}
