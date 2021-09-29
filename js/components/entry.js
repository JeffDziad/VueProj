Vue.component('Entry', {
    props: {
        entry: {
            type: Object,
            required: true
        }
    },

    data() {
        return {}
    },

    methods: {
        trashEntry() {
            this.$emit('trash', this.entry);
        },
        updateEntry() {
            this.$emit('update', this.entry);
        },
        favorite() {
            this.entry.favorite = true;
        },
        un_favorite() {
            this.entry.favorite = false;
        }
    },

    template: `
        <div v-if="entry.type === 'password'">
            <h3 v-if="entry.id === 0">Passwords<v-divider></v-divider></h3>
            <v-card class="_cardWrapper _password d-flex flex-column" elevation="9" outlined tile>
                <h4>{{entry.title}}</h4>

                <v-row no-gutters>
                    <v-col cols="12" sm="12">
                        <v-card class="pa-2" outlined tile>
                            <v-textarea v-model="entry.description" label="Description" rows="2"></v-textarea>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-2" outlined tile>
                            <v-text-field v-model="entry.url" label="URL"></v-text-field>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-2" outlined tile>
                            <v-text-field v-model="entry.username" label="Username"></v-text-field>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-2" outlined tile>
                            <v-text-field v-model="entry.password" label="Password"></v-text-field>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="p-4">
                    <v-col>
                        <v-btn text icon color="black" small @click="trashEntry">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">delete</v-icon>
                                </template>
                                <span>Trash</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn text icon color="black" small @click="updateEntry">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">update</v-icon>
                                </template>
                                <span>Sync</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn v-if="!entry.favorite" icon color="grey" @click="favorite">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">mdi-star</v-icon>
                                </template>
                                <span>Favorite</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn v-if="entry.favorite" icon color="yellow" @click="un_favorite">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">mdi-star</v-icon>
                                </template>
                                <span>Un-Favorite</span>
                            </v-tooltip>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </div>
            
        <div v-else-if="entry.type === 'card'">
            <h3 v-if="entry.id === 0">Card Details<v-divider></v-divider></h3>
            <v-card class="_cardWrapper _card" elevation="9" outlined tile>
                <h4>{{entry.title}}</h4>

                    <v-row no-gutters>
                        <v-col cols="12" sm="12">
                            <v-card class="pa-2" outlined tile>
                                <v-textarea v-model="entry.description" label="Description" rows="2"></v-textarea>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.name" label="Name"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.number" label="Card Number"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.date" label="Date"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.cvv" label="CVV"></v-text-field>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row class="p-4">
                        <v-col>
                            <v-btn text icon color="black" small @click="trashEntry">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">delete</v-icon>
                                    </template>
                                    <span>Trash</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn text icon color="black" small @click="updateEntry">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">update</v-icon>
                                    </template>
                                    <span>Sync</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn v-if="!entry.favorite" icon color="grey" @click="favorite">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-star</v-icon>
                                    </template>
                                    <span>Favorite</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn v-if="entry.favorite" icon color="yellow" @click="un_favorite">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-star</v-icon>
                                    </template>
                                    <span>Un-Favorite</span>
                                </v-tooltip>
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-card>
        </div>

        <div v-else-if="entry.type === 'contact'">
            <h3 v-if="entry.id === 0">Contacts<v-divider></v-divider></h3>
            <v-card class="_cardWrapper _contact" elevation="9" outlined tile>
                <h4>{{entry.title}}</h4>

                    <v-row no-gutters>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.name" label="Name"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.phone" label="Phone"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.email" label="Email"></v-text-field>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card class="pa-2" outlined tile>
                                <v-text-field v-model="entry.birthdate" label="Birthday"></v-text-field>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row class="p-4">
                        <v-col>
                            <v-btn text icon color="black" small @click="trashEntry">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">delete</v-icon>
                                    </template>
                                    <span>Trash</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn text icon color="black" small @click="updateEntry">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">update</v-icon>
                                    </template>
                                    <span>Sync</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn v-if="!entry.favorite" icon color="grey" @click="favorite">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-star</v-icon>
                                    </template>
                                    <span>Favorite</span>
                                </v-tooltip>
                            </v-btn>
                            <v-btn v-if="entry.favorite" icon color="yellow" @click="un_favorite">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-star</v-icon>
                                    </template>
                                    <span>Un-Favorite</span>
                                </v-tooltip>
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-card>
        </div>
    `

});