import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Parties} from '../../../../both/collections/parties.collection';

import template from './parties-form.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

@Component({
    selector: 'parties-form',
    template
})
@InjectUser('user')
export class PartiesFormComponent implements OnInit {
    user: Meteor.User;
    addForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            owner: [Meteor.userId()],
            name: ['', Validators.required],
            description: [],
            location: ['', Validators.required]
        });
    }

    addParty(): void {
        if (this.addForm.valid) {

            Parties.insert(this.addForm.value);

            this.addForm.reset();
        }
    }
}
