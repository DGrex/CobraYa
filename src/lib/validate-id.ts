export const validarCedulaEcuatoriana = (cedula: string): boolean =>{
  // Debe tener 10 dígitos
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.substring(0, 2), 10);
  const tercerDigito = parseInt(cedula[2], 10);

  // Provincia válida (01 a 24)
  if (provincia < 1 || provincia > 24) return false;

  // El tercer dígito debe ser menor a 6 para personas naturales
  if (tercerDigito >= 6) return false;

  // Algoritmo de validación (módulo 10)
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < coeficientes.length; i++) {
    let valor = parseInt(cedula[i], 10) * coeficientes[i];
    if (valor >= 10) valor -= 9;
    suma += valor;
  }

  const digitoVerificador = 10 - (suma % 10);
  const ultimoDigito = parseInt(cedula[9], 10);

  return (digitoVerificador === 10 ? 0 : digitoVerificador) === ultimoDigito;
}
