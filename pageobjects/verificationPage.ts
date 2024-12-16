import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class VerificationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async seleccionarOpcionEmail(): Promise<void> {

    // await this.page.getByRole('button', {name:'Probar otro medio de verificación'}).click()
    await this.page.locator('input[value="EMAIL"]').click();
    await this.page.getByRole('button', { name: 'Continuar' }).click();

  }
  
  async completarCodigoVerificacion(codigo: string): Promise<void> {

    for (let i = 0; i < codigo.length; i++) {
      const field = this.page.getByLabel(`Number ${i + 1}`);
      await expect(field).toBeVisible();
      await field.fill(codigo[i]);
    }
    await this.page.getByRole('button', { name: 'Continuar' }).click();

    // Autorizar Datos si es la primera vez
    // await this.page.getByRole('button', { name: 'Permitir' }).click();
    await this.page.waitForTimeout(1000);

  }
  
}
