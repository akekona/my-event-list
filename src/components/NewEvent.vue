<template>
  <div class="newEvent">
    <h1 id="newEventHeading">ADD AN EVENT</h1>
    <form class="event-form" @submit.prevent="addEvent">
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
      <input
        id="newEventBtn"
        class="btn"
        type="submit"
        value="CREATE REMINDER"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewEvent",
  data() {
    return {
      eventName: null,
      date: null,
      time: null,
      location: null,
    };
  },
  methods: {
    addEvent(e) {
      const event = {
        eventName: this.eventName,
        date: this.date,
        time: this.time,
        location: this.location,
      };
      const userId = this.$store.state.userId;
      axios
        .post(
          `${process.env.VUE_APP_API_BASE_URL}/api/events/${userId}/`,
          event
        )
        .then((res) => {
          this.$store.dispatch("retrieveEvents", userId);
          return res;
        })
        .then((res) => {
          if (res.status === 200) {
            this.resetForm(e);
          }
        })
        .catch((err) => {
          console.error("Error adding new event", err);
        });
    },
    resetForm(event) {
      return event.target.reset();
    },
  },
};
</script>

<style scoped>
.event-form {
  display: inline-block;
  border: 4px solid rgb(46, 46, 46);
  border-radius: 5px;
  width: 60vw;
  padding: 10px;
  background-color: rgb(145, 149, 153);
  color: white;
  font-weight: bold;
}
#newEventBtn {
  font-size: 12px;
}
#newEventHeading {
  font-size: 28px;
}
</style>
