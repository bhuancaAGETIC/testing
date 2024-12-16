import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginPage';
import { VerificationPage } from '../pageobjects/verificationPage';
import { RegistroPage } from '../pageobjects/registroPage';
import { DashboardPage } from '../pageobjects/dashboardPage';
import { PreregistroPage } from '../pageobjects/preregistroPage';
import { RegistroadminPage } from '../pageobjects/registroadminPage';
import path from 'path';



const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./testdata/data.json'));


test('tet preregistro ciudadania', async ({ browser }) => {
  // Creamos un nuevo contexto de navegador con permisos para cámara y micrófono
  const context = await browser.newContext({
    permissions: ['camera', 'microphone'], // Concede permisos necesarios
  });

  // Creamos las ventanas y ejecutamos el test en cada una de ellas
  for (const userData of data) {
    // Abrir una nueva página (ventana)
    const page = await context.newPage();

    const preregistroPage = new PreregistroPage(page);
    const verificationPage = new VerificationPage(page);

    await preregistroPage.navegarApreRegistro();
    await preregistroPage.aceptarTerminos();
    await preregistroPage.ingresarTelefono(userData.Telefono);

    await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
    await preregistroPage.ingresarCorreo(userData.Email);
    await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');

    if (userData.LugarNacimientoPais !== 'BOLIVIA') {
      console.log('El país no es Bolivia:', userData.LugarNacimientoPais); // Depuración
      await page.getByLabel('Cédula de identidad de').check();
    } else {
      console.log('El país es Bolivia:', userData.LugarNacimientoPais); // Depuración
    }

    await preregistroPage.llenarFormulario(userData);
    await preregistroPage.setPassword(userData);

    // Subir imágenes
    await preregistroPage.subirImagen('anverso', path.join(__dirname, '../images/anverso.jpeg'));
    await preregistroPage.subirImagen('reverso', path.join(__dirname, '../images/reverso.jpeg'));
    await preregistroPage.subirImagen('tuya', path.join(__dirname, '../images/perfil.jpeg'));

    await preregistroPage.confirmardatos();

    await expect(page.getByRole('img', { name: '¡Tu solicitud de pre registro' })).toBeVisible();
    await expect(page.getByRole('main')).toContainText('¡Tu solicitud de pre registro fue presentada!');

    await page.getByRole('button', { name: 'Comenzar la videollamada' }).click();
    await page.waitForTimeout(2000); 
    
// Ajusta el tiempo si es necesario
  }
});


test('test registro admin', async ({ page }) => {

  const registroadminPage = new RegistroadminPage(page);
  const verificationPage = new VerificationPage(page);

  await registroadminPage.navegarARegistroadmin();

  
 
  await registroadminPage.ingresarconCiudadania(process.env.CEDULA_ADMIN_ID || '', process.env.CONTRASENA_ADMIN || '');
  
  await verificationPage.seleccionarOpcionEmail();
  await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');

  await expect(page.getByText('Bienvenid@')).toBeVisible();

  await page.getByRole('button', { name: 'Pendientes' }).click();

  for (const record of data) {
    const documentNumber = record.NumeroDocumento;

    // Encontrar la fila que contiene el número de documento
    await page.waitForSelector(`tr:has-text("${documentNumber}")`);
    const row = await page.locator(`tr:has-text("${documentNumber}")`).first();
    await expect(row).toBeVisible();

    // Hacer clic en el botón de completar registro presencial
    const button = row.locator('#completarVirtual');
    await button.click();

    await page.getByRole('button', { name: 'Entrar a la sala' }).click();

    await expect(page.getByText('Puedes empezar a grabar.')).toBeVisible();

    await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiButtonBase-root').click(); 

    await page.getByRole('button', { name: 'Aceptar' }).click();

    await page.waitForTimeout(10000);

    await expect(page.getByText('Finalizando la grabación,')).toBeVisible();

  

    await expect(page.getByText('Grabación finalizada')).toBeVisible();
    await page.getByRole('button', { name: 'Finalizar llamada' }).click();
    await page.getByLabel('Lo datos del CI/CIE coinciden').check();
    await page.getByLabel('Las imágenes proporcionadas').check();
    await page.getByRole('button', { name: 'Aprobar' }).click();
 //   await page.getByRole('button', { name: 'Firmar y registrar' }).click();

    await page.getByRole('heading', { name: 'Confirmación de registro' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Volver atrás' }).click();

    // await registroadminPage.subirImagen(path.join(__dirname, '../images/presencial.jpg'));

    // await page.getByLabel('Lo datos del CI/CIE coinciden').check();
    // await page.getByLabel('Las imágenes proporcionadas').check();



  }
  

});