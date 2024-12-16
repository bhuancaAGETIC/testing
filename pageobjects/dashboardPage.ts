import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async obtenerDatosBienvenida(): Promise<{ mensaje: string; nombre: string; identificador: string }> {
    const containerSelector = 'div.MuiCardContent-root';

    await this.page.waitForSelector(containerSelector);

    const datos = await this.page.locator(`${containerSelector} p`).allInnerTexts();

    if (datos.length < 3) {
      throw new Error('Los datos de bienvenida están incompletos.');
    }

    return {
      mensaje: datos[0],
      nombre: datos[1],
      identificador: datos[2],
    };
  }

  async validarDatosBienvenida(): Promise<void> {
    const datos = await this.obtenerDatosBienvenida();

    if (!datos.mensaje.includes('Bienvenid@')) {
      throw new Error(`Mensaje inesperado: ${datos.mensaje}`);
    }

    console.log('Mensaje:', datos.mensaje);
    console.log('Nombre:', datos.nombre);
    console.log('Identificador:', datos.identificador);

  }

  async obtenerDatosPersonales(): Promise<{ nombres: string; fechaNacimiento: string; numeroDocumento: string; tipoDocumento: string }> {
    const containerSelector = 'div.MuiCardContent-root';

    await this.page.waitForSelector(containerSelector);

    const nombres = await this.page.locator('h6:has-text("Nombres") + p').innerText();
    const fechaNacimiento = await this.page.locator('h6:has-text("Fecha de nacimiento") + p').innerText();
    const numeroDocumento = await this.page.locator('h6:has-text("Número de documento") + p').innerText();
    const tipoDocumento = await this.page.locator('h6:has-text("Tipo de documento") + p').innerText();

    return { nombres, fechaNacimiento, numeroDocumento, tipoDocumento };
  }

  async validarDatosPersonales(): Promise<void> {
    const datosPersonales = await this.obtenerDatosPersonales();
    console.log('Datos personales:', datosPersonales);

    if (!datosPersonales.nombres) throw new Error('Faltan nombres en datos personales.');
    if (!datosPersonales.fechaNacimiento) throw new Error('Falta la fecha de nacimiento.');
    if (!datosPersonales.numeroDocumento) throw new Error('Falta el número de documento.');
    if (!datosPersonales.tipoDocumento) throw new Error('Falta el tipo de documento.');
  }

  async modificarDatosPersonales() {
    await this.page.getByRole('button', { name: 'Modificar datos personales' }).click();
    await expect(this.page.getByLabel('Modificar datos personales')).toBeVisible();
  }

  async cerrarModal() {
    await this.page.getByRole('button', { name: 'CANCELAR' }).click();
  }

  async cerrarModal2() {
    await this.page.getByRole('button', { name: 'Cerrar' }).click();
  }

  async obtenerDatosContacto(): Promise<{ correoElectronico: string; telefonoMovil: string }> {
    const containerSelector = 'div.MuiCardContent-root';

    await this.page.waitForSelector(containerSelector);

    const correoElectronico = await this.page.locator('h6:has-text("Correo electrónico") + div p').innerText();
    const telefonoMovil = await this.page.locator('h6:has-text("Teléfono móvil") + div p').innerText();

    return { correoElectronico, telefonoMovil };
  }

  async validarDatosContacto(): Promise<void> {
    const datosContacto = await this.obtenerDatosContacto();
    console.log('Datos de contacto:', datosContacto);

    if (!datosContacto.correoElectronico) throw new Error('Falta el correo electrónico.');
    if (!datosContacto.telefonoMovil) throw new Error('Falta el teléfono móvil.');
  }

  async editarCorreoElectronico() {
    await this.page.getByRole('button', { name: 'Editar correo electrónico' }).click();
    await expect(this.page.getByText('Nuevo correo electrónico')).toBeVisible();
  }

  async editarTelefono() {
    await this.page.getByRole('button', { name: 'Editar teléfono móvil' }).click();
    await expect(this.page.getByText('Nuevo número de teléfono')).toBeVisible();
  }

  async obtenerDatosSeguridad(): Promise<{ contrasena: string }> {
    const containerSelector = 'div.MuiGrid-root';

    await this.page.waitForSelector(containerSelector);

    const contrasena = await this.page.locator('h6:has-text("Contraseña") + div p').innerText();

    return { contrasena };
  }

  async validarDatosSeguridad(): Promise<void> {
    const datosSeguridad = await this.obtenerDatosSeguridad();
    console.log('Datos de seguridad:', datosSeguridad);

    if (!datosSeguridad.contrasena) throw new Error('Falta la contraseña.');
  }

  async editarContrasena() {
    await this.page.getByRole('button', { name: 'Editar contraseña' }).click();
    await expect(this.page.getByText('Nueva contraseña')).toBeVisible();
  }

  async irAHistorialDeSolicitudes() {
    await this.page.getByRole('button', { name: 'Historial de solicitudes' }).click();
  }

  async irAPerfil() {
    await this.page.getByRole('button', { name: 'Perfil' }).click();
  }

   async interactuarConMenu() {
    await this.page.getByRole('button', { name: '0' }).click();
    await this.page.mouse.click(100, 100);
    await this.page.locator('text=Ciudadano').click();
    await this.page.locator('role=menuitem >> nth=1').click();
    await this.page.locator('role=menuitem >> nth=2').click();
  }

  async cerrarSesion() {
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
  }

}
