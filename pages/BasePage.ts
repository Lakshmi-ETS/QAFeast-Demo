import {test, expect,Page} from '@playwright/test'
import { text } from 'stream/consumers';
export class BasePage
{
 page:Page
 constructor(page: Page) {
        this.page = page;

    }
    async clickNavigationBar(label:string)
    {
        const labelLocator = this.page.locator(`li label:text-is("${label}")`);
        await labelLocator.waitFor({ state: 'visible' });
        await labelLocator.waitFor({ state: 'attached' }); // ensures it’s in DOM
        await labelLocator.click({ trial: false , delay: 2000 }); // Playwright will try to click once element is actionable

        let header=label
        if(label=='Frames')
        {
            header='Frame'
        }
        if(label=='File Upload & Download event')
        {
            header='File Uploader'
        }
        await expect(this.page.locator('.rghtside-inner:not([style*="display: none"]) h2.page-title')).toHaveText(header)
       await this.page.waitForLoadState('domcontentloaded');
    }
    async getCurrentTimeSeconds()
        {
            const dayjs = require('dayjs');
            const now =dayjs()
            return await now.format('YYYY-MM-DD HH:mm:ss')
        }

}