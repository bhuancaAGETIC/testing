import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class RegistroPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navegarARegistro(): Promise<void> {

    const url = process.env.REGISTRO_URL || '';
    await this.page.goto(url);
  }

  async ingresarconCiudadania(cedula: string, contrasena: string): Promise<void> {
    
    await this.page.getByRole('button', { name: 'Ingresa con Ciudadanía' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('textbox', { name: 'Cédula de identidad' }).fill(cedula);
    await this.page.getByRole('textbox', { name: 'Contraseña' }).fill(contrasena);
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
    await this.page.waitForTimeout(1000);

  }
}
