import { Page } from 'playwright';
import { expect, Locator } from 'playwright/test';

export class RegistroadminPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navegarARegistroadmin(): Promise<void> {
    const url = process.env.REGISTRO_ADMIN_URL || '';
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

  async subirImagen(rutaImagen: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');

    // Click en el botón para subir una imagen
    await this.page.getByRole('button', { name: 'Modificar' }).nth(3).click();
    await this.page.getByRole('button', { name: 'Subir fotografía' }).click();

    // captura
    //await this.page.getByRole('button', { name: 'Tomar fotografía' }).click();
    // await this.page.getByRole('button', { name: 'Capturar' }).click();

    // Espera y establece el archivo seleccionado
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(rutaImagen);

    // Guarda y continúa con el flujo
    await this.page.getByRole('button', { name: 'GUARDAR' }).click();

  }

  async seleccionarFilaPorDocumento(numeroDocumento: string) {
    await this.page.waitForSelector(`tr:has-text("${numeroDocumento}")`);
    const row = await this.page.locator(`tr:has-text("${numeroDocumento}")`).first();
    await expect(row).toBeVisible();
    return row;
  }

  async completarRegistroPresencial(row: Locator, rutaImagen: string) {
    const button = row.locator('#completarPresencial');
    await button.click();
    await this.subirImagen(rutaImagen);

    await this.page.getByLabel('Lo datos del CI/CIE coinciden').check();
    await this.page.getByLabel('Las imágenes proporcionadas').check();
  }

  

}
