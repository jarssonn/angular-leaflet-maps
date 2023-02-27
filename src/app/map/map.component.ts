import { Component, Input } from '@angular/core';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input()
  featureColletion!: GeoJSON.FeatureCollection;

  map!: Leaflet.Map;

  markers: Leaflet.Marker[] = [];

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 8,
    center: { lng: 20.17579828033186, lat: 50.43817144362623 }
  }

  initializeData() {
    const features = this.featureColletion.features;
    for (let i = 0; i < features.length; i++) {
      const feature: GeoJSON.Feature = features[i];
      let properties = feature.properties ?? {};

      Leaflet.geoJSON(feature).addTo(this.map)
       .bindTooltip(properties['tooltip'])
       .bindPopup(`<b>${properties['description']}</b>`)
    }
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initializeData();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  // example of creating draggable marker
  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  // example of creating polyline
  generatePolyline() {
    var polyline = Leaflet.polyline([{ lat: 28.625485, lng: 79.821091 }, { lat: 28.625293, lng: 79.817926 }, { lat: 28.625182, lng: 79.81464 }]);
    polyline.addTo(this.map);
  }

}
