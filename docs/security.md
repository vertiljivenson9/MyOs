# yOs Security Model

yOs utiliza un modelo de seguridad por aislamiento lógico y permisos declarativos.

## Amenazas consideradas

- Apps maliciosas
- Escalada de privilegios
- Acceso no autorizado a recursos
- Bloqueo del sistema por procesos abusivos

## Aislamiento

Cada aplicación:
- tiene su propio contexto
- no accede a memoria de otras apps
- no controla procesos ajenos

## Permisos

Las apps deben declarar permisos explícitos:
- filesystem
- network
- window
- wallet (lectura limitada)

El kernel valida cada acción sensible.

## Procesos

- El kernel puede pausar o matar procesos
- El terminal respeta el mismo modelo de permisos
- No existen comandos con acceso total

## Economía segura

- Ninguna app controla pagos directamente
- El wallet valida cada transacción
- Las licencias se verifican antes de ejecutar apps pagas
