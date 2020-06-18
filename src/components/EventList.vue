<template>
  <div class="eventList">
    <button @click="logout">Logout</button>

    <h1>Upcoming Events</h1>
    <EventCard
      v-for="event in eventList"
      :key="event.event_id"
      :event="event"
    />
    <!-- <button @click="test">Check event list</button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventCard from "./EventCard";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  computed: mapState(["eventList"]),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      //   this.$router.push("/login");
    },
    retrieveEvents() {
      this.$store.dispatch("retrieveEvents").then(() => {
        console.log(this.$store.state.eventList);
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
