import { Meteor } from 'meteor/meteor';
import {Parties} from "../../../both/collections/parties.collection";

Meteor.publish('parties', () => Parties.find());

Meteor.publish('party', (partyId) => Parties.find(partyId));