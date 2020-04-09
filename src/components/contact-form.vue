<template>
  <div class="contact-form">
    <div class="center">
      <h1>{{ editing ? "Edit" : "Add" }} Contact</h1>
    </div>
    <form @submit="save" class="md-layout" novalidate>
      <md-field :class="{ 'md-invalid': errors.has('firstName') }">
        <label for="firstName">First Name</label>
        <md-input
          :disabled="sending"
          name="firstName"
          v-model="contact.firstName"
          v-validate="'required'"
        />
        <span class="md-error" v-if="errors.has('firstName')"
          >First Name is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('lastName') }">
        <label for="lastName">Last Name</label>
        <md-input
          :disabled="sending"
          name="lastName"
          v-model="contact.lastName"
          v-validate="'required'"
        />
        <span class="md-error" v-if="errors.has('lastName')"
          >Last Name is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('addressLineOne') }">
        <label for="addressLineOne">Address Line 1</label>
        <md-input
          :disabled="sending"
          name="addressLineOne"
          v-model="contact.addressLineOne"
          v-validate="'required'"
        />
        <span class="md-error" v-if="errors.has('addressLineOne')"
          >Address line 1 is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('addressLineTwo') }">
        <label for="addressLineTwo">Address Line 2</label>
        <md-input
          :disabled="sending"
          name="addressLineTwo"
          v-model="contact.addressLineTwo"
        />
        <span class="md-error" v-if="errors.has('addressLineTwo')"
          >Address line 2 is required</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('city') }">
        <label for="city">City</label>
        <md-input
          :disabled="sending"
          name="city"
          v-model="contact.city"
          v-validate="'required'"
        />
        <span class="md-error" v-if="errors.has('city')"
          >City is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('country') }">
        <label for="country">Country</label>
        <md-select
          :disabled="sending"
          md-dense
          name="country"
          v-model="contact.country"
          v-validate.continues="'required'"
        >
          <md-option :key="c" :value="c" v-for="c in countries">{{
            c
          }}</md-option>
        </md-select>
        <span class="md-error" v-if="errors.firstByRule('country', 'required')"
          >Country is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('postalCode') }">
        <label for="postalCode">Postal Code</label>
        <md-input
          :disabled="sending"
          name="postalCode"
          v-model="contact.postalCode"
          v-validate="{ required: true, regex: getPostalCodeRegex() }"
        />
        <span
          class="md-error"
          v-if="errors.firstByRule('postalCode', 'required')"
          >Postal Code is required.</span
        >
        <span class="md-error" v-if="errors.firstByRule('postalCode', 'regex')"
          >Postal Code is invalid.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('phone') }">
        <label for="phone">Phone</label>
        <md-input
          :disabled="sending"
          name="phone"
          v-model="contact.phone"
          v-validate="{ required: true, regex: getPhoneRegex() }"
        />
        <span class="md-error" v-if="errors.firstByRule('phone', 'required')"
          >Phone is required.</span
        >
        <span class="md-error" v-if="errors.firstByRule('phone', 'regex')"
          >Phone is invalid.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('gender') }">
        <label for="gender">Gender</label>
        <md-select
          :disabled="sending"
          md-dense
          name="gender"
          v-model="contact.gender"
          v-validate.continues="'required'"
        >
          <md-option value="male">Male</md-option>
          <md-option value="female">Female</md-option>
        </md-select>
        <span class="md-error" v-if="errors.firstByRule('gender', 'required')"
          >Gender is required.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('age') }">
        <label for="age">Age</label>
        <md-input
          :disabled="sending"
          autocomplete="age"
          id="age"
          name="age"
          type="number"
          v-model="contact.age"
          v-validate="'required|between:0,200'"
        />
        <span class="md-error" v-if="errors.firstByRule('age', 'required')"
          >Age is required.</span
        >
        <span class="md-error" v-if="errors.firstByRule('age', 'between')"
          >Age must be 0 and 200.</span
        >
      </md-field>
      <br />
      <md-field :class="{ 'md-invalid': errors.has('email') }">
        <label for="email">Email</label>
        <md-input
          :disabled="sending"
          autocomplete="email"
          name="email"
          type="email"
          v-model="contact.email"
          v-validate="'required|email'"
        />
        <span class="md-error" v-if="errors.firstByRule('email', 'required')"
          >Email is required.</span
        >
        <span class="md-error" v-if="errors.firstByRule('email', 'email')"
          >Email is invalid.</span
        >
      </md-field>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button class="md-raised" type="submit"
        >{{ editing ? "Edit" : "Create" }} Contact</md-button
      >
    </form>
  </div>
</template>

<script>
import { COUNTRIES } from "@/helpers/exports";
import { contactMixin } from "@/mixins/contact.mixin";

export default {
  name: "ContactForm",
  mixins: [contactMixin],
  props: {
    editing: Boolean,
    contactId: Number
  },
  computed: {
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    },
    contacts() {
      return this.$store.state.contacts;
    }
  },
  data() {
    return {
      sending: false,
      contact: {},
      countries: COUNTRIES.map(c => c.name)
    };
  },
  beforeMount() {
    console.log('mounting contact form')
    this.contact = this.contacts.find(c => c.id == this.contactId) || {};
  },
  methods: {
    async save(evt) {
      evt.preventDefault();
      try {
        const result = await this.$validator.validateAll();
        if (!result) {
          return;
        }
        if (this.editing) {
          await this.updateContact(this.contact, this.contactId);
          await this.getAllContacts();
          this.$emit("contactSaved");
        } else {
          await this.addContact(this.contact);
          await this.getAllContacts();
          this.$router.push("/");
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async getAllContacts() {
      try {
        const response = await this.getContacts();
        this.$store.commit("setContacts", response.data);
      } catch (ex) {
        console.log(ex);
      }
    },
    getPostalCodeRegex() {
      switch (this.contact.country) {
        case "United States":
          return /^[0-9]{5}(?:-[0-9]{4})?$/;

        case "Canada":
          return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

        default:
          return /./;
      }
    },
    getPhoneRegex() {
      if (["United States", "Canada"].includes(this.contact.country)) {
        return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
      }
      return /./;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contact-form {
  margin: 0 auto;
  width: 90%;
}
</style>
