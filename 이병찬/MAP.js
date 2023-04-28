window.initMap = function() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5400456, lng: 126.9921017 },
      zoom: 10
    });
  
    const locations = [
      { label: "A", name: "경복궁", lat: 37.579617, lng: 126.977041 },
      { label: "B", name: "명동", lat: 37.563525, lng: 126.981056 },
      { label: "C", name: "남산타워", lat: 37.551256, lng: 126.988229 },
      { label: "D", name: "광장시장", lat: 37.570278, lng: 126.999615 },
      { label: "E", name: "청계천", lat: 37.569646, lng: 126.976936 },
      { label: "F", name: "이태원", lat: 37.534603, lng: 126.994997 },
      { label: "G", name: "강남역", lat: 37.497950, lng: 127.027636 }
    ];
  
    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();
  
    locations.forEach(({ label, name, lat, lng }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        label,
        map
      });
      bounds.extend(marker.position);
  
      marker.addListener("click", () => {
        map.panTo(marker.position);
        infoWindow.setContent(name);
        infoWindow.open({
          anchor: marker,
          map
        });
      });
    });
  
    map.fitBounds(bounds);
  };
  
