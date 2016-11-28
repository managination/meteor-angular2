import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, CanActivate} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Parties} from "../../../../both/collections/parties.collection";

import template from './party-details.component.html';
import {Party} from "../../../../both/models/party.model";
import {ObservableCursor, MeteorObservable} from "meteor-rxjs";

@Component({
    selector: 'party-details',
    template
})

export class PartyDetailsComponent implements OnInit, OnDestroy {
    private partyId: string;
    private paramsSub: Subscription;
    public parties: ObservableCursor<Party>;
    private partySub: Subscription;
    private party: Party;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    public saveParty() {
        delete this.party._id;
        Parties.update(this.partyId, {$set: this.party});
        this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.paramsSub = this.route.params
            .map(params => params['partyId'])
            .subscribe(partyId => {
                this.partyId = partyId;
                if (this.partySub) {
                    this.partySub.unsubscribe();
                }

                this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {
                    this.party = Parties.findOne(this.partyId);
                });
            })
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.partySub.unsubscribe();
    }
}