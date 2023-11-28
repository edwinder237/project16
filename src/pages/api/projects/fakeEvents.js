export const events = [
    {
      summary: "Random Education Event 1",
      description: "A fascinating educational event to expand your knowledge.",
      start: {
        dateTime: "2023-06-15T10:00:00",
        timeZone: "Your Time Zone"
      },
      end: {
        dateTime: "2023-06-15T16:00:00",
        timeZone: "Your Time Zone"
      },
      location: "Virtual",
      attendees: [
        { email: "email1@example.com" },
        { email: "email2@example.com" }
      ],
      conferenceData: {
        notes: "Trainer Information:\nJohn Smith - Topic: Artificial Intelligence\nJane Doe - Topic: Blockchain Technology\nMichael Johnson - Topic: Data Science"
      }
    },
    {
      summary: "Random Education Event 2",
      description: "A captivating educational event to broaden your horizons.",
      start: {
        dateTime: "2023-07-20T09:00:00",
        timeZone: "Your Time Zone"
      },
      end: {
        dateTime: "2023-07-20T17:00:00",
        timeZone: "Your Time Zone"
      },
      location: "Physical Location",
      attendees: [
        { email: "email3@example.com" },
        { email: "email4@example.com" },
        { email: "email4@example.com" },
        { email: "email4@example.com" },
        { email: "email4@example.com" },
        { email: "email4@example.com" }
      ],
      conferenceData: {
        notes: "Trainer Information:\nEmily Brown - Topic: Data Analysis\nDaniel Wilson - Topic: Cybersecurity\nJessica Lee - Topic: UX Design"
      }
    },
    // Add more entries here for the remaining events
  ];
  export default function handler(req, res) {
    return res.status(200).json({ events: events });
  }