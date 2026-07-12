
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
document.addEventListener('keydown',e=>{if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&['I','J','C'].includes(e.key.toUpperCase()))||(e.ctrlKey&&['u','U','s','S'].includes(e.key))){e.preventDefault();return false;}});
setInterval(()=>{try{console.clear()}catch(e){}},1000);

// ============================================================
// SECURITY DECISION CHALLENGE - GAME DATA
// ============================================================

const SCENARIOS = [
  {
    round: 1,
    category: "Information Asset Protection",
    difficulty: "Easy",
    situation: `You find a printed document labeled "CONFIDENTIAL — Q4 Financial Forecast" left on the shared printer in the open office area. It is 4:30 PM and most colleagues have left for the day. What do you do?`,
    choices: [
      { label: "A", text: "Leave it there. It is not your document, and someone will probably collect it eventually." },
      { label: "B", text: "Take it and place it in a secure drawer or shred it if it is clearly abandoned, then report it to the document owner or your manager." },
      { label: "C", text: "Post in the company chat: \"Whose financial forecast is on the printer?\" with a photo of the document." },
      { label: "D", text: "Take a photo with your phone to remind yourself to mention it tomorrow, then leave the document where it is." }
    ],
    hint: "Consider the principle of least access — who actually needs to see this information?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. Confidential documents left unattended create an information exposure risk. Secure or destroy abandoned documents and report the incident. This demonstrates active ownership of information security.",
      A: "\u2717 Risk Introduced. Leaving a confidential document unattended exposes it to anyone passing by — including visitors, cleaning staff, or unauthorized employees. Always secure abandoned sensitive documents.",
      C: "\u2717 Risk Introduced. Posting a photo of a confidential document in a chat channel multiplies the exposure. Now the information is visible to everyone in that channel, potentially including external contractors.",
      D: "\u26A0 Partially Correct. You recognized the problem, but photographing a confidential document on your personal device creates a new copy outside organizational control. Address the issue immediately, not tomorrow."
    }
  },
  {
    round: 2,
    category: "Password Security",
    difficulty: "Easy",
    situation: `Your manager emails you a shared document link and says the password is "Company2024!" — the same password the team has used for shared files for the past two years. The document contains employee performance data. What do you do?`,
    choices: [
      { label: "A", text: "Use the password as given. It has worked fine for two years, so it must be secure enough." },
      { label: "B", text: "Use the password for now but request the document be moved to the approved secure file sharing platform instead." },
      { label: "C", text: "Refuse to access the document until it is shared through the approved platform with proper access controls and no shared passwords." },
      { label: "D", text: "Create your own password for the document and share it back with the team so everyone has a unique one." }
    ],
    hint: "Shared passwords over email create two problems. What are they?",
    correct: "C",
    partial: "B",
    feedback: {
      C: "\u2713 Correct Decision. Shared passwords sent via email are visible to anyone with access to either inbox. Password reuse across two years increases exposure risk. The approved secure platform eliminates both risks with individual authentication and audit trails.",
      B: "\u26A0 Partially Correct. You identified the risk and proposed a better alternative, but you still used the insecure method in the meantime. Sensitive employee data was exposed during that gap.",
      A: "\u2717 Risk Introduced. A shared password sent over email and reused for two years is extremely vulnerable. If any team member's email was ever compromised, this password is exposed. Password reuse also means you cannot trace who accessed what.",
      D: "\u2717 Risk Introduced. Creating individual passwords for a shared document fragments access control and creates management chaos. There is no audit trail, and passwords can still be shared informally. Use the approved platform."
    }
  },
  {
    round: 3,
    category: "Phishing Awareness",
    difficulty: "Easy",
    situation: `You receive an email that appears to be from your IT department with the subject: "URGENT: Your account will be deactivated in 24 hours — click here to verify." The sender address is it-support@company-secure-portal[.]com. The email contains a large red button labeled "VERIFY ACCOUNT NOW." What do you do?`,
    choices: [
      { label: "A", text: "Click the button immediately. The email looks professional and the threat of account deactivation is serious." },
      { label: "B", text: "Hover over the link to inspect the URL, check for spelling errors, and verify with IT through a known contact channel before taking any action." },
      { label: "C", text: "Forward the email to a colleague and ask if they received it too, to confirm it is legitimate." },
      { label: "D", text: "Delete the email. If it is really important, IT will contact you again through another method." }
    ],
    hint: "Urgency is a common social engineering tactic. What verification method cannot be manipulated by the sender?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. You applied multiple verification techniques: inspecting the sender domain (not your company's domain), checking for urgency pressure tactics, and planning to verify through an independent channel. This is the standard phishing response protocol.",
      D: "\u26A0 Partially Correct. You avoided the phishing trap, which is good. However, simply deleting the email without reporting it means the security team may not know other employees are being targeted. Always report suspected phishing so protective measures can be deployed.",
      A: "\u2717 Risk Introduced. This email contains multiple phishing indicators: urgency pressure, a suspicious sender domain, and a call-to-action button designed to bypass critical thinking. Clicking could have compromised your credentials or installed malware.",
      C: "\u2717 Risk Introduced. Forwarding a potentially malicious email to a colleague spreads the attack surface. Your colleague might not be as cautious. Report suspected phishing to the security team through the defined incident channel, not through informal verification."
    }
  },
  {
    round: 4,
    category: "Physical Security",
    difficulty: "Easy",
    situation: `You are working late and a delivery person arrives at the office door with a package for "the IT department." They say they need to drop it off inside because it contains sensitive equipment. No one else is around. The building requires badge access, which you used to enter. What do you do?`,
    choices: [
      { label: "A", text: "Let them in. They have a legitimate package and seem professional. You can escort them to IT." },
      { label: "B", text: "Politely refuse entry, offer to accept the package at the door, and verify the delivery with IT through a known contact number before allowing any further access." },
      { label: "C", text: "Ask to see their company ID badge and let them in if they show one." },
      { label: "D", text: "Take the package from them at the door and tell them you will deliver it to IT yourself." }
    ],
    hint: "A package can be legitimate while the delivery person is not. What is the one thing you can control?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. You followed the principle of never allowing unauthorized individuals into secure areas, regardless of their stated purpose. Accepting the package at the door and verifying independently maintains both physical security and operational courtesy.",
      D: "\u26A0 Partially Correct. You prevented unauthorized physical access, which is good. However, accepting an unsolicited package without verification introduces a different risk — the package itself could contain a threat. Always verify unexpected deliveries with the intended recipient department.",
      A: "\u2717 Risk Introduced. Tailgating and social engineering often exploit politeness and helpfulness. A delivery uniform can be faked. Allowing an unverified person into a secure area bypasses all access controls and could enable theft, espionage, or physical tampering.",
      C: "\u2717 Risk Introduced. A company ID badge is easily forged or borrowed. Visual inspection of an ID is not a valid authentication method. The proper procedure is to verify through a known contact channel and never allow unescorted access by unauthorized individuals."
    }
  },
  {
    round: 5,
    category: "Remote Working Security",
    difficulty: "Medium",
    situation: `You are working remotely from a coffee shop and need to join a video call to discuss a new product launch with confidential details. The coffee shop has free public Wi-Fi. Your phone has a personal hotspot with a strong password. What do you do?`,
    choices: [
      { label: "A", text: "Use the coffee shop Wi-Fi. It is faster and free, and the video call platform is encrypted anyway." },
      { label: "B", text: "Use your phone's personal hotspot for the call, but stay in the coffee shop since you already ordered a drink." },
      { label: "C", text: "Use your phone's personal hotspot and find a more private location away from other people before joining the call." },
      { label: "D", text: "Skip the call and reschedule for when you are back in the office tomorrow." }
    ],
    hint: "Encryption protects data in transit. What does it not protect against?",
    correct: "C",
    partial: "B",
    feedback: {
      C: "\u2713 Correct Decision. You addressed both network security (using your private, password-protected hotspot instead of public Wi-Fi) and information confidentiality (moving to a private location where the discussion cannot be overheard). This demonstrates layered security thinking.",
      B: "\u26A0 Partially Correct. You correctly avoided public Wi-Fi, which is a significant risk for man-in-the-middle attacks. However, discussing confidential product details in a public space where others can overhear creates an information exposure risk. Network security and physical confidentiality are both essential.",
      A: "\u2717 Risk Introduced. Public Wi-Fi networks are inherently insecure — traffic can be intercepted, networks can be spoofed, and even encrypted communications may be vulnerable to certain attacks. Additionally, conducting a confidential discussion in a public space exposes the information to anyone within earshot.",
      D: "\u2717 Risk Introduced. While you avoided immediate security risks, rescheduling a business-critical discussion without a valid reason impacts operations. Security should enable business, not block it. The correct approach is to find a secure way to participate, as option C demonstrates."
    }
  },
  {
    round: 6,
    category: "Data Sharing Controls",
    difficulty: "Medium",
    situation: `A colleague from the Marketing department asks you to share a customer database so they can "cross-reference some email addresses for a campaign." They assure you it is urgent and the CEO approved it verbally. You do not have any written authorization. What do you do?`,
    choices: [
      { label: "A", text: "Share the database. The CEO approved it and Marketing has a legitimate business need." },
      { label: "B", text: "Refuse to share and explain that data access requires written authorization through the proper data governance process, regardless of who requested it." },
      { label: "C", text: "Share only a subset of the data to minimize the risk while still being helpful." },
      { label: "D", text: "Ask your colleague to have the CEO send you a quick email confirming the approval, then share the data." }
    ],
    hint: "Verbal approvals cannot be audited. What is the purpose of a written authorization process?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. Data access must always follow the established governance process with written, auditable authorization. Verbal approvals cannot be verified, traced, or defended during an audit. This protects both you and the organization from data misuse allegations.",
      D: "\u26A0 Partially Correct. You recognized the need for documentation, which shows good awareness. However, a casual email from the CEO may not satisfy the formal data governance requirements for customer data sharing. The proper process exists for a reason — it ensures legal compliance, proportionality, and audit trails.",
      A: "\u2717 Risk Introduced. Sharing customer data without proper authorization violates data protection principles, potentially breaches customer trust, and could result in regulatory penalties. The fact that the request came internally does not override the governance process. Always follow the approved procedure.",
      C: "\u2717 Risk Introduced. Sharing a subset of data without authorization is still unauthorized data sharing. The quantity does not determine the legitimacy. Any data sharing outside the approved process creates compliance exposure and breaks the principle of controlled access."
    }
  },
  {
    round: 7,
    category: "Social Engineering",
    difficulty: "Medium",
    situation: `You receive a phone call from someone claiming to be from your company's IT support. They say there is a critical security patch that must be installed immediately and ask you to download a file from a link they will text you, then run it and enter your login credentials when prompted. They sound knowledgeable and mention your manager by name. What do you do?`,
    choices: [
      { label: "A", text: "Follow their instructions. They knew your manager's name and sounded professional. IT support often needs to act quickly on security issues." },
      { label: "B", text: "Politely end the call and contact IT support through your company's known helpdesk number or portal to verify the request before taking any action." },
      { label: "C", text: "Ask them to send an official email from the company domain to verify their identity, then proceed if the email looks legitimate." },
      { label: "D", text: "Run the file on a non-work device first to see if it is safe before installing it on your work laptop." }
    ],
    hint: "Knowing your manager's name is public information. What is the one thing a legitimate IT request will never ask you to do?",
    correct: "B",
    partial: null,
    feedback: {
      B: "\u2713 Correct Decision. Vishing (voice phishing) often uses publicly available information to build credibility. No legitimate IT support will ever ask you to download and run an unsolicited file or enter credentials into an unfamiliar prompt. Verifying through an independent, known channel is the only safe response.",
      C: "\u2717 Risk Introduced. A skilled social engineer can spoof email addresses or create convincing fake emails. Relying on email verification is not sufficient for security-sensitive requests. The only valid verification is contacting IT through a known, independent channel that you initiate.",
      A: "\u2717 Risk Introduced. This is a classic vishing attack. Mentioning your manager's name is easily researched. Downloading and running an unknown file, then entering credentials into a potentially fake prompt, would hand full system access to an attacker. Never perform security actions based on unsolicited calls.",
      D: "\u2717 Risk Introduced. Running suspected malware on any device — work or personal — is dangerous. Malware can spread across networks, steal personal data, and potentially compromise work systems if devices are ever connected. This approach demonstrates fundamental misunderstanding of malware risks."
    }
  },
  {
    round: 8,
    category: "Incident Reporting",
    difficulty: "Medium",
    situation: `You accidentally clicked a link in a suspicious email before realizing it might be phishing. The link opened a blank page and then closed itself. Nothing obvious seems wrong with your computer. What do you do?`,
    choices: [
      { label: "A", text: "Do nothing. The page was blank and closed itself, so it probably did not do anything harmful." },
      { label: "B", text: "Run a full antivirus scan on your computer and only report it if the scan finds something." },
      { label: "C", text: "Immediately report the incident to the security team through the defined reporting channel, even though nothing appears wrong." },
      { label: "D", text: "Delete the email and clear your browser history to remove any trace of the incident." }
    ],
    hint: "The most dangerous attacks are the ones you cannot see. What principle should guide your response?",
    correct: "C",
    partial: "B",
    feedback: {
      C: "\u2713 Correct Decision. Modern malware is designed to be invisible. A blank page that closes itself could be executing a drive-by download, establishing a backdoor, or capturing session tokens in the background. Reporting immediately allows the security team to investigate, contain, and prevent spread to other systems.",
      B: "\u26A0 Partially Correct. Running an antivirus scan is a reasonable defensive action, but it is not sufficient on its own. Antivirus does not catch all threats, especially zero-day exploits and sophisticated attacks. The security team needs to know about the incident to take broader protective measures across the organization.",
      A: "\u2717 Risk Introduced. The absence of visible symptoms does not mean no attack occurred. In fact, sophisticated attacks are specifically designed to operate silently. Waiting for visible damage before acting gives attackers time to escalate their access and move laterally across the network.",
      D: "\u2717 Risk Introduced. Deleting evidence of a potential security incident is extremely harmful. It prevents the security team from investigating the attack vector, assessing scope, and protecting other employees who may have received the same email. It also creates compliance and audit trail gaps."
    }
  },
  {
    round: 9,
    category: "Workplace Risk Behaviors",
    difficulty: "Medium",
    situation: `You notice a colleague has written their password on a sticky note attached to their monitor. They also have their desk drawer unlocked containing printed copies of customer contracts. You have a good working relationship with this person. What do you do?`,
    choices: [
      { label: "A", text: "Say nothing. It is not your job to police other people's workspace habits, and you do not want to damage your working relationship." },
      { label: "B", text: "Mention it casually in private, suggesting they use a password manager and lock their drawer. If they seem dismissive, you drop it." },
      { label: "C", text: "Report the security concerns through the appropriate channel so the security team can address it through official awareness training or guidance." },
      { label: "D", text: "Take a photo of the password sticky note and the unlocked drawer as evidence, then report it." }
    ],
    hint: "Security is everyone's responsibility. But how you respond also matters.",
    correct: "B",
    partial: "C",
    feedback: {
      B: "\u2713 Correct Decision. You balanced immediate risk reduction with positive peer engagement. A private conversation allows your colleague to correct the behavior without embarrassment, building a security-aware culture. Following up if dismissed shows appropriate escalation. This is the ideal first response.",
      C: "\u26A0 Partially Correct. Reporting security concerns is responsible, and there are situations where immediate escalation is appropriate. However, for a first occurrence with a trusted colleague, a direct conversation is usually more effective for culture-building. Consider a private conversation first, with escalation as a follow-up if needed.",
      A: "\u2717 Risk Introduced. Information security is everyone's responsibility. Ignoring visible security weaknesses because of discomfort enables a culture of negligence. The password on display is visible to visitors, cleaners, and anyone passing by. The unlocked drawer exposes customer contracts to theft. Both create real organizational risk.",
      D: "\u2717 Risk Introduced. Taking a photo of someone else's password creates a new security incident — you now have an unauthorized copy of credentials on your device. Additionally, this approach is adversarial and damages trust. Always handle security concerns through constructive communication or proper reporting channels, not personal evidence collection."
    }
  },
  {
    round: 10,
    category: "Authentication Practices",
    difficulty: "Medium",
    situation: `You are setting up a new cloud-based project management tool that your team wants to use. The tool supports password-only login, social login (Google), and multi-factor authentication (MFA). Your organization does not have an official policy on this specific tool. What configuration do you choose?`,
    choices: [
      { label: "A", text: "Use the simplest option — password-only login with a strong password. It is the most convenient for the team." },
      { label: "B", text: "Use social login (Google) since it means one less password to manage and Google is secure." },
      { label: "C", text: "Enable MFA for all team members and use strong individual passwords. Check with IT whether the tool meets organizational security requirements before storing any work data." },
      { label: "D", text: "Use MFA for yourself but let other team members choose their own login method for convenience." }
    ],
    hint: "Authentication is only as strong as its weakest team member. What does that imply?",
    correct: "C",
    partial: "B",
    feedback: {
      C: "\u2713 Correct Decision. MFA is the single most effective control against account compromise. Requiring it for all team members ensures no weak links. Checking with IT before storing work data in an unapproved tool demonstrates the principle that data governance applies to all platforms, not just officially sanctioned ones.",
      B: "\u26A0 Partially Correct. Social login reduces password fatigue, which is a legitimate benefit. However, it creates dependency on a third-party identity provider and may not satisfy organizational data residency or access control requirements. Without IT approval, you cannot confirm this tool meets security standards.",
      A: "\u2717 Risk Introduced. Password-only authentication is the weakest option available. Even strong passwords can be phished, leaked in breaches, or guessed through social engineering. For a tool handling project data, MFA is a minimum baseline requirement, not an optional enhancement.",
      D: "\u2717 Risk Introduced. Inconsistent security practices within a team create exploitable vulnerabilities. If one team member uses a weak password and no MFA, their compromised account provides an attacker access to all shared project data. Security standards must apply uniformly."
    }
  },
  {
    round: 11,
    category: "Employee Responsibilities",
    difficulty: "Medium-Hard",
    situation: `During a team meeting, a senior executive shares their screen and accidentally displays a document containing salary information for several departments. The meeting includes people from different teams, some of whom should not see this data. The executive quickly closes the document and continues the meeting as if nothing happened. What do you do?`,
    choices: [
      { label: "A", text: "Say nothing during the meeting. The executive clearly realized the mistake and closed it. Bringing it up would be embarrassing for them." },
      { label: "B", text: "Privately message the executive during the meeting to acknowledge what happened and suggest a brief follow-up to assess who saw what." },
      { label: "C", text: "Immediately speak up in the meeting, pointing out that sensitive salary data was exposed and asking who saw it." },
      { label: "D", text: "After the meeting, document what you observed and report it through the incident reporting channel as an information exposure event." }
    ],
    hint: "The goal is to protect information and people. What response achieves both?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. You handled a sensitive situation with discretion and professionalism. A private message allowed the executive to address the incident without public embarrassment while still ensuring it was acknowledged and could be properly assessed. This balances information protection with interpersonal respect.",
      D: "\u26A0 Partially Correct. Reporting the incident demonstrates good security awareness and ensures formal documentation. However, bypassing a direct, discreet conversation with the person involved may be perceived as unnecessarily formal for an obvious accident. The best approach is a private conversation first, with formal reporting if the incident is not acknowledged.",
      A: "\u2717 Risk Introduced. Ignoring an information exposure incident because of hierarchy or discomfort enables a culture where security incidents go unreported. Even if the executive noticed, there is no guarantee they will follow up. The people who saw the data may discuss it, creating further exposure. Security awareness applies regardless of seniority.",
      C: "\u2717 Risk Introduced. Publicly calling out a mistake in a meeting damages professional relationships and may cause the executive to become defensive rather than cooperative. It also draws additional attention to the exposed information, potentially causing more people to focus on what they briefly saw. Discretion and direct communication are more effective."
    }
  },
  {
    round: 12,
    category: "Audit Readiness",
    difficulty: "Medium-Hard",
    situation: `An external auditor emails you directly asking for a list of all software applications you use for work, including personal cloud storage accounts where you might store work files "just to be helpful." They say the deadline is tomorrow. What do you do?`,
    choices: [
      { label: "A", text: "Provide a complete list immediately, including your personal cloud accounts, to be cooperative and meet the deadline." },
      { label: "B", text: "Reply to the auditor asking them to submit the request through your organization's official audit coordination process and copy your manager." },
      { label: "C", text: "Provide the list of approved work applications but omit any personal accounts where work files might be stored." },
      { label: "D", text: "Ignore the email. Auditors should go through proper channels, and you are too busy to deal with direct requests." }
    ],
    hint: "Audit requests should follow established channels for a reason. What protections does the official process provide?",
    correct: "B",
    partial: null,
    feedback: {
      B: "\u2713 Correct Decision. All audit requests must flow through the official coordination process to ensure scope is properly defined, responses are consistent, sensitive information is appropriately handled, and the organization maintains a single authoritative record. Redirecting the request protects both you and the audit's integrity.",
      C: "\u2717 Risk Introduced. Omitting personal accounts where work files are stored is dishonest and creates serious audit gaps. If work data exists in personal cloud storage, that is exactly what an audit needs to identify so it can be addressed. Hiding it does not make the risk disappear — it makes it worse.",
      A: "\u2717 Risk Introduced. Providing information about personal cloud storage containing work files reveals a policy violation and data governance gap. Additionally, responding to audit requests outside the official process means your response may not be properly recorded, validated, or protected. Always route audit requests through official channels.",
      D: "\u2717 Risk Introduced. Ignoring an audit request, even one that arrived through an improper channel, is unprofessional and could be perceived as non-cooperation. The correct response is to redirect the request through proper channels politely, not to disregard it entirely."
    }
  },
  {
    round: 13,
    category: "Social Engineering Advanced",
    difficulty: "Hard",
    situation: `You are at a conference and meet someone who claims to work for a partner company. Over coffee, they ask detailed questions about your organization's security infrastructure — what firewall you use, whether you have endpoint detection, how often you patch systems. They are friendly, mention specific projects your companies work on together, and offer to connect you with a potential client. What do you do?`,
    choices: [
      { label: "A", text: "Answer their questions openly. They work for a partner company and know about joint projects, so sharing security infrastructure details is a normal professional conversation." },
      { label: "B", text: "Redirect the conversation to non-security topics and end the discussion without sharing any infrastructure details. Report the interaction to your security team afterward." },
      { label: "C", text: "Give vague, general answers without specifics. That way you seem cooperative without revealing anything sensitive." },
      { label: "D", text: "Ask to see their company badge and verify their identity with your company's partnership contact before answering any questions." }
    ],
    hint: "A legitimate partner contact asking about security infrastructure would go through what channel?",
    correct: "B",
    partial: "D",
    feedback: {
      B: "\u2713 Correct Decision. Technical security infrastructure details are never appropriate conversation topics in informal settings, regardless of how legitimate the contact appears. A real partner inquiry about security would be handled through formal channels with appropriate NDAs. Reporting the interaction allows your security team to assess whether this was targeted reconnaissance.",
      D: "\u26A0 Partially Correct. Verifying identity is a good instinct, and asking about their badge shows awareness. However, even a verified partner employee has no business reason to collect technical security details in an informal setting. Verification alone does not make the request appropriate. The correct response is to decline and report.",
      A: "\u2717 Risk Introduced. This is a textbook elicitation attack — a social engineering technique that uses rapport, professional context, and reciprocity to extract sensitive information. Technical security details, when combined with other publicly available information, can enable targeted attacks against your organization. Never discuss security infrastructure with unverified contacts in informal settings.",
      C: "\u2717 Risk Introduced. Vague answers still reveal information. Confirming that you use endpoint detection, even without naming the vendor, tells an attacker what defensive measures to expect. Any information about your security posture helps an attacker plan more effectively. The only safe response is to not engage on security topics."
    }
  },
  {
    round: 14,
    category: "Evidence and Traceability",
    difficulty: "Hard",
    situation: `A system outage occurs and the IT team suspects a configuration change caused it. Your manager asks you to "just fix it quickly and we will document what happened later." You know exactly what change caused the issue. What do you do?`,
    choices: [
      { label: "A", text: "Fix the issue immediately as requested and write down what happened afterward when you have time." },
      { label: "B", text: "Fix the issue but document the root cause, the change made, the time, and your name before or simultaneously with the fix, following the change management process." },
      { label: "C", text: "Refuse to fix it until a formal change request is approved, even though the system is down and affecting users." },
      { label: "D", text: "Fix the issue and tell your manager verbally what happened, trusting them to document it properly." }
    ],
    hint: "In a security incident, documentation created after the fact is often incomplete or biased. When is the best time to document?",
    correct: "B",
    partial: "A",
    feedback: {
      B: "\u2713 Correct Decision. You balanced operational urgency with traceability requirements. Documenting the change as it happens ensures accurate, contemporaneous records that are essential for root cause analysis, audit evidence, and preventing recurrence. Fix first when systems are down, but document in real time, not later.",
      A: "\u26A0 Partially Correct. You prioritized restoring service, which is operationally important. However, \"document later\" often means documentation gets delayed, forgotten, or inaccurately reconstructed from memory. Contemporaneous documentation is significantly more reliable as audit evidence and for root cause analysis. Always document as you go.",
      C: "\u2717 Risk Introduced. Refusing to fix a production outage over process compliance is an example of security theater — process for process's sake. Change management exists to manage risk, but when a system is already down, the risk of the fix is minimal and the urgency is maximum. Fix first, document in parallel, and review afterward.",
      D: "\u2717 Risk Introduced. Verbal handoffs for incident documentation are unreliable. Your manager may forget details, misremember, or fail to document at all. If this outage becomes part of a security investigation or audit, undocumented changes create serious traceability gaps. Always create your own documentation at the time of the change."
    }
  },
  {
    round: 15,
    category: "Continual Improvement Mindset",
    difficulty: "Hard",
    situation: `You complete a security awareness training module and notice that several real-world scenarios your team faces daily are not covered — for example, how to handle AI-generated phishing emails that are extremely convincing, or how to verify AI-generated code suggestions before using them in production. What do you do?`,
    choices: [
      { label: "A", text: "Nothing. Training modules are created by experts and cover what they consider important. Your job is to complete them, not critique them." },
      { label: "B", text: "Send an informal message to the training team suggesting they update the content. If they respond, great; if not, you tried." },
      { label: "C", text: "Document the gaps you identified with specific examples from your work, propose how the training could address them, and submit this through the defined feedback or improvement channel." },
      { label: "D", text: "Create your own informal team guidance on the topics and distribute it without involving the training team." }
    ],
    hint: "ISO 27001 is built on continual improvement. What does that actually require from individuals?",
    correct: "C",
    partial: "B",
    feedback: {
      C: "\u2713 Correct Decision. Continual improvement requires active participation, not passive consumption. By documenting specific gaps with proposed solutions and submitting through the proper channel, you contribute to the improvement cycle with actionable input. This is exactly how security awareness programs evolve to address emerging threats like AI-generated attacks.",
      B: "\u26A0 Partially Correct. Providing feedback shows awareness of the improvement principle. However, an informal message without specific examples or structured input is less likely to drive actual change. The defined feedback channel exists to ensure suggestions are tracked, evaluated, and incorporated systematically. Use it.",
      A: "\u2717 Risk Introduced. A compliance-focused mindset treats training as a checkbox rather than a learning opportunity. Security threats evolve rapidly — especially with AI — and training that does not keep pace creates dangerous knowledge gaps. Continual improvement depends on everyone identifying and reporting opportunities for enhancement.",
      D: "\u2717 Risk Introduced. Creating and distributing unofficial security guidance can introduce inconsistent practices, conflict with organizational policies, and create liability if the guidance is incorrect or incomplete. Security guidance must be vetted, approved, and maintained through the proper channels to ensure accuracy and consistency."
    }
  }
];

