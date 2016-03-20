import {
  Component, provide, OnInit, View, EventEmitter
} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {
  MapsAPILoader, NoOpMapsAPILoader, MapMouseEvent, ANGULAR2_GOOGLE_MAPS_PROVIDERS, ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';

import {Location} from '../interfaces/location';
import {Box} from '../interfaces/box';
import {LocationsService} from '../services/locations.service';
import {CategoriesService} from '../services/categories.service';
import {BoxService} from '../services/box.service';
import {LocationDetailComponent} from '../components/location-detail.component';
import {Login} from '../services/auth/login.service';
import {Token} from '../services/common/token.service';
import {httpWrap} from '../services/common/http-wrapper.service';
import {LoginComponent} from '../components/login.component';
import {ReservationComponent} from '../components/reservation.component';
import {FilterPipe} from '../pipes/filter.pipe';
import {DurationPipe} from '../pipes/duration.pipe';
import {UserService} from '../services/user.service';
import {BaseComponent} from "./base.component";
import {InfoPopupComponent} from '../components/info-popup.component';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {LocalizePipe} from '../pipes/localization.pipe';
import {BoxSizePipe} from "../pipes/boxSize.pipe";

declare var window: any;
declare var ga: any;
interface window {
  scroll(any): void;
}

@Component({
  selector:    'app',
  pipes:       [FilterPipe, DurationPipe, LocalizePipe, BoxSizePipe],
  directives:  [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, LocationDetailComponent, ROUTER_DIRECTIVES, LoginComponent, ReservationComponent, InfoPopupComponent],
  providers:   [LocationsService, BoxService, Login, Token],
  templateUrl: 'app/templates/map.tmpl.html'
})
export class MapComponent extends BaseComponent implements OnInit {

  public locationCurrent:Location = null;
  public authModalOpened:boolean = false;
  public infoPopupOpened:boolean = false;
  public categoriesFetched:boolean = false;
  public categoriesStartedFetching:boolean = false;
  public locationSelected:boolean = false;
  public avAmount:boolean = false;

  public categories = [];
  public cats = {};
  public categorySelected: string = 'cat-m';

  public reservation = null;
  public user;

  public evTabChange = new EventEmitter();

  public fadeAnimation;// = this.ab.css();
  public fadeOutAnimation = this.ab.css();
  public animationClass = '';

  private locTemp = null;

  // Defaults:
  zoom: number = 13;
  lat: number = 47.39;
  lng: number = 8.5;

  constructor(
    private _locationsService: LocationsService,
    private _boxService: BoxService,
    private _loginService: Login,
    private _categoriesService: CategoriesService,
    private _token: Token,
    private _us: UserService,
    public router: Router,
    public ab: AnimationBuilder
  ) {
    super(router, _us, _token, ab);
    ga('send', 'event', 'navigation', 'find a box');
    this.fadeOutAnimation
        .setFromStyles({opacity: 1, background: 'blue'})
        .setToStyles({opacity: 0, background: 'red'});

    this.evTabChange.subscribe(
        data => {
      }
    );
  }

  ngOnInit() {
    !this.markers.length && this.getMarkers();
  }

  /*
  * Get all locations
  *
  */
  getMarkers(): void {
    this
      ._locationsService
      .getLocations()
      .then((res) => {
        if (res === 'retry') throw new Error('retry');
        if (res) {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          this.markers = json.locations;
        }
       })
       .catch((e) => {
         setTimeout(() => {
           this
               ._locationsService
               .getLocations()
               .then((res) => {
                 return res.json();
               })
               .then((res) => {
                 this.markers = res.locations;
               })
         }, 1000);
       });
  }

  getBoxes(id = null) {
    return this._boxService.getBox(id);
  }

  /* Get categories
  * @param {number} id
  */
  getCategories(id: number): Promise<any> {
    if (this.cats[id]) {
      return Promise.resolve(this.cats[id]);
    }
    return this._categoriesService.getCategories(id);
  }

  clickedMarker(m:Location): void {
    this.categories = null;
    this.locationCurrent = m;
    this.categorySelected = 'cat-m';
    this.categoriesStartedFetching = true;
    this.locationSelected = true;
    this
      .getCategories(m.id)
      .then((res) => {
        return Array.isArray(res) ? res : res.json();
      })
      .then((res) => {
        if (!res.categories) {
          // if we already cached these categories
          this.categories = this.cats[m.id];
          this.selectCategory('cat-m');
        } else {
          // set current categories to the response array
          this.categories = res.categories;
          // and cache them
          this.cats[m.id] = res.categories;

          this.categoriesFetched = true;
          this.selectCategory('cat-m');
          this.categoriesStartedFetching = false;
        }
        ga('send', 'event', 'locations', 'open');
      })
  }

  mapClicked($event: MapMouseEvent) {
    if (this.locationCurrent) {
        this.locationCurrent = null;
        return;
    }
  }

  receiveToggle($event): void {
    this.locationCurrent = null;
    this.avAmount = false;
    this.locationSelected = false;
  }

  toggleModal($event): void {
    this.authModalOpened = false;
  }

  receiveClose(status) {
    this.reservation = null;
  }

  closeReservation($event): void {
    this.reservation = null;
  }

  openCategory(e, cat): void {
    this.reservation = cat;
  }

  openInfoPopup() {
    this.infoPopupOpened = true;
    this.locTemp = this.locationCurrent;
    this.locationCurrent = null;
  }

  closeInfo() {
    this.infoPopupOpened = false;
    this.locationCurrent = this.locTemp;
    this.locTemp = null;
  }


  selectCategory(e): void {
    this.evTabChange.emit('change');
    this.categorySelected = e;
    let catMapping = {
          'cat-s': 'small',
          'cat-m': 'medium',
          'cat-l': 'large'
    };
    var res = this.categories.filter((item) => {
      return item.type === catMapping[e];
    });
    this.avAmount = res.length > 0;
  }

  markers: Location[] = [];
  boxes: Box[] = [];
}
