import { BriefcaseBusinessIcon, Calendar, CircleCheckBig, Code2Icon, Expand, FilePlus, FileUserIcon, LayoutDashboard, List, Puzzle, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
  {
    name: 'New Job',
    icon: FilePlus,
    path: '/dashboard'
  }, {
    name: 'Job Posts',
    icon: List,
    path: '/all-interview'
  }, {
    name: 'Results',
    icon: CircleCheckBig,
    path: '/result'
  }, {
    name: 'Scheduled Interview',
    icon: Calendar,
    path: '/scheduled-interview'
  }
]

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon
  },
  {
    title: 'Behavioral',
    icon: User2Icon
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Problem Solving',
    icon: Puzzle
  },
  {
    title: 'Leadership',
    icon: Code2Icon
  },
]

export const QUESTION_PROMPT = `
You are a professional technical interviewer.

Your task is to generate a categorized list of interview questions for a **fresher-level position** based on the following role information:

- Job Title: {{jobTitle}}
- Company Name: {{companyName}}
- Department: {{department}}
- Required Experience: {{reqExperience}}
- Employment Type: {{employmentType}}
- Location: {{location}}
- Salary Range: {{salaryRange}}
- Application Deadline: {{applicationDeadline}}
- Job Description: {{jobDescription}}
- Number of Questions Required: {{noOfQuestions}}
- Total Interview Duration (in minutes): {{timeDuration}}

---

### ✅ Instructions:

1. **Must-Have Questions**
 
   - **Basic Introduction & Background** - Can you briefly introduce yourself and your professional background?  
     - What are the key milestones in your academic or career journey so far?  
     - Why did you choose your current/last field of study or training?  
     - What are your core strengths and areas you’re currently working to improve?  
     - Tell us something that’s not on your resume but is relevant to this role.

   - **Interest & Motivation** - Why are you interested in this particular role?  
     - What attracted you to our company?  
     - How does this opportunity align with your long-term career goals?  
     - What excites you most about working in this domain?  
     - How did you hear about this job opening?

   - **Role Understanding & Alignment** - What do you understand about the responsibilities of this role?  
     - Which parts of the job description do you feel most confident about?  
     - Do you have experience with any tools, skills, or processes mentioned in the JD?  
     - Which areas of this role do you expect to find most challenging?  
     - How do you see yourself contributing value in this position?

   - **Availability & Commitment** - What is your current notice period or earliest joining date?  
     - Are there any upcoming personal or academic commitments we should know of?  
     - Are you available for a full-time role?  
     - Would you be able to commit to this role for at least [X] months?  
     - Are you currently engaged in any other interview processes?

   - **Education & Eligibility** - Have you completed the required degree or certification mentioned in the JD?  
     - Are you currently pursuing any additional education or certification?  
     - Do you meet the minimum eligibility or experience criteria for this role?  
     - Have you previously worked in a similar domain or industry (internships/projects)?  
     - Are you legally eligible to work in {{location}}?

---

2. **Job Description Analysis**
   Analyze the job description to determine core competencies, tools, behavioral traits, and technical requirements relevant to the role.

---

3. **Question Allocation Logic**

   **Generate EXACTLY {{noOfQuestions}} total questions. The total number of questions in the output JSON array must STRICTLY match {{noOfQuestions}}. DO NOT generate more than {{noOfQuestions}} questions, and do not generate fewer.**

   Ensure a balanced distribution across the following categories:

   - Behavioral and motivational questions
   - Domain and role-specific understanding
   - Internship or project experience
   - Basic technical skills
   - Communication and team-based skills

   Use shorter and simpler questions if **{{timeDuration}}** is low, and more layered/contextual questions if **{{timeDuration}}** is longer.

---

4. **Include Additional Categories as Needed**

   Choose questions (or generate them) from the following extended categories based on job fit, ensuring the total count remains {{noOfQuestions}}:

   - Qualifier Questions
   - Basic Technical Skills
   - Communication Skills
   - Academic and Internship Experience
   - Management Skills

   For "Qualifier Questions", use the job context to decide whether to ask:
   - Are you open to relocating to {{location}}?
   - The salary range is {{salaryRange}}. Are you comfortable with that?
   - Can you join within 30 days if selected?
   - Do you have a stable internet connection for remote roles?

---

5. **Question Format**

   Return the response **strictly** as a JavaScript JSON array in the following format. The array must contain **exactly {{noOfQuestions}} objects. Ensure the final count is precisely {{noOfQuestions}} elements. No additional questions or elements should be present.**

   \`\`\`json
   interviewQuestions = [
     {
       "question": "Why are you interested in this particular role?",
       "type": "Interest & Motivation"
     },
     {
       "question": "What do you understand about the responsibilities of this role?",
       "type": "Role Understanding & Alignment"
     },
     {
       "question": "Can you describe a project or internship where you used relevant technical skills?",
       "type": "Academic and Internship Experience"
     },
     ...
   ]
   \`\`\`
`




export const FEEDBACK_PROMPT = `{{conversation}}

Depends on this Interview Conversation between assitant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experince. Also give me summery in 3 lines 

about the interview and one line to let me know whether is recommanded 

for hire or not with msg. Give me response in JSON format

{

    feedback:{

        rating:{

            techicalSkills:5,

            communication:6,

            problemSolving:4,

            experince:7,

            totalRating:6

        },

        summery:<in 3 Line>,

        Recommendation:'',

        RecommendationMsg:''



    }

}`


