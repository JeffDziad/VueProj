Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#ff4242',
                    secondary: '#FCECC9',
                    accent: '#ff7a7a'
                }
            }
        }
    }),
    data: {
        //Search Textbox
        search: '',
        searchChanged: false,

        //Drawer List
        drawerList: 0,

        //Object Data
        passwords: [new Password(0, "password", "Netflix", "Username and Password for my Netflix account.", "www.netflix.com", "ChuckinNuggets", "PasswordsAreLame1")],
        cards: [new Card(0, "card", "Visa Debit", "Wells Fargo visa card details.", "Deff Jziadulewicz", "1066788812349999", new Date, "666")],
        contacts: [new Contact(0, "contact", "Coworker Tom", "Tommy Fake", "18005559999", "notreallytom@tommyboy.com", new Date)],

        //hamburger menu
        drawer: false,

        //addition menu
        direction: 'top',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-reverse-transition',

        //search area
        searching: false,
        searchTerm: '',

        //Menu Items
        menuItems: [
            { text: "Show All", icon: "mdi-all-inclusive" },
            { text: "Passwords", icon: "mdi-lock" },
            { text: "Card Details", icon: "mdi-credit-card" },
            { text: "Contacts", icon: "mdi-account" },
            { text: "Favorites", icon: "mdi-star"}
        ],

        //Password Modal Dialog
        passwordModal: false,
        //Card Modal Dialog
        cardModal: false,
        //Contact Modal Dialog
        contactModal: false,

        //Card Month Picker
        cardMonthMenu: false,
        cardDate: new Date().toISOString().substr(0, 7),

        //Conact Birthday Datepicker
        contactBirthdateMenu: false,
        contactBirthdate: null,
        contactActivePicker: null,

        //Modal Raw Data Models
        modalData: {
            pass: {},
            card: {},
            contact: {}
        }
    },
    watch: {
        contactMenu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        //Search function
        searchChange: function() {
            this.searchChanged = true;
        },
        //Modal Functions
        //Password Modal
        openPassModal: function () {
            this.passwordModal = true;
        },
        closePassModal: function() {
            this.passwordModal = false;
        },
        savePassModal: function () {
            this.passwordModal = false;
            let raw = this.modalData.pass;
            let obj = new Password(this.passwords.length, "password", raw.Title, raw.Description, raw.Url, raw.Username, raw.Password);
            this.passwords.push(obj);
            this.modalData.pass = {};
        },
        //Card Modal
        openCardModal: function () {
            this.cardModal = true;
        },
        closeCardModal: function () {
            this.cardModal = false;
        },
        saveCardModal: function () {
            this.cardModal = false;
            let raw = this.modalData.card;
            let obj = new Card(this.cards.length, "card", raw.Title, raw.Description, raw.Name, raw.Number, this.cardDate, raw.Cvv);
            this.cards.push(obj);
            this.cardDate = new Date().toISOString().substr(0, 7);
            this.modalData.card = {};
        },
        //Contact Modal
        openContactModal: function () {
            this.contactModal = true;
        },
        closeContactModal: function () {
            this.contactModal = false;
        },
        saveContactModal: function () {
            this.contactModal = false;
            let raw = this.modalData.contact;
            let obj = new Contact(this.contacts.length, "contact", raw.Title, raw.Name, raw.Phone, raw.Email, this.contactBirthdate);
            this.contacts.push(obj);
            this.contactBirthdate = null;
            this.modalData.contact = {};
        },
    

        //SaveDateState
        contactMenuSave(date) {
            this.$refs.menu.save(date)
        },

        //Delete entry
        trashEntry(entry) {
            let i;
            switch(entry.type) {
                case "password": 
                    i = this.passwords.findIndex(function(obj) {
                        return obj.id === entry.id;
                    });
                    if(i !== -1) this.passwords.splice(i, 1);
                    break;
                case "card": 
                    i = this.cards.findIndex(function(obj) {
                        return obj.id === entry.id;
                    });
                    if(i !== -1) this.cards.splice(i, 1);
                    break;
                case "contact": 
                    i = this.contacts.findIndex(function(obj) {
                        return obj.id === entry.id;
                    });
                    if(i !== -1) this.contacts.splice(i, 1);
                    break;
            }
        },

        //Update Entry
        updateEntry(newEntry) {
            let i;
            switch(newEntry.type) {
                case "password": 
                    // console.log(JSON.parse(localStorage.passwords)[0]);
                    i = this.passwords.findIndex(function(obj) {
                        return obj.id === newEntry.id;
                    });
                    if(i !== -1) this.passwords[i] = newEntry;
                    localStorage.setItem('passwords', JSON.stringify(this.passwords));
                    break;
                case "card": 
                    i = this.cards.findIndex(function(obj) {
                        return obj.id === newEntry.id;
                    });
                    if(i !== -1) this.cards[i] = newEntry;
                    localStorage.setItem('cards', JSON.stringify(this.cards));
                    break;
                case "contact": 
                    i = this.contacts.findIndex(function(obj) {
                        return obj.id === newEntry.id;
                    });
                    if(i !== -1) this.contacts[i] = newEntry;
                    localStorage.setItem('contacts', JSON.stringify(this.contacts));
                    break;
            }
        }
    },
    computed: {
        filteredArr() {
            if(this.searchChanged && this.searching) {
                this.searchChanged = false;
                let output = [];
                for(let i = 0; i < this.passwords.length; i++) {
                    if(this.passwords[i].title.toUpperCase().includes(this.search.toUpperCase())) {
                        output.push(this.passwords[i]);
                    }
                }
                for(let i = 0; i < this.cards.length; i++) {
                    if(this.cards[i].title.toUpperCase().includes(this.search.toUpperCase())) {
                        output.push(this.cards[i]);
                    }
                }
                for(let i = 0; i < this.contacts.length; i++) {
                    if(this.contacts[i].title.toUpperCase().includes(this.search.toUpperCase())) {
                        output.push(this.contacts[i]);
                    }
                }
                return output;
            } else {
                switch(this.drawerList) {
                    case 0: {
                        let output = this.passwords.concat(this.cards);
                        output = output.concat(this.contacts);
                        return output;
                    }
                    case 1: {
                        return this.passwords;
                    }
                    case 2: {
                        return this.cards;
                    }
                    case 3: {
                        return this.contacts;
                    }
                    case 4: {
                        let output = [];
                        for(let i = 0; i < this.passwords.length; i++) {
                            if(this.passwords[i].favorite) {
                                output.push(this.passwords[i]);
                            }
                        }
                        for(let i = 0; i < this.cards.length; i++) {
                            if(this.cards[i].favorite) {
                                output.push(this.cards[i]);
                            }
                        }
                        for(let i = 0; i < this.contacts.length; i++) {
                            if(this.contacts[i].favorite) {
                                output.push(this.contacts[i]);
                            }
                        }
                        return output;
                    }
                }
            }
        }
    },
    mounted() {
        if(localStorage.passwords) {
            this.passwords = JSON.parse(localStorage.passwords);
        } else {
            localStorage.setItem('passwords', JSON.stringify(this.passwords));
        }
        if(localStorage.cards) {
            this.cards = JSON.parse(localStorage.cards);
        } else {
            localStorage.setItem('cards', JSON.stringify(this.cards));
        }
        if(localStorage.contacts) {
            this.contacts = JSON.parse(localStorage.contacts);
        } else {
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
        }
    }
});