import { Component, OnInit, Input } from '@angular/core';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {

  ads = [];
  highestCPIAd = '';
  secondHighestCPIAd = '';

  advertisers = environment.advertiserIds;

  constructor(private adService: AdvertisementService) { }

  ngOnInit() {
    this.biddingAdsForAdvertisers(this.advertisers);
  }

  biddingAdsForAdvertisers(advertisers) {
    let highestCPI = 0;
    let secondHighestCPI = 0;
    let ad;

    for (const [advertiserName, advertiserId] of Object.entries(advertisers)) {
      this.adService.getAdFromAdversiter(advertiserId).subscribe((response) => {
        if (response['createdAd']) {
          ad = response['createdAd'][0];
          if (ad.CPI.amount >= highestCPI ){
            this.secondHighestCPIAd = this.highestCPIAd;
            secondHighestCPI = highestCPI;
            highestCPI = ad.CPI.amount;
            this.highestCPIAd = ad.content;
          } else if (ad.CPI.amount >=  secondHighestCPI){
            secondHighestCPI = ad.CPI.amount;
            this.secondHighestCPIAd = ad.content;
          }
        }
      });
    }
}

}
