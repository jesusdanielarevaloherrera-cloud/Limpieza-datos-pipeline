# 🚀 Pipeline Automatizado de Limpieza de Datos y Control de Calidad (n8n + JavaScript + Notion)

Este proyecto es una solución **ETL (Extracción, Transformación y Carga)** 100% automatizada construida en **n8n**. Está diseñada para procesar cargas de datos mediante archivos CSV, limpiarlos y validarlos en tiempo real utilizando **JavaScript/Regex**, y clasificarlos automáticamente en **Notion**.

---

## 📌 El Problema

En las operaciones diarias de ventas, soporte o marketing, la recepción manual de listas de prospectos o contactos suele incluir múltiples inconsistencias:
- Nombres sin formato uniforme (combinación desordenada de mayúsculas y minúsculas).
- Correos electrónicos con sintaxis o estructura inválida.
- Números telefónicos locales sin código de país o sin formato internacional (E.164).
- Fechas registradas en formatos heterogéneos.

Corregir estos datos manualmente toma horas de trabajo repetitivo y corre el riesgo de ingresar información corrupta o duplicada a la base de datos principal o CRM.

---

## 🛠️ Arquitectura de la Solución

```text
[ Formulario Web / Carga CSV ]
             │
             ▼
    [ Extract From File ]
             │
             ▼
   [ JS Data Cleaning & QA ] ──► (Capitalización, E.164, Regex y Fechas ISO)
             │
             ▼
        [ Switch ]
         ├── (Registros VÁLIDOS) ──► [ Notion: Base de Contactos Limpia ]
         └── (Registros ERRORES) ──► [ Notion: Panel de QA / Rechazados ]
