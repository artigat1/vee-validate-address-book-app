<template>
  <div class="home">
    <div class="center">
      <h1>Address Book Home</h1>
    </div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>First Name</md-table-head>
        <md-table-head>Last Name</md-table-head>
        <md-table-head>Address Line 1</md-table-head>
        <md-table-head>Address Line 2</md-table-head>
        <md-table-head>City</md-table-head>
        <md-table-head>Country</md-table-head>
        <md-table-head>Postal Code</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Age</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row :key="c.id" v-for="c in contacts">
        <md-table-cell md-numeric>{{ c.id }}</md-table-cell>
        <md-table-cell>{{ c.firstName }}</md-table-cell>
        <md-table-cell>{{ c.lastName }}</md-table-cell>
        <md-table-cell>{{ c.addressLineOne }}</md-table-cell>
        <md-table-cell>{{ c.addressLineTwo }}</md-table-cell>
        <md-table-cell>{{ c.city }}</md-table-cell>
        <md-table-cell>{{ c.country }}</md-table-cell>
        <md-table-cell>{{ c.postalCode }}</md-table-cell>
        <md-table-cell>{{ c.gender }}</md-table-cell>
        <md-table-cell md-numeric>{{ c.age }}</md-table-cell>
        <md-table-cell>{{ c.email }}</md-table-cell>
        <md-table-cell>
          <md-button
            @click="
              selectedContactId = c.id;
              showDialog = true;
            "
            class="md-primary"
            >Edit</md-button
          >
        </md-table-cell>
        <md-table-cell>
          <md-button @click="removeContact(c.id)" class="md-accent"
            >Delete</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-content>
        <ContactForm
          :contactId="selectedContactId"
          :editing="true"
          @contactSaved="
            selectedContactId = undefined;
            showDialog = false;
          "
        />
      </md-dialog-content>
    </md-dialog>
  </div>
</template>
<script>
import { contactMixin } from "@/mixins/contact.mixin";
import ContactForm from "@/components/contact-form.vue";

export default {
  name: "HomePage",
  mixins: [contactMixin],
  components: {
    ContactForm
  },
  props: {
    editing: Boolean,
    id: Number
  },
  computed: {
    contacts() {
      return this.$store.state.contacts;
    }
  },
  data() {
    return {
      showDialog: false,
      selectedContactId: undefined
    };
  },
  beforeMount() {
    this.getAllContacts();
  },
  methods: {
    async getAllContacts() {
      try {
        const response = await this.getContacts();
        this.$store.commit("setContacts", response.data);
      } catch (ex) {
        console.log(ex);
      }
    },
    async removeContact(id) {
      try {
        await this.deleteContact(id);
        await this.getAllContacts();
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
.md-dialog-container {
  padding: 20px;
}

.md-content.md-table.md-theme-default {
  width: 95%;
  margin: 0 auto;
}
</style>
