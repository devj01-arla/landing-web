// Cliente de chat local para hosting estático
// No requiere servidor, funciona completamente en el frontend

// Base de datos de respuestas inteligentes mejoradas
const RESPONSES_DATABASE = {
  greetings: [
    `¡Hola! 👋 Soy el asistente virtual de Arla & Asociados. ¿En qué puedo ayudarte hoy?`,
    `¡Buenos días! 😊 Soy el asistente de Arla & Asociados. ¿Cómo puedo asistirte hoy?`,
    `¡Hola! 🌟 Bienvenido a Arla & Asociados. ¿En qué puedo ayudarte con nuestros servicios de transformación de datos?`
  ],
  
  services: [
    `🚀 NUESTROS SERVICIOS ESPECIALIZADOS

✨ Data Engineering & Business Intelligence
   Transformamos datos en decisiones estratégicas

☁️ Cloud & On-Premise Consulting
   Soluciones híbridas para tu infraestructura

🤖 Data Science & Machine Learning
   Inteligencia artificial para tu negocio

⚡ Process Optimization
   Automatización y eficiencia operativa

📊 Dashboards & Data Visualization
   Visualización en tiempo real

¿Te interesa conocer más detalles sobre alguno en particular?`,
    `🎯 TRANSFORMAMOS DATOS EN OPORTUNIDADES

Nuestros servicios especializados incluyen:

• Data Engineering & BI - Gestión inteligente de datos
• Cloud Consulting - Infraestructura escalable
• Data Science & ML - Predicciones y análisis avanzado
• Process Optimization - Automatización de procesos
• Dashboards - Visualización ejecutiva

¿Sobre cuál servicio te gustaría obtener más información?`,
    `💼 SERVICIOS DE EXCELENCIA TECNOLÓGICA

Ofrecemos soluciones integrales en:

🔹 Data Engineering & Business Intelligence
🔹 Cloud & On-Premise Consulting
🔹 Data Science & Machine Learning
🔹 Process Optimization
🔹 Dashboards & Data Visualization

Cada servicio está diseñado para impulsar el crecimiento de tu empresa. ¿Cuál te interesa explorar?`
  ],
  
  contact: [
    `📞 INFORMACIÓN DE CONTACTO - ARLA & ASOCIADOS

📧 Email Corporativo:
   info@arla-asociados.com

📱 WhatsApp Business:
   +51 912 235 161

📍 Ubicación:
   Pueblo Nuevo, Chincha, Ica, Perú

⏰ Horarios de Atención:
   Lunes a Viernes: 9:00 AM - 6:00 PM
   Sábados: 9:00 AM - 1:00 PM

💼 ¿Listo para transformar tu empresa?
¡Estamos aquí para ayudarte!`,
    `🎯 ¡CONECTEMOS Y TRANSFORMEMOS JUNTOS!

📧 Correo Electrónico:
   info@arla-asociados.com

📱 WhatsApp Directo:
   +51 912 235 161

🏢 Oficina Principal:
   Pueblo Nuevo, Chincha, Ica, Perú

✨ ¿Por qué contactarnos?
• Consultoría especializada gratuita
• Cotizaciones personalizadas
• Soporte técnico experto
• Soluciones a medida

¡Estamos disponibles para resolver todas tus dudas!`,
    `💼 CONTACTO DIRECTO - ARLA & ASOCIADOS

📧 Email: info@arla-asociados.com
📱 WhatsApp: +51 912 235 161
📍 Dirección: Pueblo Nuevo, Chincha, Ica, Perú

🚀 Servicios de Contacto:
• Consultoría inicial sin costo
• Evaluación de proyectos
• Propuestas personalizadas
• Soporte técnico continuo

⏰ Disponibilidad: Lunes a Sábado

¡Estamos listos para impulsar tu empresa!`
  ],
  
  location: [
    `📍 UBICACIÓN CORPORATIVA - ARLA & ASOCIADOS

🏢 Dirección Completa:
   Distrito: Pueblo Nuevo
   Provincia: Chincha
   Departamento: Ica
   País: Perú

🗺️ Zona Estratégica:
   Región sur del Perú
   Acceso fácil desde Lima
   Cerca de principales ciudades

📞 Contacto Local:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🚗 ¿Cómo llegar?
   Consulta con nosotros para
   indicaciones detalladas

¡Estamos aquí para atenderte!`,
    `🎯 NUESTRA UBICACIÓN ESTRATÉGICA

📍 Oficina Principal:
   Pueblo Nuevo, Chincha, Ica, Perú

🌎 Ventajas de Nuestra Ubicación:
• Región estratégica del sur peruano
• Acceso a múltiples sectores industriales
• Proximidad a centros de datos
• Conectividad empresarial óptima

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

💼 ¿Planeas visitarnos?
   Coordinamos citas presenciales
   y reuniones virtuales

¡Estamos listos para transformar tus datos!`,
    `🏢 UBICACIÓN CORPORATIVA

📍 Dirección:
   Pueblo Nuevo, Chincha, Ica, Perú

🌟 ¿Por qué esta ubicación?
• Centro estratégico del sur peruano
• Acceso a múltiples industrias
• Infraestructura tecnológica avanzada
• Conectividad empresarial premium

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🚀 Servicios Disponibles:
• Consultoría presencial
• Reuniones virtuales
• Soporte técnico remoto
• Implementación in-situ

¡Estamos aquí para ayudarte!`
  ],
  
  pricing: [
    `💰 COTIZACIONES PERSONALIZADAS - ARLA & ASOCIADOS

🎯 ¿Por qué cotizaciones personalizadas?
Cada empresa es única, por eso diseñamos
soluciones específicas para tus necesidades.

📊 Proceso de Cotización:
1️⃣ Evaluación inicial gratuita
2️⃣ Análisis de requerimientos
3️⃣ Propuesta técnica detallada
4️⃣ Presupuesto transparente
5️⃣ Cronograma de implementación

💼 Factores que Consideramos:
• Complejidad del proyecto
• Volumen de datos
• Integraciones necesarias
• Tiempo de implementación
• Soporte requerido

📞 ¿Listo para tu cotización?
Contacta: info@arla-asociados.com`,
    `💼 PROPUESTAS COMERCIALES ESPECIALIZADAS

🎯 Nuestro Enfoque:
Creamos propuestas que se adaptan
exactamente a tu presupuesto y objetivos.

📈 Servicios Incluidos en Cotización:
• Consultoría técnica especializada
• Arquitectura de soluciones
• Implementación completa
• Capacitación del equipo
• Soporte post-implementación
• Garantía de resultados

⏰ Tiempo de Respuesta:
• Cotización básica: 24-48 horas
• Propuesta detallada: 3-5 días
• Proyecto complejo: 1 semana

📞 Solicita tu cotización:
📧 info@arla-asociados.com
📱 +51 912 235 161`,
    `🚀 INVERSIÓN INTELIGENTE EN TECNOLOGÍA

💡 ¿Por qué elegirnos?
• ROI comprobado en 15+ años
• Soluciones escalables
• Soporte técnico continuo
• Garantía de resultados

📊 Modelos de Inversión:
• Proyecto único
• Servicios recurrentes
• Licenciamiento anual
• Soporte técnico

🎯 Beneficios Incluidos:
• Consultoría inicial gratuita
• Implementación completa
• Capacitación del equipo
• Documentación técnica
• Soporte 24/7

📞 ¿Listo para invertir en tu futuro?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  experience: [
    `🏆 15+ AÑOS DE EXCELENCIA TECNOLÓGICA

📊 Nuestros Logros:
• 20+ proyectos exitosos completados
• 95% de tasa de retención de clientes
• 10+ clientes satisfechos
• 0 proyectos fallidos

🏢 Sectores de Experiencia:
• Telecomunicaciones
• Automotriz
• Banca y Finanzas
• Minería
• Retail y Comercio
• Manufactura
• Salud
• Educación

🎯 ¿Por qué somos líderes?
• Metodologías probadas
• Tecnologías de vanguardia
• Equipo altamente calificado
• Soporte técnico continuo

💼 ¿Listo para ser nuestro próximo caso de éxito?`,
    `🚀 TRAYECTORIA DE LIDERAZGO TECNOLÓGICO

⏰ 15+ Años Transformando Empresas

📈 Métricas de Éxito:
• 20+ proyectos implementados
• 95% retención de clientes
• 10+ empresas transformadas
• 100% satisfacción garantizada

🌟 Sectores de Especialización:
• Telecomunicaciones
• Automotriz
• Banca
• Minería
• Retail
• Manufactura
• Salud
• Educación

💡 Nuestro Diferencial:
• Experiencia multidisciplinaria
• Soluciones escalables
• Soporte técnico experto
• Metodologías ágiles

📞 ¿Quieres ser parte de nuestra historia de éxito?`,
    `🎯 EXPERIENCIA COMPROBADA EN TRANSFORMACIÓN DIGITAL

📊 Estadísticas de Éxito:
• 15+ años de experiencia
• 20+ proyectos completados
• 95% tasa de retención
• 10+ clientes satisfechos

🏢 Industrias Atendidas:
• Telecomunicaciones
• Automotriz
• Banca y Finanzas
• Minería
• Retail
• Manufactura
• Salud
• Educación

✨ ¿Qué nos hace únicos?
• Metodologías probadas
• Tecnologías de vanguardia
• Equipo especializado
• Soporte continuo

💼 ¿Listo para tu transformación digital?
Contacta: info@arla-asociados.com`
  ],
  
  confusion: [
    `🤔 ¡NO TE PREOCUPES! TE GUÍO PASO A PASO

🎯 ¿Qué te gustaría conocer?

📊 Nuestros Servicios:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

💼 Información Empresarial:
• Experiencia y casos de éxito
• Procesos de trabajo
• Tiempos de implementación
• Soporte técnico

📞 Contacto y Cotizaciones:
• Información de contacto
• Cotizaciones personalizadas
• Consultoría inicial gratuita

¿Por cuál te interesa empezar?`,
    `🌟 ¡PERFECTO! TE AYUDO A ORIENTARTE

🎯 Opciones Disponibles:

✨ Servicios Especializados:
• Data Engineering & BI
• Cloud Consulting
• Data Science & ML
• Process Optimization
• Dashboards & DV

📈 Información Corporativa:
• 15+ años de experiencia
• 20+ proyectos exitosos
• Casos de éxito
• Metodologías probadas

💰 Comercial:
• Cotizaciones personalizadas
• Modelos de inversión
• Tiempos de implementación
• Soporte continuo

¿Qué te llama más la atención?`,
    `🚀 ¡GENIAL! TE INVITO A EXPLORAR

🎯 ¿Por dónde empezamos?

📊 Conoce Nuestros Servicios:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

🏆 Nuestra Experiencia:
• 15+ años transformando empresas
• 20+ proyectos exitosos
• 95% retención de clientes
• Sectores diversos atendidos

📞 ¿Listo para Contactar?
• Consultoría gratuita
• Cotizaciones personalizadas
• Soporte técnico experto

¿Cuál te interesa explorar primero?`,
    `💡 ¡EXCELENTE! TE GUÍO EN EL PROCESO

🎯 Opciones para Explorar:

🔹 Servicios Principales:
• Data Engineering & BI
• Cloud & On-Premise Consulting
• Data Science & ML
• Process Optimization
• Dashboards & DV

🔹 Información Empresarial:
• Experiencia de 15+ años
• Proyectos completados
• Sectores atendidos
• Metodologías utilizadas

🔹 Proceso Comercial:
• Consultoría inicial
• Cotizaciones personalizadas
• Implementación
• Soporte continuo

¿Por cuál te gustaría comenzar?`,
    `🌟 ¡POR SUPUESTO! TE ORIENTAMOS COMPLETAMENTE

🎯 ¿Qué te interesa conocer?

📊 Nuestros Servicios Especializados:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

🏢 Información Corporativa:
• Experiencia de 15+ años
• Proyectos exitosos
• Sectores atendidos
• Casos de éxito

📞 Proceso de Contacto:
• Consultoría gratuita
• Cotizaciones personalizadas
• Soporte técnico
• Implementación completa

¿Por dónde empezamos?`
  ],
  
  help: [
    `🎯 ¡POR SUPUESTO! TE AYUDO CON TODO

🌟 ¿En qué puedo asistirte?

📊 Información de Servicios:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

💼 Información Corporativa:
• Experiencia de 15+ años
• Proyectos exitosos
• Sectores atendidos
• Metodologías probadas

📞 Contacto y Comercial:
• Información de contacto
• Cotizaciones personalizadas
• Consultoría inicial gratuita
• Soporte técnico

¿Qué te gustaría conocer?`,
    `🚀 ¡ABSOLUTAMENTE! ESTOY AQUÍ PARA TI

🎯 Servicios Disponibles:

✨ Consultoría Especializada:
• Data Engineering & BI
• Cloud & On-Premise Consulting
• Data Science & ML
• Process Optimization
• Dashboards & DV

🏆 Nuestra Experiencia:
• 15+ años transformando empresas
• 20+ proyectos exitosos
• 95% retención de clientes
• Sectores diversos

📞 ¿Cómo Contactarnos?
• Consultoría gratuita
• Cotizaciones personalizadas
• Soporte técnico continuo
• Implementación completa

¿En qué puedo ser útil?`,
    `💡 ¡EXCELENTE! TE GUÍO COMPLETAMENTE

🎯 ¿Qué te interesa explorar?

📊 Nuestros Servicios:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

🏢 Información Empresarial:
• Experiencia de 15+ años
• Proyectos completados
• Casos de éxito
• Metodologías utilizadas

💰 Proceso Comercial:
• Consultoría inicial
• Cotizaciones personalizadas
• Implementación
• Soporte continuo

¿Qué te gustaría conocer?`,
    `🌟 ¡POR SUPUESTO! TE AYUDO CON TODO

🎯 Opciones Disponibles:

📊 Servicios Especializados:
• Data Engineering & BI
• Cloud & On-Premise Consulting
• Data Science & ML
• Process Optimization
• Dashboards & DV

🏆 Nuestra Trayectoria:
• 15+ años de experiencia
• 20+ proyectos exitosos
• 95% retención de clientes
• Sectores diversos

📞 Contacto Directo:
• Consultoría gratuita
• Cotizaciones personalizadas
• Soporte técnico experto
• Implementación completa

¿En qué puedo ser útil?`,
    `🚀 ¡ME ENCANTA AYUDAR! TE ASISTO COMPLETAMENTE

🎯 ¿Qué te gustaría conocer?

📊 Servicios de Excelencia:
• Data Engineering & Business Intelligence
• Cloud & On-Premise Consulting
• Data Science & Machine Learning
• Process Optimization
• Dashboards & Data Visualization

💼 Información Corporativa:
• Experiencia de 15+ años
• Proyectos exitosos
• Sectores atendidos
• Casos de éxito

📞 Proceso de Contacto:
• Consultoría inicial gratuita
• Cotizaciones personalizadas
• Soporte técnico continuo
• Implementación completa

¿Qué te interesa explorar?`
  ],
  
  farewell: [
    `🙏 ¡HA SIDO UN PLACER ASISTIRTE!

✨ ¿Qué sigue?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

💼 Próximos Pasos:
• Consultoría inicial gratuita
• Cotizaciones personalizadas
• Evaluación de proyectos
• Implementación completa

🎯 ¿Listo para Transformar tu Empresa?
¡Estamos aquí para impulsar tu éxito!

¡Que tengas un excelente día! 🌟`,
    `🌟 ¡FUE UN GUSTO AYUDARTE!

💼 ¿Te Interesa Continuar?

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🚀 Servicios Disponibles:
• Consultoría especializada
• Cotizaciones personalizadas
• Implementación completa
• Soporte técnico continuo

🎯 ¿Listo para tu Transformación Digital?
¡Estamos aquí para acompañarte!

¡Hasta pronto! 👋`,
    `🎯 ¡ME ALEGRA HABER SIDO ÚTIL!

💡 ¿Quieres Saber Más?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

📊 Próximos Pasos:
• Evaluación inicial gratuita
• Propuesta técnica detallada
• Implementación completa
• Soporte post-implementación

🚀 ¿Listo para Impulsar tu Empresa?
¡Estamos aquí para transformar tus datos!

¡Que tengas un gran día! 🌟`,
    `✨ ¡HA SIDO UN PLACER CONVERSAR CONTIGO!

🎯 ¿Te Interesa Continuar?

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

💼 Servicios Disponibles:
• Consultoría inicial gratuita
• Cotizaciones personalizadas
• Implementación completa
• Soporte técnico experto

🚀 ¿Listo para tu Transformación?
¡Estamos aquí para impulsar tu éxito!

¡Hasta la próxima! 👋`,
    `🌟 ¡ME DA MUCHO GUSTO HABER SIDO ÚTIL!

💼 ¿Quieres Continuar?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

📊 Próximos Pasos:
• Consultoría especializada
• Evaluación de proyectos
• Cotizaciones personalizadas
• Implementación completa

🎯 ¿Listo para Transformar tu Empresa?
¡Estamos aquí para acompañarte!

¡Que tengas un excelente día! 🌟`
  ],
  
  goodbye: [
    `👋 ¡HASTA LUEGO! HA SIDO UN PLACER

🌟 ¿Te Interesa Continuar?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

💼 Servicios Disponibles:
• Consultoría inicial gratuita
• Cotizaciones personalizadas
• Implementación completa
• Soporte técnico continuo

🎯 ¿Listo para Transformar tu Empresa?
¡Estamos aquí para impulsar tu éxito!

¡Que tengas un excelente día! 🌟`,
    `🚀 ¡NOS VEMOS PRONTO! FUE UN GUSTO

💡 ¿Quieres Saber Más?

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

📊 Próximos Pasos:
• Evaluación inicial gratuita
• Propuesta técnica detallada
• Implementación completa
• Soporte post-implementación

🎯 ¿Listo para Impulsar tu Empresa?
¡Estamos aquí para transformar tus datos!

¡Hasta la próxima! 👋`,
    `🌟 ¡HASTA PRONTO! ME ALEGRA HABER SIDO ÚTIL

💼 ¿Te Interesa Continuar?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🚀 Servicios Disponibles:
• Consultoría especializada
• Cotizaciones personalizadas
• Implementación completa
• Soporte técnico experto

🎯 ¿Listo para tu Transformación Digital?
¡Estamos aquí para acompañarte!

¡Que tengas un gran día! 🌟`,
    `✨ ¡ADIÓS! HA SIDO UN PLACER CONVERSAR

🎯 ¿Quieres Continuar?

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

💼 Próximos Pasos:
• Consultoría inicial gratuita
• Evaluación de proyectos
• Cotizaciones personalizadas
• Implementación completa

🚀 ¿Listo para Transformar tu Empresa?
¡Estamos aquí para impulsar tu éxito!

¡Hasta la próxima! 👋`,
    `🎯 ¡NOS VEMOS! FUE UN GUSTO AYUDARTE

💡 ¿Te Interesa Saber Más?

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

📊 Servicios Disponibles:
• Consultoría especializada
• Cotizaciones personalizadas
• Implementación completa
• Soporte técnico continuo

🎯 ¿Listo para tu Transformación?
¡Estamos aquí para acompañarte!

¡Que tengas un excelente día! 🌟`
  ],
  
  data_engineering: [
    `🔧 DATA ENGINEERING & BUSINESS INTELLIGENCE

🎯 ¿Qué Hacemos?
Transformamos datos en información valiosa
para la toma de decisiones estratégicas.

📊 Servicios Incluidos:
• Diseño de arquitecturas de datos
• Construcción de pipelines robustos
• Implementación de data lakes
• Creación de data warehouses
• Sistemas de integración ETL/ELT
• Automatización de procesos

💡 Beneficios:
• Datos unificados y consistentes
• Procesamiento en tiempo real
• Escalabilidad garantizada
• Seguridad de datos
• Reportes automatizados

📞 ¿Interesado? Contacta: info@arla-asociados.com`,
    `📊 DATA ENGINEERING & BUSINESS INTELLIGENCE

🚀 Nuestra Especialidad:
Creamos infraestructuras de datos
escalables y eficientes.

🔧 Componentes del Servicio:
• Arquitectura de datos
• Pipelines de procesamiento
• Data lakes y warehouses
• Integración de fuentes
• Automatización ETL/ELT
• Monitoreo y mantenimiento

✨ Resultados:
• Datos centralizados
• Procesamiento optimizado
• Decisiones basadas en datos
• Eficiencia operativa
• ROI comprobado

📞 ¿Listo para Transformar tus Datos?
Contacta: info@arla-asociados.com`,
    `🎯 DATA ENGINEERING & BUSINESS INTELLIGENCE

💼 Transformamos Datos en Oportunidades

📈 Servicios Especializados:
• Diseño de arquitecturas de datos
• Construcción de pipelines
• Implementación de data lakes
• Creación de warehouses
• Sistemas de integración
• Automatización completa

🌟 Ventajas Competitivas:
• Datos unificados
• Procesamiento en tiempo real
• Escalabilidad garantizada
• Seguridad avanzada
• Reportes automatizados

📞 ¿Interesado en Conocer Más?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  cloud_consulting: [
    `☁️ CLOUD & ON-PREMISE CONSULTING

🎯 ¿Qué Ofrecemos?
Soluciones híbridas que se adaptan
a las necesidades de tu empresa.

🚀 Servicios Incluidos:
• Migración a la nube
• Optimización de costos
• Arquitecturas híbridas
• Seguridad y compliance
• Monitoreo y mantenimiento
• Soporte técnico continuo

💡 Beneficios:
• Escalabilidad automática
• Reducción de costos
• Acceso global
• Seguridad avanzada
• Flexibilidad operativa
• ROI optimizado

📞 ¿Listo para la Nube? Contacta: info@arla-asociados.com`,
    `🌐 CLOUD & ON-PREMISE CONSULTING

💼 Tu Transformación Digital

📊 Servicios Especializados:
• Consultoría en migración
• Optimización de costos
• Arquitecturas híbridas
• Seguridad y compliance
• Monitoreo continuo
• Soporte técnico experto

✨ Ventajas Competitivas:
• Escalabilidad automática
• Reducción de costos
• Acceso global
• Seguridad avanzada
• Flexibilidad operativa
• ROI comprobado

📞 ¿Interesado en Migrar?
Contacta: info@arla-asociados.com`,
    `☁️ CLOUD & ON-PREMISE CONSULTING

🎯 Soluciones Híbridas Inteligentes

🔧 Nuestros Servicios:
• Migración a la nube
• Optimización de costos
• Arquitecturas híbridas
• Seguridad y compliance
• Monitoreo y mantenimiento
• Soporte técnico continuo

🌟 ¿Por qué Elegirnos?
• Experiencia de 15+ años
• Soluciones escalables
• Seguridad garantizada
• Soporte técnico experto
• ROI optimizado

📞 ¿Listo para la Transformación?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  data_science: [
    `🤖 DATA SCIENCE & MACHINE LEARNING

🎯 ¿Qué Hacemos?
Desarrollamos soluciones de inteligencia
artificial para impulsar tu negocio.

🧠 Servicios Incluidos:
• Modelos predictivos avanzados
• Algoritmos de machine learning
• Análisis estadístico profundo
• Soluciones de IA personalizadas
• Automatización inteligente
• Optimización de procesos

💡 Beneficios:
• Predicciones precisas
• Automatización inteligente
• Optimización de recursos
• Ventaja competitiva
• ROI comprobado
• Escalabilidad garantizada

📞 ¿Listo para la IA? Contacta: info@arla-asociados.com`,
    `🧠 DATA SCIENCE & MACHINE LEARNING

🚀 Inteligencia Artificial para tu Empresa

📊 Servicios Especializados:
• Modelos predictivos
• Algoritmos de ML
• Análisis estadístico
• Soluciones de IA
• Automatización inteligente
• Optimización de procesos

✨ Ventajas Competitivas:
• Predicciones precisas
• Automatización inteligente
• Optimización de recursos
• Ventaja competitiva
• ROI comprobado
• Escalabilidad garantizada

📞 ¿Interesado en IA?
Contacta: info@arla-asociados.com`,
    `🎯 DATA SCIENCE & MACHINE LEARNING

💼 Transformamos Datos en Inteligencia

🔧 Nuestros Servicios:
• Modelos predictivos avanzados
• Algoritmos de machine learning
• Análisis estadístico profundo
• Soluciones de IA personalizadas
• Automatización inteligente
• Optimización de procesos

🌟 ¿Por qué Elegirnos?
• Experiencia de 15+ años
• Soluciones escalables
• IA personalizada
• Soporte técnico experto
• ROI comprobado

📞 ¿Listo para la Transformación?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  process_optimization: [
    `⚡ PROCESS OPTIMIZATION

🎯 ¿Qué Hacemos?
Analizamos y optimizamos tus procesos
para maximizar la eficiencia operativa.

🔧 Servicios Incluidos:
• Análisis de procesos actuales
• Automatización RPA
• Reingeniería de procesos
• Mejora continua
• Implementación de soluciones
• Monitoreo y optimización

💡 Beneficios:
• Reducción de costos
• Aumento de productividad
• Eliminación de errores
• Automatización completa
• Eficiencia operativa
• ROI comprobado

📞 ¿Listo para Optimizar? Contacta: info@arla-asociados.com`,
    `🚀 PROCESS OPTIMIZATION

💼 Automatización Inteligente

📊 Servicios Especializados:
• Análisis de procesos
• Automatización RPA
• Reingeniería
• Mejora continua
• Implementación
• Monitoreo continuo

✨ Ventajas Competitivas:
• Reducción de costos
• Aumento de productividad
• Eliminación de errores
• Automatización completa
• Eficiencia operativa
• ROI comprobado

📞 ¿Interesado en Automatizar?
Contacta: info@arla-asociados.com`,
    `⚡ PROCESS OPTIMIZATION

🎯 Eficiencia Operativa Máxima

🔧 Nuestros Servicios:
• Análisis de procesos actuales
• Automatización RPA
• Reingeniería de procesos
• Mejora continua
• Implementación de soluciones
• Monitoreo y optimización

🌟 ¿Por qué Elegirnos?
• Experiencia de 15+ años
• Soluciones escalables
• Automatización completa
• Soporte técnico experto
• ROI comprobado

📞 ¿Listo para la Optimización?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  dashboards: [
    `📊 DASHBOARDS & DATA VISUALIZATION

🎯 ¿Qué Hacemos?
Creamos visualizaciones interactivas
para una mejor toma de decisiones.

📈 Servicios Incluidos:
• Dashboards ejecutivos
• Reportes interactivos
• KPIs en tiempo real
• Visualizaciones personalizadas
• Herramientas de BI
• Análisis predictivo

💡 Beneficios:
• Decisiones informadas
• Monitoreo en tiempo real
• Reportes automatizados
• Visualizaciones claras
• Eficiencia operativa
• ROI comprobado

📞 ¿Listo para Visualizar? Contacta: info@arla-asociados.com`,
    `📈 DASHBOARDS & DATA VISUALIZATION

🚀 Visualización Inteligente

📊 Servicios Especializados:
• Dashboards ejecutivos
• Reportes interactivos
• KPIs en tiempo real
• Visualizaciones personalizadas
• Herramientas de BI
• Análisis predictivo

✨ Ventajas Competitivas:
• Decisiones informadas
• Monitoreo en tiempo real
• Reportes automatizados
• Visualizaciones claras
• Eficiencia operativa
• ROI comprobado

📞 ¿Interesado en Visualizar?
Contacta: info@arla-asociados.com`,
    `🎯 DASHBOARDS & DATA VISUALIZATION

💼 Decisiones Basadas en Datos

🔧 Nuestros Servicios:
• Dashboards ejecutivos
• Reportes interactivos
• KPIs en tiempo real
• Visualizaciones personalizadas
• Herramientas de BI
• Análisis predictivo

🌟 ¿Por qué Elegirnos?
• Experiencia de 15+ años
• Soluciones escalables
• Visualizaciones claras
• Soporte técnico experto
• ROI comprobado

📞 ¿Listo para Visualizar?
Contacta: info@arla-asociados.com
📱 +51 912 235 161`
  ],
  
  default: [
    `🤔 EXCELENTE PREGUNTA

💡 Para darte la mejor respuesta:
Te recomiendo contactarnos directamente
para una consulta personalizada.

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🎯 Mientras tanto, ¿te interesa?
• Conocer nuestros servicios
• Información sobre experiencia
• Cotizaciones personalizadas
• Consultoría inicial gratuita

¿Qué te gustaría explorar?`,
    `💼 CONSULTA ESPECIALIZADA

🎯 Para una respuesta detallada:
Te sugiero contactarnos directamente
para una consulta personalizada.

📞 Información de Contacto:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

✨ ¿Te interesa conocer?
• Nuestros servicios especializados
• Experiencia de 15+ años
• Casos de éxito
• Procesos de trabajo

¿Por cuál te gustaría empezar?`,
    `🚀 PREGUNTA INTERESANTE

💡 Para darte la mejor respuesta:
Te invito a contactarnos directamente
para una consulta especializada.

📞 Contacto Directo:
   📧 info@arla-asociados.com
   📱 +51 912 235 161

🎯 ¿Te gustaría saber más sobre?
• Servicios de transformación digital
• Experiencia y proyectos
• Metodologías utilizadas
• Soporte técnico

¿Qué te interesa explorar?`
  ]
};

// Patrones de reconocimiento de intenciones mejorados
const INTENT_PATTERNS = {
  greetings: [
    /hola|hi|hello|buenos|buenas|saludos|hey/i,
    /¿cómo estás\?|¿qué tal\?|¿cómo va\?/i
  ],
  services: [
    /servicios|qué ofrecen|qué hacen|qué ofrecéis/i,
    /data engineering|business intelligence|cloud|data science|machine learning|process optimization|dashboards/i
  ],
  contact: [
    /contacto|contactar|comunicar|hablar|llamar|escribir/i,
    /teléfono|email|correo|whatsapp|dirección/i
  ],
  location: [
    /ubicación|ubicados|dirección|donde|dónde|localización|location/i,
    /pueblo nuevo|chincha|ica|perú|lima|address/i,
    /donde estan|dónde están|where are|donde se encuentran|dónde se encuentran/i,
    /donde queda|dónde queda|where is located|oficina|sede|sucursal/i
  ],
  pricing: [
    /precio|precios|costo|costos|cotización|cotizar|presupuesto/i,
    /cuánto cuesta|cuanto vale|tarifas/i
  ],
  experience: [
    /experiencia|años|proyectos|clientes|trayectoria|historia/i,
    /cuánto tiempo|desde cuándo|cuántos años/i
  ],
  confusion: [
    /no sé|nose|no se|no se que|nose que|nose que preguntar/i,
    /no se que preguntar|no sé qué preguntar|no se que hacer|nose que hacer/i,
    /no sé qué hacer|ayuda|help|no entiendo|no entiendo nada/i,
    /estoy perdido|estoy confundido|no se por donde empezar|nose por donde empezar/i,
    /no sé por dónde empezar|que puedo preguntar|qué puedo preguntar/i,
    /que puedo hacer|qué puedo hacer|orientame|guíame/i,
    /no tengo idea|no tengo ni idea|estoy bloqueado|estoy trabado/i
  ],
  help: [
    /puedes ayudarme|me puedes ayudar|necesito ayuda|ayudame|ayúdame/i,
    /como funciona|cómo funciona|que hago|qué hago|como empezar|cómo empezar/i,
    /por donde empiezo|por dónde empiezo|que opciones|qué opciones/i,
    /que posibilidades|qué posibilidades/i
  ],
  farewell: [
    /gracias|thank you|thanks|muchas gracias|te agradezco/i,
    /muy amable|muy gentil|perfecto|excelente|genial/i,
    /ok|okay|vale|entendido|perfecto gracias/i,
    /ya está|ya está bien|me sirve|me sirve mucho/i
  ],
  goodbye: [
    /adiós|hasta luego|hasta pronto|nos vemos|bye|goodbye/i,
    /chao|hasta la vista|nos vemos pronto|hasta la próxima/i,
    /hasta la proxima|nos vemos después|nos vemos mas tarde/i,
    /que tengas buen día|que tengas buen dia|que pases bien/i,
    /cuídate|saludos|hasta mañana/i
  ],
  data_engineering: [
    /data engineering|engineering|pipeline|data lake|data warehouse|etl|elt/i,
    /integración de datos|procesamiento de datos/i
  ],
  cloud_consulting: [
    /cloud|nube|migración|aws|azure|gcp|consultoría cloud/i,
    /on-premise|híbrida|arquitectura/i
  ],
  data_science: [
    /data science|machine learning|ml|ia|inteligencia artificial|modelos predictivos/i,
    /análisis|algoritmos|predicción/i
  ],
  process_optimization: [
    /process optimization|optimización|rpa|automatización|procesos/i,
    /reingeniería|mejora|eficiencia/i
  ],
  dashboards: [
    /dashboards|visualización|reportes|kpis|business intelligence|bi/i,
    /gráficos|charts|métricas|indicadores/i
  ]
};

class LocalChatClient {
  constructor() {
    this.isProcessing = false;
    this.conversationHistory = [];
  }

  // Simular delay de red
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Detectar intención del mensaje
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(lowerMessage)) {
          return intent;
        }
      }
    }
    
    return 'default';
  }

  // Obtener respuesta aleatoria de una categoría
  getRandomResponse(category) {
    const responses = RESPONSES_DATABASE[category] || RESPONSES_DATABASE.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Procesar mensaje y generar respuesta
  async processMessage(message) {
    this.isProcessing = true;
    
    try {
      // Simular delay de procesamiento
      await this.delay(800 + Math.random() * 1200);
      
      // Detectar intención
      const intent = this.detectIntent(message);
      
      // Obtener respuesta
      const response = this.getRandomResponse(intent);
      
      // Agregar al historial
      this.conversationHistory.push({
        user: message,
        bot: response,
        intent: intent,
        timestamp: new Date()
      });
      
      // Limitar historial a 10 conversaciones
      if (this.conversationHistory.length > 10) {
        this.conversationHistory.shift();
      }
      
      return {
        success: true,
        message: response,
        intent: intent,
        usage: {
          monthlyTokens: 0,
          monthlyLimit: 0,
          isLocal: true
        }
      };
      
    } catch (error) {
      console.error('Error procesando mensaje:', error);
      return {
        success: false,
        message: 'Lo siento, hubo un error procesando tu mensaje. ¿Podrías intentar de nuevo?',
        error: error.message
      };
    } finally {
      this.isProcessing = false;
    }
  }

  // Verificar si está procesando
  isProcessingMessage() {
    return this.isProcessing;
  }

  // Obtener estadísticas de uso
  getUsageStats() {
    return {
      totalMessages: this.conversationHistory.length,
      isLocal: true,
      lastReset: new Date().toISOString()
    };
  }

  // Enviar mensaje (método principal)
  async sendMessage(message) {
    if (!message || typeof message !== 'string') {
      return {
        success: false,
        message: 'Por favor, escribe un mensaje válido.'
      };
    }

    if (message.length > 500) {
      return {
        success: false,
        message: 'El mensaje es demasiado largo. Por favor, escribe menos de 500 caracteres.'
      };
    }

    return await this.processMessage(message);
  }
}

export default LocalChatClient;