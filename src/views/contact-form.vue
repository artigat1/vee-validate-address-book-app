<template>
  <div class="about">
    <ContactForm :edit="false" />
  </div>
</template>

<script>
import ContactForm from "@/components/contact-form.vue";

export default {
  name: "ContactForm",
  components: {
    ContactForm
  }
};
</script>
