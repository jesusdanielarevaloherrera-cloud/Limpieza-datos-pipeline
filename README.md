# 🚀 Pipeline Automatizado de Limpieza de Texto CSV y Control de Calidad (n8n + JS + Notion)

Este proyecto es una solución **ETL (Extracción, Transformación y Carga)** 100% automatizada construida en **n8n**. Permite a los usuarios pegar directamente texto o código CSV en un formulario web, procesarlo y validarlo en tiempo real mediante **JavaScript/Regex**, y clasificar automáticamente los registros en **Notion**.

---

## 📌 El Problema

En las operaciones diarias, los equipos suelen copiar y pegar fragmentos de datos desde hojas de cálculo, sistemas legados o listas de correos con múltiples inconsistencias:
- Nombres desordenados (mayúsculas y minúsculas mixtas).
- Correos electrónicos con sintaxis errónea.
- Teléfonos sin código de país o sin formato internacional (E.164).
- Fechas inconsistentes.

Procesar estos datos manualmente toma tiempo y contamina las bases de datos o CRM principales.

---

## 🛠️ Arquitectura de la Solución

```text
[ Formulario Web (Textarea CSV) ]
               │
               ▼
   [ JS CSV Text Parser ] ──► (Conversión de texto plano CSV a Objetos JSON)
               │
               ▼
   [ JS Data Cleaning & QA ] ──► (Capitalización, E.164, Regex y Fechas ISO)
               │
               ▼
          [ Switch ]
           ├── (Registros VÁLIDOS) ──► [ Notion: Base de Contactos Limpia ]
           └── (Registros ERRORES) ──► [ Notion: Panel de QA / Rechazados ]
