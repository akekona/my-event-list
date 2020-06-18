<template>
  <div class="eventCard">
    <h3 id="date">{{ event.date }}</h3>
    <h3 id="time">{{ event.time }}</h3>
    <h2 id="eventName">{{ event.event_name }}</h2>
    <h3 id="location">{{ event.location }}</h3>
    <button @click="toggleEditView">
      <span v-if="editting === false">Edit</span>
      <span v-else-if="editting === true">Editting</span>
    </button>
    <button @click="updateAfterDelete">Remove</button>
    <UpdatedEvent
      v-if="editting === true"
      :editting="editting"
      :event="event"
      v-on:update:editting="closeEditView"
    />
  </div>
</template>

<script>
import axios from "axios";
import UpdatedEvent from "./UpdatedEvent";

export default {
  name: "EventCard",
  components: {
    UpdatedEvent,
  },
  props: ["event"],
  data() {
    return {
      editting: false,
    };
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
        `${process.env.VUE_APP_API_BASE_URL}/events/${eventId}/`
      );
      console.log(deleted);
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
  border: 1px solid black;
  border-radius: 5px;
  margin: 7px;
  margin-bottom: 5px;
  padding: 7px;
  display: inline-block;
}
button {
  margin: 7px;
  width: 80px;
  box-sizing: border-box;
  align-items: right;
}
</style>
