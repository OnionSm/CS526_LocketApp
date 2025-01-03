import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback, useRef} from 'react';

export default function Policy ( {navigation} : {navigation : any} ) {
    return(
        <View style = {styles.container}>

            <View style={styles.button}>
                <Icon.Button 
                    borderRadius={0}
                    backgroundColor="000000"
                    name = "exit-to-app"
                    size={40}
                    color="ffffff"
                    onPress={() => navigation.goBack()}
                ></Icon.Button>
            </View>

        <ScrollView>
            <Text style = {styles.header}>Privacy Policy</Text>

            <Text style = {styles.effective_day}>Last updated: November 27, 2023</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>1. Introduction</Text>

            <Text style = {styles.normal_text}>Locket Labs Inc., its subsidiaries and affiliates (collectively “Locket”, “us”, “we”, or “our”) operates the Locket Widget mobile application, which allows users to share photos and videos on the home screens of the phones of their friends and to connect with people they might know (our “Services”).</Text>

            <Text style = {styles.normal_text}>Locket Labs Inc., its subsidiaries and affiliates (collectively “Locket”, “us”, “we”, or “our”) operates the Locket Widget mobile application, which allows users to share photos and videos on the home screens of the phones of their friends and to connect with people they might know (our “Services”).</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>2. Personal Data we collect</Text>

            <Text style = {styles.normal_text}>We collect Personal Data about you from different sources listed below. In this Policy, “Personal Data” means any information related to an identified or identifiable individual, and does not include data whereby personally identifiable information has been removed (such as anonymous data).</Text>

            <Text style = {[styles.normal_text, {fontWeight: 'bold'}]}>Personal Data You Provide to Us</Text>

            <Text style = {styles.normal_text}>Account information: When you create an account with us we collect your phone number, email, full name, and birthday (day and month).</Text>

            <Text style = {styles.normal_text}>Contact information of your friends: Locket may, with your permission, access your mobile contact list including saved phone numbers and names, to help you connect with people you know on Locket.</Text>

            <Text style = {styles.normal_text}>Photos and videos: When you choose to send a photo or video to a friend’s Locket Widget, you provide Locket with the photo or video taken and associated metadata, including the file type and size, and the time the photo or video was taken.</Text>

            <Text style = {styles.normal_text}>Correspondence and other communications: When you contact us, including about our Services, via email, social media or by other means, you provide us with Personal Data, such as your full name, email address, telephone number and the content of your communications.</Text>

            <Text style = {styles.normal_text}>Payment information: Our payment processor(s) will collect the financial information necessary to process your payments, including name, payment card information, and billing information. Our third-party payment processors will handle your payment information in accordance with their own privacy policy. We do not have access to your full payment card information.</Text>

            <Text style = {styles.normal_text}>Chat messages and reactions: When you choose to send messages and reactions to friends on Locket, you provide Locket with the message or reaction sent. We may review the contents of these messages if a user reports, or we otherwise detect, a potential trust and safety violation or potentially illegal or illicit activity or violations of our Terms and Conditions, as permitted by applicable laws.</Text>

            <Text style = {styles.normal_text}>Where you provide us with the Personal Data of third parties, such as people in your mobile contact list, it is your responsibility to inform them about the processing of their Personal Data in accordance with this Policy, and to confirm that they have given their permission.</Text>

            <Text style = {[styles.normal_text, {fontWeight: 'bold'}]}>Information Collected via Automated Means</Text>

            <Text style = {styles.normal_text}>Device data: We collect information about your device such as your mobile device’s operating system type and version, manufacturer and model, browser type, device type (e.g., phone, tablet), IP address, unique identifiers, language settings, mobile device carrier, radio/network information (e.g., WiFi, LTE, 4G), and general location information such as city, state or geographic area.</Text>

            <Text style = {styles.normal_text}>Usage data: When you access and use the Services, we receive and store information about interactions with our Services, including pages or screens you viewed, how long you spent on a page or screen, browsing history, navigation paths between pages or screens, information about your activity on a page or screen, access times, and duration of access.</Text>

            <Text style = {styles.normal_text}>Please read our Cookie Policy for more information about how we use cookies and similar technologies</Text>

            <Text style = {[styles.normal_text, {fontWeight: 'bold'}]}>Information We Receive from Third Parties</Text>

            <Text style = {styles.normal_text}>We maintain pages on social media platforms, such as Facebook, TikTok, Twitter and Instagram, that collect and process your Personal Data in accordance with their own privacy policies. You or the platform providers may provide us with information through the social media platform, and we will treat such information in accordance with this Policy.</Text>

            <Text style = {styles.normal_text}>We maintain pages on social media platforms, such as Facebook, TikTok, Twitter and Instagram, that collect and process your Personal Data in accordance with their own privacy policies. You or the platform providers may provide us with information through the social media platform, and we will treat such information in accordance with this Policy.</Text>
        
            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>3. How we use your Personal Data</Text>

            <Text style = {styles.normal_text}>We will use your Personal Data for one or more of the purposes set out below:</Text>

            <Text style = {styles.normal_text}>To provide you with the Services. We use your Personal Data to operate, maintain and provide you with the Services to perform any contract we have with you under the Locket Terms and Conditions. In particular we use Personal Data to allow you to create and use an account, add contacts and upload photos to share on friends’ Locket Widgets. The Personal Data we process when doing so includes your account information, contact details of your friends and photos you choose to upload.</Text>
            <Text style = {styles.normal_text}>To provide you with special features. It is in our legitimate interests to use your Personal Data to create special features such as anniversary video collages using photos you have uploaded and usage information.</Text>
            <Text style = {styles.normal_text}>To enable you to sync your mobile contact list to find and connect with people you may know on Locket and to invite new people to join Locket more easily. We will only access your mobile contact list with your consent. You can withdraw this consent at any time by changing your phone settings, or contacting us as set out in the “Contact Us” section below. It is in our legitimate interests to process the mobile contact details, such as the phone number, of individuals in your mobile contact list to enhance your user experience by enabling you to find and connect with people you know on Locket.</Text>
            <Text style = {styles.normal_text}>To provide you with support and to respond to your requests and complaints. If you reach out to us for support, it is in our legitimate interests to use Personal Data to respond and resolve your queries and facilitate support. The Personal Data we process when doing so includes your correspondence with us, your contact details, and to the extent applicable other Personal Data processed about you when you use our Services.</Text>
            <Text style = {styles.normal_text}>To communicate with you about our Services. It is in our legitimate interests to communicate with you about our Services including by sending you announcements, updates, security alerts, and support and administrative messages. The Personal Data we process when doing so includes your contact details, account information and usage data.</Text>
            <Text style = {styles.normal_text}>To send marketing and promotional messages. Except where we rely on your consent, it is in our legitimate interests to send marketing and promotional messages relating to our Services, or the services of our affiliates and subsidiaries, that we believe will be of interest to you, in accordance with applicable law.</Text>
            <Text style = {styles.normal_text}>To measure the effectiveness of advertising campaigns to promote the Services. Except where we rely on your consent, it is in our legitimate interests to use your Personal Data to track the effectiveness of advertising campaigns. Please see our Cookie Policy for more information.</Text>
            <Text style = {styles.normal_text}>To show you ads on the Services. We engage advertising partners, including third party advertising companies and social media companies, to display ads on the Services. We use technologies provided by such parties, such as SDKs, to collect information about you over time across the Services, and we and our partners use that information to serve online ads that may be interesting or useful to you. The information we collect for such purpose includes your profile information and your activity on the Services. Except where we rely on your consent, it is in our legitimate interests to use your Personal Data for the purposes described above. Please see our Cookie Policy for more information on how we use these technologies and your choices for limiting interest-based advertising.</Text>
            <Text style = {styles.normal_text}>To improve or monitor usage of our Services and to protect, investigate and deter against fraudulent, harmful, unauthorized or illegal activity. It is in our legitimate interests to improve and keep our Services safe for our users, which includes conducting troubleshooting, testing and research and to keep the Services secure. When doing so we may use Personal Data that we automatically collect about you such as usage and device information.</Text>
            <Text style = {styles.normal_text}>To monitor and analyze trends and use of our Services. It is in our legitimate interests to analyze the use of our Services. When doing so, we will process Personal Data that we automatically collect about you or that is generated about you when you use the Services.</Text>
            <Text style = {styles.normal_text}>To enforce the Locket Terms and Conditions, to comply with legal obligations and to defend Locket against legal claims or disputes. It is in our legitimate interests to enforce and comply with our terms and policies, to ensure the integrity of our Services and to defend ourselves against legal claims or disputes. Where we do so, we will use the Personal Data relevant to such a case. Some processing may also be necessary to comply with a legal obligation placed on Locket for example to keep records of transactions, or as requested by any judicial process or governmental agency.</Text>
            <Text style = {styles.normal_text}>For aggregation and anonymization. It is in our legitimate interests to aggregate or anonymize Personal Data in a form that does not allow users to be personally identified and use the resulting information for statistical analysis regarding the use of the Services, such as to better understand our customer base, or for other purposes.</Text>
            <Text style = {styles.normal_text}>We will only process Personal Data on the basis of our legitimate interests where such interests are not overridden by your interests or your fundamental rights and freedoms.</Text>
            <Text style = {styles.normal_text}>If, where we are processing your Personal Data to perform our contract with you, you do not provide the Personal Data, we may not be able to conclude or fulfill such contract.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>4. How we disclose your Personal Data</Text>

            <Text style = {styles.normal_text}>We disclose Personal Data about you with the following recipients and in the following circumstances:</Text>
            <Text style = {styles.normal_text}>ffiliates: Affiliates and subsidiaries of Locket, for purposes consistent with this Policy.</Text>
            <Text style = {styles.normal_text}>Service Providers for the provision of our Services: We rely on vendors and service providers solely for the provision of our Services and for the purposes set out above, such as providers of analytics, hosting and cloud computing services and other IT services and customer support services in addition to other administrative services, and advertising technology vendors. These third parties may have access to or process your Personal Data as part of providing these services.</Text>
            <Text style = {styles.normal_text}>Advertising Partners: We share information that you provide through the Services or that we automatically collect (described under “Information Collected via Automated Means” above), such as the links you click, pages you visit, IP address, advertising ID, and device type, with advertising companies for interest-based advertising. Sharing this information allows us and our advertising partners to target and serve advertising to you.</Text>
            <Text style = {styles.normal_text}>Advisors: We work with various advisors, including tax consultants and legal advisors, to whom we may disclose your Personal Data.</Text>
            <Text style = {styles.normal_text}>Legal: Information about our users, including Personal Data, will be disclosed to law enforcement agencies, regulatory bodies, public authorities or pursuant to the exercise of legal proceedings if we are legally required to do so, or if we believe, in good faith, that such disclosure is necessary to comply with a legal obligation or request, to enforce our terms and conditions, to prevent or resolve security or technical issues, or to protect the rights, property or safety of Locket, users, a third party, or the public.</Text>
            <Text style = {styles.normal_text}>Business Transaction: If Locket is involved in a merger, acquisition or asset sale, financing due diligence, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your Personal Data may be sold, transferred or otherwise disclosed including as part of any due diligence process.</Text>
            <Text style = {styles.normal_text}>You can use Locket to share photos and videos with your friends.  Once you’ve sent a photo it isn’t possible to delete it from other user’s phones, even if you delete it from your own, so please be careful what photos you choose to send.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>5. Your rights and choices</Text>

            <Text style = {styles.normal_text}>Opt-out of marketing communications. You may opt out of marketing-related emails and other communications by following the opt-out or unsubscribe instructions in the communications you receive from us or by contacting us as provided in the “Contact us” section below. You may continue to receive Services-related and other non-marketing emails from us.</Text>
            <Text style = {styles.normal_text}>Limit online tracking. Some internet browsers can be configured to send “Do Not Track” signals to the online services that you visit. We currently do not respond to “Do Not Track” or similar signals. To find out more about “Do Not Track,” please visit http://www.allaboutdnt.com. Please see our Cookie Policy for more information on your choices relating to our use of cookies and for limiting interest-based advertising.</Text>
            <Text style = {styles.normal_text}>Personal Data requests. We also offer you choices that affect how we handle the Personal Data that we process. Depending on your location and the nature of your interactions with our Services, you may request the following in relation to Personal Data:</Text>
            <Text style = {styles.normal_text}>Opt out of selling Personal Data and sharing for targeted advertising We share information with third-party advertising partners and allow them to collect information about your use of the Services to show you ads on our Services as described in the “How we use your personal data” and “How we disclose your personal data” sections above. Our disclosure of information to these partners may be considered a “sale” or “sharing” of Personal Data or “targeted advertising” under applicable laws. You can opt out of these disclosures and limit our use of tracking technologies as described in our Cookie Policy or by clicking the “Your Privacy Choices” link in your Locket Widget mobile application.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>6. International data transfers</Text>

            <Text style = {styles.normal_text}>If you provide us with your Personal Data when using the Services from the EEA, Switzerland or the UK or other regions of the world with laws governing data collection and use that may differ from United States law, then please note that you are transferring your Personal Data outside of those regions to the United States for storage and processing.</Text>
            <Text style = {styles.normal_text}>If we transfer your Personal Data internationally, these countries may not provide the same protections as the data protection laws where you are based.  We will ensure that relevant safeguards are in place to afford adequate protection for your Personal Data and we will comply with applicable data protection laws, in particular if you reside in the EEA, Switzerland or UK by relying on an EU Commission or UK government adequacy decision, on contractual protections for the transfer of your Personal Data or a derogation if available.  For more information about how we transfer Personal Data internationally, please contact us as set out in the “Contact Us” section below.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>7. Children’s privacy</Text>

            <Text style = {styles.normal_text}>Our Services are not directed to children, and we do not knowingly collect Personal Data from anyone under the age of 13.  If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us as set out in the “Contact Us” section below.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>8. Retention of Personal Data</Text>

            <Text style = {styles.normal_text}>We retain your Personal Data only for as long as is necessary to fulfill the purposes for which it was collected and processed, in accordance with our retention procedures, and in accordance with applicable laws or until you withdraw your consent (where applicable).</Text>
            <Text style = {styles.normal_text}>To determine the appropriate retention period for your personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your Personal Data, the purposes for which we use your Personal Data and whether we can achieve those purposes through other means, and the applicable legal requirements.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>9. Security of Personal Data</Text>

            <Text style = {styles.normal_text}>We use reasonable organizational, technical and administrative measures designed to protect against unauthorized access, misuse, loss, disclosure, alteration and destruction of Personal Data we process.  Unfortunately, data transmission over the Internet cannot be guaranteed as completely secure. Therefore, while we strive to protect your Personal Data, we cannot guarantee its security.</Text>


            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>10. Links to other sites</Text>

            <Text style = {styles.normal_text}>The Services may contain links to other sites that are not operated by us.  If you click a third party link, you will be directed to that third party’s site.  We strongly advise you to review the privacy policy of every site you visit.</Text>
            <Text style = {styles.normal_text}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>11. Changes and updates to this Policy</Text>
            <Text style = {styles.normal_text}>We will update this Policy from time to time.  Please review this Policy periodically for any changes. Changes to this Policy are effective when they are posted on this page.</Text>
            <Text style = {styles.normal_text}>If we make material changes, we will let you know.</Text>

            <Text style = {[styles.header, {fontSize : 25}, {marginTop : 20}]}>12. Contact us</Text>
            <Text style = {styles.normal_text}>Locket Labs Inc. is the entity responsible for the processing of your Personal Data, and is the data controller in respect of such processing.  If you have any questions or comments about this Policy, our privacy practices, or if you would like to exercise your rights with respect to your Personal Data, please contact us by email at privacy@locketcamera.com</Text>
            <Text style = {styles.normal_text}>Alternatively, we have appointed VeraSafe Ireland Ltd. at Unit 3D North Point House, North Point Business Park, New Mallow Road, Cork T23AT2P, Ireland as our EU data representative, and VeraSafe United Kingdom Ltd. at 37 Albert Embankment, London SE1 7TL, United Kingdom as our UK data representative. You can contact our EU representative at the address above or alternatively using this contact form: https://verasafe.com/public-resources/contact-data-protection-representative or via telephone at +420 228 881 031. You can contact our UK representative at the address above or alternatively using this contact form: https://verasafe.com/public-resources/contact-data-protection-representative or via telephone at +44 (20) 4532 2003.</Text>
        </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000', 
        flex: 1,
        color: '#FFFFFF',
        textAlign: "left",
    },
    header: {
        marginTop: 50,
        fontSize: 35,
        fontWeight: 'bold',
        marginHorizontal: 20,
        color: '#FFFFFF',
    },
    effective_day:{
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'medium',
        marginHorizontal: 20,
    },
    normal_text:{
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'medium',
        textAlign: "left",
        marginHorizontal: 20,
    },
    button:{
        position: 'absolute', 
        top: 20,          
        right: 10,  
        zIndex: 10,       
    },

})