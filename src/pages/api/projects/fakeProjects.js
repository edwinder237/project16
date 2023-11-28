import { add, set, sub } from 'date-fns';
//import { data } from '../kanban/fakeCourses'
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {

  const { index } = req.body;

  const attendanceStatusesArray = [
    "Present",
    "Absent",
    "Tardy (Late)",
    "Excused Absence",
    "Unexcused Absence",
    "Remote Attendance",
    "On Time",
    "Participated",
    "Did Not Participate",
    "Withdrew",
    "Attended Online",
    "Attended In-Person",
    "Attended Virtually",
    "Attended Via Video Conference",
    "Attended Via Webinar",
    "Attended Via Virtual Classroom",
    "Attended Via Live Stream",
    "Attended Via Recorded Session",
    "No Training Needed"
    // Add other less common attendance statuses here
  ];
  
  

  const data = [
    {
      id: '11',
      sortorder: 2,
      name: "Kick-off meeting",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      hasChildren: 1,
      modules: [
        {
          id: '1',
          name: "introduction",
          uuid: "43efb55c-a283-11ed-828b-7054d2174593",
          summary: "Really fun",
          duration: 5,
          sortorder: 1.1,
          activities: [
            {
              id: '6',
              name: "lecture",
              uuid: "72b7ca52-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 8,
              sortorder: 1,
              category: 'practical'
            },
            {
              id: '7',
              name: "video",
              uuid: "72b7cf00-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 9,
              sortorder: 1,
              category: 'practical'
            },
            {
              id: '8',
              name: "sleep",
              uuid: "72b7d33c-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 15,
              sortorder: 1,
              category: 'passive'
            },
            {
              id: '9',
              name: "snap",
              uuid: "72b7d77e-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 2,
              sortorder: 1,
              category: 'passive'
            },
            {
              id: '10',
              name: "sleep",
              uuid: "72b7da8b-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 4,
              sortorder: 1,
              category: 'quiz'
            }
          ],
          hasChildren: true
        },
        {
          id: '2',
          name: "how to do it",
          uuid: "43efbc2d-a283-11ed-828b-7054d2174593",
          summary: "a lot of fun",
          duration: 1,
          sortorder: 1.2,
          activities: [
            {
              id: '1',
              name: "jump",
              uuid: "72b7669b-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 5,
              sortorder: 1,
              category: 'quiz'
            },
            {
              id: '2',
              name: "do stuff",
              uuid: "72b7908a-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 10,
              sortorder: 1,
              category: 'passive'
            }
          ],
          hasChildren: true
        },
        {
          id: '3',
          name: "groupe section",
          uuid: "43efbe31-a283-11ed-828b-7054d2174593",
          summary: "a lot of fun",
          duration: 6,
          sortorder: 1.3,
          activities: null,
          hasChildren: false
        },
        {
          id: '4',
          name: "the pwoer of selling",
          uuid: "43efc0ca-a283-11ed-828b-7054d2174593",
          summary: "a lot of fun",
          duration: 12,
          sortorder: 1.4,
          activities: [
            {
              id: '3',
              name: "quiz",
              uuid: "72b793ed-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 12,
              sortorder: 1,
              category: 'practical'
            },
            {
              id: '4',
              name: "lecture",
              uuid: "72b7b351-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 5,
              sortorder: 1,
              category: 'practical'
            },
            {
              id: '5',
              name: "play",
              uuid: "72b7b64b-a283-11ed-828b-7054d2174593",
              summary: "will be awesome",
              duration: 7,
              sortorder: 1,
              category: 'quiz'
            }
          ],
          hasChildren: true
        },
        {
          id: '5',
          name: "lets face it",
          uuid: "43efc4b1-a283-11ed-828b-7054d2174593",
          summary: "a lot of fun",
          duration: 5,
          sortorder: 1.5,
          activities: null,
          hasChildren: false
        },
        {
          id: '6',
          name: "the end",
          uuid: "43efc6d9-a283-11ed-828b-7054d2174593",
          summary: "a lot of fun",
          duration: 12,
          sortorder: 1.6,
          activities: null,
          hasChildren: false
        }
      ]
    },
    {
      id: '12',
      sortorder: 3,
      name: "ales rep training 1 (CRM)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e14511c-a283-11ed-828b-7054d2174593",
      hasChildren: 1,
      modules: [
        {
          id: '7',
          name: "2nd intro",
          uuid: "43efc894-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 14,
          sortorder: 2.1,
          activities: null,
          hasChildren: false
        },
        {
          id: '8',
          name: "life is good",
          uuid: "43efca3c-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 2,
          sortorder: 2.2,
          activities: null,
          hasChildren: false
        },
        {
          id: '9',
          name: "ok ok",
          uuid: "43efcc3b-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 6,
          sortorder: 2.3,
          activities: null,
          hasChildren: false
        },
        {
          id: '10',
          name: "my car is cool",
          uuid: "43efcdf0-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 2,
          sortorder: 2.4,
          activities: null,
          hasChildren: false
        },
        {
          id: '11',
          name: "if only",
          uuid: "43efcff1-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 9,
          sortorder: 2.5,
          activities: null,
          hasChildren: false
        },
        {
          id: '12',
          name: "you could read",
          uuid: "43efd19a-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 14,
          sortorder: 2.6,
          activities: null,
          hasChildren: false
        },
        {
          id: '13',
          name: "jeez",
          uuid: "43efd33d-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 7,
          sortorder: 2.7,
          activities: null,
          hasChildren: false
        },
        {
          id: '14',
          name: "whats wrong?",
          uuid: "43efd4df-a283-11ed-828b-7054d2174593",
          summary: "this is strange",
          duration: 5,
          sortorder: 2.8,
          activities: null,
          hasChildren: false
        }
      ]
    },
    {
      id: '13',
      sortorder: 4,
      name: "Sales rep training 2 (Desking)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e145902-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null
    },
    {
      id: '14',
      sortorder: 5,
      name: "Sales rep training 3 (Desking)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e145db5-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null
    },
    {
      id: '15',
      sortorder: 6,
      name: "Sales rep training 4 (CRM)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e1461f5-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null
    },
    {
      id: '16',
      sortorder: 7,
      name: "Sales Manager training 1 (CRM)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e146552-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null
    },
    {
      id: '17',
      sortorder: 8,
      name: "Sales Manager training 2 (DESKING)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e1467c2-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null
    },
    {
      id: '46',
      sortorder: 9,
      name: "Other transansaction types",
      summary: "Desking training ",
      duration: 60,
      section_id: null,
      uuid: "ee802c36-0229-4d4f-a855-a381aba0a672",
      hasChildren: 0,
      modules: null
    }
  ]

  const curriculum = [

    {
      uuid: "f500f6da-4053-11ee-be56-0242ac120002",
      title: "CRM PRO SUITE - w/Campaign",
      description: "Full package",
      courses: data,
      duration: 67.5,
    },
    {
      uuid: "f500f6da-4ed3-11ee-be56-0242ac128502",
      title: "CRM PRO SUITE",
      description: "CRm and desking",
      courses: [{
        id: '46',
        sortorder: 9,
        title: "Other transansaction types",
        summary: "Desking training ",
        duration: 60,
        section_id: null,
        uuid: "ee802c36-0229-4d4f-a855-a381aba0a672",
        hasChildren: 0,
        modules: null,
        Status: "pilot",
        version: "3.45",
        schedule: null
      }
      ],
      duration: 60,
    },
    {
      uuid: "f500f6da-4ed3-11ee-be56-024hhc120002",
      title: "DESKING 360",
      description: "Intro to desking",
      courses: [],
      duration: 37.5,
    },
    {
      uuid: "f5ggf6da-4ed3-11ee-be56-0242ac120002",
      title: "CRM PRO",
      description: "Introduction to CRM",
      courses: [],
      duration: 15,
    },
    {
      uuid: "f5ssf6da-4ed3-11ee-be56-0242ac120002",
      title: "CRM MOBILE",
      description: "Introduction to CRM",
      courses: [],
      duration: 7.5,
    },


  ];

  const participants = [
    {
      id: '11',
      sortorder: 2,
      firstname: 'Marc',
      lastname: 'Nelson',
      fullname: "Marc Nelson",
      role: "level leader",
      section_id: null,
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      hasChildren: 1,
      email: "marc.nelson@example.com",
      group: 3,
      progress: 5.6,
      parentGroup: "Montreal Honda"
    },
    {
      id: '22',
      sortorder: 3,
      firstname: 'John',
      lastname: 'Smith',
      fullname: "John Smith",
      role: "participant",
      section_id: null,
      uuid: "1a2b3c4d-5678-90ef-1234-abcd56789012",
      hasChildren: 0,
      email: "john.smith@example.com",
      group: [1, 2],
      progress: 5.6,
      parentGroup: "Montreal Honda"
    },
    {
      id: '33',
      sortorder: 4,
      firstname: 'Alice',
      lastname: 'Johnson',
      fullname: "Alice Johnson",
      role: "participant",
      section_id: null,
      uuid: "9e8d7c6b-5432-10fe-4321-dcba09876543",
      hasChildren: 0,
      email: "alice.johnson@example.com",
      group: 2,
      progress: 95.6,
      parentGroup: "Montreal Ford"
    },
    {
      id: '44',
      sortorder: 5,
      firstname: 'Michael',
      lastname: 'Brown',
      fullname: "Michael Brown",
      role: "participant",
      section_id: null,
      uuid: "4a3b2c1d-8765-4321-fedc-ba0987654321",
      hasChildren: 0,
      email: "michael.brown@example.com",
      group: 1,
      progress: 18,
      parentGroup: "Montreal Ford"
    },
    {
      id: '55',
      sortorder: 6,
      firstname: 'Sarah',
      lastname: 'Taylor',
      fullname: "Sarah Taylor",
      role: "participant",
      section_id: null,
      uuid: "5b4c3d2e-9876-0123-dcba-210987654321",
      hasChildren: 0,
      email: "sarah.taylor@example.com",
      group: 3,
      progress: 58,
      parentGroup: "Montreal Ford"
    },
    {
      id: '66',
      sortorder: 7,
      firstname: 'David',
      lastname: 'Wilson',
      fullname: "David Wilson",
      role: "participant",
      section_id: null,
      uuid: "6c7d8e9f-0123-4567-89ab-cdef01234567",
      hasChildren: 0,
      email: "david.wilson@example.com",
      group: 2,
      progress: 78,
      parentGroup: "Montreal Honda"
    },
    {
      id: '77',
      sortorder: 8,
      firstname: 'Emma',
      lastname: 'Anderson',
      fullname: "Emma Anderson",
      role: "participant",
      section_id: null,
      uuid: "7e8f9a0b-2345-6789-abcd-ef0123456789",
      hasChildren: 0,
      email: "emma.anderson@example.com",
      group: 1,
      progress: 41,
      parentGroup: "Montreal Honda"
    },


  ];

  const courses = [
    {
      id: '15',
      sortorder: 6,
      title: "Sales rep training 4 (CRM)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e1461f5-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null,
      Status: "live",
      version: "1.25",
      schedule: null
    },
    {
      id: '16',
      sortorder: 7,
      title: "Sales Manager training 1 (CRM)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e146552-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null,
      Status: "live",
      version: "3.10a",
      schedule: null
    },
    {
      id: '17',
      sortorder: 8,
      title: "Sales Manager training 2 (DESKING)",
      summary: "a lot of fun",
      duration: 54,
      section_id: null,
      uuid: "0e1467c2-a283-11ed-828b-7054d2174593",
      hasChildren: 0,
      modules: null,
      Status: "archived",
      version: "7.54",
      schedule: null
    },
    {
      id: '46',
      sortorder: 9,
      title: "Other transansaction types",
      summary: "Desking training ",
      duration: 60,
      section_id: null,
      uuid: "ee802c36-0229-4d4f-a855-a381aba0a672",
      hasChildren: 0,
      modules: null,
      Status: "pilot",
      version: "3.45",
      schedule: null
    }
  ];


  const groups = [
    {
      id: '11',
      sortorder: 2,
      groupName: 'Team 1',
      Participants: ["Marc Nelson", "Superman"],
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      email: "group1@example.com",
      parentGroup: "Montreal Honda",
      participants: participants,
      courses: courses,
      chipColor: "#385ab5" //primary

    }, {
      id: '07',
      sortorder: 2,
      groupName: 'Team 2',
      Participants: ["Goerge Nelson", "Superman"],
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      email: "group1@example.com",
      parentGroup: "Montreal Honda",
      participants: participants,
      courses: courses,
      chipColor: "#dda705" // warning
    }, {
      id: '12',
      sortorder: 2,
      groupName: 'Team 3',
      Participants: ["Marc dupuis", "Superman"],
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      email: "group1@example.com",
      parentGroup: "Montreal Honda",
      participants: participants,
      courses: courses,
      chipColor: "#05934c" // success
    },
    {
      id: '14',
      sortorder: 2,
      groupName: 'Team 4',
      Participants: ["John", "Marie"],
      uuid: "0e141fae-a283-11ed-828b-7054d2174593",
      email: "group1@example.com",
      parentGroup: "Montreal Honda",
      participants: participants,
      courses: courses,
      chipColor: "#d13c31" // error
    },
  ];



  const employees = [
    {
      uuid: "7d7b07d0-6f0d-4b7c-a4c4-3e4d5d30a5d1",
      id: "1001",
      firstName: "Marc",
      lastName: "from project",
      role: "Instructor",
      note: "Please remember to submit your monthly progress report by the end of the week.",
      department: "Human Resources",
      status: "Active",
      email: "john.doe@example.com",
      group: groups[0],
      parentGroup: "Montreal Honda",
      courses: ["Introduction to HR", "Employee Training"]
    },
    {
      uuid: "f3e160b5-413a-48e7-9472-90e5c73d9d14",
      id: "1002",
      firstName: "Jane",
      lastName: "Smith",
      role: "Administrator",
      note: "Please ubmit your monthly progress week.",
      department: "Finance",
      status: "Inactive",
      email: "jane.smith@example.com",
      group: groups[0],
      parentGroup: "Montreal Honda",
      courses: ["Financial Management"]
    },
    {
      uuid: "c00c22f1-1e75-42b5-a1e3-9918c15a69e2",
      id: "1003",
      firstName: "Michael",
      lastName: "Johnson",
      role: "Support Staff",
      note: "Please ubmit your monthly progress week.",
      department: "IT",
      status: "Active",
      email: "michael.johnson@example.com",
      group: groups[0],
      parentGroup: "Montreal Honda",
      courses: ["IT Essentials", "Troubleshooting 101"]
    },
    {
      uuid: "6b1390e6-2d3a-4c4b-87af-983b86c8c75d",
      id: "1004",
      firstName: "Emily",
      lastName: "Williams",
      role: "Instructor",
      note: "Please ubmit your monthly progress week.",
      department: "Operations",
      status: "Active",
      email: "emily.williams@example.com",
      group: groups[1],
      parentGroup: "Montreal Honda",
      courses: ["Operations Management", "Logistics"]
    },
    {
      uuid: "a830848c-39e7-45c2-97e1-e6e1e57810b2",
      id: "1005",
      firstName: "David",
      lastName: "Brown",
      role: "Administrator",
      note: "Please ubmit your monthly progress week.",
      department: "Marketing",
      status: "On Leave",
      email: "david.brown@example.com",
      group: groups[1],
      parentGroup: "Montreal Honda",
      courses: ["Digital Marketing Strategies"]
    },
    {
      uuid: "d2f9d9fb-1857-40fe-b4d7-8f17a1d91e08",
      id: "1006",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "Instructor",
      note: "Please ubmit your monthly progress week.",
      department: "Human Resources",
      status: "Active",
      email: "sarah.johnson@example.com",
      group: groups[1],
      parentGroup: "Montreal Honda",
      courses: ["Training and Development"]
    },
    {
      uuid: "4cd38c1b7-d4c9-46c6-983f-7fca736cc5c3",
      id: "1007",
      firstName: "PArtici",
      lastName: "Lee",
      role: "Support Staff",
      note: "Please ubmit your monthly progress week.",
      department: "IT",
      status: "Active",
      email: "robert.lee@example.com",
      group: groups[2],
      parentGroup: "Montreal Honda",
      courses: ["IT Security Fundamentals"]
    },
    {
      uuid: "8de1a70c-5132-4db5-971f-3998d2a6d09b",
      id: "1008",
      firstName: "Laura",
      lastName: "Miller",
      role: "Administrator",
      note: "Please ubmit your monthly progress week.",
      department: "Finance",
      status: "Active",
      email: "laura.miller@example.com",
      group: groups[2],
      parentGroup: "Montreal Honda",
      courses: ["Financial Analysis"]
    },
    {
      uuid: "9e1e1de3-ea9e-4c05-bd10-4fb13c4c78b3",
      id: "1009",
      firstName: "James",
      lastName: "Wilson",
      role: "Instructor",
      note: "Please ubmit your monthly progress week.",
      department: "Operations",
      status: "Inactive",
      email: "james.wilson@example.com",
      group: groups[3],
      parentGroup: "Montreal Honda",
      courses: ["Supply Chain Management"]
    },
    {
      uuid: "43d3cbf2-6d6c-431c-9f59-77b0ce40e8e5",
      id: "1010",
      firstName: "Emma",
      lastName: "Thompson",
      role: "Support Staff",
      note: "Please ubmit your monthly progress week.",
      department: "Marketing",
      status: "Active",
      email: "emma.thompson@example.com",
      group: groups[3],
      parentGroup: "Montreal Honda",
      courses: ["Social Media Marketing"]
    }
  ];



  const teacherNote = `
Teacher's Note: Teaching Day Recap - [Date]

Dear [Name of Principal or Supervisor],

I'd like to provide a snapshot of today's teaching session, [Date], for [Grade/Subject].

Activities:
- Started with a recap of [Previous Lesson] to set the context.
- Engaged students in an interactive lecture on [Topic], using visuals and real-life examples.
- Facilitated small group discussions on [Discussion Topic] to encourage critical thinking.
- Conducted a hands-on [Activity] for practical application.
- Held an interactive quiz on [Technology Platform] to gamify learning.
- Administered a short individual assessment on [Assessment Details].
- Assigned [Homework Assignment] to deepen understanding.

Participation:
Students actively participated, demonstrating improved teamwork and confidence in sharing ideas.

Observations:
Noted [Positive Observations], such as increased curiosity and effective communication.

Challenges:
Encountered [Challenges Faced], which will be addressed in future sessions.

Next Steps:
Next class will cover [Next Lesson], building upon today's progress.

Thank you for your support. Feel free to contact me for any questions.

Best regards,
[Your Name]
`;




  const cal = [{
    title: "Kick-off meeting",
    course: data[0],
    duration: 35,
    uuid: "0e141fae-a283-11ed-828b-7054d2174593",
    start: '2023-09-02T10:30:00',
    end: '2023-09-02T17:30:00',
    groups: ["Team 1"],
    instructorNotes: teacherNote
  },
  {
    title: "ales rep training 1 (CRM)",
    course: data[1],
    duration: 124,
    uuid: "0e14511c-a283-11ed-828b-7054d2174593",
    start: '2023-09-02T13:30:00',
    end: '2023-09-02T17:30:00',
    groups: ["Team 3"],
    instructorNotes: 'Taoday was a good day'
  },

  ]






  const projects = [
    {
      id: '115',
      title: "Montreal Honda Training",
      summary: "introduction to the toolset",
      duration: 142,
      type: "onboarding",
      uuid: "0e141fae-a283-11ed-828b-70trt62174443",
      status: "active",
      start_date: "2023-02-15",
      end_date: "2023-12-26",
      creation_date: "2023-01-10",
      events: cal,
      participants: [
        {
          uuid: "7d7b07d0-6f0d-4b7c-a4c4-3e4d5d30a5d1",
          id: "1001",
          firstName: "Marc",
          lastName: "from project",
          role: "Instructor",
          note: "Please remember to submit your monthly progress report by the end of the week.",
          department: "Human Resources",
          status: "Active",
          email: "john.doe@example.com",
          group: groups[0],
          parentGroup: "Montreal Honda",
          courses: ["Introduction to HR", "Employee Training"]
        },
        {
          uuid: "f3e160b5-413a-48e7-9472-90e5c73d9d14",
          id: "1002",
          firstName: "Jane",
          lastName: "Smith",
          role: "Administrator",
          note: "Please ubmit your monthly progress week.",
          department: "Finance",
          status: "Inactive",
          email: "jane.smith@example.com",
          group: groups[0],
          parentGroup: "Montreal Honda",
          courses: ["Financial Management"]
        },

      ],
      groups: [],
      curriculum: curriculum

    },
    {
      id: '116',
      title: "New York Tech Conference",
      summary: "latest trends and innovations",
      duration: 180,
      type: "conference",
      uuid: "2a5btta-a283-11ed-828b-7054d2174443",
      status: "completed",
      start_date: "2022-09-20",
      end_date: "2022-09-22",
      creation_date: "2022-07-01",
      events: data,
      participants: employees,
      groups: [3, 4, 5],
      curriculum: [],
    },
    {
      id: '117',
      title: "London Product Launch",
      summary: "unveiling new features",
      duration: 120,
      type: "product launch",
      uuid: "4jjjd5f68-a283-11ed-828b-7054d2174443",
      status: "cancelled",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      creation_date: "2023-02-20",
      events: data,
      participants: employees,
      groups: [1, 4, 5],
      curriculum: []
    },
    {
      id: '118',
      title: "Berlin Workshop",
      summary: "deep dive into advanced techniques",
      duration: 90,
      type: "workshop",
      uuid: "6e8jja086-a283-11ed-828b-7054d2174443",
      status: "pending",
      start_date: "2023-08-10",
      end_date: "2023-08-12",
      creation_date: "2023-07-01",
      events: data,
      participants: employees,
      groups: null,
      curriculum: []
    },
    {
      id: '119',
      title: "Sydney Team Building",
      summary: "strengthening collaboration",
      duration: 240,
      type: "team building",
      uuid: "8f971a42-a283-11ed-8gfb-7054d2174443",
      status: "active",
      start_date: "2023-03-15",
      end_date: "2023-03-18",
      creation_date: "2023-02-01",
      events: data,
      participants: employees,
      groups: null,
      curriculum: []
    },
    {
      id: '120',
      title: "Tokyo Hackathon",
      summary: "innovate and build new solutions",
      duration: 300,
      type: "hackathon",
      uuid: "b1aa46fa-a283-11fg-828b-7054d2174443",
      status: "completed",
      start_date: "2023-08-10",
      end_date: "2023-08-12",
      creation_date: "2023-07-01",
      events: data,
      participants: employees,
      groups: null,
      curriculum: []
    },
    {
      id: '121',
      title: "Paris Networking Event",
      summary: "connect and expand professional network",
      duration: 180,
      type: "networking",
      uuid: "b1aa46fa-a283-11ed-828b-7054d2ffg741443",
      status: "pending",
      start_date: "2023-08-10",
      end_date: "2023-08-12",
      creation_date: "2023-07-01",
      events: data,
      participants: employees,
      groups: null,
      curriculum: []
    },
  ];

  function  filterGroupsFromParticipants()  {
    if(index){

      const uniqueGroupsKeys = Array.from(new Set(projects[index].participants.map(participant => participant.group.groupName)));
      const uniqueGroupObject = uniqueGroupsKeys.map(groupname => {
        const existingGroup = projects[index].participants.find(participant => participant.group.groupName === groupname);
  
        const chipColor = existingGroup ? existingGroup.chipColor : "primary"; // Default to "primary" if color not found
        console.log(groups.filter((group)=>group.groupName === groupname))
        return {
          uuid: uuidv4(),
          groupName: groupname,
          employees: projects[index].participants.filter(employee => employee.group.groupName === groupname),
          courses: groups.filter((group)=>group.groupName === groupname)[0].courses,
          chipColor: projects[index].participants.find(employee => employee.group.groupName === groupname)?.group?.chipColor || "primary"
        };
      });
  
      return [...projects[index].groups, uniqueGroupObject];
    }else return null

  }

  const allGroups = filterGroupsFromParticipants();



  const newProjectsArray = projects.map((Project, i) => {
    if (i == index) {
      return { ...Project, groups: allGroups[0] }
    }
    return Project;
  });

  return res.status(200).json({ projects: newProjectsArray });
}



