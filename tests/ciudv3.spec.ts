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

test('PRUEBA DE INICIO DE SESION', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const verificationPage = new VerificationPage(page);

  await test.step('Navegar al login del portal', async () => {
    await loginPage.navegarAlPortal();
  });

  await test.step('Iniciar sesión con credenciales', async () => {
    await loginPage.iniciarSesion(process.env.CEDULA_ID || '', process.env.CONTRASENA || '');
  });

  await test.step('Seleccionar la opción de verificación de correo electrónico', async () => {
    await verificationPage.seleccionarOpcionEmail();
  });

  await test.step('Ingresar el código de verificación', async () => {
    await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
  });

  await test.step('Verificar que el botón de perfil esté visible', async () => {
    await expect(page.getByRole('button', { name: 'Ver Perfil' })).toBeVisible();
  });
});


// test('PRUEBA DE REGISTRO PORTAL', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const verificationPage = new VerificationPage(page);
//   const dashboardPage = new DashboardPage(page);

//   await test.step('Navegar al portal de inicio de sesión', async () => {
//     await loginPage.navegarAlPortal();
//   });

//   await test.step('Iniciar sesión con cédula y contraseña', async () => {
//     await loginPage.iniciarSesion(process.env.CEDULA_ID || '', process.env.CONTRASENA || '');
//   });

//   await test.step('Seleccionar opción de verificación por correo electrónico', async () => {
//     await verificationPage.seleccionarOpcionEmail();
//   });

//   await test.step('Completar el código de verificación', async () => {
//     await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
//   });

//   await test.step('Verificar que el mensaje de bienvenida es visible', async () => {
//     await expect(page.getByText('Bienvenid@')).toBeVisible();
//   });

//   await test.step('Abrir página de perfil en una nueva ventana', async () => {
//     const page2Promise = page.waitForEvent('popup');
//     await page.getByRole('button', { name: 'Ver Perfil' }).click();
//     const page2 = await page2Promise;
//   });

//   // await loginPage.navegarAlPortal();

//   // await dashboardPage.validarDatosBienvenida();

//   // await dashboardPage.validarDatosPersonales();

//   // await dashboardPage.modificarDatosPersonales();
//   // await dashboardPage.cerrarModal();

//   // await dashboardPage.validarDatosContacto();

//   // await dashboardPage.editarCorreoElectronico();
//   // await dashboardPage.cerrarModal2();
  
//   // await dashboardPage.editarTelefono();
//   // await dashboardPage.cerrarModal2();

//   // await dashboardPage.validarDatosSeguridad();

//   // await dashboardPage.validarDatosSeguridad();
//   // await dashboardPage.editarContrasena();
//   // await dashboardPage.cerrarModal2();

//   // await dashboardPage.irAHistorialDeSolicitudes();
//   // await dashboardPage.irAPerfil();
//   // await dashboardPage.interactuarConMenu();
//   // await dashboardPage.cerrarSesion();

//   // await expect(page.getByRole('button', { name: 'Ingresa con Ciudadanía' })).toBeVisible(); 

// });


// test('PRUEBA REGISTRO', async ({ page }) => {
//   const registroPage = new RegistroPage(page);
//   const verificationPage = new VerificationPage(page);
//   const dashboardPage = new DashboardPage(page);

//   await test.step('Navegar a la página de registro', async () => {
//     await registroPage.navegarARegistro();
//   });

//   await test.step('Iniciar sesión con cédula y contraseña', async () => {
//     await registroPage.ingresarconCiudadania(process.env.CEDULA_ID || '', process.env.CONTRASENA || '');
//   });

//   await test.step('Seleccionar opción de verificación por correo electrónico', async () => {
//     await verificationPage.seleccionarOpcionEmail();
//   });

//   await test.step('Ingresar código de verificación', async () => {
//     await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
//   });

//   await test.step('Verificar que el mensaje de bienvenida es visible', async () => {
//     await expect(page.getByText('Bienvenid@')).toBeVisible();
//   });

//   await test.step('Validar datos de bienvenida en el dashboard', async () => {
//     await dashboardPage.validarDatosBienvenida();
//   });

//   await test.step('Validar datos personales', async () => {
//     await dashboardPage.validarDatosPersonales();
//   });

//   await test.step('Modificar y cerrar modal de datos personales', async () => {
//     await dashboardPage.modificarDatosPersonales();
//     await dashboardPage.cerrarModal();
//   });

//   await test.step('Validar datos de contacto', async () => {
//     await dashboardPage.validarDatosContacto();
//   });

//   await test.step('Editar correo electrónico y cerrar modal', async () => {
//     await dashboardPage.editarCorreoElectronico();
//     await dashboardPage.cerrarModal2();
//   });

//   await test.step('Editar teléfono y cerrar modal', async () => {
//     await dashboardPage.editarTelefono();
//     await dashboardPage.cerrarModal2();
//   });

//   await test.step('Validar datos de seguridad', async () => {
//     await dashboardPage.validarDatosSeguridad();
//   });

//   await test.step('Editar contraseña y cerrar modal', async () => {
//     await dashboardPage.editarContrasena();
//     await dashboardPage.cerrarModal2();
//   });

//   await test.step('Ir al historial de solicitudes', async () => {
//     await dashboardPage.irAHistorialDeSolicitudes();
//   });

