import React, {FC} from 'react';
import styles from "./TermsPopup.module.css";

interface TermsPopupProps {
    onClose: () => void;
}

const TermsPopup: FC<TermsPopupProps> = ({ onClose }) => {
    return (
        // Main container with inline styles for layout
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Main Title */}
                <div className={styles.main_title}>POLÍTICA DE PRIVACIDAD</div>

                {/* Terms of Use Section */}
                <div className={styles.title}>Términos de Uso – https://alliancebioversityciat.org/</div>
                <div className={styles.title}>Fecha de vigencia:</div>
                <p>Enero 2025</p>
                <p>
                    Estos términos y condiciones (“Términos”) rigen su acceso y uso del sitio web{' '}
                    <strong>alliancebioversityciat.org</strong> (“Sitio”), el sitio de la Alianza de Bioversity
                    International y el Centro Internacional de Agricultura Tropical (CIAT), una organización de
                    investigación para el desarrollo con sede en Italia, y miembro de{' '}
                    <a href="https://www.cgiar.org/">CGIAR</a>.
                </p>
                <p>
                    Al acceder o usar el Sitio, usted acepta estar sujeto a estos Términos. Además, pueden aplicarse
                    leyes regionales, nacionales o locales al acceso y uso de este Sitio, y usted es responsable de
                    cumplirlas.
                </p>
                <p>
                    Si no está de acuerdo con estos Términos, por favor salga del Sitio de inmediato. Además, pueden
                    aplicarse términos de uso específicos para ciertos materiales, datos o información disponible a
                    través del Sitio, en cuyo caso su acceso a dichos materiales se regirá por estos Términos, sujeto a
                    dichos términos de uso específicos.
                </p>
                <p>
                    La Alianza se reserva el derecho de modificar estos Términos a su discreción en cualquier momento,
                    siendo efectivas dichas modificaciones al publicarlas.
                </p>
                <p>
                    Si tiene alguna pregunta o inquietud sobre estos Términos, que incluyen nuestra Política de
                    Privacidad y Protección de Datos y el Uso del Sitio, por favor contáctenos por correo postal a la
                    dirección abajo indicada o por correo electrónico a{' '}
                    <a className={styles.link} href="mailto:bioversity-ds-requests@cgiar.org">bioversity-ds-requests@cgiar.org</a>.
                </p>
                <p>Via di San Domenico 1, 00153 Roma, Italia</p>
                <div className={styles.title}>Enlaces relacionados</div>
                <ul>
                    <li>
                        <a className={styles.link} href="https://ciat.cgiar.org/legal/#Privacy-Data-Protection-Policy">
                            Política de Privacidad y Protección de Datos
                        </a>
                    </li>
                    <li>
                        <a className={styles.link} href="https://ciat.cgiar.org/legal/#use-of-site">Uso del Sitio</a>
                    </li>
                </ul>

                {/* Privacy Policy Section */}
                <h4>Política de Privacidad y Protección de Datos</h4>
                <div className={styles.title}>Aspectos generales</div>
                <p>
                    La Alianza de Bioversity International y CIAT tiene como objetivo abrir y compartir ampliamente los
                    resultados y productos de las investigaciones para el desarrollo. En el proceso de una mejor
                    comunicación con los usuarios, la Alianza, a través de algunas funciones ofrecidas en este Sitio,
                    recopila, almacena, protege, maneja y utiliza ciertos tipos de información como el nombre, apellido
                    y correo electrónico para usuarios editores.
                </p>
                <p>
                    Los estándares de integridad, transparencia y equidad de la Alianza guiarán toda la información
                    recopilada. Haremos todo lo razonable para proteger la Información de Identificación Personal o los
                    Datos Personales que usted nos proporcione y manejaremos la información recopilada de manera
                    adecuada.
                </p>
                <p>
                    Lea esta Política cuidadosamente antes de proporcionar cualquier Dato Personal o Información de
                    Identificación Personal. Por favor, proceda solo si encuentra aceptables los siguientes términos. De
                    lo contrario, siempre puede navegar por nuestro Sitio sin compartir sus Datos Personales con
                    nosotros.
                </p>
                <div className={styles.title}>Algunas definiciones</div>
                <p>Estos son los términos clave utilizados en esta Política:</p>
                <ul>
                    <li>
                        <strong>Información de Identificación Personal (IIP)</strong>: Información relacionada con una
                        persona natural identificable.
                    </li>
                    <li>
                        <strong>Controlador de Datos</strong>: Entidad que determina los fines y medios del
                        procesamiento de datos personales.
                    </li>
                    <li>
                        <strong>Procesador de Datos</strong>: Entidad que procesa datos personales en nombre del
                        Controlador de Datos.
                    </li>
                    <li>
                        <strong>Sujeto de Datos</strong>: Individuo cuyos datos personales son recopilados o procesados.
                    </li>
                </ul>
                <h6>¿Qué tipo de Datos Personales recopilamos de los usuarios?</h6>
                <p>
                    Todos los visitantes pueden navegar y acceder a la información disponible públicamente en nuestro
                    Sitio, sin necesidad de proporcionar ninguna Información de Identificación Personal.
                </p>
                <p>
                    Además, tenemos acceso y usamos datos recopilados por Google Analytics, como la dirección IP de su
                    computadora, la URL/dominio de cualquier sitio web que lo refiera, la fecha y hora de su visita al
                    Sitio.
                </p>
                <h6>¿Cómo se recopila la información?</h6>
                <p>
                    La Alianza utiliza plataformas de terceros para mejorar la experiencia del usuario. Estas
                    plataformas permiten que usted interactúe y comparta nuestro contenido con sus redes, y nos permiten
                    conocer sus preferencias para mejorar su experiencia. Estas plataformas incluyen Google Analytics,
                    Google Tag Manager, Twitter, Facebook, LinkedIn, Instagram y ShareThis.
                </p>
                <p>
                    Google Analytics utiliza cookies, que son pequeños archivos transferidos al disco duro de su
                    computadora a través de su navegador (si usted lo permite) y que permiten a los sistemas del sitio o
                    del proveedor de servicios reconocer su navegador y capturar y recordar cierta información (ver
                    sección anterior). Consulte la política de privacidad de Google Analytics para más información sobre
                    qué hacen con la información recopilada. Si desea saber más sobre las cookies utilizadas por Google
                    Analytics, consulte esta página. En caso de que haya optado por desactivar las cookies de Google
                    Analytics, puede instalar un complemento de exclusión para su navegador haciendo clic aquí.
                </p>
                <p>
                    Mejoramos nuestros productos y publicidad utilizando Microsoft Clarity para ver cómo usa nuestro
                    sitio web. Al usar nuestro sitio, usted acepta que nosotros y Microsoft podamos recopilar y usar
                    estos datos.
                </p>
                <p>
                    Nos asociamos con Microsoft Clarity y Microsoft Advertising para capturar cómo usa e interactúa con
                    nuestro sitio web mediante métricas de comportamiento, mapas de calor y repetición de sesiones para
                    mejorar y comercializar nuestros productos/servicios. Los datos de uso del sitio se capturan
                    utilizando cookies de primera y tercera parte y otras tecnologías de seguimiento para determinar la
                    popularidad de productos/servicios y la actividad en línea. Además, usamos esta información para la
                    optimización del sitio, fines de seguridad/prevención de fraudes y publicidad. Para obtener más
                    información sobre cómo Microsoft recopila y utiliza sus datos, visite el{' '}
                    <a href="https://privacy.microsoft.com/privacystatement" data-linktype="external">
                        Aviso de Privacidad de Microsoft
                    </a>.
                </p>
                <p>
                    Le informaremos si y cuando se utilicen otras plataformas de terceros para la recopilación de datos
                    en el futuro.
                </p>
                <p>
                    La información se recopila mediante cookies, plugins sociales y plataformas de terceros (por
                    ejemplo, Google Analytics, Microsoft Clarity). La información recopilada se utiliza para:
                </p>
                <ul>
                    <li>Mejorar la experiencia del usuario.</li>
                    <li>Analizar el tráfico y el comportamiento de los usuarios.</li>
                    <li>Personalizar la entrega de contenido.</li>
                    <li>Diagnosticar y resolver problemas del sitio.</li>
                </ul>
                <h6>¿Cómo utilizamos la información recopilada?</h6>
                <p>
                    Tanto como Controlador de Datos como Procesador de Datos, podemos utilizar la información que
                    recopilamos de usted como Sujeto de Datos de las siguientes maneras:
                </p>
                <ul>
                    <li>Personalizar su experiencia y permitirnos ofrecerle el tipo de contenido que más le interesa.
                    </li>
                    <li>Mantenernos en contacto con usted y proporcionarle actualizaciones.</li>
                    <li>Ayudar a diagnosticar y resolver problemas del sitio para mejorarlo y servirle mejor.</li>
                    <li>
                        Hacer seguimiento después de la correspondencia (consultas por correo electrónico), enviar
                        información, responder a consultas y/o otras solicitudes o preguntas.
                    </li>
                </ul>
                <p>
                    Al hacer lo anterior, su información de contacto y preferencias se comparte entre unos pocos
                    miembros específicos y seleccionados del personal de la Alianza, quienes tienen la responsabilidad y
                    obligación de adherirse a las políticas de privacidad de la Alianza.
                </p>
                <h6>¿Qué son las cookies?</h6>
                <p>
                    Una cookie es un pequeño archivo de texto que un sitio web guarda en su computadora o dispositivo
                    móvil cuando lo visita. Permite que el sitio recuerde sus acciones y preferencias (como el idioma,
                    el tamaño de la fuente y otras preferencias de visualización) durante un período de tiempo, de modo
                    que se mantengan los mismos ajustes cuando regrese al sitio o navegue de una página a otra.
                </p>
                <h6>¿Utilizamos cookies? ¿Y para qué?</h6>
                <p>Sí, el Sitio utiliza cookies proporcionadas por Google Analytics para rastrear y analizar información
                    sobre:</p>
                <ul>
                    <li>cómo usan el sitio nuestros visitantes</li>
                    <li>la distribución geográfica de los visitantes y la tecnología utilizada para acceder al Sitio;
                    </li>
                    <li>las preferencias de los usuarios, lo que nos permite ofrecerle servicios mejorados;</li>
                    <li>el tráfico y la interacción en el Sitio para que en el futuro podamos ofrecerle mejores
                        experiencias y herramientas; y
                    </li>
                    <li>el uso de funciones de redes sociales para contar el contenido visto y compartido.</li>
                </ul>
                <p>
                    Puede optar por que su computadora le advierta cada vez que se envíe una cookie, o puede optar por
                    desactivar todas las cookies. Esto se hace a través de la configuración de su navegador. Dado que
                    cada navegador es un poco diferente, consulte el menú de ayuda de su navegador para aprender la
                    forma correcta de modificar las cookies, y como se mencionó anteriormente, puede instalar un
                    complemento para excluir las cookies de Google Analytics por completo, si es lo que ha decidido
                    hacer.
                </p>
                <h6>¿Cómo se comparte la información recopilada?</h6>
                <p>
                    La Alianza utiliza la información internamente, principalmente entre miembros específicos y
                    seleccionados del equipo de Comunicaciones y Alianzas, para realizar las tareas mencionadas
                    anteriormente. No vendemos, intercambiamos ni transferimos de otra forma la Información de
                    Identificación Personal a terceros, a menos que solicitemos específicamente el consentimiento del
                    Sujeto de Datos y este lo haya proporcionado. Podemos contratar socios y otras partes para ayudarnos
                    en la operación de nuestro sitio web, en la realización de nuestro negocio o en el servicio a
                    nuestros usuarios. Si para estas actividades dichos terceros necesitan algunos Datos Personales, se
                    lo compartiremos siempre y cuando acepten mantener esta información confidencial.
                </p>
                <p>
                    Podemos revelar información cuando sea necesario para cumplir con la ley, hacer cumplir las
                    políticas de nuestro Sitio o proteger nuestros derechos, propiedades o la seguridad de otros. En
                    este sentido, la Alianza se reserva el derecho de divulgar Datos Personales en caso de que una
                    autoridad gubernamental, nacional o internacional, lo solicite, o para investigar actos ilegales o
                    fraudulentos cometidos contra terceros o contra la Alianza.
                </p>
                <h6>¿Cómo almacenamos y protegemos su información?</h6>
                <p>
                    En algunos de nuestros sistemas internos, su información personal se encuentra protegida detrás de
                    redes seguras y solo es accesible por un número limitado de personas que tienen derechos especiales
                    de acceso a dichos sistemas y están obligadas a mantener la confidencialidad de la información.
                    Además, toda la información sensible que usted suministra se cifra mediante tecnología SSL (Secure
                    Socket Layer).
                </p>
                <p>
                    Implementamos diversas medidas de seguridad cuando un usuario ingresa, envía o accede a su
                    información para mantener la seguridad de sus datos personales. Todas las transacciones se procesan
                    a través de un proveedor de pasarela y no se almacenan ni procesan en nuestros servidores.
                </p>
                <p>
                    La información personal que es recopilada y almacenada por servicios de terceros se protege de
                    acuerdo con las políticas de privacidad de cada uno de estos proveedores. Cualquier información
                    personal a la que acceda el Sitio de la Alianza de proveedores de servicios de terceros puede
                    almacenarse en plataformas de Microsoft Office 365. La información no personal se protege por Google
                    de acuerdo con sus políticas de privacidad y acuerdos de servicio.
                </p>
                <h6>Aplicación a enlaces de terceros</h6>
                <p>
                    Ocasionalmente, a nuestra discreción, podemos incluir enlaces a servicios o proveedores de terceros
                    en nuestro sitio web, o mostrar contenido de sitios de terceros. Esta Política de Privacidad solo se
                    aplica a este Sitio. Los sitios de terceros tienen políticas de privacidad separadas e
                    independientes. En la medida permitida por la ley, no asumimos ninguna responsabilidad por el
                    contenido y las actividades de esos sitios enlazados, ni garantizamos sus propios métodos de manejo
                    de datos e información.
                </p>
                <h6>¿Cuánto tiempo retenemos la Información de Identificación Personal?</h6>
                <p>
                    De acuerdo con nuestra política de retención de datos, conservaremos sus Datos Personales solo
                    durante el tiempo razonablemente necesario para lograr los fines para los cuales se recopilan y para
                    cumplir con nuestras obligaciones legales e intereses comerciales legítimos.
                </p>
                <p>
                    La información recopilada por terceros, como la dirección IP, la información recopilada a través de
                    cookies, la URL/dominio de cualquier sitio web que lo refiera, etc., se mantiene de acuerdo con las
                    políticas de dichos terceros.
                </p>
                <h6>¿Cómo puede un Sujeto de Datos acceder a sus datos, actualizarlos, eliminarlos, retirar su
                    consentimiento, presentar una queja o expresar sus inquietudes?</h6>
                <p>
                    Si tiene preguntas sobre sus derechos de privacidad, desea revisar cualquier Dato Personal que
                    mantengamos sobre usted, corregir, retirar su consentimiento, eliminar sus Datos Personales,
                    presentar una queja o expresar alguna inquietud, puede contactarnos directamente en primera
                    instancia para que podamos atender su reclamo.
                </p>
                <ul>
                    <li>
                        Contáctenos por correo electrónico a{' '}
                        <a className={styles.link} href="mailto:bioversity-ds-requests@cgiar.org">
                            bioversity-ds-requests@cgiar.org
                        </a>
                    </li>
                </ul>
                <p>
                    <strong>Alianza de Bioversity International y CIAT</strong>
                </p>
                <p>
                    Via di San Domenico 1, 00153 Roma, Italia. Sin embargo, también puede comunicarse con la Autoridad
                    Italiana de Protección de Datos a través de su sitio web en{' '}
                    <a className={styles.link} href="https://www.garanteprivacy.it/web/guest/home_en">
                        https://www.garanteprivacy.it/web/guest/home_en
                    </a>{' '}
                    o escribirles a:
                </p>
                <p>Piazza di Monte Citorio, 121 – 00186 Roma, Italia</p>
                <p>
                    Tenga en cuenta que, en la medida permitida por la ley, una solicitud para eliminar Datos Personales
                    o revocar una autorización para conservar Datos Personales puede no proceder si el Sujeto de Datos
                    tiene un deber legal o contractual de permanecer en los archivos de datos gestionados por la
                    Alianza.
                </p>
                <h6>Disponibilidad de la Política de Privacidad y actualizaciones</h6>
                <p>
                    Esta Política de Privacidad es efectiva a partir del 1 de septiembre de 2021 y está disponible para
                    usted en nuestro sitio web en la URL{' '}
                    <a className={styles.link} href="https://alliancebioversityciat.org/privacy-policy">
                        https://alliancebioversityciat.org/privacy-policy
                    </a>{' '}
                    para ser consultada, impresa o descargada.
                </p>
                <p>
                    La Alianza se reserva el derecho de enmendar los términos de esta Política en cualquier momento.
                    Publicaremos una nota informándole sobre cualquier actualización o enmienda a nuestra Política en el
                    sitio web{' '}
                    <a className={styles.link} href="https://alliancebioversityciat.org/privacy-policy">
                        https://alliancebioversityciat.org/privacy-policy
                    </a>.
                </p>
                <p>Última edición: 2021-09-01</p>

                {/* Use of the Site Section */}
                <div className={styles.title}>Uso del Sitio</div>
                <h6>Aspectos generales</h6>
                <p>
                    Estos Términos abordan las condiciones aplicables a materiales, datos o información específica
                    disponibles a través del Sitio de la Alianza de Bioversity International y el Centro Internacional
                    de Agricultura Tropical (CIAT) en{' '}
                    <a className={styles.link} href="https://alliancebioversityciat.org/privacy-policy">
                        https://alliancebioversityciat.org/privacy-policy
                    </a>
                    . En caso de que el acceso y uso de dichos materiales, datos o información se rijan por términos
                    específicos, estos Términos se aplicarán, sujetos a dichos términos de uso específicos.
                </p>
                <p>
                    Al acceder y usar este Sitio, usted acepta estar sujeto a estos Términos, a todas las leyes y
                    regulaciones aplicables, y acepta que es responsable de cumplir con cualquier ley local aplicable.
                </p>
                <p>
                    Si no está de acuerdo con estos Términos, absténgase de acceder y usar este sitio.
                </p>
                <p>
                    Los materiales contenidos en este Sitio están protegidos por la ley de derechos de autor y marcas
                    registradas aplicables.
                </p>
                <h6 className={styles.title}>Derechos de autor</h6>
                <h5 className={styles.autor_rights}>Derechos de autor © Alianza de Bioversity y CIAT (Centro Internacional de Agricultura Tropical)</h5>
                <p>
                    A excepción del contenido de terceros, la Alianza de Bioversity y CIAT (la Alianza) posee el título
                    del recurso en línea y los materiales y contenido subidos y publicados en el Sitio.
                </p>
                <div className={styles.title}>Licencia de Uso</div>
                <h6>Software</h6>
                <p>
                    El software detrás de este Sitio es Drupal, un software libre (libre como en libertad) licenciado
                    bajo la Licencia Pública General GNU versión 2.0 (GPL-2) o posterior, como la versión 3.0 (GPL-3).
                    Para ver los términos completos de la licencia: para la versión 2.0 vea aquí, y para la versión 3.0
                    vea aquí.
                </p>
                <p>De acuerdo con la GPL-3 usted puede:</p>
                <ul>
                    <li>Utilizarlo para fines personales, educativos, institucionales o comerciales;</li>
                    <li>
                        Copiar, utilizar, redistribuir, modificar y/o vender, siempre que utilice la Licencia Pública
                        General GNU publicada por la Free Software Foundation;
                    </li>
                    <li>Instalarlo en tantas computadoras como desee.</li>
                </ul>
                <p>Además, según esta licencia, debe:</p>
                <ul>
                    <li>Mantener los derechos de autor u otras notificaciones de propiedad que acompañen a los
                        materiales;
                    </li>
                    <li>Incluir una copia literal de la GPL para el software original y para las versiones modificadas
                        del mismo;
                    </li>
                    <li>Indicar los cambios realizados, en caso de que los haga;</li>
                    <li>Divulgar el código fuente y una versión modificada del mismo si distribuye una versión
                        modificada.
                    </li>
                </ul>
                <p>
                    Esta licencia se terminará automáticamente si viola alguna de estas restricciones y podrá ser
                    terminada por CIAT en cualquier momento. Tras la terminación de esta licencia, deberá destruir
                    cualquier material descargado en su posesión, ya sea en formato electrónico o impreso.
                </p>
                <h6>Contenido</h6>
                <p>
                    En general, todos los productos informativos a nivel CGIAR están regulados por los Principios de
                    CGIAR sobre la Gestión de Activos Intelectuales (<a className={styles.link}
                    href="https://cgspace.cgiar.org/bitstream/handle/10947/4486/CGIAR%2520IA%2520Principles.pdf?sequence=5">Microsoft
                    Word - Principios de IA de CGIAR</a>) y por la Política de Acceso Abierto de CGIAR (<a className={styles.link}
                    href="https://cgspace.cgiar.org/bitstream/handle/10947/2875/CGIAR%2520OA%2520Policy%2520-%2520October%25202%25202013%2520-%2520Approved%2520by%2520Consortium%2520Board.pdf?sequence=4">Política
                    de Acceso Abierto y Gestión de Datos de CGIAR (aprobada por el Consortium Board en octubre de
                    2013)</a>).
                </p>
                <p>
                    El contenido o materiales a los que se accede a través del Sitio, incluyen, pero no se limitan a,
                    datos en bruto, datos anotados o de otro modo analizados, información, informes, videos, imágenes,
                    presentaciones, documentos escritos como informes, artículos (incluyendo artículos arbitrados),
                    materiales de cursos y servicios (denominados en conjunto “Materiales”) que sean generados, creados
                    o desarrollados ya sea (i) por la Alianza (“Materiales de la Alianza”); (ii) por personas que pueden
                    incluir al personal o colaboradores asociados con los Programas de Investigación de CGIAR,
                    Plataformas de CGIAR y otros Centros de CGIAR (“Materiales Contribuidos”); o (iii) pertenecientes a
                    terceros, puestos a disposición a través del sitio de la Plataforma mediante enlaces o por citación
                    o agregación (“Materiales de Terceros”).
                </p>
                <p className={styles.third_title}>(i) Materiales de la Alianza</p>
                <p>
                    A menos que se indique lo contrario de forma explícita, los Materiales de la Alianza están
                    disponibles bajo la Licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC-BY-NC
                    4.0), que le permite descargar, copiar, reproducir, modificar, remezclar, construir a partir de,
                    difundir y publicar sin necesidad de solicitar permiso al titular, siempre y cuando sea para fines
                    no comerciales, se le dé crédito a los autores/titulares según se indique en la citación
                    correspondiente, y el aviso de derechos de autor y esta licencia se mantengan con los Materiales de
                    la Alianza, incluso si forman parte de trabajos derivados. Los términos completos de la licencia
                    están disponibles aquí.
                </p>
                <p className={styles.third_title}>(ii) Materiales Contribuidos</p>
                <p>
                    Como contribuyente de Materiales Contribuidos, debe tener el derecho de hacer tal contribución. Como
                    titular de los Materiales Contribuidos, usted o la organización que representa, según corresponda,
                    conservará los derechos de autor. Si los Materiales Contribuidos son propiedad de un tercero, debe
                    asegurarse de tener los derechos para conceder a la Alianza la licencia especificada en este
                    documento. Al contribuir, usted acepta otorgar a CIAT, a sus sucesores y cesionarios, una licencia
                    gratuita, sin cargos de acceso, libre de regalías, perpetua, mundial, no exclusiva y sublicenciable
                    para utilizar, copiar, modificar, ejecutar, publicar y difundir dichos Materiales Contribuidos en el
                    Sitio y a través de trabajos derivados. Los contribuyentes deberán garantizar, en la medida de lo
                    posible, que los Materiales Contribuidos no infrinjan los derechos de terceros, incluidos los
                    derechos de autor, la protección de la privacidad, el consentimiento informado y/o los derechos de
                    acceso y distribución de beneficios relacionados con la biodiversidad. En caso de duda, el
                    contribuyente deberá abstenerse de aportar Materiales Contribuidos al Sitio o, si ya han sido
                    aportados, retirar dichos Materiales Contribuidos. El contribuyente defenderá, indemnizará y
                    mantendrá indemne a la Alianza de cualquier reclamo, daño o costo (incluidos los honorarios
                    razonables de abogados) que resulte de información falsa o engañosa o de negligencia.
                </p>
                <p>
                    Si elimina un Material Contribuido, la Alianza no garantiza que podrá o asumirá la responsabilidad
                    de eliminar las contribuciones eliminadas del Sitio, incluyendo, pero no limitándose a, aquellas que
                    estén fuera de su control razonable o a las que usted o terceros hayan reenviado su Material
                    Contribuido.
                </p>
                <p>
                    CIAT podría, pero no está obligado a, revisar su Material Contribuido. La Alianza puede, a su
                    exclusivo criterio, eliminar su Material Contribuido si establece que viola estos Términos. La
                    aceptación de Materiales Contribuidos no constituye un endoso o patrocinio por parte de la Alianza.
                </p>
                <p className={styles.third_title}>(iii) Materiales de Terceros</p>
                <p>
                    Los Materiales de Terceros se rigen por los términos aplicables y contenidos en los sitios web de
                    terceros. La Alianza no es responsable ni tiene control sobre dichos Materiales de Terceros. La
                    Alianza proporciona acceso a dichos Materiales de Terceros únicamente para conveniencia. La Alianza
                    hace todo lo posible, pero no garantiza la revisión de los Materiales de Terceros y no hace
                    representaciones ni garantías sobre el material, la información, los productos o los servicios
                    ofrecidos por terceros. La exhibición de Materiales de Terceros no constituye un endoso o patrocinio
                    por parte de la Alianza de dichos Materiales de Terceros. El uso de cualquier Material de Terceros
                    es bajo el riesgo del usuario.
                </p>
                <h6>Exactitud de los Materiales</h6>
                <p>
                    Los Materiales que aparecen en el Sitio de la Alianza pueden incluir errores técnicos, tipográficos
                    o fotográficos. La Alianza no garantiza que cualquiera de dichos Materiales en sus Sitios sea
                    exacto, completo o actual. La Alianza puede realizar cambios en cualquiera de los Materiales
                    contenidos en su sitio en cualquier momento sin previo aviso. No obstante, la Alianza no se
                    compromete a actualizar los Materiales. Los usuarios y contribuyentes del Sitio de la Alianza son
                    completamente responsables de la exactitud del contenido que suben.
                </p>
                <h6>Descargo de responsabilidad</h6>
                <p>
                    El software de la Alianza y los materiales de la Alianza en el Sitio se proporcionan “tal cual”. La
                    Alianza no ofrece garantías, ya sean expresas o implícitas, incluyendo, sin limitación, garantías de
                    comerciabilidad, idoneidad para un propósito particular, no infracción de derechos de propiedad
                    intelectual u otras violaciones de derechos. Además, la Alianza no garantiza ni hace
                    representaciones sobre la exactitud, integridad, resultados probables, oportunidad o confiabilidad
                    del uso del código fuente o código objeto del software, de los datos, información, contenido o
                    cualquier otro material en el sitio web, o de otro modo relacionado con dichos materiales, o en
                    otros sitios web vinculados a este Sitio.
                </p>
                <h6>Limitaciones</h6>
                <p>
                    Salvo lo prohibido por la ley, en ningún caso la Alianza o sus proveedores serán responsables por
                    daños (incluyendo, sin limitación, daños especiales, indirectos, punitivos o consecuentes o daños
                    por pérdida de datos o ganancias, o debido a interrupciones en el negocio) que surjan del acceso,
                    uso o confianza, o de la imposibilidad de acceder, usar o confiar en el Sitio de CIAT y el contenido
                    o cualquier otro material en el Sitio.
                </p>
                <h6>Uso prohibido</h6>
                <p>
                    Usted se compromete a no utilizar el Sitio de la Alianza, incluidos los Materiales, para ningún
                    propósito ilegal o de cualquier forma que viole los derechos de terceros, incluidos los derechos de
                    propiedad intelectual. Además, usted acepta no utilizar los logotipos y el nombre de la Alianza sin
                    la autorización previa y por escrito de la Alianza.
                </p>
                <h6>Modificaciones</h6>
                <p>
                    La Alianza puede revisar estos Términos en cualquier momento sin previo aviso. La versión más actual
                    de los Términos se puede consultar haciendo clic en el enlace o enlaces ubicados en el Sitio. Por
                    favor, revise estos Términos periódicamente para ver si han cambiado. Al utilizar el sitio web de la
                    Alianza, usted acepta estar sujeto a la versión vigente de estos Términos.
                </p>
                <h6>No renuncia</h6>
                <p>
                    El hecho de que alguna de las partes no exija o haga cumplir estrictamente alguna de las
                    disposiciones de estos Términos no se interpretará como una renuncia de ningún derecho o
                    disposición. Nada de lo aquí establecido se considerará como una renuncia de ninguno de los
                    privilegios e inmunidades de CIAT y Bioversity International.
                </p>
                <h6>Ley aplicable</h6>
                <p>
                    Estos Términos se rigen e interpretan de acuerdo con los principios generales y reconocidos del
                    derecho internacional, excluyéndose cualquier sistema jurídico nacional. Se entenderá que los
                    principios generales del derecho incluyen los Principios UNIDROIT para los Contratos Comerciales
                    Internacionales de 2016. Usted y la Alianza se esforzarán por resolver cualquier disputa,
                    controversia o reclamación que surja de o se relacione con estos Términos o el Sitio mediante
                    negociación.
                </p>
                <p>
                    En caso de que no se alcance un acuerdo amistoso dentro de los sesenta (60) días posteriores a la
                    notificación por escrito de dicha disputa, controversia o reclamación por una de las partes a la
                    otra, la disputa, controversia o reclamación se resolverá mediante arbitraje de acuerdo con las
                    Reglas de Arbitraje de la UNCITRAL vigentes en la fecha de este contrato. Se designará un árbitro
                    por mutuo acuerdo de las partes, o, en su defecto, por el Secretario General del Tribunal Permanente
                    de Arbitraje. El lugar del arbitraje, propuesto por la Alianza, será un lugar neutral donde las
                    partes puedan esperar un resultado justo. El idioma que se utilizará en el procedimiento arbitral
                    será el inglés.
                </p>
            </div>
            <div className={styles.button_container}>
                <button
                    onClick={onClose}
                    className={styles.button}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
export default TermsPopup;