import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopesBulk, faPaintBrush, faScrewdriverWrench, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";

const getRoleDataByName = (name: string) => {
    descriptionMap[name] = descriptionMap[name] || {
        label: name,
        description: ""
    };
    return descriptionMap[name];
}

interface DescriptionMap {
    [key: string]: {
        label: string,
        description: string
        icon: IconProp
    }
}

const descriptionMap: DescriptionMap = {
    "user": {
        label: "Usuario",
        description: "Rol de usuario",
        icon: faUser
    },
    "marketing": {
        label: "Marketing",
        description: "Permite manejar las campañas de marketing, ver los suscriptores y enviar correos masivos",
        icon: faEnvelopesBulk
    },
    "sales": {
        label: "Ventas",
        description: "Permite atender las ordenes de compra, ver los clientes y manejar los productos",
        icon: faUserTie
    },
    "designer": {
        label: "Diseño",
        description: "Permite editar el contenido del sitio web, manejar las imagenes y demas componentes visuales",
        icon: faPaintBrush
    },
    "admin": {
        label: "Administrador",
        description: "Permite manejar los usuarios, roles y permisos del sistema",
        icon: faScrewdriverWrench
    }
}

export {
    getRoleDataByName
}