# yOs Architecture

yOs es un sistema operativo web distribuido, construido sobre Workers,
diseñado para ejecutarse en cualquier dispositivo sin depender del hardware
ni del sistema anfitrión.

## Principios

- Web-native (no emulación)
- Modular y desacoplado
- Multitarea real
- Aislado por procesos lógicos
- Extensible por aplicaciones de terceros

## Capas del sistema

### Kernel
Autoridad central del sistema.
Gestiona:
- procesos
- comunicación entre módulos
- ciclo de vida de aplicaciones
- permisos básicos

No renderiza UI.
No maneja pagos.
No accede directamente a datos persistentes.

### Workers del sistema

Cada worker cumple una responsabilidad clara:

- auth: identidad y sesión
- fs: sistema de archivos virtual
- search: indexación y búsqueda en tiempo real
- store: catálogo, licencias e instalación de apps
- wallet: economía interna
- window: gestión de ventanas y layout
- terminal: ejecución de comandos reales

Los workers se comunican únicamente mediante contratos definidos.

### Aplicaciones

Las aplicaciones:
- no acceden directamente al kernel
- declaran permisos
- se ejecutan como procesos aislados
- usan APIs públicas del sistema

## Multiplataforma

yOs se adapta automáticamente a:
- móviles
- tablets
- laptops
- desktop

El layout y las ventanas se ajustan dinámicamente sin romper el flujo del sistema.
