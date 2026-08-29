export const PUBLIC_NAVIGATION = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Servicios", href: "/servicios" },
  { label: "B & B", href: "/empresa" },
  { label: "Nuestro método", href: "/metodo" },
] as const;

export const TRUST_SIGNALS = [
  {
    title: "Atención humana",
    description: "Cada encargo comienza con una conversación y revisión personal.",
  },
  {
    title: "Publicación controlada",
    description: "No aceptamos publicaciones anónimas ni automáticas.",
  },
  {
    title: "Información prudente",
    description: "Sólo se muestra lo expresamente autorizado para difusión.",
  },
] as const;

export const SERVICES = [
  {
    id: "vender",
    number: "01",
    title: "Vender una propiedad",
    summary:
      "Ordenamos la presentación comercial del inmueble y acompañamos la búsqueda de interesados.",
    includes: [
      "levantamiento inicial de antecedentes",
      "definición de información publicable",
      "coordinación de difusión y visitas",
    ],
  },
  {
    id: "dar-en-arriendo",
    number: "02",
    title: "Dar en arriendo",
    summary:
      "Apoyamos la preparación de una oferta clara y la coordinación de posibles arrendatarios.",
    includes: [
      "revisión comercial preliminar",
      "presentación autorizada del inmueble",
      "seguimiento del proceso de intermediación",
    ],
  },
  {
    id: "comprar",
    number: "03",
    title: "Buscar para comprar",
    summary:
      "Traducimos una necesidad de compra en criterios útiles para explorar alternativas.",
    includes: [
      "definición de requerimientos",
      "búsqueda y preselección comercial",
      "coordinación con propietarios o corredores",
    ],
  },
  {
    id: "arrendar",
    number: "04",
    title: "Buscar para arrendar",
    summary:
      "Acompañamos la búsqueda según ubicación, uso y condiciones generales esperadas.",
    includes: [
      "perfil de búsqueda",
      "revisión de alternativas disponibles",
      "coordinación de visitas",
    ],
  },
  {
    id: "rurales",
    number: "05",
    title: "Propiedades rurales",
    summary:
      "Presentamos parcelas, terrenos y predios desde una mirada comercial cuidadosa.",
    includes: [
      "caracterización general del activo",
      "ubicación pública aproximada",
      "antecedentes escalonados según autorización",
    ],
  },
  {
    id: "especiales",
    number: "06",
    title: "Activos especiales",
    summary:
      "Abordamos oportunidades que requieren una presentación distinta a una vivienda tradicional.",
    includes: [
      "predios de mayor superficie",
      "activos con potencial productivo",
      "búsqueda de contrapartes específicas",
    ],
  },
] as const;

export const BRAND_VALUES = [
  {
    title: "Prudencia",
    description:
      "No transformamos una revisión comercial en una promesa jurídica o técnica.",
  },
  {
    title: "Transparencia",
    description:
      "Explicamos qué información fue revisada, qué permanece pendiente y qué no se publica.",
  },
  {
    title: "Cercanía",
    description:
      "Privilegiamos el contacto directo y la comprensión del objetivo de cada persona.",
  },
  {
    title: "Confidencialidad",
    description:
      "La información reservada no debe convertirse en contenido público por defecto.",
  },
] as const;

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Primer contacto",
    description:
      "Comprendemos la necesidad y acordamos si corresponde iniciar una relación de corretaje.",
  },
  {
    number: "02",
    title: "Revisión preliminar",
    description:
      "Ordenamos los antecedentes disponibles e identificamos información faltante o sensible.",
  },
  {
    number: "03",
    title: "Encargo y autorización",
    description:
      "Definimos el alcance comercial y qué datos pueden utilizarse para presentar el activo.",
  },
  {
    number: "04",
    title: "Preparación pública",
    description:
      "Creamos una versión comercial que excluye direcciones exactas y antecedentes reservados.",
  },
  {
    number: "05",
    title: "Aprobación humana",
    description:
      "La información se revisa antes de publicarse; no existe autopublicación automática.",
  },
  {
    number: "06",
    title: "Gestión y seguimiento",
    description:
      "Coordinamos consultas y avances dentro de los límites acordados con el cliente.",
  },
] as const;

export const DISCLOSURE_ROWS = [
  {
    information: "Tipo, operación y características autorizadas",
    publicUse: "Puede publicarse",
    reservedUse: "Se confirma antes de difundir",
  },
  {
    information: "Comuna o sector aproximado",
    publicUse: "Puede publicarse",
    reservedUse: "Sin dirección exacta por defecto",
  },
  {
    information: "Precio y fotografías autorizadas",
    publicUse: "Condicionado",
    reservedUse: "Requiere autorización vigente",
  },
  {
    information: "Dirección exacta y datos de propietarios",
    publicUse: "No se publica",
    reservedUse: "Acceso restringido",
  },
  {
    information: "Documentos, contratos y antecedentes sensibles",
    publicUse: "No se publica",
    reservedUse: "Tratamiento privado futuro",
  },
] as const;
