import {test as baseTest,expect as baseExpect, Page} from "@playwright/test";
import { BasePage } from "../pages/BasePage";
    type DemoFixtures = {
  navigateToUrl: Page;
  basePage:BasePage;
};
export const test = baseTest.extend<DemoFixtures>({
  navigateToUrl: async ({ page },use) =>
    {
        await page.goto('https://www.qafeast.com/',{ waitUntil: 'domcontentloaded' });
        try {
    const acceptBtn = page.locator('#gdpr-cookie-accept');
    await acceptBtn.click({ timeout: 3000 });
    console.log('Cookies banner accepted ');
  } catch (e) {
    
    console.log('Cookies banner not found ');
  }
   await page.getByRole('link',{name:'Tools',exact:true}).click()
   await page.getByRole('link',{name:'Demo Site',exact:true}).click()
   await use(page);
},
basePage:async({page},use)=>
{
    const basePageInstance=new BasePage(page)
    await use(basePageInstance)
}
})
export const expect = baseExpect;