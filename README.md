# NextJs-Archetype

Este es un arquetipo creado a partir de [Next.js](https://nextjs.org/) y utilizando [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Índice

- [Ejecución en desarrollo](<#ejecución-en-desarrollo>)
- [Login con Providers de 3eros](<#login-con-providers-de-3eros>)
- [Base de datos](<#base-de-datos>)
- [Listmonk - Gestor de Email Marketing](<#listmonk---gestor-de-email-marketing>)

## Ejecución en desarrollo

Para la ejecución en desarrollo es necesario contar con docker y docker compose. Se puede descargar e instalar todo junto con [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Para instalar las dependencias necesarias:

```bash
npm install
```

Para ejecutar el ambiente de desarrollo:

```bash
#Se desplegará la aplicación en http://localhost:3000
npm run dev

#Se desplegará la aplicación en https://localhost:3000 (Conexión cifrada) y en http://localhost:3001
npm run dev-https
```

> Tener en cuenta de modificar las variables de entorno NEXT_PUBLIC_SITE_ENDPOINT y NEXTAUTH_URL al utilizar la url segura.

Abrir [http://localhost:3000](http://localhost:3000) ó [https://localhost:3000](https://localhost:3000) con un navegador para ver el resultado.


## Login con Providers de 3eros

Se utiliza [NextAuth.js](https://https://next-auth.js.org//) para administrar las funcionalidades de indentificación.

Asegurarse de cargar las variables necesarias para cada provider en `/.env.local` `/.env.development` ó `/.env.production`. (ver `/.example.env.local`)

Se pueden consultar los detalles de configuración de cada Provider en -> [Documentación Providers](https://next-auth.js.org/providers//)

Por defecto se encuentra configurado el provider de Google, a continuación la documentación necesaria:

* [Documentación Google Provider](https://developers.google.com/identity/protocols/oauth2//)
* [Configuración Google Provider](https://console.developers.google.com/apis/credentials//)


## Base de datos

### Instalar motor de base de datos con Docker

La aplicación provee la configuración para crear un contenedor docker con el motor especificado (mariadb), tanto para desarrollo `/docker/db-engine-development` como para producción `/docker/db-engine-production`.

Para crear, ejecutar y parar el contenedor puede utilizar los siguientes scripts para los ambientes de `development` ó `production` según corresponda.

```bash
## Para Development
npm run docker-db-container-create-development ## Crea el contenedor con el motor de base de datos
npm run docker-db-container-start-development ## Inicia el contenedor con el motor de base de datos
npm run docker-db-container-stop-development ## Detiene el contenedor con el motor de base de datos

## Para Production
npm run docker-db-container-create-production
npm run docker-db-container-start-production
npm run docker-db-container-stop-production
```

Los parametros de conexión a la base de datos se encuentran definidos en variables de entorno, configurarlas es necesario para que los siguientes scripts funcionen correctamete. [Ver especificaciones](<#variables-de-entorno>)

Para crear la base de datos utilizamos Sequelize CLI indicando mediante el parametro `--url` la url de conexión a la base de datos objetivo.

```bash
npx sequelize-cli db:create --url 'mysql://root:password@host:port/database_name'
```

Para crear las tablas

```bash
npx sequelize-cli db:migrate --url 'mysql://root:password@host:port/database_name'
```

Para dropear la base de datos entera

```bash
npx sequelize-cli db:drop --url 'mysql://root:password@host:port/database_name'
```

Para insertar datos iniciales

```bash
npx sequelize-cli db:seed:all --url 'mysql://root:password@host:port/database_name'
```

Para recrear la base de datos y volcar los datos iniciales (Crea o reemplaza la base de datos existente)

```bash
npm run recreate-database --url 'mysql://root:password@host:port/database_name'
```

## Configuración de conexión a la base de datos

La conexión a la base de datos se toma de las siguientes variables de entorno
|development|
|----------|
|DEV_MYSQLDATABASE|
|DEV_MYSQLHOST|
|DEV_MYSQLPASSWORD|
|DEV_MYSQLPORT|
|DEV_MYSQLUSER|

|production|
|----------|
|PROD_MYSQLDATABASE|
|PROD_MYSQLHOST|
|PROD_MYSQLPASSWORD|
|PROD_MYSQLPORT|
|PROD_MYSQLUSER|

## Listmonk - Gestor de Email Marketing
Listmonk es un administrador de Email Marketing y listas de correo auto-hosteado y de alto rendimiento. Su única dependencia es una base de datos Postgres.

El acceso a listmonk en esta aplicación se realiza de manera local del lado del servidor, disponibilizando el acceso a travez de una URL pública (configurable mediante la variable de entorno: NEXT_PUBLIC_LISTMONK_URL) aprovechando la capa de seguridad de NextJs.

Solo los usuarios administradores (rol: user) podrán acceder a las URLs públicas de Listmonk, y las configuraciones avanzadas solo podrán ser modificadas por superusuarios (rol: admin).

Para desplegar una instancia de Lismonk siga las siguientes instrucciones: [Listmonk docker container | NextJs-Archetype](/docker/listmonk/README.md)

## Variables de entorno

| Variable de entorno | Grupo | Descripcion |
|----------|----------|----------|
|NEXT_PUBLIC_SITE_ENDPOINT|NextJs|Url del host donde se encuentra alojada la aplicacón, se utiliza para realizar las llamadas a la API desde el front-end|
|NEXTAUTH_URL|NextAuth|Url del host de la aplicación, utilizada por NextAuth para obtener datos de autenticación y usuario|
|NEXTAUTH_SECRET|NextAuth|Key secreta que utilizará NextAuth para generar tokens|
|GOOGLE_ID|GoogleProvider|Id de GoogleProvider que utilizará NextAuth para crear sesiones con cuentas de Google|
|GOOGLE_SECRET|GoogleProvider|Key secreta de GoogleProvider|
|AWS_ACCESS_KEY_ID|AWS-Keys|Key Id para conectarse a servicios de AWS|
|AWS_SECRET_ACCESS_KEY|AWS-Keys|Key secreta para conectarse a servicios de AWS|
|AWS_REGION|AWS-Keys|Región para conectarse a servicios de AWS|
|AWS_S3_BUCKET_NAME|AWS-S3|Nombre del bucket S3 de AWS para le intercambio de archivos|
|DEV_MYSQLDATABASE|MySql DEV|Configuración MySql (Development): Nombre de la base de datos|
|DEV_MYSQLHOST|MySql DEV|Configuración MySql (Development): Host del motor de base de datos|
|DEV_MYSQLPASSWORD|MySql DEV|Configuración MySql (Development): Password del motor de base de datos|
|DEV_MYSQLPORT|MySql DEV|Configuración MySql (Development): Puerto del motor de base de datos|
|DEV_MYSQLUSER|MySql DEV|Configuración MySql (Development): Usuario de conexión al motor de base de datos|
|PROD_MYSQLDATABASE|MySql PROD|Configuración MySql (Production): Nombre de la base de datos|
|PROD_MYSQLHOST|MySql PROD|Configuración MySql (Production): Host del motor de base de datos|
|PROD_MYSQLPASSWORD|MySql PROD|Configuración MySql (Production): Password del motor de base de datos|
|PROD_MYSQLPORT|MySql PROD|Configuración MySql (Production): Puerto del motor de base de datos|
|PROD_MYSQLUSER|MySql PROD|Configuración MySql (Production): Usuario de conexión al motor de base de datos|
|DOCKER_MYSQL_ROOT_PASSWORD|MySql Docker Container Config|Password de root para la base de datos del container docker, se utiliza para la creación del container|
|DOCKER_MYSQL_PORT|MySql Docker Container Config|Puerto de conexión para la base de datos del container docker, se utiliza para la creación del container|
|DOCKER_MYSQL_DATABASE|MySql Docker Container Config|Nombre de la base de datos por defecto, se utiliza para la creación del container|
|NODE_APP_ADMIN_USER|Admin User App|Nombre de usuario para el usuario inicial de administración de la aplicación|
|NODE_APP_ADMIN_PASSWORD|Admin User App|Password para el usuario inicial de administración de la aplicación|
|EMAIL_HOST|Email Configuration|Host del servidor para enviar emails|
|EMAIL_PORT|Email Configuration|Puerto para la conexión al servidor para enviar emails|
|EMAIL_SENDER_STRATEGY|Email Configuration|Tipo de 'strategy' para el envio de emails (aws \| nodemailer). Default: aws|
|EMAIL_USER|Email Configuration|Usuario para la conexion al servidor para enviar emails|
|EMAIL_PASS|Email Configuration|Password para la conexion al servidor para enviar emails|
|LISTMONK_app__address|Listmonk Configuration|Dirección desde donde será accesible Listmonk. Default: "0.0.0.0:9000"|
|LISTMONK_db__host|Listmonk Configuration|Host de la base de datos para Listmonk. Default:listmonk_db|
|LISTMONK_db__port|Listmonk Configuration|Puerto de la base de datos para Listmonk. Default:5432|
|LISTMONK_db__user|Listmonk Configuration|Usuario de la base de datos para Listmonk. Default:listmonk|
|LISTMONK_db__password|Listmonk Configuration|Password de la base de datos para Listmonk|
|LISTMONK_db__database|Listmonk Configuration|Nombre de la base de datos para Listmonk. Default:listmonk|
|LISTMONK_db__ssl_mode|Listmonk Configuration|Modo de conexión SSL. Default:disable|
|NEXT_PUBLIC_LISTMONK_URL|Listmonk-NextJs Proxy Configuration|Url pública donde se podrá acceder listmonk.|
|LOCAL_LISTMONK_URL|Listmonk-NextJs Proxy Configuration|Url local para acceder a Listmonk. Esta dirección se utilizará como acceso para que el servidor Next pueda canalizar las peticiones desde la URL pública (NEXT_PUBLIC_LISTMONK_URL) a la instancia real del contenedor de Listmonk |