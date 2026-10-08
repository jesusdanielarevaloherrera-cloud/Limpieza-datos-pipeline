const validRecords = [];
const invalidRecords = [];

// Expresión regular para validar formato de email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\$/;

for (const item of \$input.all()) {
  const raw = item.json;
  let errors = [];

  // 1. Limpieza y capitalización de Nombre
  let cleanName = (raw.Nombre || '').trim();
  cleanName = cleanName
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  if (!cleanName) errors.push("Nombre ausente");

  // 2. Validación de Email
  let cleanEmail = (raw.Email || '').trim().toLowerCase();
  if (!emailRegex.test(cleanEmail)) {
    errors.push("Email inválido");
  }

  // 3. Normalización de Teléfono (Formato internacional E.164)
  let cleanPhone = (raw.Telefono || '').replace(/[\s\(\)\-\.]/g, '');
  if (cleanPhone && !cleanPhone.startsWith('+')) {
    cleanPhone = '+58' + cleanPhone.replace(/^0+/, ''); 
  }
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.push("Teléfono incompleto o inválido");
  }

  // 4. Formateo de Fecha a ISO (YYYY-MM-DD)
  let cleanDate = '';
  const rawDate = (raw.Fecha || '').trim();
  if (rawDate.includes('/')) {
    const parts = rawDate.split('/');
    if (parts.length === 3) {
      cleanDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  } else if (rawDate.includes('-') && rawDate.length === 10) {
    cleanDate = rawDate;
  } else {
    errors.push("Formato de fecha inválido");
  }

  // 5. Normalización de Empresa a mayúsculas
  let cleanCompany = (raw.Empresa || '').trim().toUpperCase();

  // Clasificación del registro según los errores encontrados
  if (errors.length === 0) {
    validRecords.push({
      json: {
        status: "VALIDO",
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        registerDate: cleanDate,
        company: cleanCompany,
        sourceId: raw.ID || ''
      }
    });
  } else {
    invalidRecords.push({
      json: {
        status: "ERROR",
        rawName: raw.Nombre || '',
        rawEmail: raw.Email || '',
        reasons: errors.join(', ')
      }
    });
  }
}

// Retorna un arreglo unificado con etiquetas de estado para el nodo Switch
return [...validRecords, ...invalidRecords];