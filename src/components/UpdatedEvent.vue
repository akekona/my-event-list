<template>
  <transition class="updatedEvent" name="modal">
    <div v-if="editting === true">
      <div class="overlay">
        <div class="modal">
          <h2>Edit Event Details</h2>
          <form @submit.prevent="updateEventList">
            <label for="eventName">Event name:</label>
            <input
              type="text"
              v-model="eventName"
              id="eventName"
              name="eventName"
            /><br />
            <label for="date">Date:</label>
            <input type="date" v-model="date" id="date" name="date" /><br />
            <label for="time">Time:</label>
            <input type="time" v-model="time" id="time" name="time" /><br />
            <label for="location">Location:</label>
            <input
              type="text"
              v-model="location"
              id="location"
              name="location"
            /><br /><br />
            <input class="btn" type="submit" value="Save" />
            <input
              class="btn"
              type="button"
              value="Cancel"
              @click="cancelEdit"
            />
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdatedEvent",
  props: ["event", "editting"],
  data() {
    return {
      eventName: event.eventName,
      date: event.date,
      time: event.time,
      location: event.location,
    };
  },
  beforeMount() {
    this.eventName = this.event.event_name;
    this.date = this.event.date;
    this.time = this.event.time;
    this.location = this.event.location;
  },
  methods: {
    async updateDatabase() {
      try {
        const updatedEvent = {
          eventName: this.eventName,
          date: this.date,
          time: this.time,
          location: this.location,
        };
        const eventId = this.event.event_id;
        console.log("event to update", updatedEvent);
        const updated = await axios.put(
          `${process.env.VUE_APP_API_BASE_URL}/events/${eventId}/`,
          updatedEvent
        );
        console.log(updated);
      } catch (err) {
        console.log("Error adding new event", err);
      }
    },
    async updateEventList() {
      try {
        const userId = this.$store.state.userId;
        this.updateDatabase().then(() => {
          this.$emit("update:editting", false);
          this.$store.dispatch("retrieveEvents", userId);
        });
      } catch (err) {
        console.error("Error refreshing page", err);
      }
    },
    cancelEdit() {
      this.$emit("update:editting", false);
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: white;
  width: 70vh;
  border-radius: 2px;
  box-shadow: 0 1px 3px 1px;
  transition: all 0.2s ease-in;
  padding: 10px;
  padding-bottom: 25px;
}
.overlay {
  background-color: rgba(95, 95, 95, 0.432);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>
