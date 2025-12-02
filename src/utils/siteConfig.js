// Configuración del sitio - URLs y configuraciones centralizadas
export const siteConfig = {
  // URLs base del sitio
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://tu-dominio.com' : 'http://localhost:4321',
  
  // API endpoints
  api: {
    contact: '/api/enviar.php'
  },
  
  // Redes sociales
  social: {
    linkedin: 'https://www.linkedin.com/company/asociadosarla/posts/?feedView=all&viewAsMember=true',
    youtube: 'https://www.youtube.com/@ArlaAsociados-2025',
    tiktok: 'https://www.tiktok.com/@arla.asociados',
    x: 'https://x.com/ArlaAsociados',
    facebook: 'https://www.facebook.com/arlaasociados',
    instagram: 'https://www.instagram.com/arlaasociados'
  },
  
  // Configuración de seguridad
  security: {
    csp: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' https://www.youtube.com",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' https://fonts.gstatic.com",
      'img-src': "'self' data: https:",
      'connect-src': "'self'",
      'frame-src': 'https://www.youtube.com',
      'object-src': "'none'",
      'base-uri': "'self'",
      'form-action': "'self'"
    }
  }
};
