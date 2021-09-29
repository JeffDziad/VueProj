class Password {
    constructor(id, type, title, description, url, username, password) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.url = url;
        this.username = username;
        this.password = password;
        this.favorite = false;
    }
}

class Card {
    constructor(id, type, title, description, name, number, date, cvv) {
        this.id = id
        this.type = type;
        this.title = title;
        this.description = description;
        this.name = name;
        this.number = number;
        this.date = date;
        this.cvv = cvv;
        this.favorite = false;
    }
}

class Contact {
    constructor(id, type, title, name, phone, email, birthdate) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.birthdate = birthdate;
        this.favorite = false;
    }
}