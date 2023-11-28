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
    parentGroup:"Montreal Honda"
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
    group: [1,2],
    progress: 5.6,
    parentGroup:"Montreal Honda"
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
    parentGroup:"Montreal Ford"
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
    parentGroup:"Montreal Ford"
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
    parentGroup:"Montreal Ford"
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
    parentGroup:"Montreal Honda"
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
    parentGroup:"Montreal Honda"
  },
 

];
   


export default function handler(req, res) {
  return res.status(200).json({ items: participants });
}
