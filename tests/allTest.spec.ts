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
  test('TC02_Frames',{tag:'@sanity'},async({basePage,page},)=>
    {
    await basePage.clickNavigationBar('Frames')
      //const leftFrame = page.frame({ url: /frame-left\.php/ }); // or { name: 'frame-top' }
    //const leftFrame= page.frame({ url: /.*frame-left.php.*/ })
    const bottomFrame = page.frame({name:'frame-bottom'});
    if (!bottomFrame) throw new Error("Frame not found");
     const strongText = await bottomFrame.locator('#sub-frame-error-details strong').textContent();
     expect(strongText).toEqual('www.qafeast.com')
    })
})