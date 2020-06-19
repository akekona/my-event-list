<template>
  <div class="eventList">
    <NewEvent />
    <div class="upcomingEvents">
      <h1 id="eventListHeading">UPCOMING EVENTS...</h1>
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
    retrieveEvents() {
      this.$store.dispatch("retrieveEvents").then(() => {
        this.eventList = this.$store.state.eventList;
      });
    },
  },
  beforeCreate() {
    if (!this.$store.state.loggedIn || this.$store.state.loggedIn === null) {
      this.$router.push("/");
    }
  },
  beforeMount() {
    this.retrieveEvents();
  },
};
</script>

<style scoped>
#eventListHeading {
  font-size: 28px;
}
.upcomingEvents {
  margin: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 4px;
}
</style>
