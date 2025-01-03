import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Button } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect , createContext, useContext, useCallback, useRef} from 'react';

export default function TermsOfService ( {navigation} : {navigation : any}) {
    

    return(
        <View style={styles.container}>

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
        <ScrollView >

            <Text style={styles.header}>
                Terms of Sevice
            </Text>

            <Text style={styles.effective_day}>
                Effective date: May 25, 2022
            </Text>

            <Text style={[styles.header, {fontSize: 25}, {marginTop: 20}]}>                  
                Acceptance of These Terms of Service
            </Text>

            <Text style={[styles.normal_text]}>
            Locket Labs Inc. (“Locket,” “we,” “us,” or “our”) provides our services (described below) and related content to you through our website(s) located at https://locket.camera/ (the “Site”) and through our mobile applications and related technologies (“Mobile Apps”, and collectively, such Mobile Apps and the Site, including any updated or new features, functionality and technology, the “Service”). All access and use of the Service is subject to the terms and conditions contained in these Terms of Service (as amended from time to time, these “Terms of Service”). By accessing, browsing, or otherwise using the Site, Mobile Apps, or any other aspect of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not accept the terms and conditions of these Terms of Service, you will not access, browse, or otherwise use the Service.
            </Text>

            <Text style={[styles.normal_text]}>
            We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time. If we do this, we will post the changes on this page and will indicate at the top of this page the date these Terms of Service were last revised. You may read a current, effective copy of these Terms of Service by visiting the “Terms of Service” link on the Site and under the Terms of Service section of our Mobile App. We will also notify you of any material changes, either through the Service user interface, a pop-up notice, email, or through other reasonable means. Your continued use of the Service after the date any such changes become effective constitutes your acceptance of the new Terms of Service. You should periodically visit this page to review the current Terms of Service so you are aware of any revisions. If you do not agree to abide by these or any future Terms of Service, you will not access, browse, or use (or continue to access, browse, or use) the Service.    
            </Text>

            <Text style={[styles.normal_text, {fontWeight: 'bold'}]}>
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST LOCKET ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE ABLE TO HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A COURT OF LAW.
            </Text>

            <Text style={styles.normal_text}>
            Your Privacy: At Locket, we respect the privacy of our users. For more information please see our Privacy Policy, located at https://locket.camera/privacy and under the Privacy Policy section of our Mobile App (the “Privacy Policy”). By using the Service, you consent to our collection, use and disclosure of personal data and other data as outlined therein.
            </Text>

            <Text style={styles.normal_text}>
            Additional Terms:In addition, when using certain features through the Service, you will be subject to any additional terms applicable to such features that may be posted on or within the Service from time to time. All such terms are hereby incorporated by reference into these Terms of Service.
            </Text>

            <Text style={[styles.header, {fontSize: 25}, {marginTop: 20}]}>
            Access and Use of the Service
            </Text>

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                Service Description:
                </Text>
                The Service is a social networking Mobile App and widget that enables users to share images with other users.
            </Text>

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                Your Registration Obligations:
                </Text>
                You may be required to register with Company or provide information about yourself (e.g., name and email address) in order to access and use certain features of the Service. If you choose to register for the Service, you agree to provide and maintain true, accurate, current, and complete information about yourself as prompted by the Service’s registration form. Registration data and certain other information about you are governed by our Privacy Policy. If you are under 13 years of age, you are not authorized to use the Service, with or without registering. In addition, if you are under 18 years old, you may use the Service, with or without registering, only with the approval of your parent or guardian.
            </Text>    

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                Member Account, Password and Security:
                </Text>
                You are responsible for maintaining the confidentiality of your password and account details, if any, and are fully responsible for any and all activities that occur under your password or account. You agree to (a) immediately notify Company of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session when accessing the Service. Company will not be liable for any loss or damage arising from your failure to comply with this paragraph.
            </Text>

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                Modifications to Service: 
                </Text>
                Company reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Company will not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
            </Text>

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                General Practices Regarding Use and Storage:
                </Text>
                You acknowledge that Company may establish general practices and limits concerning use of the Service, including the maximum period of time that data or other content will be retained by the Service and the maximum storage space that will be allotted on Company’s or its third-party service providers’ servers on your behalf. You agree that Company has no responsibility or liability for the deletion or failure to store any data or other content maintained or uploaded by the Service. You acknowledge that Company reserves the right to terminate accounts that are inactive for an extended period of time. You further acknowledge that Company reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice.
            </Text>

            <Text style={[styles.header, {fontSize: 25}, {marginTop: 20}]}>
            Conditions of Access and Use
            </Text>

            <Text style={styles.normal_text}>
                <Text style={[styles.normal_text, {fontWeight: "bold"}]}>
                User Conduct:
                </Text>
                You are solely responsible for all code, video, images, information, data, text, software, music, sound, photographs, graphics, messages, and other materials (“content”) that you make available to Company, including by uploading, posting, publishing, or displaying (hereinafter, “upload(ing)”) via the Service or by emailing or otherwise making available to other users of the Service (collectively, “User Content”). The following are examples of the kinds of content and/or uses that are illegal or prohibited by Company. Company reserves the right to investigate and take appropriate legal action against anyone who, in Company’s sole discretion, violates this provision, including removing the offending content from the Service, suspending or terminating the account of such violators, and reporting the violator to law enforcement authorities. You agree to not use the Service to:
            </Text>

            <Text style={styles.normal_text}>
            email or otherwise upload any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains software viruses or any other computer code, files or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v) constitutes unsolicited or unauthorized advertising, promotional materials, commercial activities and/or sales, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” “contests,” “sweepstakes,” or any other form of solicitation; (vi) is unlawful, harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another’s privacy, hateful, discriminatory, or otherwise objectionable; or (vii) in the sole judgment of Company, is objectionable or which restricts or inhibits any other person from using or enjoying the Service, or which may expose Company or its users to any harm or liability of any type;
            </Text>

            <Text style={styles.normal_text}>
            interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies, or regulations of networks connected to the Service;
            </Text>

            <Text style={styles.normal_text}>
            violate any applicable local, state, national, or international law, or any regulations having the force of law;
            </Text>

            <Text style={styles.normal_text}>
            impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;
            </Text>

            <Text style={styles.normal_text}>
            solicit personal information from anyone under the age of 18;
            </Text>

            <Text style={styles.normal_text}>
            harvest or collect email addresses or other contact information of other users from the Service by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;
            </Text>

            <Text style={styles.normal_text}>
            advertise or offer to sell or buy any goods or services for any business purpose that is not specifically authorized;
            </Text>

            <Text style={styles.normal_text}>
            further or promote any criminal activity or enterprise or provide instructional information about illegal activities
            </Text>

            <Text style={styles.normal_text}>
            obtain or attempt to access or otherwise obtain any content or information through any means not intentionally made available or provided for through the Service;
            </Text>

            <Text style={styles.normal_text}>
            circumvent, remove, alter, deactivate, degrade, or thwart any of the content protections in or geographic restrictions on any content (including Service Content (as defined below)) available on or through the Service, including through the use of virtual private networks; or
            </Text>

            <Text style={styles.normal_text}>
            engage in or use any data mining, robots, scraping, or similar data gathering or extraction methods. If you are blocked by Company from accessing the Service (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address or virtual private network).
            </Text>


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
    button:{
        position: 'absolute', 
        top: 20,          
        right: 10,  
        zIndex: 10,       
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
    }

})
