import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ShippingConstants } from 'src/app/models/shipping.model';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-ship-to-view',
  templateUrl: './ship-to-view.component.html',
  styleUrls: ['./ship-to-view.component.css']
})
export class ShipToViewComponent implements OnInit {
  shippingAddress: FormGroup;
  submitted = false;
  CanadianProvincesAndTerritories  =ShippingConstants.CanadianProvincesAndTerritories
  USStatesAndTerritories = ShippingConstants.USStatesAndTerritories
  DeliveryMethods = ShippingConstants.DeliveryMethods
  constructor(private location: Location,
    private fb: FormBuilder,
    private shipping: ShippingService,
    private title: Title) { }

  ngOnInit(): void {

    this.shippingAddress = this.fb.group({
      recipient:      ['', Validators.required],
      streetAddress:  ['', Validators.required],
      streetAddress2: [''],
      city:           ['',   Validators.required],
      province:       [null, Validators.required],
      postalCode:     ['',   Validators.required],
      delivery:       ['Standard']
    });
    this.title.setTitle('Ship To');
    if (this.shipping.shippingAddress) {
      this.shippingAddress.setValue(this.shipping.shippingAddress);
    }
  }
  get f() { return this.shippingAddress.controls; }
  goBack() {
    this.location.back()
  }
  public async onSubmit(): Promise<void> {
    this.submitted = true;
    // stop here if form is invalid
    if (this.shippingAddress.invalid) {
        return;
    }
    this.shipping.shippingAddress = this.shippingAddress.value;
    this.goBack()
  }
}
