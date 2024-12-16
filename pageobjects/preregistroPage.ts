import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class PreregistroPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navegarApreRegistro(): Promise<void> {
    const url = process.env.PREREGISTRO_URL || '';
    await this.page.goto(url);
  }

  async aceptarTerminos() {
    await this.page.getByLabel('He leído y acepto los té').check();
    await this.page.getByRole('button', { name: 'Empezar' }).click();
  }

  async ingresarTelefono(telefono: string) {
    await this.page.getByLabel('Número de teléfono').click();
    await this.page.fill('input[name="valorCelular"]', telefono);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async ingresarCorreo(correo: string) {
    await this.page.fill('input[name="valorCorreo"]', correo);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async llenarFormulario(userData: any) {

    let documentoConComplemento = userData.NumeroDocumento;
    if (userData.ComplementoVisible === 1 && userData.Complemento) {
      documentoConComplemento = `${userData.NumeroDocumento}-${userData.Complemento}`;
    }
    await this.page.fill('input[name="documento"]', documentoConComplemento);
    await this.page.fill('input[name="nombres"]', userData.Nombres);
    await this.page.fill('input[name="primerApellido"]', userData.PrimerApellido);
    await this.page.fill('input[name="segundoApellido"]', userData.SegundoApellido);
    await this.page.fill('input[name="fechaNacimiento"]', userData.FechaNacimiento);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async setPassword(userData: any) {
   // const documentoConComplemento = userData.NumeroDocumento + (userData.ComplementoVisible === 1 ? `-${userData.Complemento}` : '');
    await this.page.fill('input[name="contrasena"]', `${userData.NumeroDocumento}${userData.PrimerApellido}`);
    await this.page.fill('input[name="contrasena2"]', `${userData.NumeroDocumento}${userData.PrimerApellido}`);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async subirImagen(tipo: 'anverso' | 'reverso' | 'tuya', rutaImagen: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
  
    const texto = tipo === 'tuya' ? 'Sube una foto tuya' : `Sube una foto del ${tipo} de`;
  
    await this.page.getByText(texto).click();
    await this.page.getByRole('button', { name: 'Seleccionar imagen' }).click();
    
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(rutaImagen);
    
    await this.page.getByRole('button', { name: 'GUARDAR' }).click();

    await this.page.getByRole('button', { name: 'Continuar' }).click();
}

async confirmardatos() {
  await this.page.getByRole('button', { name: 'Confirmar' }).click();
  
}


}
