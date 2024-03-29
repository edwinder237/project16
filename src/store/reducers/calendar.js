import { createSlice } from '@reduxjs/toolkit';

// project import
import axios from 'utils/axios';
import { dispatch } from 'store';

const initialState = {
  //calendarView: 'dayGridMonth',
  calendarView: 'listWeek',
  error: false,
  events: [{ //added for testing. please api route
    title: 'my event',
    start: '2023-09-12T10:30:00',
    end: '2023-09-12T17:30:00',
  },
  {
    title: 'my event',
    start: '2023-09-13T13:30:00',
    end: '2023-09-13T17:30:00',
  },
  
  ],
  isLoader: false,
  isModalOpen: false,
  selectedEventId: null,
  selectedRange: null
};

// ==============================|| CALENDAR - SLICE ||============================== //

const calendar = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // loader
    loading(state) {
      state.isLoader = true;
    },

    // error
    hasError(state, action) {
      state.isLoader = false;
      state.error = action.payload;
    },

    // event list
    setEvents(state, action) {
      state.isLoader = false;
      state.events = action.payload;
    },

    // update calendar view
    updateCalendarView(state, action) {
      state.calendarView = action.payload;
    },

    // select event
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isModalOpen = true;
      state.selectedEventId = eventId;
    },

    // create event
    createEvent(state, action) {
      const newEvent = action.payload;
      state.isLoader = false;
      state.isModalOpen = false;
      state.events = [...state.events, newEvent];
    },

    // update event
    updateEvent(state, action) {
      const event = action.payload;
      const eventUpdate = state.events.map((item) => {
        if (item.id === event.id) {
          return event;
        }
        return item;
      });

      state.isLoader = false;
      state.isModalOpen = false;
      state.selectedEventId = null;
      state.events = eventUpdate;
    },

    // delete event
    deleteEvent(state, action) {
      const { eventId } = action.payload;
      state.isModalOpen = false;
      state.events = state.events.filter((user) => user.id !== eventId);
    },

    // select date range
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = { start, end };
    },

    // modal toggle
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
      if (state.isModalOpen === false) {
        state.selectedEventId = null;
        state.selectedRange = null;
      }
    }
  }
});

export default calendar.reducer;

export const { selectEvent, toggleModal, updateCalendarView } = calendar.actions;

export function getEvents() {
  return async () => {
    dispatch(calendar.actions.loading());
    try {
      //const response = await axios.get('/api/calendar/events');
      const response = await axios.get('/api/kanban/fakeEvents');
      dispatch(calendar.actions.setEvents(response.data.events));
    } catch (error) {
      dispatch(calendar.actions.hasError(error));
    }
  };
}

export function createEvent(newEvent) {
  return async () => {
    dispatch(calendar.actions.loading());
    try {
      const response = await axios.post('/api/calendar/add', newEvent);
      dispatch(calendar.actions.createEvent(response.data));
    } catch (error) {
      dispatch(calendar.actions.hasError(error));
    }
  };
}

export function updateEvent(eventId, event) {
  return async () => {
    dispatch(calendar.actions.loading());
    try {
      const response = await axios.post('/api/calendar/update', {
        eventId,
        update: event
      });
      dispatch(calendar.actions.updateEvent(response.data));
    } catch (error) {
      dispatch(calendar.actions.hasError(error));
    }
  };
}

export function deleteEvent(eventId) {
  return async () => {
    dispatch(calendar.actions.loading());
    try {
      await axios.post('/api/calendar/delete', { eventId });
      dispatch(calendar.actions.deleteEvent({ eventId }));
    } catch (error) {
      dispatch(calendar.actions.hasError(error));
    }
  };
}

export function selectRange(start, end) {
  return async () => {
    dispatch(
      calendar.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}