// ============================================================
// GAME STATE
// ============================================================

const STORAGE_KEY = 'security-challenge-progress';

let gameState = {
  round: 0,
  score: 0,
  incidentsPrevented: 0,
  gameLog: [],
  hintUsed: false,
  currentScenario: null,
  choiceMade: false
};

let globalStats = {
  bestScore: 0,
  lastScore: 0,
  gamesPlayed: 0,
  lastPlayed: null,
  currentGame: null
};

// Narrator messages for each round
const NARRATOR_MESSAGES = [
  "Every document left unattended is a potential breach.",
  "Passwords sent over email are postcards, not letters.",
  "Urgency is the weapon of choice for phishers.",
  "A polite tailgater is still an unauthorized intruder.",
  "Public Wi-Fi is a public stage for your data.",
  "Verbal approvals vanish like smoke. Written ones endure.",
  "Your manager's name is public. Your credentials should not be.",
  "The best malware hides in plain sight.",
  "Security culture starts with a quiet word, not a loud report.",
  "One weak link breaks the strongest authentication chain.",
  "Discretion in the moment prevents disasters later.",
  "Audit integrity depends on process, not shortcuts.",
  "Elicitation is conversation with a hidden knife.",
  "Document now or reconstruct fiction later.",
  "Continual improvement begins with a single voice."
];

