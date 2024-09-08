import { Component} from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  // @ViewChild('gallerySwiper')   swiperRef: ElementRef | undefined;

  testImages: Array<string>;

  constructor() {

    this.testImages = [
      "https://picsum.photos/id/133/1600/900",
     "https://picsum.photos/id/133/1600/900",
      "https://picsum.photos/id/133/1600/900",
    ]
  }
}
