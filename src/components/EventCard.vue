<template>
  <div class="eventCard">
    <h3 id="date">{{ event.date }}</h3>
    <h3 id="time">{{ event.time }}</h3>
    <h2 id="eventName">{{ event.event_name }}</h2>
    <h3 id="location">{{ event.location }}</h3>
    <!-- <button @click="test">Check event details</button> -->
    <UpdatedEvent
      v-if="editting === true"
      :editting="editting"
      :event="event"
      v-on:update:editting="closeEditView"
    />
    <button>Edit</button>
    <button>Remove</button>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event"],
  data() {
    return {
      editting: false,
    };
  },
  methods: {},
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
</style>