//   await test.step('Ir al perfil de usuario', async () => {
//     await dashboardPage.irAPerfil();
//   });

//   await test.step('Interactuar con el menú del dashboard', async () => {
//     await dashboardPage.interactuarConMenu();
//   });

//   await test.step('Cerrar sesión', async () => {
//     await dashboardPage.cerrarSesion();
//   });

//   await test.step('Verificar que el botón de inicio de sesión es visible', async () => {
//     await expect(page.getByRole('button', { name: 'Ingresa con Ciudadanía' })).toBeVisible();
//   });
// });

// test('PRUEBA PRE-REGISTRO', async ({ page }) => {

//   const preregistroPage = new PreregistroPage(page);
//   const verificationPage = new VerificationPage(page);

//   for (const userData of data) {
    
//     await test.step('Navegar a la página de preregistro', async () => {
//       await preregistroPage.navegarApreRegistro();
//     });

//     await test.step('Aceptar términos y condiciones', async () => {
//       await preregistroPage.aceptarTerminos();
//     });

//     await test.step('Ingresar teléfono', async () => {
//       await preregistroPage.ingresarTelefono(userData.Telefono);
//     });

//     await test.step('Completar código de verificación para teléfono', async () => {
//       await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
//     });

//     await test.step('Ingresar correo electrónico', async () => {
//       await preregistroPage.ingresarCorreo(userData.Email);
//     });

//     await test.step('Completar código de verificación para correo', async () => {
//       await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
//     });

//     await test.step('Seleccionar tipo de documento según país', async () => {
//       if (userData.LugarNacimientoPais !== 'BOLIVIA') {
//         console.log('El país no es Bolivia:', userData.LugarNacimientoPais); 
//         await page.getByLabel('Cédula de identidad de').check();
//       } else {
//         console.log('El país es Bolivia:', userData.LugarNacimientoPais);  
//       }
//     });

//     await test.step('Llenar formulario con los datos del usuario', async () => {
//       await preregistroPage.llenarFormulario(userData);
//     });

//     await test.step('Establecer la contraseña', async () => {
//       await preregistroPage.setPassword(userData);
//     });

//     await test.step('Subir imágenes', async () => {
//       await preregistroPage.subirImagen('anverso', path.join(__dirname, '../images/anverso.jpeg'));
//       await preregistroPage.subirImagen('reverso', path.join(__dirname, '../images/reverso.jpeg'));
//       await preregistroPage.subirImagen('tuya', path.join(__dirname, '../images/perfil.jpeg'));
//     });

//     await test.step('Confirmar datos', async () => {
//       await preregistroPage.confirmardatos();
//     });

//     await test.step('Verificar que la imagen de éxito es visible', async () => {
//       await expect(page.getByRole('img', { name: '¡Tu solicitud de pre registro' })).toBeVisible();
//     });

//     await test.step('Verificar que el mensaje de éxito está presente', async () => {
//       await expect(page.getByRole('main')).toContainText('¡Tu solicitud de pre registro fue presentada!');
//     });
//   }


//     // await page.getByRole('button', { name: '¿Quieres cancelar tu' }).click();
//     // await page.getByRole('button', { name: 'Aceptar' }).click();
//     // await expect(page.getByRole('img', { name: 'imagen' })).toBeVisible();
//     // await expect(page.getByText('Su solicitud fue anulado')).toBeVisible();

//     // await page.getByRole('button', { name: 'Entendido' }).click();

//     // await page.getByRole('button', { name: 'Comenzar la videollamada' }).click();
//     // await page.getByRole('button', { name: 'Finalizar' }).click();


// // aumentar video, 

// // aprobacion de documentos, notificador, 


  
// });


// test(' PRUEBA REGISTRO ADMIN', async ({ page }) => {
//   const registroadminPage = new RegistroadminPage(page);
//   const verificationPage = new VerificationPage(page);

//   await test.step('Navergar a la página de registro de administrador', async () => {
//     await registroadminPage.navegarARegistroadmin();
//   });

//   await test.step('Iniciar sesión como administrador con credenciales', async () => {
//     await registroadminPage.ingresarconCiudadania(process.env.CEDULA_ADMIN_ID || '', process.env.CONTRASENA_ADMIN || '');
//   });

//   await test.step('Seleccionar la opción de verificación de correo electrónico', async () => {
//     await verificationPage.seleccionarOpcionEmail();
//   });

//   await test.step('Ingresar el código de verificación', async () => {
//     await verificationPage.completarCodigoVerificacion(process.env.CODIGO_VERIFICACION || '');
//   });

//   await test.step('Verificar que el mensaje de bienvenida esté visible', async () => {
//     await expect(page.getByText('Bienvenid@')).toBeVisible();
//   });

//   await test.step('Click en el botón Pendientes', async () => {
//     await page.getByRole('button', { name: 'Pendientes' }).click();
//   });

//   await test.step('Iterar sobre los datos y completar el registro', async () => {
//     for (const record of data) {
//       const documentNumber = record.NumeroDocumento;
//       const row = await registroadminPage.seleccionarFilaPorDocumento(documentNumber);

//       await registroadminPage.completarRegistroPresencial(
//         row,
//         path.join(__dirname, '../images/presencial.jpg')
//       );

//       await page.getByRole('button', { name: 'Volver atrás' }).click();
//     }
//   });
// });