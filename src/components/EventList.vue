<template>
  <div class="eventList">
    <button @click="logout">Logout</button>
    <NewEvent />
    <h1>Upcoming Events</h1>
    <div v-if="eventList.length === 0">
      <p>There are currently no events in your EVENT LIST.</p>
      <p>Add a new event reminder to get started!</p>
    </div>
    <EventCard
      v-for="event in eventList"
      :key="event.event_id"
      :event="event"
    />
  </div>
</template>

<script>
import NewEvent from "./NewEvent";
import EventCard from "./EventCard";
import { mapState } from "vuex";

export default {
  name: "EventList",
  components: {
    NewEvent,
    EventCard,
  },
  computed: mapState(["eventList"]),

  methods: {
    logout() {
      this.$store.dispatch("logout");
      if (!this.$store.state.loggedIn) {
        this.$router.push("/");
      }
    },
    retrieveEvents() {
      this.$store.dispatch("retrieveEvents").then(() => {
        // console.log(this.$store.state.eventList);
        this.eventList = this.$store.state.eventList;
      });
    },
  },
  beforeMount() {
    this.retrieveEvents();
  },
};
</script>

<style scoped></style>