// ============================================================
// localStorage
// ============================================================

function loadGlobalStats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      globalStats = { ...globalStats, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to load saved progress:', e);
  }
}

function saveGlobalStats() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalStats));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

function saveCurrentGame() {
  globalStats.currentGame = {
    round: gameState.round,
    score: gameState.score,
    incidentsPrevented: gameState.incidentsPrevented,
    gameLog: [...gameState.gameLog]
  };
  globalStats.lastPlayed = new Date().toISOString();
  saveGlobalStats();
}

function clearCurrentGame() {
  globalStats.currentGame = null;
  saveGlobalStats();
}

// ============================================================
// MATRIX CANVAS ANIMATION
// ============================================================

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let matrixOpacity = 0.12;
let matrixRunning = true;
let animationFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const KATAKANA = '\u30A1\u30A2\u30A3\u30A4\u30A5\u30A6\u30A7\u30A8\u30A9\u30AA\u30AB\u30AC\u30AD\u30AE\u30AF\u30B0\u30B1\u30B2\u30B3\u30B4\u30B5\u30B6\u30B7\u30B8\u30B9\u30BA\u30BB\u30BC\u30BD\u30BE\u30BF\u30C0\u30C1\u30C2\u30C3\u30C4\u30C5\u30C6\u30C7\u30C8\u30C9\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D0\u30D1\u30D2\u30D3\u30D4\u30D5\u30D6\u30D7\u30D8\u30D9\u30DA\u30DB\u30DC\u30DD\u30DE\u30DF\u30E0\u30E1\u30E2\u30E3\u30E4\u30E5\u30E6\u30E7\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EE\u30EF\u30F0\u30F1\u30F2\u30F3';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARS = KATAKANA + LATIN;

