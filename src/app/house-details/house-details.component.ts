import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HouseListService } from '../services/house-list.service';
import { HouseModel } from '../models/house.model';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.scss',
})
export class HouseDetailsComponent implements OnInit {
  public house!: Signal<HouseModel | null>;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private houseListService = inject(HouseListService);

  constructor() {
    this.houseListService.loadHouseDetails(
      Number(this.route.snapshot.params['id'])
    );
  }

  public ngOnInit(): void {
    this.house = this.houseListService.houseDetails;
  }
}
