<template>
  <div class="eventCard">
    <h3 id="date">{{ displayDate }}</h3>
    <h3 id="time">{{ displayTime }}</h3>
    <h2 id="eventName">{{ event.event_name }}</h2>
    <h3 id="location">{{ event.location }}</h3>
    <button class="btn" @click="toggleEditView">
      <span v-if="editting === false">Edit</span>
      <span v-else-if="editting === true">Editting</span>
    </button>
    <button class="btn" @click="updateAfterDelete">Remove</button>
    <UpdatedEvent
      v-if="editting === true"
      :editting="editting"
      :event="event"
      :calendarDate="calendarDate"
      v-on:update:editting="closeEditView"
    />
  </div>
</template>

<script>
import axios from "axios";
import UpdatedEvent from "./UpdatedEvent";
import moment from "moment";

export default {
  name: "EventCard",
  components: {
    UpdatedEvent,
  },
  props: ["event"],
  data() {
    return {
      editting: false,
      calendarDate: "",
      displayDate: "",
      displayTime: "",
    };
  },
  beforeMount() {
    this.calendarDate = moment(this.event.date).format("YYYY-MM-DD");
    this.displayDate = moment(this.event.date).format("ddd MMM DD, YYYY");
    const dateNoTime = this.event.date.slice(0, 11);
    const timeNoSec = this.event.time.slice(0, 5);
    this.displayTime = moment(dateNoTime + timeNoSec).format("LT");
  },
  methods: {
    toggleEditView() {
      this.editting = !this.editting;
    },
    closeEditView(editting) {
      this.editting = editting;
    },
    async deleteEvent() {
      const eventId = this.event.event_id;
      const deleted = await axios.delete(
        `${process.env.VUE_APP_API_BASE_URL}/api/events/${eventId}/`
      );
      return deleted;
    },
    async updateAfterDelete() {
      const userId = this.$store.state.userId;
      this.deleteEvent().then(() => {
        this.$store.dispatch("retrieveEvents", userId);
      });
    },
  },
};
</script>

<style scoped>
.eventCard {
  border: 3px solid gray;
  border-radius: 5px;
  margin: 7px;
  margin-bottom: 5px;
  padding: 7px;
  display: inline-block;
  background-image: linear-gradient(
    to bottom right,
    rgb(176, 239, 252),
    rgb(113, 177, 238)
  );
}
button {
  margin: 7px;
  width: 80px;
  box-sizing: border-box;
  align-items: right;
}
#eventName {
  color: white;
}
</style>
