import { Page } from 'playwright';

export class LoginPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navegarAlPortal(): Promise<void> {
    const url = process.env.PORTAL_URL || '';
    await this.page.goto(url);
  }

  async iniciarSesion(cedula: string, contrasena: string): Promise<void> {
    
    await this.page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('textbox', { name: 'Cédula de identidad' }).fill(cedula);
    await this.page.getByRole('textbox', { name: 'Contraseña' }).fill(contrasena);
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
    await this.page.waitForTimeout(1000);
  }
}