const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

function initDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = {
      y: Math.random() * -100,
      speed: 0.5 + Math.random() * 1.5,
      chars: []
    };
    // Pre-fill character stack for each column
    const stackLen = 5 + Math.floor(Math.random() * 15);
    for (let j = 0; j < stackLen; j++) {
      drops[i].chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
  }
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(15, 244, 198, ${matrixOpacity})`;
  ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    const x = i * fontSize;

    // Draw the trail of characters
    for (let j = 0; j < drop.chars.length; j++) {
      const y = (drop.y - j) * fontSize;
      if (y < 0 || y > canvas.height) continue;
      // Fade older characters
      const charOpacity = j === 0 ? 1 : Math.max(0.1, 1 - j * 0.12);
      ctx.globalAlpha = charOpacity * matrixOpacity * 8; // Scale for visibility
      // Head character is brighter
      if (j === 0) {
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = '#0FF4C6';
      }
      ctx.fillText(drop.chars[j], x, y);
    }
    ctx.globalAlpha = 1;

    // Move drop
    drop.y += drop.speed;

    // Reset if off screen
    if ((drop.y - drop.chars.length) * fontSize > canvas.height) {
      drop.y = -drop.chars.length;
      drop.speed = 0.5 + Math.random() * 1.5;
      // Regenerate characters
      drop.chars = [];
      const stackLen = 5 + Math.floor(Math.random() * 15);
      for (let j = 0; j < stackLen; j++) {
        drop.chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }
    }
  }

  if (matrixRunning) {
    animationFrameId = requestAnimationFrame(drawMatrix);
  }
}

// Pause when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    matrixRunning = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  } else {
    matrixRunning = true;
    drawMatrix();
  }
});

// Start matrix animation
drawMatrix();

function setMatrixOpacity(screen) {
  if (screen === 'title') matrixOpacity = 0.12;
  else if (screen === 'gameplay') matrixOpacity = 0.06;
  else if (screen === 'results') matrixOpacity = 0.04;
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================

function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`${screenName}-screen`).classList.add('active');
  setMatrixOpacity(screenName);
}

function triggerCrtFlicker(callback) {
  const overlay = document.getElementById('crt-overlay');
  overlay.classList.add('active');
  setTimeout(() => {
    overlay.classList.remove('active');
    if (callback) callback();
  }, 500);
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================

function typewrite(element, text, speed = 35, onComplete = null) {
  return new Promise(resolve => {
    element.textContent = '';
    let i = 0;
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, speed);
      } else {
        cursor.remove();
        if (onComplete) onComplete();
        resolve();
      }
    }
    type();
  });
}

// ============================================================
// TITLE SCREEN
// ============================================================

async function initTitleScreen() {
  loadGlobalStats();
  showScreen('title');

  // Typewriter title
  const titleEl = document.getElementById('game-title');
  await typewrite(titleEl, 'SECURITY DECISION CHALLENGE', 40);

  // Show tagline
  setTimeout(() => {
    document.getElementById('tagline').classList.add('visible');
  }, 300);

  // Boot sequence animation
  const bootLines = document.querySelectorAll('.boot-line');
  for (let i = 0; i < bootLines.length; i++) {
    await new Promise(r => setTimeout(r, 400));
    bootLines[i].classList.add('visible');
  }

  // Show resume banner if applicable
  if (globalStats.currentGame) {
    document.getElementById('resume-round').textContent = globalStats.currentGame.round + 1;
    document.getElementById('resume-banner').classList.add('visible');
    document.getElementById('resume-btn').onclick = resumeGame;
    document.getElementById('newgame-btn').onclick = () => {
      clearCurrentGame();
      document.getElementById('resume-banner').classList.remove('visible');
    };
  }

  // Show enter button
  await new Promise(r => setTimeout(r, 300));
  const enterBtn = document.getElementById('enter-btn');
  enterBtn.style.display = 'block';
  enterBtn.style.opacity = '0';
  enterBtn.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { enterBtn.style.opacity = '1'; });
  enterBtn.onclick = () => {
    triggerCrtFlicker(() => {
      if (globalStats.currentGame) {
        resumeGame();
      } else {
        startNewGame();
      }
    });
  };
}

// ============================================================
// GAME INITIALIZATION
// ============================================================

function startNewGame() {
  gameState = {
    round: 0,
    score: 0,
    incidentsPrevented: 0,
    gameLog: [],
    hintUsed: false,
    currentScenario: null,
    choiceMade: false
  };
  clearCurrentGame();
  startRound();
}

function resumeGame() {
  const saved = globalStats.currentGame;
  if (!saved) return;
  // Restore state - we need to go to the round they were on
  // But they already completed that round, so go to next
  gameState = {
    round: saved.round,
    score: saved.score,
    incidentsPrevented: saved.incidentsPrevented,
    gameLog: [...saved.gameLog],
    hintUsed: false,
    currentScenario: null,
    choiceMade: false
  };
  if (gameState.round >= 15) {
    showResults();
  } else {
    startRound();
  }
}

// ============================================================
// GAMEPLAY SCREEN
// ============================================================

function startRound() {
  showScreen('gameplay');

  const scenario = SCENARIOS[gameState.round];
  gameState.currentScenario = scenario;
  gameState.choiceMade = false;
  gameState.hintUsed = false;

  // Update HUD
  updateHUD();

  // Update progress bar
  const progressPct = ((gameState.round) / 15) * 100;
  document.getElementById('round-indicator').textContent =
    `ROUND ${String(gameState.round + 1).padStart(2, '0')} / 15`;
  document.getElementById('progress-fill').style.width = `${progressPct}%`;

  // Set scenario
  document.getElementById('scenario-title').textContent =
    `scenario_${String(scenario.round).padStart(2, '0')}.dat — ${scenario.category.toUpperCase()}`;

  // Typewriter situation
  const situationEl = document.getElementById('scenario-situation');
  const detailEl = document.getElementById('scenario-detail');
  detailEl.textContent = `[${scenario.difficulty.toUpperCase()}] ${scenario.situation}`;
  typewrite(situationEl, `ROUND ${scenario.round}: ${scenario.category.toUpperCase()}`, 20);

  // Render choices with stagger
  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.innerHTML = '';
  scenario.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.animationDelay = `${0.1 + idx * 0.08}s`;
    btn.innerHTML = `<span class="choice-label">[${choice.label}]</span>${escapeHtml(choice.text)}`;
    btn.onclick = () => makeChoice(choice.label);
    btn.dataset.choice = choice.label;
    choicesContainer.appendChild(btn);
  });

  // Reset hint
  const hintAccordion = document.getElementById('hint-accordion');
  hintAccordion.classList.remove('open');
  document.getElementById('hint-header').classList.remove('used');
  document.getElementById('hint-body').textContent = scenario.hint;

  // Hide feedback
  document.getElementById('feedback-terminal').classList.remove('visible');
  document.getElementById('feedback-terminal').className = 'terminal-window feedback-terminal';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateHUD() {
  document.getElementById('hud-score').textContent = String(gameState.score).padStart(4, '0');
  document.getElementById('hud-incidents').textContent = gameState.incidentsPrevented;
  document.getElementById('hud-remaining').textContent = 15 - gameState.round;

  // Risk level (use round+1 since current round is effectively complete)
  const completedRounds = gameState.round + (gameState.choiceMade ? 1 : 0);
  const ratio = completedRounds > 0 ? gameState.score / (completedRounds * 100) : 1;
  let riskText, riskClass;
  if (ratio >= 0.7) { riskText = 'LOW'; riskClass = 'low'; }
  else if (ratio >= 0.4) { riskText = 'MED'; riskClass = 'med'; }
  else { riskText = 'HIGH'; riskClass = 'high'; }

  const riskEl = document.getElementById('hud-risk');
  riskEl.innerHTML = `${riskText}<span class="hud-dot ${riskClass}" id="hud-risk-dot"></span>`;
}

// ============================================================
// CHOICE HANDLING
// ============================================================

function makeChoice(choiceLabel) {
  if (gameState.choiceMade) return;
  gameState.choiceMade = true;

  const scenario = gameState.currentScenario;
  const isCorrect = choiceLabel === scenario.correct;
  const isPartial = scenario.partial && choiceLabel === scenario.partial;

  // Score
  let points = 0;
  if (isCorrect) {
    points = 100;
    gameState.incidentsPrevented++;
  } else if (isPartial) {
    points = 50;
  }
  gameState.score += points;
  updateHUD();

  // Log
  gameState.gameLog.push({
    round: scenario.round,
    category: scenario.category,
    choice: choiceLabel,
    correct: scenario.correct,
    partial: scenario.partial,
    points: points
  });

  // Visual feedback on choices
  const choiceBtns = document.querySelectorAll('.choice-btn');
  choiceBtns.forEach(btn => {
    btn.disabled = true;
    const label = btn.dataset.choice;
    if (label === scenario.correct) {
      btn.classList.add('correct');
    } else if (scenario.partial && label === scenario.partial) {
      btn.classList.add('partial');
    } else if (label === choiceLabel && !isCorrect && !isPartial) {
      btn.classList.add('incorrect');
    }
  });

  // Show feedback terminal
  const feedbackTerminal = document.getElementById('feedback-terminal');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackText = document.getElementById('feedback-text');
  const continueBtn = document.getElementById('continue-btn');

  if (isCorrect) {
    feedbackTerminal.classList.add('correct');
  } else if (isPartial) {
    feedbackTerminal.classList.add('partial');
  } else {
    feedbackTerminal.classList.add('incorrect');
  }

  const fb = scenario.feedback[choiceLabel];
  const titleEnd = fb.indexOf('.');
  const title = fb.substring(0, titleEnd + 1);
  const body = fb.substring(titleEnd + 2);

  feedbackTitle.textContent = title;
  feedbackText.textContent = '';

  feedbackTerminal.classList.add('visible');

  // Typewriter feedback
  typewrite(feedbackText, body, 12, () => {
    // Show continue button
    continueBtn.style.display = 'block';
    if (gameState.round + 1 >= 15) {
      continueBtn.textContent = 'VIEW RESULTS \u2192';
    } else {
      continueBtn.textContent = 'NEXT ROUND \u2192';
    }
    continueBtn.onclick = () => {
      gameState.round++;
      saveCurrentGame();
      updateHUD();
      if (gameState.round >= 15) {
        showResults();
      } else {
        startRound();
      }
    };
    continueBtn.focus();
  });

  // Show narrator message
  const narratorMsg = NARRATOR_MESSAGES[gameState.round];
  showNarrator(narratorMsg);

  // Save progress
  saveCurrentGame();
}

// ============================================================
// NARRATOR
// ============================================================

let narratorTimeout = null;
function showNarrator(message) {
  const toast = document.getElementById('narrator-toast');
  toast.textContent = `[SEC.NARRATOR] ${message}`;
  toast.classList.add('visible');

  if (narratorTimeout) clearTimeout(narratorTimeout);
  narratorTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// ============================================================
// HINT
// ============================================================

function toggleHint() {
  if (gameState.choiceMade || gameState.hintUsed) return;
  const accordion = document.getElementById('hint-accordion');
  const header = document.getElementById('hint-header');
  accordion.classList.toggle('open');
  if (accordion.classList.contains('open')) {
    gameState.hintUsed = true;
    header.classList.add('used');
  }
}

document.getElementById('hint-header').addEventListener('click', toggleHint);

// ============================================================
// RESULTS SCREEN
// ============================================================

function showResults() {
  showScreen('results');

  // Update global stats
  globalStats.lastScore = gameState.score;
  if (gameState.score > globalStats.bestScore) {
    globalStats.bestScore = gameState.score;
  }
  globalStats.gamesPlayed++;
  globalStats.lastPlayed = new Date().toISOString();
  globalStats.currentGame = null;
  saveGlobalStats();

  // Title
  typewrite(document.getElementById('results-title'), 'MISSION COMPLETE', 35, () => {
    // Fire confetti after title
    fireConfetti();
  });

  // Badge
  const badge = getBadge(gameState.score);
  document.getElementById('badge-title').textContent = badge.title;
  document.getElementById('badge-score').textContent = `${gameState.score} / 1500 POINTS`;

  // Score cards
  document.getElementById('card-score').textContent = gameState.score;
  document.getElementById('card-risk').textContent = getRiskRating(gameState.score);
  document.getElementById('card-audit').textContent = getAuditRating(gameState.score);
  document.getElementById('card-incident').textContent = getIncidentRating(gameState.incidentsPrevented);

  // Learning summary based on weak areas
  const weakAreas = getWeakAreas();
  const learningList = document.getElementById('learning-list');
  learningList.innerHTML = '';
  if (weakAreas.length === 0) {
    learningList.innerHTML = '<li>Outstanding performance! You demonstrated strong security awareness across all domains. Keep refining your skills and stay current with emerging threats.</li>';
  } else {
    weakAreas.forEach(area => {
      const li = document.createElement('li');
      li.textContent = area;
      learningList.appendChild(li);
    });
  }

  // Closing message
  const closingEl = document.getElementById('closing-message');
  if (gameState.score >= 1200) {
    closingEl.innerHTML = '<strong>You are a Security Champion!</strong> Your decisions reflect deep understanding of ISO 27001 principles. You recognize that security is not just about rules — it is about critical thinking, proportionality, and a proactive mindset. Share your knowledge with colleagues.';
  } else if (gameState.score >= 900) {
    closingEl.innerHTML = '<strong>Well done, Audit Ready Professional!</strong> You demonstrate solid security judgment and understand the importance of process, documentation, and verification. A few more refinements and you will be at the top tier.';
  } else if (gameState.score >= 600) {
    closingEl.innerHTML = '<strong>Good effort, Strong Risk Observer!</strong> You have a foundation of security awareness and got many key decisions right. Focus on the areas in your learning summary to strengthen your security reflexes.';
  } else if (gameState.score >= 300) {
    closingEl.innerHTML = '<strong>Keep building, Emerging Security Defender!</strong> You are developing your security awareness. Review the feedback from each round carefully — every scenario teaches a principle that applies to real workplace situations.';
  } else {
    closingEl.innerHTML = '<strong>Welcome to your security journey, Awareness Builder!</strong> Security awareness is a skill that develops with practice. Revisit the scenarios, read the feedback thoroughly, and remember: security is everyone\'s responsibility, including yours.';
  }

  // Restart button
  document.getElementById('restart-btn').onclick = () => {
    triggerCrtFlicker(() => {
      startNewGame();
    });
  };
}

function getBadge(score) {
  if (score >= 1200) return { title: 'SECURITY CHAMPION' };
  if (score >= 900) return { title: 'AUDIT READY PROFESSIONAL' };
  if (score >= 600) return { title: 'STRONG RISK OBSERVER' };
  if (score >= 300) return { title: 'EMERGING SECURITY DEFENDER' };
  return { title: 'AWARENESS BUILDER' };
}

function getRiskRating(score) {
  if (score >= 1350) return 'Exceptional';
  if (score >= 1000) return 'High';
  if (score >= 600) return 'Moderate';
  return 'Developing';
}

function getAuditRating(score) {
  if (score >= 1350) return 'Excellent';
  if (score >= 1000) return 'Strong';
  if (score >= 600) return 'Developing';
  return 'Needs Development';
}

function getIncidentRating(prevented) {
  if (prevented >= 13) return 'Defender';
  if (prevented >= 10) return 'Proactive';
  if (prevented >= 6) return 'Aware';
  return 'Reactive';
}

function getWeakAreas() {
  const weak = [];
  const categoryScores = {};
  const categoryTotals = {};

  gameState.gameLog.forEach(entry => {
    const cat = entry.category;
    if (!categoryScores[cat]) { categoryScores[cat] = 0; categoryTotals[cat] = 0; }
    categoryScores[cat] += entry.points;
    categoryTotals[cat] += 100;
  });

  const areaTips = {
    'Information Asset Protection': 'Information Asset Protection: Always secure or destroy abandoned confidential documents immediately. Do not photograph or post about them.',
    'Password Security': 'Password Security: Never use shared passwords sent over email. Always use approved platforms with individual authentication and audit trails.',
    'Phishing Awareness': 'Phishing Awareness: Verify suspicious emails through independent, known channels. Never click urgent links. Report phishing attempts to the security team.',
    'Physical Security': 'Physical Security: Never allow unauthorized individuals into secure areas. Verify deliveries through known contacts. Do not rely on visual ID inspection.',
    'Remote Working Security': 'Remote Working Security: Avoid public Wi-Fi for confidential work. Use private hotspots and find private locations for sensitive discussions.',
    'Data Sharing Controls': 'Data Sharing Controls: Always follow the formal data governance process. Verbal approvals are not auditable. Never share data without written authorization.',
    'Social Engineering': 'Social Engineering: No legitimate IT support will ask you to download files or enter credentials into unfamiliar prompts. Always verify through known channels.',
    'Incident Reporting': 'Incident Reporting: Report all potential security incidents immediately. Do not wait for symptoms. Never delete evidence of a potential incident.',
    'Workplace Risk Behaviors': 'Workplace Risk Behaviors: Address security concerns constructively with colleagues first. Never collect evidence by creating new security risks (like photographing passwords).',
    'Authentication Practices': 'Authentication Practices: MFA should be mandatory for all team members. Security standards must apply uniformly — one weak link breaks the chain.',
    'Employee Responsibilities': 'Employee Responsibilities: Handle information exposure with discretion. Private, direct communication is usually more effective than public confrontation.',
    'Audit Readiness': 'Audit Readiness: Always route audit requests through official channels. Never hide information or respond outside the established process.',
    'Social Engineering Advanced': 'Social Engineering Advanced: Never discuss security infrastructure in informal settings. Even verified contacts should use formal channels with NDAs.',
    'Evidence and Traceability': 'Evidence and Traceability: Document changes in real time as they happen. \"Document later\" leads to incomplete or inaccurate records.',
    'Continual Improvement Mindset': 'Continual Improvement Mindset: Submit structured feedback through proper channels. Informal suggestions rarely drive change. Never distribute unofficial security guidance.'
  };

  for (const cat in categoryScores) {
    const ratio = categoryScores[cat] / categoryTotals[cat];
    if (ratio < 1 && areaTips[cat]) {
      weak.push(areaTips[cat]);
    }
  }

  return weak.slice(0, 4);
}

// ============================================================
// CONFETTI
// ============================================================

function fireConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ['#0FF4C6', '#00E5FF'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// ============================================================
// KEYBOARD SUPPORT
// ============================================================

document.addEventListener('keydown', (e) => {
  // Only during gameplay
  const gameplayScreen = document.getElementById('gameplay-screen');
  if (!gameplayScreen.classList.contains('active')) return;

  if (gameState.choiceMade) {
    // Enter/Space to click continue
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const continueBtn = document.getElementById('continue-btn');
      if (continueBtn && continueBtn.style.display !== 'none') {
        continueBtn.click();
      }
    }
    return;
  }

  // 1-4 to select choices
  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const choices = gameState.currentScenario.choices;
    if (idx < choices.length) {
      makeChoice(choices[idx].label);
    }
  }

  // H to toggle hint
  if (e.key === 'h' || e.key === 'H') {
    toggleHint();
  }
});

// ============================================================
// INIT
// ============================================================

initTitleScreen();
