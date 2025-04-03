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
                <div className={styles.main_title}>PRIVACY POLICY</div>

                {/* Terms of Use Section */}
                <div className={styles.terms_title}>Terms of Use – https://agroalimentariasostenible.co/</div>
                <div className={styles.title}>Effective date:</div>
                <p>January 2025</p>
                <p>
                    These terms and conditions (“Terms”) govern your access to and use of{' '}
                    <a className={styles.link}
                       href="https://agroalimentariasostenible.co/" data-linktype="external">https://agroalimentariasostenible.co/</a> (“Site”),
                    Site hosted by the Alliance of Bioversity
                    International and the International Center for Tropical Agriculture (CIAT), a
                    research-for-development organization with headquarters in Italy and Colombia, and a member of{' '}
                    <a href="https://www.cgiar.org/" data-linktype="external">CGIAR</a>.
                </p>
                <p>
                    By accessing or using the Site, you agree to be bound by these Terms. In addition, regional,
                    national or local laws may apply to the access and use of this Site and you are responsible to
                    comply with them.
                </p>
                <p>
                    If you do not agree to be bound by these Terms, please promptly exit the Site. In addition, specific
                    terms of use may apply to specific materials, data or information available through the Site, in
                    which case your access to such materials shall be governed by these Terms, subject to such specific
                    terms of use.
                </p>
                <p>
                    The Alliance reserves the right to modify these Terms in its discretion at any time, such
                    modifications being effective when posted.
                </p>
                <p>
                    If you have any questions or concerns about these Terms, which include our Privacy and Data
                    Protection Policy and Use of the Site, please contact us by post at the below address or by email
                    at {' '}
                    <a className={styles.link} data-linktype="external"
                       href="mailto:bioversity-ds-requests@cgiar.org">bioversity-ds-requests@cgiar.org</a>.
                </p>
                <p>Via di San Domenico 1, 00153 Rome, Italy</p>

                {/* Privacy Policy Section */}
                <h4>Privacy and Data Protection Policy</h4>
                <div className={styles.title}>General aspects</div>
                <p>
                    The Alliance of Bioversity International and CIAT aims at opening up and widely sharing the results
                    and products of research for development endeavors. In the process of better communicating with
                    users, the Alliance, through some features offered through this Site, collects, handles and
                    otherwise uses certain types of information such as Name, Surname, telephone and email.
                </p>
                <p>
                    The Alliance’s standards for integrity, transparency and equity will guide all collected
                    information. We will make every reasonable effort to protect Personally Identifiable Information or
                    Personal Data provided by you and handle collected information appropriately.
                </p>
                <p>
                    Read this Policy carefully before you provide any Personal Data or Personally Identifiable
                    Information to us. Please proceed if you find the following terms agreeable. Otherwise, you are
                    always welcome to peruse our Site without sharing your Personal Data with us.
                </p>
                <div className={styles.title}>Some definitions</div>
                <p>These are key terms used in this Policy:</p>
                <ul>
                    <li>
                        <strong>Personally Identifiable Information (PII):</strong> Information relating to an
                        identifiable natural person.
                    </li>
                    <li>
                        <strong>Data Controller:</strong> Entity that determines the purposes and means of processing
                        personal data.
                    </li>
                    <li>
                        <strong>Data Processor:</strong> Entidad que procesa datos personales en nombre del
                        Controlador de Datos.
                    </li>
                    <li>
                        <strong>Data Subject:</strong> Individual whose personal data is collected or processed.
                    </li>
                </ul>
                <h6>What type of Personal Data do we collect from users?</h6>
                <p>
                    All visitors are free to peruse and access the publicly available information on our Site, without
                    providing any Personally Identifiable Information.
                </p>
                <p>
                    In addition, we have access to and use data collected by Google Analytics such as your computer’s IP
                    address, the URL/domain name of any referring website, the time and date of your visit to the Site,
                    your devices location, operating system, and heat map.
                </p>
                <h6>How is the information collected?</h6>
                <p>
                    The Alliance uses third-party platforms to improve the experience of the user. These third-party
                    platforms allow you to interact with and share our content with your networks, and allow us to know
                    your preferences in order to improve your experience. These third-party platforms include Google
                    Analytics and Clarity .
                </p>
                <p>
                    Google Analytics uses cookies, which are small files transferred to your computer’s hard drive
                    through your web browser (if you allow it) that enable the site’s or service provider’s systems to
                    recognize your browser and capture and remember certain information (see section above). Please see
                    Google Analytics’ privacy policy for information on what they do with information collected. If you
                    are interested in getting to know more about the cookies used by Google Analytics, consult this
                    page. In case you opted to prevent Google Analytics cookies altogether, you can install an opt-out
                    add-on for your browser by clicking here.
                </p>
                <p>
                    We improve our products and advertising by using Microsoft Clarity to see how you use our website.
                    By using our site, you agree that we and Microsoft can collect and use this data.
                </p>
                <p>
                    We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with
                    our website through behavioral metrics, heatmaps, and session replay to improve and market our
                    products/services. Website usage data is captured using first and third-party cookies and other
                    tracking technologies to determine the popularity of products/services and online activity.
                    Additionally, we use this information for site optimization, fraud/security purposes, and
                    advertising. For more information about how Microsoft collects and uses your data, visit
                    theMicrosoft Privacy Statement: {' '}
                    <a href="https://privacy.microsoft.com/privacystatement" data-linktype="external">
                        https://privacy.microsoft.com/privacystatement
                    </a>
                </p>
                <p>
                    We will let you know if and when other data-collecting third party platforms are used in the future.
                </p>
                <p>
                    Information is collected through cookies, social plugins, and third-party platforms (e.g., Google
                    Analytics, Microsoft Clarity). The collected information is used to:
                </p>
                <ul>
                    <li>Improve user experience.</li>
                    <li>Analyze traffic and user behavior.</li>
                    <li>Personalize content delivery.</li>
                    <li>Diagnose and solve site issues.</li>
                </ul>
                <h6>How do we use the collected information?</h6>
                <p>
                    Whether as a Data Controller or as a Data Processor, we may use the information we collect from you
                    as a Data Subject in the following ways:
                </p>
                <ul>
                    <li>
                        To personalize your experience and to allow us to deliver the type of content you are most
                        interested in.
                    </li>
                    <li>To stay in touch with you and provide updates.</li>
                    <li>
                        To help diagnose and solve issues with the site in order to improve it and better serve you.
                    </li>
                    <li>
                        To follow up with you after correspondence (email inquiries), send information, respond to
                        inquiries, and/or other requests or questions.
                    </li>
                </ul>
                <p>
                    In doing any of the above, your contact information and preferences are shared among specific and
                    selected few Alliance staff, who have a responsibility and obligation to adhere to Alliance privacy
                    policies.
                </p>
                <h6>What are cookies?</h6>
                <p>
                    A cookie is a small text file that a website saves on your computer or mobile device when you visit
                    the site. It enables the website to remember your actions and preferences (such as language, font
                    size and other display preferences) over a period of time, in order to keep the same settings
                    whenever you come back to the site or browse from one page to another.
                </p>
                <h6>Do we use cookies? If so, what for?</h6>
                <p>Yes, the Site uses cookies provided by Google Analytics  to track and analyze information about:</p>
                <ul>
                    <li>how our visitors use the site;</li>
                    <li>
                        the geographical distribution of visitors and the technology used to access the Site;
                    </li>
                    <li>user’s preferences, which enables us to provide you with improved services;</li>
                    <li>
                        the Site traffic and Site interaction so that we can offer you better experiences and tools in the future; and
                    </li>
                    <li>the use of the functions of social media to count seen and shared content.</li>
                </ul>
                <p>
                    You can choose to have your computer warn you each time a cookie is being sent, or you can choose to
                    turn off all cookies. You do this through your browser settings. Since each browser is a little
                    different, look at your browser’s Help Menu to learn the correct way to modify your cookies, and as
                    mentioned above, you can install an add-on to opt out of Google Analytics’ cookies altogether, if
                    that is what you chose to do.
                </p>
                <h6>How is the collected information shared?</h6>
                <p>
                    The Alliance uses the information internally, mostly among selected and specific members of the
                    Communications and Partnerships team to perform the tasks mentioned above (see section 4). We do not
                    sell, trade, or otherwise transfer Personally Identifiable Information to outside parties unless we
                    specifically ask Data Subjects for their consent to do it and you as a Data Subject have provided
                    it. We may engage partners and other parties to assist us in operating our website, conducting our
                    business, or serving our users. If for these activities, such parties needed some Personal Data, we
                    would share it with them so long as they agree to keep this information confidential.
                </p>
                <p>
                    We may release information when it is necessary to comply with the law, enforce our Site policies,
                    or protect ours or others’ rights, property or safety. In this line, the Alliance reserves the right
                    to disclose Personal Data in case of a request by a national or international government authority,
                    to investigate illegal or fraudulent acts committed against third parties or against the Alliance.
                </p>
                <h6>How do we store and safeguard your information?</h6>
                <p>
                    For some of our internal systems, your personal information is contained behind secured networks and
                    is only accessible by a limited number of persons who have special access rights to such systems,
                    and are required to keep the information confidential. In addition, all sensitive information you
                    supply is encrypted via Secure Socket Layer (SSL) technology .
                </p>
                <p>
                    We implement a variety of security measures when a user enters, submits, or accesses their
                    information to maintain the safety of your personal information. All transactions are processed
                    through a gateway provider and are not stored or processed on our servers.
                </p>
                <p>
                    Personal information that is collected and stored by third party services is protected according to
                    the privacy policies of each of these providers. Any personal information that is accessed by the
                    Alliance’s Site from third-party service providers may be stored in Microsoft Office 365 platforms.
                    Non-personal information is safeguarded by Google according to their privacy and terms of service
                    agreements.
                </p>
                <h6>Application to third-party links</h6>
                <p>
                    Occasionally, at our discretion, we may include links to third-party services or providers on our
                    website, or feature content from third-party sites. This Privacy Policy only applies to this Site.
                    Third-party sites have separate and independent privacy policies. To the extent permitted by law, we
                    assume neither responsibility for the content and activities of those linked sites, nor give
                    warranties about their own data and information handling.
                </p>
                <h6>How long do we retain Personally Identifiable Information?</h6>
                <p>
                    In accordance with our data retention policy, we will retain your Personal Data only for as long as
                    is reasonably necessary to achieve the purposes for which it is collected and for our legal
                    entitlements and legitimate business interests.
                </p>
                <p>
                    Information collected by external parties, such as IP address, information collected through
                    cookies, the URL/domain name of any referring website, and so on is maintained according to their
                    policies.
                </p>
                <h6>How can a Data Subject access her/his data, update it, delete it, withdraw consent, lodge a complaint, or raise concerns?</h6>
                <p>
                    If you have questions about your privacy rights, want to review any Personal Data that we maintain
                    about you, correct, withdraw your consent, delete your Personal Data, lodge a complaint, or raise a
                    concern, you can contact us directly in the first instance so that we can address your complaint.
                </p>
                <ul>
                    <li>
                        Contact us by email at {' '}
                        <a className={styles.link} href="mailto:bioversity-ds-requests@cgiar.org">
                            bioversity-ds-requests@cgiar.org
                        </a>
                    </li>
                </ul>
                <p>
                    <strong>Alliance of Bioversity International and CIAT</strong>
                </p>
                <p>
                    Km 17 recta Cali- Palmira, Valle del Cauca, Colombia. However, you can also contact the Italian Data
                    Protection Authority via their website at{' '}
                    <a className={styles.link} href="mailto:contactenos@sic.gov.co">
                        contactenos@sic.gov.co
                    </a>
                </p>
                <p>
                    Kindly notice that as long as permitted by law, a request for deletion of Personal Data or the
                    revocation of an authorization to hold Personal Data may not proceed if the Data Subject has a legal
                    or contractual duty to remain in the data files managed by the Alliance.
                </p>
                <h6>Availability of the Privacy Policy and updates</h6>
                <p>
                    This Privacy Policy is effective as of January 1, 2025 and available to you through our website at
                    the {' '}
                    <a className={styles.link} href="https://agroalimentariasostenible.co/">
                        https://agroalimentariasostenible.co/
                    </a>{' '}
                    and its subdomains. viewing, printing or downloading.
                </p>
                <p>
                    The Alliance reserves the right to amend the terms of this Policy at any time. We will post a note informing about any updates or amendments to our Policy at{' '}
                    <a className={styles.link} href="https://agroalimentariasostenible.co/">
                        https://agroalimentariasostenible.co/
                    </a> and its subdomains.
                </p>
                <p>Last Edited on February, 2025</p>

                {/* Use of the Site Section */}
                <div className={styles.title}>Use of the Site</div>
                <h6>General aspects</h6>
                <p>
                    These Terms address the conditions applicable to specific materials, data or information available
                    through the Site{' '}
                    <a className={styles.link} href="https://agroalimentariasostenible.co/">
                        https://agroalimentariasostenible.co/
                    </a>
                    and its subdomains, hosted by the Alliance of Bioversity International and the International Center
                    for Tropical Agriculture (CIAT), and Amplify, a service provides by Amazon Web Services (AWS). In
                    case, access and use to those materials, data or information is governed by specific terms, these
                    Terms shall apply, subject to such specific terms of use.
                </p>
                <p>
                    By accessing and using this Site, you are agreeing to be bound by these Terms, all applicable laws
                    and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p>
                    If you do not agree with these Terms, refrain from accessing and using this site.
                </p>
                <p>
                    The materials contained in this Site are protected by applicable copyright and trademark law.
                </p>
                <h6 className={styles.title}>Copyright</h6>
                <h5 className={styles.autor_rights}>Copyright © CIAT (International Center for Tropical
                    Agriculture)</h5>
                <p>
                    Except for third party content, CIAT (the Alliance) holds the title to the online resource and the
                    materials and content uploaded and posted on the Site.
                </p>
                <div className={styles.title}>Use License</div>
                <h6>Software</h6>
                <p>
                    The software behind this Site is built using Next.js, a React framework for server-rendered applications and static site generation.
                </p>
                <p>According to the GPL-3 you may:</p>
                <ul>
                    <li>use it for personal, educational, institutional or commercial purposes;</li>
                    <li>
                        copy, use, redistribute, modify, and/or sell as long as you use the GNU General Public License
                        as published by the Free Software Foundation;
                    </li>
                    <li>install it in as many computers as you wish.</li>
                    <li>
                        maintain the copyright or other proprietary notations coming with the materials;
                    </li>
                    <li>
                        include a verbatim copy of the GPL for the original software and for modified versions of it;
                    </li>
                    <li>state the changes as such if you make them;</li>
                    <li>
                        disclose the source code and a modified version of the code if you distribute a modified version of it.
                    </li>
                </ul>
                <p>
                    This license shall automatically terminate if you violate any of these restrictions and may be
                    terminated by CIAT at any time. Upon termination of this license, you must destroy any downloaded
                    materials in your possession whether in electronic or printed format.
                </p>
                <h6>Content</h6>
                <p>
                    In general, all informational products at CGIAR level are regulated by the CGIAR Principles on the
                    Management of Intellectual Assets (<a className={styles.link}
                                                          href="https://cgspace.cgiar.org/bitstream/handle/10947/4486/CGIAR%2520IA%2520Principles.pdf?sequence=5">Microsoft
                    Word - CGIAR IA Principlesvp</a>) and the CGIAR Open Access Policy (<a
                    className={styles.link}
                    href="https://cgspace.cgiar.org/bitstream/handle/10947/2875/CGIAR%2520OA%2520Policy%2520-%2520October%25202%25202013%2520-%2520Approved%2520by%2520Consortium%2520Board.pdf?sequence=4">CGIAR
                    Open Access and Data Management Policy (approved by Consortium Board October 2013</a>).
                </p>
                <p>
                    The content or materials accessed through the Site, include but are not limited to raw data,
                    annotated or otherwise analyzed data, information, reports, videos, images, presentations, written
                    documents such as reports, articles (including peer-reviewed articles), course materials, and
                    services (referred all as “Materials”) that are generated, created or developed either (i) by the
                    Alliance (“Alliance Materials”); (ii) by people who may include staff of or personnel associated
                    with CGIAR Research Programs, CGIAR Platforms and other CGIAR Centers (“Contributed Materials”); or
                    (iii) belonging to or originated by third parties, made available through the Platform site through
                    links or by citation or aggregation (“Third Party Materials”).
                </p>
                <p className={styles.third_title}>(i) Alliance Materials</p>
                <p>
                    Unless otherwise and explicitly stated, the Alliance Materials are available under the Creative
                    Commons Attribution NonCommercial License 4.0 International (CC-BY-NC 4.0), that allows you to
                    download, copy, reproduce, modify, remix, build upon, disseminate, publish without seeking
                    permission from the owner as long as it is for non-commercial purposes, you give credit to
                    authors/owner as provided in the respective citation, and the copyright notice and this license
                    remain with the Alliance Materials, even if they become part of derived works. Full terms of the
                    license are available here.
                </p>
                <p className={styles.third_title}>(ii) Contributed Materials</p>
                <p>
                    As a contributor of Contributed Materials you must have the right to make such a contribution. As
                    the owner of Contributed Materials, you or the organization you represent, as applicable, shall
                    retain copyright. If Contributed Materials are owned by a third party, you must make sure that you
                    have the rights to confer upon the Alliance the license hereby specified. As a contributor you agree
                    to grant CIAT, its successors and assigns a free of access charges, royalty free, perpetual,
                    worldwide, non-exclusive, and sublicensable license to use, copy, modify, perform, publish and
                    disseminate such Contributed Materials in the Site and through derivative works. Contributors must
                    warrant to the best of their knowledge that the Contributed Materials do not infringe the rights of
                    any third party, including copyrights, privacy protection, informed consent and/or
                    biodiversity-related access and benefit-sharing rights. In case of doubt, a contributor shall
                    abstain from providing Contributed Materials to the Site or if already contributed, withdraw such
                    Contributed Materials. The contributor shall defend, indemnify, and holdthe Alliance harmless from
                    any resulting claims, damages or costs (including reasonable attorney fees) in case of false or
                    misleading information or negligence.
                </p>
                <p>
                    If you delete a Contributed Material,the Alliance does not warrant that it will be able to or will
                    take responsibility for removing deleted contributions from the Site, including but not limited to
                    those outside of its reasonable control or those to whom you or others may have forwarded your
                    Contributed Material.
                </p>
                <p>
                    CIAT might, but it is no obligation to, review your Contributed Material.the Alliance may, at its
                    sole discretion, remove your Contributed Material if it establishes that it violates these Terms.
                    Acceptance of Contributed Material does not constitute an endorsement or sponsorship of the
                    Contributed Material bythe Alliance.
                </p>
                <p className={styles.third_title}>(iii) Third Party Materials</p>
                <p>
                    Third Party Materials are governed by the terms applicable and contained in third party websites.
                    the Alliance is not responsible for or has no control over such Third Party Materials.the Alliance
                    provides access to such Third Party Materials for convenience only.the Alliance makes every effort
                    but does not ensure revision of Third Party Material and makes no warranties or representations
                    about the material, information, products, or services offered by third parties. Display of Third
                    Party Materials does not constitute endorsement or sponsorship bythe Alliance of any Third Party
                    Materials. Use of any such Third Party Material is at the user’s own risk.
                </p>
                <h6>Accuracy of Materials</h6>
                <p>
                    Materials appearing onthe Alliance’s Site could include technical, typographical, or photographic
                    errors. The Alliancedoes not warrant that any of such Materials on its Sites are accurate, complete
                    or current.The Alliance may make changes to any Materials contained on its site at any time without
                    notice. Nevertheless the Alliance does not make any commitment to update the Materials. Users of and
                    contributors to the the Alliance Site are completely responsible for the accuracy of the content
                    uploaded by them.
                </p>
                <h6>Disclaimer</h6>
                <p>
                    The Alliance’s software and the Alliance's materials on the Site are provided on an “as is” basis.
                    CThe Alliance makes no warranties, either expressed or implied, including, without limitation, as to
                    the merchantability, fitness for a particular purpose, non-infringement of intellectual property
                    rights or any other violation of rights.
                    Further, the Alliance does not warrant or make any representations concerning the accuracy,
                    completeness, likely results, timeliness, or reliability of the use of the source code or object
                    code of the software, of the data, information, content or any other materials on the website, or
                    otherwise relating to such materials, or on any other sites or websites linked to this Site.
                </p>
                <h6>Limitations</h6>
                <p>
                    Except as prohibited by law, in no event shall the Alliance or its suppliers be liable for any
                    damages (including, without limitation, special, indirect, punitive or consequential damages or
                    damages for any loss of data or profit, or due to business interruption) arising out of the access,
                    use or reliance, or of the inability to access, use or rely on CIAT’s Site and the content or any
                    other materials on the Site.
                </p>
                <h6>Prohibited use</h6>
                <p>
                    You agree not to use the Alliances’s Site, including the Materials, for any unlawful purpose or in
                    any way that would violate the rights of others, including intellectual property rights. Further,
                    you agree to not use the Alliance's logos and its name without the Alliance’s prior written
                    authorization.
                </p>
                <h6>Modifications</h6>
                <p>
                    The Alliance may review these Terms at any time without notice. The most current version of the
                    Terms can be reviewed by clicking on the link or links located on the Site. Please check these Terms
                    periodically to see whether they have changed. By using The Alliance’s website you are agreeing to
                    be bound by the then current version of these Terms.
                </p>
                <h6>No waiver</h6>
                <p>
                    Either party’s failure to insist on or enforce strict performance of any of the Terms shall not be
                    construed as a waiver of any provision or right. Nothing herein shall be deemed a waiver of any of
                    the privileges and immunities of CIAT and Bioversity International.
                </p>
                <h6>Governing law</h6>
                <p>
                    These Terms are governed by and construed in accordance with recognized and general principles of
                    international law, to the exclusion of any single national system of law. General principles of law
                    shall be deemed to include the UNIDROIT Principles of International Commercial Contracts of 2016.
                    You and the Alliance will use their best efforts to resolve any dispute, controversy or claim
                    arising out of or relating to these Terms or the Site by negotiation.
                </p>
                <p>
                    In the case an amicable settlement is not reached within sixty (60) days of such dispute,
                    controversy or claim having been notified by one party to the other in writing, the dispute,
                    controversy or claim will be settled by arbitration in accordance with the UNCITRAL Arbitration
                    Rules in effect on the date of this contract. There will be one arbitrator appointed by the parties
                    by mutual consent, or failing this, by the Secretary-General of the Permanent Court of Arbitration.
                    The place of arbitration, proposed by the Alliance, will be a neutral venue where the parties can
                    expect a fair result. The language to be used in the arbitration proceedings will be English.
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