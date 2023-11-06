# Listmonk docker container | NextJs-Archetype
Es necesario contar con docker y docker-compose instalados para seguir esta guía.

El archivo docker-compose.yml contiene toda la configuración inicial necesaria para crear el contenedor. No es necesario realizarle modificaciones, las variables de entornos necesarias para Listmonk estan detalladas en la [pagina principal de la documentación](/README.md) (Variables con el prefijo LISTMONK)

1- Primero montamos el contenedor para la base de datos

```bash
docker compose up -d db
```

2- Luego ejecutaremos el siguiente comando para crear la base de datos y la estructura  de tablas necesarias para listmonk en el contenedor anterior. Omitir este paso en el caso de ya tener el volume 'listmonk-data' con información previa

```bash
docker compose run --rm app ./listmonk --install
```

3- Por ultimo montamos el contenedor de la aplicación. Hasta acá la aplicación solo sera accesible para el servidor a travez de http://localhost:9000 (O en su defecto la dirección que se haya configurado en la variable de entorno LOCAL_LISTMONK_URL)
```bash
docker compose up -d app
```

4-Consideraciones finales: Ahora necesitaremos tener la aplicación NEXT.Js corriendo la cual se encargara de hacer de proxy desde las URLs configuradas en las varuables de entorno: LOCAL_LISTMONK_URL -> NEXT_PUBLIC_LISTMONK_URL (Ej: http://localhost:9000 -> https://dominio.com.ar/api/management/listmonk/admin). Esto es para aprovechar la capa de seguridad de Next.JS




Más información en la [documentación de Listmonk](https://listmonk.app/docs/installation/)

[Voler al inicio](/README.md)