import {expect} from '@playwright/test';
import { test } from '../fixtures/navigate';
import { BasePage } from '../pages/BasePage';
test.describe('Navigation Tests',()=>
{
    test.beforeEach(async({navigateToUrl})=>
    {
     await expect(navigateToUrl).toHaveURL("https://www.qafeast.com/demo");
  })
test('TC01_TextBox',{tag:'@regression'},async({page})=>{

    await page.getByLabel("Editable Text box:",{exact:true}).fill("Sample Text")
    await expect(page.getByLabel("Not Editable Text box:",{exact:true})).toBeDisabled()
    await page.getByRole('textbox', { name: 'Text box with some text:' }).fill('I am tester');

  })
  test('TC02_Frames',{tag:'@sanity'},async({basePage,page})=>
    {
    await basePage.clickNavigationBar('Frames')
      //const leftFrame = page.frame({ url: /frame-left\.php/ }); // or { name: 'frame-top' }
    //const leftFrame= page.frame({ url: /.*frame-left.php.*/ })
    const bottomFrame = page.frame({name:'frame-bottom'});
    if (!bottomFrame) throw new Error("Frame not found");
     const strongText = await bottomFrame.locator('#sub-frame-error-details strong').textContent();
     expect(strongText).toEqual('www.qafeast.com')
    })
    test('chatBox',async({basePage,page})=>
    {
      const dayjs = require('dayjs');
      await basePage.clickNavigationBar('Chat Window')
      const usernameInput=page.locator('h3 + div.form-group input#username');
      await usernameInput.waitFor({ state: "visible" });
      await usernameInput.fill(await basePage.getCurrentTimeSeconds());
      const password=await basePage.getCurrentTimeSeconds()
      await page.locator('div.chat-userlogin-wrap input#pwd.form-control').fill(password)
      await page.getByRole('checkbox',{name:' Remember me'}).click()
      await page.getByRole('button',{name:'Sign In'}).click()
      await page.getByRole('button',{name:'Chat'}).click()
      expect(page.locator('div.chat-popup')).toBeVisible()
      await page.getByRole('button',{name:'Close'}).click()
      expect(page.locator('div.chat-popup')).not.toBeVisible()
      await page.getByRole('button',{name:'Chat'}).click()
      await page.locator('textarea[name="msg"]').fill(dayjs().add(2,'day').format('YYYY-MM-DD HH:mm:ss'))
      await page.locator('textarea[name="msg"]').fill(dayjs().add(3,'day').format('YYYY-MM-DD HH:mm'))
      await page.getByRole('button',{name:'Send'}).click({delay:2000})
      console.log(dayjs().add(2,'day').foramt('YYYY-MM-DD HH:mm:ss'))
    })
})