<template>
  <div>
    <v-sheet
      class="d-flex"
      height="54"
      tile
    >
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        label="View Mode"
        variant="outlined"
        dense
        hide-details
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        label="weekdays"
        variant="outlined"
        dense
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet>
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
  import { useDate } from 'vuetify'

  export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [new Date()],

	  // Fields associated with event that we store on calendar and in database
	  name: null,
	  details: null,
	  start: null,
	  end: null,

	  color: "#1976D2",
	  // Stores event ID
	  currentlyEditing: null,
	  // Selected element record that matches database
	  selectedEvent: {},
	  // Selected DOM element
	  selectedElement: null,
	  // Represents if an event is open and details are shown
	  selectedOpen: false,
	  // Array of our events fetched from our dataabse
      events: [],
	  dialog: false,
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted() {
    const adapter = useDate();
    this.fetchEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
  },
    methods: {
      /**
     * Fetch events from the backend API
     * @param {Object} range - The date range for fetching events
     */
    async fetchEvents({ start, end }) {
      try {
        const response = await getAllEvents();
        this.events = response.data.map((event) => ({
          id: event.id, // Ensure you have an ID field
          title: event.title,
          start: event.start,
          end: event.end,
          color: event.color,
          allDay: event.allDay,
        }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
