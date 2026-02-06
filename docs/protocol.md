# yOs Protocol

El protocolo define cómo se comunican los módulos del sistema y las aplicaciones.

## Principios

- Mensajes explícitos
- Sin dependencias implícitas
- Errores controlados
- Versionable

## Estructura base de mensaje

{
  "source": "module | app",
  "target": "module",
  "action": "string",
  "payload": {},
  "requestId": "uuid"
}

## Respuesta

{
  "requestId": "uuid",
  "status": "ok | error",
  "data": {},
  "error": "CODE_OPTIONAL"
}

## Reglas

- Ningún módulo puede ejecutar acciones fuera de su responsabilidad
- El kernel valida permisos antes de ejecutar
- Las apps nunca se comunican entre sí directamente
- Todo acceso sensible pasa por el kernel

## Compatibilidad futura

El protocolo está diseñado para:
- SDKs externos
- apps de terceros
- múltiples versiones coexistiendo
